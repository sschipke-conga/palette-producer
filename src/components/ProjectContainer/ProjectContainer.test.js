import React from "react";
import { ProjectContainer, mapStateToProps, mapDispatchToProps} from "./ProjectContainer";
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
          allProjects={mockProjects}
          allPalettes={mockPalettes}
        />
      );
    });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
    describe("select", () => {
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
                allProjects={mockProjects}
                allPalettes={[]}
              />
            );
          });
          it('should match the snapshot', () => {
            expect(wrapper).toMatchSnapshot()
          })
      })
    });
  describe('mapStateToProps', () => {
    it('mapStateToProps the user and the state of the menu', () => {
      const mockUser = { username: 'Dave', id: 4 }
      const mockState = {
        allPalettes: mockPalettes,
        allProjects: mockProjects
      };
      const expected = {
        allPalettes: mockPalettes,
        allProjects: mockProjects
      };
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    });
  })
})
