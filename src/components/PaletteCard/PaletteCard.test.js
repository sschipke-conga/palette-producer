import React from "react";
import {PaletteCard, mapStateToProps, mapDispatchToProps} from "./PaletteCard";
import {setCurrentPalette, removePalette, selectPaletteInfo, selectProjectInfo, toggleMenu} from '../../actions/index'
import { shallow } from "enzyme";
import { mockCurrentPalette } from "../../assets/mockData";
import {deletePalette} from '../../util/apiCalls'
jest.mock('../../util/apiCalls')

describe('PaletteCard', () => {
  const mockProject={
    id: 1,
    name: 'Greg'
  }
  const mockPalette = {
    id: 1,
    name: "Palette",
    project_id: 1,
    color1: "#FFFFFF",
    color2: "#FFFFFF",
    color3: "#000000",
    color4: "#FFFFFF",
    color5: "#FFFFFF"
  };
  const mockToggleMenu = jest.fn()
  const mockSetCurrentPalette = jest.fn()
  const mockRemovePalette = jest.fn()
  const mockSelectPaletteInfo = jest.fn()
  const mockSelectProjectInfo = jest.fn()
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PaletteCard 
    select={jest.fn()}
    project={mockProject}
    palette={mockPalette}
    palettesLeft={3}
    removePalette={mockRemovePalette}
    toggleMenu={mockToggleMenu}
    setCurrentPalette={mockSetCurrentPalette}
    selectPaletteInfo={mockSelectPaletteInfo}
    selectProjectInfo={mockSelectProjectInfo}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should call removePalette with the correct arguments when the  first button is clicked', async () => {
    await wrapper.find('button').first().simulate('click');
    expect(mockRemovePalette).toHaveBeenCalledWith(1)
  })
  it('should call deletePalette when the first button is clicked', async () => {
    await wrapper.find('button').first().simulate('click');
    expect(deletePalette).toHaveBeenCalledWith(1)
  })
  it('should call setCurrentPalette, selectPaletteInfo, selectProjectInfo, and toggleMenu when the  second button is clicked', () => {
    wrapper.find('.edit-palette-button').simulate('click');
    expect(mockSetCurrentPalette).toHaveBeenCalled()
    expect(mockSelectPaletteInfo).toHaveBeenCalled()
    expect(mockSelectProjectInfo).toHaveBeenCalled()
    expect(mockToggleMenu).toHaveBeenCalled()
  })
  
  describe('mapStateToProps/mapDispatchToProps', () => {
    it('mapStateToProps the user and the state of the menu', () => {
      const mockUser = { username: 'Dave', id: 4 }
      const mockState = {
        currentPalette: mockCurrentPalette,

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

    it('calls dispatch with toggleMenu action when it is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = toggleMenu('TOGGLE_MENU', true);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleMenu('SET_USER', true);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('calls dispatch with setCurrentPalette action when it is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentPalette('SET_CURRENT_PALETTE', mockCurrentPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentPalette('SET_CURRENT_PALETTE', mockCurrentPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('calls dispatch with selectPaletteInfo action when it is called', () => {
      const mockInfo = {name: 'Fake', id: 44, project_id: 33}
      const mockDispatch = jest.fn();
      const actionToDispatch = selectPaletteInfo('SET_PALETTE_INFO', mockInfo);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.selectPaletteInfo('SET_PALETTE_INFO', mockInfo);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('calls dispatch with selectProjectInfo action when it is called', () => {
      const mockInfo = { name: 'Fake', id: 44 }
      const mockDispatch = jest.fn();
      const actionToDispatch = selectProjectInfo('SET_PROJECT_INFO', mockInfo);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.selectProjectInfo('SET_PROJECT_INFO', mockInfo);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('calls dispatch with removePalette action when it is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = removePalette('REMOVE_PALETTE', 44);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removePalette('REMOVE_PALETTE', 44);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  })
})