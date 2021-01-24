import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from 'helpers';
import { selectStatsList } from 'store/stats/stats.selectors';
import { setStatsSuccess } from 'store/stats/stats.actions';

const {
  requestMethods: { getStats: requestMethod },
  errorMessages,
} = api;

function useGetStats() {
  const dispatch = useDispatch();

  const [hasGetStatsError, setHasGetStatsError] = useState(false);
  const [isGetStatsLoading, setIsGetStatsLoading] = useState(false);

  const stats = JSON.parse(useSelector(selectStatsList) || '[]') || [];

  const getStatsErrorMessage =
    (hasGetStatsError && errorMessages.submit) || null;

  useEffect(() => {
    (async () => {
      try {
        setIsGetStatsLoading(true);
        const { data } = await api.get({
          requestMethod,
        });
        dispatch(setStatsSuccess(data));
      } catch (err) {
        setHasGetStatsError(err);
      }
      setIsGetStatsLoading(false);
    })();
  }, []);

  return { stats, hasGetStatsError, isGetStatsLoading, getStatsErrorMessage };
}

export default useGetStats;
