import { useState, useEffect } from 'react';

export const useFetchData = <T>(fetchData: () => Promise<T | T[]>): { 
    data: T[]; 
    loading: boolean; 
    error: string | null; 
} => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
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
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [fetchData]);

    return { data, loading, error };
};
