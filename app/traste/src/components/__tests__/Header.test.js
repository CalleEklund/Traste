import {render, screen, cleanup} from '@testing-library/react';
import Header from '../Header';
import renderer from 'react-test-renderer';
import React from 'react';

afterEach(() => {
  cleanup();
});

test('Should contain TRASTE text', () => {
  render(<Header />);
  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent('TRASTE');
});

test('Should not contain SIMON text', () => {
  render(<Header />);
  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).not.toHaveTextContent('SIMON');
});

test('Matches snapshot', () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
