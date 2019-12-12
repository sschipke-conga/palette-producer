import React from 'react';
import { shallow } from "enzyme";
import ReactDOM from 'react-dom';
import App from './App';

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state when a project and a palette are selected', () => {
    //setup
    const mockProject = {
      id: 1,
      name: 'Zigwirly',
      user_id: 1
    }
    const mockPalette = {
      id: 1,
      project_id: 1,
      name: 'Pigglywiggly',
      color1: '#FFFFFF',
      color2: '#FFFFFF',
      color3: '#FFFFFF',
      color4: '#FFFFFF',
      color5: '#FFFFFF',
    }
    const expectedState = {
      userID: null,
      projects: [],
      palettes: {},
      projectName: 'Zigwirly',
      paletteName: 'Pigglywiggly',
      currentPalette: mockPalette,
      currentProject: mockProject
    }

    //execution
    wrapper.instance().select(mockProject, mockPalette)

    //expectation
    expect(wrapper.state()).toEqual(expectedState)
  });

  it('should change state with handleChange is invoked', () => {
    //setup
    const mockEvent = {
      target: {
        name: 'projectName',
        value: 'Gerbilation'
      }
    }

    //execution
    wrapper.instance().handleChange(mockEvent);

    //expectation
    expect(wrapper.state('projectName')).toEqual('Gerbilation');
  })
});