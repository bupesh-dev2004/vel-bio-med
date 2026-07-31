"use client";
import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={`w-full md:w-[320px] lg:w-[340px] flex justify-center shrink-0 ${props.className || ""}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 12,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
        className="transform-gpu flex flex-col gap-6 pb-6 w-full items-center"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div className="group p-6 sm:p-7 md:p-8 rounded-[28px] border border-slate-300/90 shadow-md shadow-slate-900/5 max-w-[320px] sm:max-w-xs md:max-w-[340px] w-full mx-auto bg-white text-slate-800 transition-all duration-300 flex flex-col justify-between md:hover:-translate-y-2 md:hover:scale-[1.02] md:hover:border-blue-400 md:hover:shadow-2xl md:hover:shadow-blue-500/10 cursor-pointer" key={i}>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{text}</div>
                  <div className="flex items-center gap-3.5 mt-5">
                    <div className="flex flex-col min-w-0">
                      <div className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight leading-snug truncate md:group-hover:text-blue-600 transition-colors duration-200">{name}</div>
                      {role && <div className="text-[10.5px] sm:text-xs font-medium text-slate-500 tracking-tight truncate">{role}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
