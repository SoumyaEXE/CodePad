import React, { useState, useEffect } from 'react';

export default function Preloader({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Let the animation play ~2 full loops (3s each = 6s), then fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 5500);
    const removeTimer = setTimeout(() => {
      setHidden(true);
      onFinish?.();
    }, 6200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div className={`preloader-overlay${fadeOut ? ' preloader-fade-out' : ''}`}>
      <div className="preloader-scene">
        {/* Phase 1: blinking dot + code braces */}
        <div className="pre-ph1">
          <div className="pre-dot" />
          <div className="pre-braces">{'{}'}</div>
        </div>

        {/* Phase 2: laptop open/close */}
        <div className="pre-ph2">
          <div className="pre-base" />
          <svg className="pre-lid" viewBox="0 0 42 30" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 1H5C2.78 1 1 2.78 1 5V25a4 4 90 004 4H37a4 4 90 004-4V5c0-2.22-1.8-4-4-4H21"
              pathLength={100}
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
            />
          </svg>
        </div>

        {/* Phase 3: morphing icon */}
        <div className="pre-orb" />

        {/* Brand name */}
        <div className="pre-brand">
          <span className="pre-brand-w">Code</span><span className="pre-brand-a">Pad</span>
        </div>
      </div>
    </div>
  );
}
