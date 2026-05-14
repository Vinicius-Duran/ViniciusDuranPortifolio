import { useEffect, useRef } from 'react';

export const useReveal = (options = {}) => {
  const ref = useRef(null);
  const { threshold = 0.15, rootMargin = '0px 0px -80px 0px', once = true } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
};

export const useRevealMany = (count, options = {}) => {
  const refs = useRef([]);
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options;

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      refs.current.forEach((node) => node && node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [count, threshold, rootMargin, once]);

  const setRef = (index) => (node) => {
    refs.current[index] = node;
  };

  return setRef;
};
