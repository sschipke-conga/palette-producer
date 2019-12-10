import {createNewUser, loginUser} from '../util/apiCalls';

describe('createNewUser', () => {
  const mockUser = {
    username: 'Greg',
    password: 'password'
  }
  const mockUserResponse = {
    id: 1,
    username: 'Greg',
    password: 'password'
  }
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUserResponse)
      })
    })
  })
  it('should be called with the correct arguments', () => {
    const expected = ['http://localhost:3001/api/v1/signup', {
      method: 'POST',
      body: JSON.stringify(mockUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }]
    createNewUser(mockUser);
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })
  it('should return a user with an id (HAPPY)', () => {
    expect(createNewUser(mockUser)).resolves.toEqual(mockUserResponse);
  });
  it('should tell us an username has already been used if the res has a status of 500 (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 500
      })
    })
    expect(createNewUser(mockUser)).rejects.toEqual(Error('This username already taken'))
  })
  it('should throw an error if something else goes wrong (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(createNewUser(mockUser)).rejects.toEqual(Error('Woops! Something went wrong'))
  })
})

describe('loginUser', () => {
  let mockUserRes = {
    id: 34,
    username: 'Sam'
  }
  let mockUser = {
    username: 'Same',
    password: 'password'
  }

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUserRes)
      })
    })
  });
  it('should be called with the correct arguments', () => {
    const expected = ['http://localhost:3001/api/v1/login', {
      method: 'POST',
      body: JSON.stringify(mockUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }]
    loginUser(mockUser);
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  });
  it('should return a user with an id (HAPPY)', () => {
    expect(loginUser(mockUser)).resolves.toEqual(mockUserRes);
  });
  it('should tell us if the email or password is wrong if the res has a status of 401 (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 401
      })
    })
    expect(loginUser(mockUser)).rejects.toEqual(Error('Username or password is incorrect'))
  })
  it('should throw an error if something else goes wrong (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(loginUser(mockUser)).rejects.toEqual(Error('Woops! Something went wrong'))
  })
})