import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <>
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
};

export default Background;
