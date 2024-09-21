/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export const useElementOnScreen = (
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  },
) => {
  const containerRef = useRef<null | any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const callbackFunction: IntersectionObserverCallback = entries => {
    const [entry] = entries;

    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    let observerRefValue: any;

    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRefValue = containerRef.current;
    }

    if (isVisible) {
      observer.unobserve(observerRefValue);
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  });

  return { containerRef, isVisible };
};
