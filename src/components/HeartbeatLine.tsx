import React from 'react';

export default function HeartbeatLine() {
  return (
    <div className="heartbeat-line-wrapper flex items-center justify-center">
      <svg
        viewBox="0 0 160 36"
        className="w-28 h-7 text-sky-500 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 0,18 L 30,18 L 40,8 L 48,28 L 60,2 L 72,34 L 80,18 L 90,18 L 98,12 L 106,24 L 114,18 L 160,18"
          className="heartbeat-pulse-path"
        />
      </svg>
    </div>
  );
}
