import { useEffect } from 'react';

export const useKey = (key, action) => {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener('keyup', callback);
    return () => document.removeEventListener('keyup', callback);
  }, [key, action]);
};
