import React from "react";
import Modal from "./Modal";
import { shallow } from "enzyme";

describe("Modal", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Modal />);
  });
  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
