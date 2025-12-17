import { useState, useEffect } from 'react';

export function useDelayedData<T>(data: T, delay: number = 800): T | null {
    const [delayedData, setDelayedData] = useState<T | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedData(data);
        }, delay);

        return () => clearTimeout(timer);
    }, [data, delay]);

    return delayedData;
}

