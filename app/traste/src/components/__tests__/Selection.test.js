import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Selection from '../Selection';
import React from 'react';

afterEach(() => {
  cleanup();
});

const propsData = {
  title: 'Bin Size',
  name: 'BinSize',
  label: 'Selection',
  value: '',
  error: 'error',
};
const data = [
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
];

const onChange = jest.fn();

test('Should render Selection with selection length of 4', () => {
  render(
      <Selection
        title={propsData.title}
        name={propsData.name}
        data={data}
        {...propsData}
        onChange={onChange}
      />,
  );
});

test('Should render Selection with selection length of 0', () => {
  render(
      <Selection
        title={propsData.title}
        name={propsData.name}
        {...propsData}
        onChange={onChange}
      />,
  );
});


test('Matches snapshot', () => {
  const tree = renderer.create(<Selection
    title={propsData.title}
    name={propsData.name}
    data={data}
    {...propsData}
    onChange={onChange}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
