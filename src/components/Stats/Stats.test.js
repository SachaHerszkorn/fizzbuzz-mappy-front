import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import axios from 'axios';

import { Bar } from 'react-chartjs-2';
import Stats from './Stats';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
}));

const mockStore = configureStore([]);
const { act } = TestRenderer;

jest.mock('axios');

describe('Testing Stats', () => {
  let store;
  let testRenderer;
  let testInstance;

  it('should render chart with no data', async () => {
    store = mockStore({
      stats: {
        list: '',
      },
    });

    const getData = { data: [] };

    axios.get.mockImplementationOnce(() => Promise.resolve(getData));

    await act(async () => {
      testRenderer = TestRenderer.create(
        <Provider store={store}>
          <Stats />
        </Provider>,
      );
    });
    testInstance = testRenderer.root;

    const error = testInstance.findAllByProps({ className: 'error' })[0];

    expect(testInstance.findAllByProps(Bar)).not.toHaveLength(0);
    expect(error).toBeDefined();
  });

  it('should render chart', async () => {
    store = mockStore({
      stats: {
        list: JSON.stringify([
          {
            stringResult: '12fizz4buzzfizz789buzz11fizz1314fizzbuzz',
            count: 10,
            _id: 'test',
            int1: 3,
            int2: 5,
            str1: 'fizz',
            str2: 'buzz',
            limit: 15,
          },
        ]),
      },
    });

    const getData = {
      data: [
        {
          stringResult: '12fizz4buzzfizz789buzz11fizz1314fizzbuzz',
          count: 10,
          _id: 'test',
          int1: 3,
          int2: 5,
          str1: 'fizz',
          str2: 'buzz',
          limit: 15,
        },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(getData));

    await act(async () => {
      testRenderer = TestRenderer.create(
        <Provider store={store}>
          <Stats />
        </Provider>,
      );
    });
    testInstance = testRenderer.root;

    expect(testInstance.findByType(Bar)).toBeDefined();
  });
});
