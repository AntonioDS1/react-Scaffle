import { useLayoutEffect, useState, useRef } from 'react';
import { throttle } from 'lodash';

export const useElementWidth = (delay = 100) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();

    const callback = throttle(([entry]) => {
      setWidth(entry.contentRect.width);
    }, delay);

    const resizeObs = new ResizeObserver(callback);

    resizeObs.observe(el);

    return () => {
      resizeObs.unobserve(el);
      callback.cancel();
    };
  }, [delay]);

  return [ref, width];
};
