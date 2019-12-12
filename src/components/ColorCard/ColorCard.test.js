import React from "react";
import ColorCard from "./ColorCard";
import { shallow } from "enzyme";

describe('ColorCard', () => {
  const mockToggleLock = jest.fn();
  const mockChangeColor = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ColorCard 
    index={3}
    color={'#FFFFFF'}
    isLocked={true}
    changeColor={mockChangeColor}
    toggleLock={mockToggleLock}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should call toggleLock when the button is clicked', () => {
    wrapper.find('.lock').simulate('click')
    expect(mockToggleLock).toHaveBeenCalled()
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
            changeColor={mockChangeColor}
            toggleLock={mockToggleLock}
          />
        );
      });
    it('should match the alt snapshot if it is not locked', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
