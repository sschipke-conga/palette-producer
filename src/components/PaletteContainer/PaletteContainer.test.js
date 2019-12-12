import React from "react";
import PaletteContainer from "./PaletteContainer";
import ColorCard from '../ColorCard/ColorCard';
import { shallow } from "enzyme";

describe('PaletteContainer', () => {
  const userID = 1;
  const currentProject = {
    name: 'Project'
  }
  const currentPalette = {
    id: 1,
    name: "Palette",
    project_id: 1,
    color1: "#FFFFFF",
    color2: "#FFFFFF",
    color3: "#000000",
    color4: "#FFFFFF",
    color5: "#FFFFFF"
  };
  let wrapper, colorCards;
  beforeEach(()=> {
    colorCards = shallow(<colorCard 
    changeColor={jest.fn()}
    toggleLock={jest.fn()}
    />)
    wrapper = shallow(<PaletteContainer
    userID={userID}
    currentProject={currentProject}
    currentPalette={currentPalette}
    save={jest.fn()}
    />)
  })
  describe('componentDidMount', ()=> {
    it.skip('should call randomizePalette', () => {
      expect(wrapper.instance().randomizePalette).toHaveBeenCalled()
    })
  })
    describe('changeColor',() => {
    it('should update the state with a new color ', () => {
      expect(wrapper.state('color1')).toEqual({
        hexCode: '',
        isLocked: false
      })
      wrapper.instance().changeColor('color1', '#000000')
      expect(wrapper.state("color1")).toEqual({
        hexCode: "#000000",
        isLocked: false
      });
    });
  })
      describe("toggleLock", () => {
        it("should update the state by toggling the lock ", () => {
          expect(wrapper.state("color1")).toEqual({
            hexCode: "",
            isLocked: false
          });
          wrapper.instance().toggleLock("color1", "");
          expect(wrapper.state("color1")).toEqual({
            hexCode: "",
            isLocked: true
          });
        });
      });
  describe('generateRandomHex', () => {
    it('should generate a hex code', () => {
      const result = wrapper.instance().generateRandomHex()
      expect(result[0]).toEqual('#')
      expect(result.length).toEqual(7)
    })
  })
  describe("randomizePalette", () => {      
    it('should call generateRandomHex', () => {
      wrapper.instance().generateRandomHex = jest.fn()
      wrapper.instance().randomizePalette()
      expect(wrapper.instance().generateRandomHex).toHaveBeenCalled()
    })
  });
  describe('displayPalettes', () => {
    it.skip('should return and array of ColorCards', ()=> {
      wrapper.instance().changeColor = 3
      wrapper.instance().toggleLock = 3;
      expect(
        wrapper
          .instance()
          .displayPalettes([
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF"
          ])
      ).toEqual([
        <ColorCard
          changeColor={3}
          index="color1"
          toggleLock={3}
        />,
        <ColorCard
          changeColor={3}
          index="color2"
          toggleLock={3}
        />,
        <ColorCard
          changeColor={3}
          index="color3"
          toggleLock={3}
        />,
        <ColorCard
          changeColor={3}
          index="color4"
          toggleLock={3}
        />,
        <ColorCard
          changeColor={3}
          index="color5"
          toggleLock={3}
        />
      ]);
    })
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
