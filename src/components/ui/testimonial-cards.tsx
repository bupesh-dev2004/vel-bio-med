"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  id: number;
  author: string;
}

export function TestimonialCard({ handleShuffle, testimonial, position, id, author }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const getPositionStyles = () => {
    switch (position) {
      case "front":
        return { rotate: "-6deg", x: "0%", zIndex: 3, opacity: 1, scale: 1 };
      case "middle":
        return { rotate: "0deg", x: "25%", zIndex: 2, opacity: 0.9, scale: 0.95 };
      case "back":
        return { rotate: "6deg", x: "50%", zIndex: 1, opacity: 0.75, scale: 0.9 };
      case "far-back":
        return { rotate: "10deg", x: "75%", zIndex: 0, opacity: 0.5, scale: 0.85 };
      default:
        return { rotate: "12deg", x: "100%", zIndex: -1, opacity: 0, scale: 0.8 };
    }
  };

  const posStyles = getPositionStyles();

  return (
    <motion.div
      style={{
        zIndex: posStyles.zIndex
      }}
      animate={{
        rotate: posStyles.rotate,
        x: posStyles.x,
        scale: posStyles.scale,
        opacity: posStyles.opacity
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        const clientX = 'clientX' in e ? e.clientX : (e as any).touches?.[0]?.clientX || 0;
        dragRef.current = clientX;
      }}
      onDragEnd={(e) => {
        const clientX = 'clientX' in e ? e.clientX : (e as any).changedTouches?.[0]?.clientX || 0;
        if (dragRef.current - clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[400px] w-[300px] sm:h-[450px] sm:w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <span className="text-center text-lg italic text-slate-400">"{testimonial}"</span>
      <span className="text-center text-sm font-medium text-indigo-400">{author}</span>
    </motion.div>
  );
}
