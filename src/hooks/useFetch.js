import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [result, setResult] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!url) {
      setResult({
        data: [],
        isLoading: false,
        error: null,
      });
      return;
    }

    setResult((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    let active = true;
    let timedOut = false;
    let debounceId;
    let requestTimeoutId;
    let controller;

    debounceId = setTimeout(async () => {
      controller = new AbortController();

      requestTimeoutId = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, 8000);

      try {
        const res = await fetch(url, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error('Something went wrong with fetching');
        }

        const data = await res.json();

        if (active) {
          setResult({
            data,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (active) {
          setResult((prev) => ({
            ...prev,
            isLoading: false,
            error: timedOut ? new Error('Server took too long to respond') : error,
          }));
        }
      } finally {
        clearTimeout(requestTimeoutId);
      }
    }, 200);

    return () => {
      active = false;
      clearTimeout(debounceId);
      clearTimeout(requestTimeoutId);
      controller?.abort();
    };
  }, [url]);

  return result;
};
