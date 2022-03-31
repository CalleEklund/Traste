import { red } from "@mui/material/colors";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Inputfield from "../Inputfield";

afterEach(() => {
  cleanup();
});

test("Should render inputfield", () => {
  const propsData = { label: "Docket No.", name: "DocketNo", type: "string" };
  render(<Inputfield {...propsData} />);
  const inputElement = screen.getByTestId("inputfield");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAccessibleName("Docket No.")
});

test("Should render inputfield", () => {
  const propsData = { label: "Docket No.", name: "DocketNo", type: "string" };
  render(<Inputfield {...propsData} />);
  const inputElement = screen.getByTestId("inputfield");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).not.toHaveAccessibleName("DocketNo.")
});

test("Matches snapshot", () => {
  const tree = renderer.create(<Inputfield />).toJSON();
  expect(tree).toMatchSnapshot();
});
