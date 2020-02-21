import React from "react";
import {ColorCard, mapStateToProps, mapDispatchToProps} from "./ColorCard";
import { shallow } from "enzyme";
import {mockCurrentPalette} from '../../assets/mockData';
import {setCurrentPalette} from '../../actions/index'


const mockSetCurrentPalette = jest.fn()
describe('ColorCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ColorCard 
    index={3}
    color={'#FFFFFF'}
    isLocked={true}
    setCurrentPalette={mockSetCurrentPalette}
    currentPalette={mockCurrentPalette}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  describe('toggleLock', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ColorCard
        index={3}
        color={'#FFFFFF'}
        isLocked={true}
        setCurrentPalette={mockSetCurrentPalette}
        currentPalette={mockCurrentPalette}
      />)
    })
    it('should call setCurrentPalette when called', () => {
      wrapper.instance().toggleLock()
      expect(mockSetCurrentPalette).toHaveBeenCalled()
    })
  })

  describe('changeColor', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ColorCard
        index={3}
        color={'#FFFFFF'}
        isLocked={true}
        setCurrentPalette={mockSetCurrentPalette}
        currentPalette={mockCurrentPalette}
      />)
    })
    it('should call setCurrentPalette when called', () => {
      wrapper.instance().toggleLock()
      expect(mockSetCurrentPalette).toHaveBeenCalled()
    })
  })
  describe('alt snapshot', () => {
      const mockToggleLock = jest.fn();
      const mockChangeColor = jest.fn();
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(
          <ColorCard
            index={3}
            color={"#FFFFFF"}
            isLocked={false}
            setCurrentPalette={mockSetCurrentPalette}
            currentPalette={mockCurrentPalette}
          />
        );
      });
    it('should match the alt snapshot if it is not locked', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('mapStateToProps/mapDispatchToProps', () => {
  it('mapStateToProps gives all the movies in state', () => {
    const mockState = {
      currentPalette: mockCurrentPalette
    };
    const expected = {
      currentPalette: mockCurrentPalette
    };
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

  it('calls dispatch with setAllPallettes action when it is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setCurrentPalette('SET_CURRENT_PALETTE', mockCurrentPalette);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setCurrentPalette('SET_CURRENT_PALETTE', mockCurrentPalette);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
})
