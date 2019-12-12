import React from "react";
import ProjectCard from "./ProjectCard";
import { shallow } from "enzyme";

describe('ProjectCard', () => {
  const mockProject = {
    name: "Steve",
    id: 2
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
    removePalette={jest.fn()}
    removeProject={jest.fn()}
    select={jest.fn()}
      />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})