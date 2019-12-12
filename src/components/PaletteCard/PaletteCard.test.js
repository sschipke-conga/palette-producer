import React from "react";
import PaletteCard from "./PaletteCard";
import { shallow } from "enzyme";

describe('PaletteCard', () => {
  const mockProject={
    id: 1,
    name: 'Greg'
  }
  const mockPalette = {
    id: 1,
    name: "Palette",
    project_id: 1,
    color1: "#FFFFFF",
    color2: "#FFFFFF",
    color3: "#000000",
    color4: "#FFFFFF",
    color5: "#FFFFFF"
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PaletteCard 
    select={jest.fn()}
    project={mockProject}
    palette={mockPalette}
    removePalette={jest.fn()}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})