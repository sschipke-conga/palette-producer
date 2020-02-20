import React from 'react';
import {LoginForm, mapDispatchToProps, mapStateToProps} from './LoginForm';
import { shallow } from 'enzyme';
import { loginUser } from '../../util/apiCalls';
import {setUser} from '../../actions/index'

jest.mock('../../util/apiCalls');

loginUser.mockImplementation(() => Promise.resolve({
  id: 5,
  name: 'Steve',
  password: '1234'
}));

describe('LoginForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginForm
    setUser={jest.fn()}
    loadProjects={jest.fn()}
    />)
  })
  it('should match the initial snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });
  describe('handleChange', () => {
    it('should update state if a user types in their username', () => {
      const mockEvent = { target: { id: 'username', value: 'Steve' } };
      expect(wrapper.state('username')).toEqual('');
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('username')).toEqual(mockEvent.target.value)
    })
    it('should update state if a user types in their password', () => {
      const mockEvent = { target: { id: 'password', value: 'password' } };
      wrapper.instance().setState({ username: 'Steve' });
      expect(wrapper.state('username')).toEqual('Steve')

      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('password')).toEqual(mockEvent.target.value);
      expect(wrapper.state('username')).toEqual('Steve');
    })
    it('should run handleChange when the inputs detect a change', () => {
      const mockNameEvent = { target: { id: 'username', value: 'Robbie' } };
      const mockPasswordEvent = { target: { id: 'password', value: 'password' } };
      wrapper.instance().handleChange = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.find('[id="username"]').simulate('change', mockNameEvent);
      wrapper.find('[id="password"]').simulate('change', mockPasswordEvent);
      expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockNameEvent);
      expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockPasswordEvent);
    })
  })
  describe('handleSubmit', () => {
    let wrapper;
    const mockLoadProjects = jest.fn()
    beforeEach(() => {
      wrapper = shallow(<LoginForm 
      loadProjects={mockLoadProjects}
        setUser={jest.fn()}
      />)
    })
    let mockUser = {
      id: 4,
      username: "Susan",
      password: "password"
    }
    it('should prevent the default action when the form is submitted', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.find('form').simulate('submit', mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })
    it('should call loginUser when called', () => {
      let mockNewUser = {
        username: "Susan",
        password: "password"
      }
      let mockEvent = { preventDefault: jest.fn() }
      loginUser.mockImplementation(() => {
        return Promise.resolve(mockUser)
      })
      wrapper.instance().setState({ username: 'Susan', password: 'password' });
      wrapper.instance().handleSubmit(mockEvent);
      expect(loginUser).toHaveBeenCalledWith(mockNewUser);
    })
    it('should set an error message to state if something goes wrong', async () => {
      let mockEvent = { preventDefault: jest.fn() }
      loginUser.mockImplementation(() => {
        throw Error('Woops')
      });
      wrapper.instance().forceUpdate()
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.state('error')).toEqual('Woops')
    })
  })
  describe('alt snapShot', () => {
    it('should match the snapshot if a user is logged in', () => {
      let wrapper = shallow(<LoginForm 
        setUser={jest.fn()}
        loadProjects={jest.fn()}
      />);
      wrapper.instance().setState({ isLoggedIn: true });
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('mapStateToProps/mapDispatchToProps', () => {
    it('mapStateToProps gives all the movies in state', () => {
      const mockUser = {username: 'Dave', id: 4}
      const mockState = {
        user: mockUser
      };
      const expected = {
        user: mockUser
      };
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    });

    it('calls dispatch with setAllPallettes action when it is called', () => {
      const mockUser = { username: 'Dave', id: 4 }
      const mockDispatch = jest.fn();
      const actionToDispatch = setUser('SET_USER', mockUser);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setUser('SET_USER', mockUser);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  })
})

