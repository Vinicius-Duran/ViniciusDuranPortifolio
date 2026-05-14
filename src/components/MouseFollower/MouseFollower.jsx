import React, { useEffect, useRef } from 'react';
import './MouseFollower.css';

const MouseFollower = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isCoarse) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const update = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(update);
    };

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const isHoverTarget = (node) => {
      if (!node || node.nodeType !== 1) return false;
      const el = node;
      return (
        el.matches('a, button, .magnetic, .hover-target, [data-hover]') ||
        el.closest('a, button, .magnetic, .hover-target, [data-hover]') !== null
      );
    };

    const onOver = (event) => {
      if (isHoverTarget(event.target)) {
        ring.classList.add('is-active');
        dot.classList.add('is-active');
      }
    };

    const onOut = (event) => {
      if (isHoverTarget(event.target)) {
        ring.classList.remove('is-active');
        dot.classList.remove('is-active');
      }
    };

    const onLeave = () => {
      ring.style.opacity = '0';
      dot.style.opacity = '0';
    };

    const onEnter = () => {
      ring.style.opacity = '';
      dot.style.opacity = '';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    frame = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default MouseFollower;
