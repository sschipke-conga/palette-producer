import React from "react";
import { Nav, mapStateToProps, mapDispatchToProps} from "./Nav";
import { shallow } from "enzyme";
import {toggleMenu} from '../../actions/index'
import {mockUser} from '../../assets/mockData'


describe("Nav", () => {
  const mockToggleMenu = jest.fn()
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Nav
      toggleMenu={mockToggleMenu}
      user={mockUser}
      />
    );
  });
  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should call toggleMenu when the  button is clicked', () => {
    wrapper.find('button').simulate('click');
    expect(mockToggleMenu).toHaveBeenCalled()
  })
  describe('mapStateToProps/mapDispatchToProps', () => {
    it('mapStateToProps the user and the state of the menu', () => {
      const mockUser = { username: 'Dave', id: 4 }
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
      const actionToDispatch = toggleMenu('TOGGLE_MENU', true);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleMenu('SET_USER', true);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  })
});