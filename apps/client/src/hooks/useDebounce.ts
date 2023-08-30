import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, milliseconds: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, milliseconds);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, milliseconds]);

  return debouncedValue;
}

export default useDebounce;
