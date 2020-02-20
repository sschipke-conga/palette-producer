import React from "react";
import { ProjectCard, mapStateToProps, mapDispatchToProps} from "./ProjectCard";
import { shallow } from "enzyme";
import {deleteProject} from '../../util/apiCalls'
import {removeProject} from '../../actions'
jest.mock('../../util/apiCalls')
const mockRemoveProject = jest.fn()

describe('ProjectCard', () => {
  const mockProject = {
    name: "Steve",
    id: 4
  }
  const mockPalettes = [
    {
      id: 2,
      project_id: 2,
      color1: "#FFFFFF",
      color2: "#FFFFFF",
      color3: "#FFFFFF",
      color4: "#FFFFFF",
      color5: "#FFFFFF"
    }
  ];
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< ProjectCard
    project={mockProject}
    palettes={mockPalettes}
    removeProject={mockRemoveProject}
      />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  describe('Remove project button', () => {
    it('call removeProject and deleteProject with the correct arguments', async () => {
      await wrapper.find('.delete-project').simulate('click')
      expect(deleteProject).toHaveBeenCalledWith(4)
      expect(mockRemoveProject).toHaveBeenCalledWith(4)
    })
  })
  describe('mapStateToProps/mapDispatchToProps', () => {
    it('mapStateToProps the user and the state of the menu', () => {
      const mockUser = { username: 'Dave', id: 4 }
      const mockState = {
        user: mockUser,
      };
      const expected = {
        user: mockUser,
      };
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    });
    it('calls dispatch with removeProject action when it is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = removeProject('REMOVE_PROJECT', 4);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeProject('REMOVE_PROJECT', 4);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  })
})