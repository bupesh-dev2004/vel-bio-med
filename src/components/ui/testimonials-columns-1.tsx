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
    <div className={`w-full flex justify-center ${props.className || ""}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-5 sm:p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-900/5 max-w-[320px] sm:max-w-xs w-full mx-auto bg-white text-slate-800 transition-all duration-300" key={i}>
                  <div className="text-xs sm:text-sm text-slate-650 leading-relaxed font-medium">{text}</div>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-200 shadow-xs"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight leading-snug truncate">{name}</div>
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-tight truncate">{role}</div>
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
