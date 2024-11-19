import { useState, useEffect, useCallback } from 'react';

export const useFetchData = <T>(fetchData: () => Promise<T | T[]>): { 
    data: T[]; 
    loading: boolean; 
    error: string | null; 
    refetch: () => Promise<void>;
} => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        try {
          const response = await fetchData();
    
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
      }, [fetchData]);
    
      useEffect(() => {
        fetch(); // Executa a função fetch ao montar o componente
      }, [fetch]);
    
      return { data, loading, error, refetch: fetch };
};
