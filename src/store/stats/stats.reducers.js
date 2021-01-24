import actionTypes from './stats.actions';

export default (state = { list: '' }, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_STATS_SUCCESS: {
      return {
        ...state,
        list: JSON.stringify(payload),
      };
    }
    default:
      return state;
  }
};
