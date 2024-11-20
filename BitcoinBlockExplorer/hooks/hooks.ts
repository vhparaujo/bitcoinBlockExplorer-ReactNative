import { useState, useEffect, useCallback } from 'react';

export const useFetchData = <T, P = undefined>(
  fetchData: (params?: P) => Promise<T | T[]>
): {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: (params?: P) => Promise<void>;
} => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(
    async (params?: P) => {
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
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );

  useEffect(() => {
    fetch(); // Executa a função fetch ao montar o componente sem parâmetros iniciais
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
};
