import { useEffect, useState } from 'react';

export function useFetch (fetchFn, initialValue, userId) {

  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData () {
      setIsFetching(true);
      try {
        let data;
        if (userId) {
          data = await fetchFn(userId);
        } else {
          data = await fetchFn();
        }
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn, userId]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error
  };
}