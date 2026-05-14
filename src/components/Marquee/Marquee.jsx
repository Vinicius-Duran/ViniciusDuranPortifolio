import React from 'react';
import './Marquee.css';

const Marquee = ({ items = [], speed = 30, className = '' }) => {
  const loop = [...items, ...items];

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
