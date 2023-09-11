import { useEffect, useState } from "react";
const useFetch = <T = Record<string, any>>(
  endPoint: string,
  shouldFetch?: boolean
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (shouldFetch !== false) get(endPoint);
  }, [shouldFetch]);

  const get = async (endPoint: string) => {
    try {
      setError(false);
      setIsFetching(true);
      const data = await (await fetch(endPoint)).json();
      setResponse(data);
    } catch (e) {
      setError(true);
    } finally {
      setIsFetching(false);
    }
  };

  return { error, response, isFetching } as const;
};
export default useFetch;
