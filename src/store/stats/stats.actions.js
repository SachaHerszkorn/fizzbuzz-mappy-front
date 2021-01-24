const actionTypes = {
  SET_STATS: 'SET_STATS',
  SET_STATS_SUCCESS: 'SET_STATS_SUCCESS',
  SET_STATS_FAIL: 'SET_STATS_FAIL',
};

export function setStatsSuccess(payload) {
  return {
    type: actionTypes.SET_STATS_SUCCESS,
    payload,
  };
}

export default actionTypes;
