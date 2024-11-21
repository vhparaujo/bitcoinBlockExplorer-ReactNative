import { useState, useEffect, useCallback } from "react";

export const useFetchData = <T, P = undefined>(
  fetchData: (params?: P) => Promise<T | T[]>,
  autoFetch: boolean = true
): {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: (params?: P) => Promise<void>;
} => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(
    async (params?: P) => {
      if (!params && fetchData.length > 0) return;
      setLoading(true);
      try {
        const response = await fetchData(params);

        if (Array.isArray(response)) {
          setData(response);
        } else {
          setData([response]);
        }

        setError(null);
      } catch (err) {
        setError((err as Error).message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [fetch, autoFetch]);

  return { data, loading, error, refetch: fetch };
};
