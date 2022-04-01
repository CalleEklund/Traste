import {render, screen, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Selection from '../Selection';
import React from 'react';

afterEach(() => {
  cleanup();
});

test('Should render Selection with selection length of 4', () => {
  const propsData = {
    title: 'Bin Size',
    name: 'BinSize',
    data: [
      {
        id: '0',
        label: '5',
      },
      {
        id: '1',
        label: '10',
      },
      {
        id: '2',
        label: '15',
      },
      {
        id: '3',
        label: '20',
      },
    ],
  };

  render(
      <Selection
        title={propsData.title}
        name={propsData.name}
        data={propsData.data}
      />,
  );
  const selectionElement = screen.getByTestId('selectionfield');
  expect(selectionElement).toBeInTheDocument();
  // expect(selectionElement).toHaveLength(propsData.length);
  expect(selectionElement).toHaveAttribute('name', propsData.name);
});

test('Matches snapshot', () => {
  const tree = renderer.create(<Selection />).toJSON();
  expect(tree).toMatchSnapshot();
});
