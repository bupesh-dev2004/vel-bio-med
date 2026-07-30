import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src="/logo.png"
        alt="Vel Bio Med Logo"
        className="h-12 w-auto object-contain drop-shadow-sm"
      />
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight font-sans">
          VEL BIO <span className="text-sky-600">HEALTHCARE</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Medical Equipment & Solutions
        </span>
      </div>
    </div>
  );
}
