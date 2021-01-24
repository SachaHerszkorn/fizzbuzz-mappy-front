import React from 'react';
import classNames from 'class-names';

import { useAddFizzbuzz } from 'hooks/fizzbuzz';

import './FizzBuzz.scss';

function FizzBuzz() {
  const {
    isAddFizzbuzzLoading,
    addFizzbuzzErrorMessage,
    addFizzbuzz,
    setAddFizzBuzzValue,
    stringResult,
  } = useAddFizzbuzz();

  const copyToClipBoard = () => {
    /* Get the text field */
    const textarea = document.getElementById('copyArea');

    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNode(textarea);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
  };

  return (
    <div className="page">
      <form>
        <div className="input-container">
          <div>First type some text which will appear in the sequence</div>
          <input
            type="text"
            disabled={isAddFizzbuzzLoading}
            className={classNames('first-text', {
              isAddFizzbuzzLoading: 'loading',
            })}
            onChange={({ target: { value } }) =>
              setAddFizzBuzzValue('str1', value)
            }
          />
        </div>
        <div className="input-container">
          <div>
            Then type a number which will display your text if it is has a
            corresponding multiple in the number sequencce
          </div>
          <input
            type="number"
            disabled={isAddFizzbuzzLoading}
            className={classNames('first-number', {
              isAddFizzbuzzLoading: 'loading',
            })}
            onChange={({ target: { value } }) =>
              setAddFizzBuzzValue('int1', value)
            }
          />
        </div>
        <div className="input-container">
          <div>Type in the second text</div>
          <input
            type="text"
            disabled={isAddFizzbuzzLoading}
            className={classNames('second-text', {
              isAddFizzbuzzLoading: 'loading',
            })}
            onChange={({ target: { value } }) =>
              setAddFizzBuzzValue('str2', value)
            }
          />
        </div>
        <div className="input-container">
          <div>with the corresponding multiple</div>
          <input
            type="number"
            disabled={isAddFizzbuzzLoading}
            className={classNames('second-number', {
              isAddFizzbuzzLoading: 'loading',
            })}
            onChange={({ target: { value } }) =>
              setAddFizzBuzzValue('int2', value)
            }
          />
        </div>
        <div className="input-container">
          <div>
            and finish your request with the limit the sequence will begin with
            1 and end with your input
          </div>
          <input
            type="number"
            disabled={isAddFizzbuzzLoading}
            className={classNames('limit', { isAddFizzbuzzLoading: 'loading' })}
            onChange={({ target: { value } }) =>
              setAddFizzBuzzValue('limit', value)
            }
          />
        </div>
        <div className="button-container">
          <button
            type="button"
            onClick={addFizzbuzz}
            disabled={isAddFizzbuzzLoading}
            className={classNames('submit', {
              isAddFizzbuzzLoading: 'loading',
            })}
          >
            Process <span>👌</span>
          </button>
        </div>
        {addFizzbuzzErrorMessage && !isAddFizzbuzzLoading && (
          <div className="error">{addFizzbuzzErrorMessage}</div>
        )}
        {isAddFizzbuzzLoading && <div className="loading">loading</div>}

        <button
          type="button"
          className="copy-container"
          onClick={() => {
            if (stringResult) copyToClipBoard();
          }}
        >
          <div className="info-copy">Click To Copy</div>
          <textarea
            value={stringResult || 'waiting for inputs'}
            id="copyArea"
            disabled
          />
        </button>
      </form>
    </div>
  );
}

export default FizzBuzz;
