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
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 w-full items-center"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="group p-5 sm:p-8 md:p-8 rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-900/5 max-w-[320px] sm:max-w-xs md:max-w-[340px] w-full mx-auto bg-white text-slate-800 transition-all duration-300 flex flex-col justify-between md:hover:-translate-y-2 md:hover:scale-[1.025] md:hover:border-blue-300 md:hover:shadow-2xl md:hover:shadow-blue-500/15 md:hover:bg-gradient-to-br md:hover:from-blue-50/50 md:hover:via-white md:hover:to-sky-50/50 cursor-pointer" key={i}>
                  <div className="text-xs sm:text-sm text-slate-650 leading-relaxed font-medium">{text}</div>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 md:group-hover:border-blue-100 transition-colors duration-200">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-200 shadow-xs md:group-hover:border-blue-500 md:group-hover:scale-110 md:group-hover:ring-2 md:group-hover:ring-blue-400/30 transition-all duration-300"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight leading-snug truncate md:group-hover:text-blue-600 transition-colors duration-200">{name}</div>
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
