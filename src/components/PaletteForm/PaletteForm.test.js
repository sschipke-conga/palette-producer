import React from 'react';
import { PaletteForm, mapDispatchToProps, mapStateToProps } from './PaletteForm';
import { shallow } from 'enzyme';
import { savePalette, saveProject, updatePalette } from '../../util/apiCalls';
import {mockPalettes, mockUser, mockProjects, mockCurrentPalette} from '../../assets/mockData'
import { setCurrentPalette, addPalette, addProject, resetSelectedPalette, resetSelectedProject, resetCurrentPalette, updateStoredPalette } from '../../actions/index'

jest.mock('../../util/apiCalls')

const mockSetCurrentPalette = jest.fn()
const mockAddProject = jest.fn()
const mockAddPalette = jest.fn()
const mockResetSelectedPalette = jest.fn()
const mockResetSelectedProject = jest.fn()
const mockResetCurrentPalette = jest.fn()
const mockUpdateStoredPalette = jest.fn()


describe('PaletteForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PaletteForm
      setCurrentPalette={mockSetCurrentPalette}
      addPalette={mockAddPalette}
      addProject={mockAddProject}
      resetCurrentPalette={mockResetCurrentPalette}
      resetSelectedPalette={mockResetSelectedPalette}
      resetSelectedProject={mockResetSelectedProject}
      allProjects={mockProjects}
      user={mockUser}
      currentPalette={mockCurrentPalette}
      selectedPaletteInfo={{name: null, id: null, project_id:null}}
      selectedProjectInfo={mockProjects[2]}
      updateStoredPalette={mockUpdateStoredPalette}
      />)
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
  it('should match the initial snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });
  describe('handleChange', () => {
    it('should update state if a user selects a project', () => {
      const mockEvent = { target: { id: 'projectId', value: '5' } };
      expect(wrapper.state('projectId')).toEqual('');
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('projectId')).toEqual(mockEvent.target.value)
    })
    it('should update state when a user enters a palette name', () => {
      const mockEvent = { target: { id: 'paletteName', value: 'Palette Name' } };
      expect(wrapper.state('paletteName')).toEqual('');
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('paletteName')).toEqual(mockEvent.target.value)
    })
    it('the projectId is CreateNew it should allow a user to enter a name for their project', () => {
        const mockEvent = { target: { id: 'projectName', value: 'Project Name' } };
        expect(wrapper.state('projectName')).toEqual('');
        wrapper.instance().setState({projectId: 'CreateNew'})
        expect(wrapper.state('projectId')).toEqual('CreateNew')
        wrapper.instance().handleChange(mockEvent);
        expect(wrapper.state('projectName')).toEqual(mockEvent.target.value)
      })
    })
    describe('handleSubmit', () => {
      it('should prevent the default action when the form is submitted', () => {
        const mockEvent = { preventDefault: jest.fn(),};
        wrapper.find('form').simulate('submit', mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled()
      })
      it('should call savePalette when called', () => {
        wrapper.instance().savePalette = jest.fn()
        wrapper.instance().forceUpdate()
        let mockEvent = { preventDefault: jest.fn() }
        wrapper.instance().setState({ projectId: '5', paletteName: 'Testing', projectName:'Test project' });
        wrapper.instance().handleSubmit(mockEvent);
        expect(wrapper.instance().savePalette).toHaveBeenCalledWith();
      })
    })
    describe('displayProjectOptions', () => {
      it('should return an array of options for all the projects', () => {
        const result = wrapper.instance().displayProjectOptions()
        expect(result.length).toEqual(mockProjects.length)
      })
    })
    describe('savePalette', () => {
      saveProject.mockImplementation(() => Promise.resolve({id: 67, name:'Fake project'}))
      savePalette.mockImplementation(() => Promise.resolve({id: 88, project_id:67, name: 'Bigsby'}))
      it('if projectId is CreateNew it should call saveProject, savePalette, addPalette and reset', async () => {
        wrapper.instance().reset = jest.fn()
        wrapper.instance().forceUpdate()
        wrapper.setState({projectId: 'CreateNew', projectName: 'Fake project', paletteName: 'Bigsby'})
        await wrapper.instance().savePalette()
        expect(saveProject).toHaveBeenCalledWith({name: 'Fake project', user_id: mockUser.user_id})
        expect(savePalette).toHaveBeenCalled()
        expect(mockAddProject).toHaveBeenCalled()
        expect(mockAddPalette).toHaveBeenCalled()
        expect(wrapper.instance().reset).toHaveBeenCalled()
      })
      it('if projectId is and existing project it should only call savePalette, addPalette and reset', async () => {
        wrapper.instance().reset = jest.fn()
        wrapper.instance().forceUpdate()
        wrapper.setState({ projectId: '8', paletteName: 'Debra' })
        await wrapper.instance().savePalette()
        expect(saveProject).not.toHaveBeenCalled()
        expect(savePalette).toHaveBeenCalled()
        expect(mockAddProject).not.toHaveBeenCalled()
        expect(mockAddPalette).toHaveBeenCalled()
        expect(wrapper.instance().reset).toHaveBeenCalled()
      })
    })
    describe('updateSelectedPalette', () => {
      updatePalette.mockImplementation(() => Promise.resolve(mockPalettes[2]))
      it('should call updatePalette and updateStorePalette', async () => {
        await wrapper.instance().updateSelectedPalette()
        expect(updatePalette).toHaveBeenCalled()
        expect(mockUpdateStoredPalette).toHaveBeenCalled()
      })
      it('should set the state of isUpdateSuccess if the palette is updated successfully', async () => {
        expect(wrapper.state('isUpdateSuccess')).toBe(false)
        await wrapper.instance().updateSelectedPalette()
        expect(wrapper.state('isUpdateSuccess')).toBe(true)
      })
      it('should NOT set the state of isUpdateSuccess if the palette is not updated successfully or call updateStoredPalette', async () => {
        updatePalette.mockImplementation(() => Promise.reject({error:'Test Woops'}))
        expect(wrapper.state('isUpdateSuccess')).toBe(false)
        await wrapper.instance().updateSelectedPalette()
        expect(wrapper.state('isUpdateSuccess')).toBe(false)
        expect(mockUpdateStoredPalette).not.toHaveBeenCalled()
      })
    })
    describe('reset', () => {
      it('should reset the state of the PaletteForm', () => {
        const initialState = {
          paletteName: '',
          projectName: '',
          projectId: '',
          error: '',
          isUpdateSuccess: false
        }
        expect(wrapper.state()).toEqual(initialState)
        wrapper.instance().setState({
          projectId: '5',
          projectName: 'Test Name',
          paletteName: 'Palette name test',
          error: 'Test error',
          isUpdateSuccess: true
        })
        expect(wrapper.state()).toEqual({
          projectId: '5',
          projectName: 'Test Name',
          paletteName: 'Palette name test',
          error: 'Test error',
          isUpdateSuccess: true
        })
        wrapper.instance().reset()
        expect(wrapper.state()).toEqual(initialState)
      })
    })
    describe('altSnapShot1', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<PaletteForm
          setCurrentPalette={mockSetCurrentPalette}
          addPalette={mockAddPalette}
          addProject={mockAddProject}
          resetCurrentPalette={mockResetCurrentPalette}
          resetSelectedPalette={mockResetSelectedPalette}
          resetSelectedProject={mockResetSelectedProject}
          allProjects={mockProjects}
          user={mockUser}
          currentPalette={mockCurrentPalette}
          selectedPaletteInfo={{ name: 'Fake Name', id: 5, project_id: 22 }}
          selectedProjectInfo={mockProjects[2]}
          updateStoredPalette={mockUpdateStoredPalette}
        />)
      })
      it('should match the alternate snapshot if there is a selectedPalette', () => {
        expect(wrapper).toMatchSnapshot()
      });
    })
  describe('altSnapShot2', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<PaletteForm
        setCurrentPalette={mockSetCurrentPalette}
        addPalette={mockAddPalette}
        addProject={mockAddProject}
        resetCurrentPalette={mockResetCurrentPalette}
        resetSelectedPalette={mockResetSelectedPalette}
        resetSelectedProject={mockResetSelectedProject}
        allProjects={mockProjects}
        user={mockUser}
        currentPalette={mockCurrentPalette}
        selectedPaletteInfo={{ name: 'Fake Name', id: 5, project_id: 22 }}
        selectedProjectInfo={mockProjects[2]}
        updateStoredPalette={mockUpdateStoredPalette}
      />)
      wrapper.instance().setState({isUpdateSuccess: true})
    })
    it('should match the alternate snapshot if there is a selectedPalette, and the palette update is a success', () => {
      expect(wrapper).toMatchSnapshot()
    });
  })
})