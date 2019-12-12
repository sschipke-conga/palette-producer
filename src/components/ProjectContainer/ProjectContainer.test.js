import React from "react";
import ProjectContainer from "./ProjectContainer";
import { shallow } from "enzyme";

describe('ProjectContainer', () => {
  const mockSelect = jest.fn()
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
          select={mockSelect}
          removePalette={jest.fn()}
          removeProject={jest.fn()}
        />
      );
    });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
    describe("select", () => {
      it("should call select on click", () => {
        wrapper.find(".add-project-container").simulate("click");
        expect(mockSelect).toHaveBeenCalled();
      });
      describe('alt snapshot', () => {
          const mockSelect = jest.fn();
          const mockProjects = [
            {
              name: "Project"
            }
          ];
          let wrapper;
          beforeEach(() => {
            wrapper = shallow(
              <ProjectContainer
                projects={mockProjects}
                palettes={[]}
                select={mockSelect}
                removePalette={jest.fn()}
                removeProject={jest.fn()}
              />
            );
          });
          it('should match the snapshot', () => {
            expect(wrapper).toMatchSnapshot()
          })
      })
    });
})
