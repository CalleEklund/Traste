import {render, screen, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import MaterialField from '../MaterialField';
import React from 'react';

afterEach(() => {
  cleanup();
});

test('Should render MaterialField with name Wood', () => {
  const propsData = {name: 'Wood'};
  render(<MaterialField {...propsData} />);
  const materialFieldElement = screen.getByTestId('materialfield');
  expect(materialFieldElement).toBeInTheDocument();
  expect(materialFieldElement).toHaveTextContent('');
  expect(materialFieldElement).toHaveAttribute('name', 'Wood');
});

test('Should not render Material with name Wood', () => {
  const propsData = {label: 'Wood'};
  render(<MaterialField {...propsData} />);
  const materialFieldElement = screen.getByTestId('materialfield');
  expect(materialFieldElement).toBeInTheDocument();
  expect(materialFieldElement).not.toHaveAttribute('name', '');
});

test('Matches snapshot', () => {
  const tree = renderer.create(<MaterialField />).toJSON();
  expect(tree).toMatchSnapshot();
});
