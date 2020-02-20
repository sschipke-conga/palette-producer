import React from "react";
import { PaletteContainer, mapStateToProps, mapDispatchToProps } from './PaletteContainer';
import {ColorCard} from '../ColorCard/ColorCard'
import { shallow } from "enzyme";
import {mockCurrentPalette} from '../../assets/mockData'
import {generateRandomHex} from '../../util/helperFuncs'
import {setCurrentPalette} from '../../actions'

jest.mock('../../util/helperFuncs')

const mockSetCurrentPalette = jest.fn()

describe('PaletteContainer', () => {
  const mockUser = {name: 'Shanda', id:5};
  let wrapper, colorCards;
  beforeEach(() => {
    // colorCards = shallow(<ColorCard
    //   index={3}
    //   color={'#FFFFFF'}
    //   changeColor={jest.fn()}
    // />)
    wrapper = shallow(<PaletteContainer
      user={mockUser}
      setCurrentPalette={mockSetCurrentPalette}
      currentPalette={mockCurrentPalette}
    />)
  })
  describe("randomizePalette", () => {
    it('should call generateRandomHex', () => {
      wrapper.instance().randomizePalette()
      expect(generateRandomHex).toHaveBeenCalled()
    })
    it('should call setCurrentPalette', () => {
      wrapper.instance().randomizePalette()
      expect(mockSetCurrentPalette).toHaveBeenCalled()
    })
  });
  describe('displayPalette', () => {
    it('should return and array of ColorCards', () => {
      expect(wrapper.instance().displayPalette().length)
      .toEqual(5);
    })
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  describe('mapStateToProps/mapDispatchToProps', () => {
    it('mapStateToProps the user and the state of the menu', () => {
      const mockUser = { username: 'Dave', id: 4 }
      const mockState = {
        currentPalette: mockCurrentPalette,
        user: mockUser,
      };
      const expected = {
        currentPalette: mockCurrentPalette,
        user: mockUser,
      };
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    });
    it('calls dispatch with setCurrentPalette action when it is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentPalette('SET_CURRENT_PALETTE', mockCurrentPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentPalette('SET_CURRENT_PALETTE', mockCurrentPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  })
})
