import React from 'react';
import LoginForm from './LoginForm';
import { shallow } from 'enzyme';
import { loginUser } from '../../util/apiCalls';

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
    beforeEach(() => {
      wrapper = shallow(<LoginForm />)
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
    it('should update its state to be logged in', async () => {
      let mockEvent = { preventDefault: jest.fn() }
      wrapper.instance().setState({ username: 'Susan', password: 'password', confirmPassword: 'password' });
      expect(wrapper.state('isLoggedIn')).toEqual(false);
      await wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.state('isLoggedIn')).toEqual(true);
    });
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
      let wrapper = shallow(<LoginForm />);
      wrapper.instance().setState({ isLoggedIn: true });
      expect(wrapper).toMatchSnapshot()
    })
  })
})

