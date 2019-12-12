import React from "react";
import ColorCard from "./ColorCard";
import { shallow } from "enzyme";

describe('ColorCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ColorCard 
    index={3}
    color={'#FFFFFF'}
    isLocked={true}
    changeColor={jest.fn()}
    toggleLock={jest.fn()}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
