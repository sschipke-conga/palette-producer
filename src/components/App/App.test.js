import React from 'react';
import { shallow } from "enzyme";
import ReactDOM from 'react-dom';
import {App, mapDispatchToProps, mapStateToProps} from './App';
import {mockPalettes, mockProjects, mockUser} from '../../assets/mockData'
import { setAllPalettes, setAllProjects } from '../../actions';
import { getUserProjects, getProjectPalettes } from '../../util/apiCalls';
jest.mock('../../util/apiCalls')

getUserProjects.mockImplementation(() => Promise.resolve(mockProjects));
getProjectPalettes.mockImplementation(() => Promise.resolve(mockPalettes[0]));


describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App
        setAllPalettes={jest.fn()}
        setAllProjects={jest.fn()}
        isMenuActive={true}
      />)
  });

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Alt snapshot', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App
      setAllPalettes={jest.fn()}
      setAllProjects={jest.fn()}
      isMenuActive={true}
      />)
  });
  it('should match the snapshot when the menu is active ', () => {
    expect(wrapper).toMatchSnapshot();
  });
})

describe('loadUserProjectsAndPalette', () => {
  const mockSetAllPalettes= jest.fn()
  const mockSetAllProjects = jest.fn()
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App
      setAllPalettes={mockSetAllPalettes}
      setAllProjects={mockSetAllProjects}
      isMenuActive={true}
      user={mockUser}
      />)
  });
  it('should call getUserProjects, getProjectPalettes, setAllProjects, and setAllPalettes', async () => {
    await wrapper.instance().loadUserProjectsAndPalettes()
    expect(getUserProjects).toHaveBeenCalled()
    expect(getProjectPalettes).toHaveBeenCalled()
    expect(mockSetAllPalettes).toHaveBeenCalled()
    expect(mockSetAllProjects).toHaveBeenCalled()
  })
})

describe('App REDUX test', () => {
  it('mapStateToProps gives all the movies in state', () => {
    const mockState = {
      user: mockUser,
      isMenuActive: false
    };
    const expected = {
      user: mockUser,
      isMenuActive: false
    };
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

  it('calls dispatch with setAllPallettes action when it is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setAllPalettes('SET_PALETTES', mockPalettes);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setAllPalettes('SET_PALETTES', mockPalettes);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('calls dispatch with setAllProjects action when it is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setAllProjects('SET_PROJECTS', mockProjects);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setAllProjects('SET_PROJECTS', mockProjects);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
})