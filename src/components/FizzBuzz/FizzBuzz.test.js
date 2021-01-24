import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import axios from 'axios';

import FizzBuzz from './FizzBuzz';

const mockStore = configureStore([]);
const { act } = TestRenderer;

jest.mock('axios');

describe('Testing FizzBuzz', () => {
  let store;
  let testRenderer;
  let testInstance;

  it('should render form', () => {
    store = mockStore({
      stats: {
        list: '',
      },
    });

    act(() => {
      testRenderer = TestRenderer.create(
        <Provider store={store}>
          <FizzBuzz />
        </Provider>,
      );
    });
    testInstance = testRenderer.root;
    expect(testInstance.findAllByType('input')).toHaveLength(5);
  });

  it('should not process string result with missing params', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve());

    const processButton = testInstance.findAllByType('button')[0];
    await act(async () => {
      processButton.props.onClick();
    });

    const error = testInstance.findAllByProps({ className: 'error' })[0];

    expect(axios.post).not.toBeCalled();
    expect(error).toBeDefined();
  });

  it('should process string result', async () => {
    const [
      str1Input,
      int1Input,
      str2Input,
      int2Input,
      limitInput,
    ] = testInstance.findAllByType('input');
    str1Input.props.onChange({ target: { value: 'fizz' } });
    str2Input.props.onChange({ target: { value: 'buzz' } });
    int1Input.props.onChange({ target: { value: 3 } });
    int2Input.props.onChange({ target: { value: 5 } });
    limitInput.props.onChange({ target: { value: 15 } });

    const postData = {
      data: {
        stringResult: '12fizz4buzzfizz789buzz11fizz1314fizzbuzz',
        mostFrequentRequests: [
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
      },
    };

    axios.post.mockImplementationOnce(() => Promise.resolve(postData));

    const processButton = testInstance.findAllByType('button')[0];
    await act(async () => {
      processButton.props.onClick();
    });

    expect(testInstance.findByType('textarea').props.value).toBe(
      '12fizz4buzzfizz789buzz11fizz1314fizzbuzz',
    );
  });
});
