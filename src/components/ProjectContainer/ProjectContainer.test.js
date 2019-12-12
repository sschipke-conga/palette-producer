import React from "react";
import ProjectContainer from "./ProjectContainer";
import { shallow } from "enzyme";

describe('ProjectContainer', () => {
    const mockProjects = [{
      name: "Project"
    }];
    const mockPalettes = [{
      id: 1,
      name: "Palette",
      project_id: 1,
      color1: "#FFFFFF",
      color2: "#FFFFFF",
      color3: "#000000",
      color4: "#FFFFFF",
      color5: "#FFFFFF"
    }];
    let wrapper;
  beforeEach(() => {
      wrapper = shallow(
        <ProjectContainer
          projects={mockProjects}
          palettes={mockPalettes}
          select={jest.fn()}
          removePalette={jest.fn()}
          removeProject={jest.fn()}
        />
      );
    });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
