import React from 'react';
import SignupForm from './SignupForm';
import { shallow } from 'enzyme';
import { createNewUser, loginUser} from '../../util/apiCalls';

jest.mock('../../util/apiCalls');

createNewUser.mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => jest.fn().mockImplementation(() => {
      return Promise.resolve({
        id: 5,
        name: 'Steve',
        password: '1234'
      })
    })
  })
});

loginUser.mockImplementation(() => Promise.resolve({
  id: 5,
  name: 'Steve',
  password: '1234'
}));

describe('SignupForm', () => {
  let mockUser = {
    id: 5,
    name: 'Steve',
    email: 's@gmail.com',
    password: '1234'
  }
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignupForm
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
      wrapper = shallow(<SignupForm />)
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
    it('should call createNewUser when called', () => {
      let mockNewUser = {
        username: "Susan",
        password: "password"
      }
      let mockEvent = {preventDefault: jest.fn()}
      createNewUser.mockImplementation(() => {
        return Promise.resolve(mockUser)
      })
      wrapper.instance().setState({ username: 'Susan', password: 'password', confirmPassword: 'password' });
      wrapper.instance().handleSubmit(mockEvent);
      expect(createNewUser).toHaveBeenCalledWith(mockNewUser);
    })
    it('should update with an error if the passwords don\'t match', () => {
      let mockEvent = { preventDefault: jest.fn() }
      createNewUser.mockImplementation(() => {
        return Promise.resolve(mockUser)
      })
      wrapper.instance().setState({ username: 'Susan', password: 'password', confirmPassword: 'wrong' });
      wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.state('passwordError')).toEqual(true);
      expect(wrapper.state('error')).toEqual('Passwords do not match')
    })
    it('should update its state to be logged in', async () => {
      let mockEvent = {preventDefault: jest.fn()}
      wrapper.instance().setState({ username: 'Susan', password: 'password', confirmPassword: 'password' });
      expect(wrapper.state('isFormComplete')).toEqual(false);
      await wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.state('isFormComplete')).toEqual(true);
    });
    it('should set an error message to state if something goes wrong', async () => {
      let mockEvent = {preventDefault: jest.fn()}
      createNewUser.mockImplementation(() => {
        throw Error('Woops')
      });
      wrapper.instance().forceUpdate()
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.state('error')).toEqual('Woops')
    })
  })

  describe('alt snapShot', () => {
    it('should match the snapshot if a user is logged in', () => {
      let wrapper = shallow(<SignupForm />);
      wrapper.instance().setState({ isLoggedIn: true });
      expect(wrapper).toMatchSnapshot()
    })
  })
})

