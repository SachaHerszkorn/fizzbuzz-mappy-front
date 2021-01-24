import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { api } from 'helpers';
import { setStatsSuccess } from 'store/stats/stats.actions';

const {
  requestMethods: { postFizzbuzz: requestMethod },
  errorMessages,
} = api;

function useAddFizzbuzz() {
  const {
    register,
    handleSubmit,
    setValue: setAddFizzBuzzValue,
    errors,
  } = useForm();
  const dispatch = useDispatch();

  const [stringResult, setStringResult] = useState(null);
  const [hasAddFizzbuzzError, setHasAddFizzbuzzError] = useState(false);
  const [isAddFizzbuzzLoading, setIsAddFizzbuzzLoading] = useState(false);

  const requiredField = 'All fields are required';

  const errorKeys = Object.keys(errors);
  const addFizzbuzzErrorMessage =
    (errorKeys.length && errors[errorKeys[0]].message) ||
    (hasAddFizzbuzzError && errorMessages.submit) ||
    null;

  useEffect(() => {
    register(
      { name: 'int1' },
      {
        required: {
          value: true,
          message: requiredField,
        },
      },
    );
    register(
      { name: 'int2' },
      {
        required: {
          value: true,
          message: requiredField,
        },
      },
    );
    register(
      { name: 'str1' },
      {
        required: {
          value: true,
          message: requiredField,
        },
      },
    );
    register(
      { name: 'str2' },
      {
        required: {
          value: true,
          message: requiredField,
        },
      },
    );
    register(
      { name: 'limit' },
      {
        required: {
          value: true,
          message: requiredField,
        },
      },
    );
  }, [register]);

  const addFizzbuzz = useCallback(
    handleSubmit(async (payload) => {
      setIsAddFizzbuzzLoading(true);
      try {
        const {
          data: { stringResult: stringResultFromApi, mostFrequentRequests },
        } = await api.post({
          requestMethod,
          body: payload,
        });
        setStringResult(stringResultFromApi);
        dispatch(setStatsSuccess(mostFrequentRequests));
      } catch (err) {
        setHasAddFizzbuzzError(err);
      }
      setIsAddFizzbuzzLoading(false);
    }),
  );

  return {
    isAddFizzbuzzLoading,
    addFizzbuzzErrorMessage,
    addFizzbuzz,
    setAddFizzBuzzValue,
    stringResult,
  };
}

export default useAddFizzbuzz;
