"use client";
import React from "react";
import { motion } from "framer-motion";

export interface TestimonialItem {
  id?: string;
  reviewText: string;
  name: string;
  specialization?: string;
  hospital?: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
  isPaused?: boolean;
}) => {
  const duration = props.duration || 35;

  return (
    <div className={`w-full flex justify-center shrink-0 overflow-hidden ${props.className || ""}`}>
      <motion.div
        animate={{
          translateY: ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          willChange: "transform",
        }}
        animate-state={props.isPaused ? "paused" : "running"}
        className={`flex flex-col gap-6 pb-6 w-full items-center ${props.isPaused ? "[animation-play-state:paused]" : ""}`}
      >
        {[...props.testimonials, ...props.testimonials].map((item, i) => (
          <div
            key={`${item.id || i}-${i}`}
            className="group p-6 sm:p-7 md:p-8 rounded-[28px] border border-slate-300/90 shadow-md shadow-slate-900/5 w-full bg-white text-slate-800 transition-all duration-300 flex flex-col justify-between min-h-[260px] sm:min-h-[270px] md:min-h-[280px] hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
          >
            {/* 1. Review Description (Top) */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium text-left">
              "{item.reviewText}"
            </div>

            {/* 2. Doctor Details (Bottom) */}
            <div className="pt-4 border-t border-slate-100 flex flex-col text-left mt-auto">
              <div className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-200">
                {item.name}
              </div>
              {item.specialization && (
                <div className="text-xs font-semibold text-blue-600 tracking-wide mt-0.5">
                  {item.specialization}
                </div>
              )}
              {item.hospital && (
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 tracking-tight mt-0.5">
                  {item.hospital}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
