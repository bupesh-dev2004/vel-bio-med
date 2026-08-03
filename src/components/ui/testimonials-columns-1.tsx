"use client";
import React from "react";

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
  const duration = props.duration || 20;

  return (
    <div className={`w-full flex justify-center shrink-0 overflow-hidden ${props.className || ""}`}>
      <style>{`
        @keyframes testimonial-scroll-up {
          0% {
            transform: translate3d(0, 0%, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }

        .animate-testimonial-scroll {
          animation: testimonial-scroll-up var(--scroll-duration, 15s) linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .animate-testimonial-scroll.paused {
          animation-play-state: paused !important;
        }
      `}</style>
      <div
        style={{ "--scroll-duration": `${duration}s` } as React.CSSProperties}
        className={`flex flex-col gap-6 pb-6 w-full items-center animate-testimonial-scroll ${props.isPaused ? "paused" : ""}`}
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

            {/* 2. Hospital Name (Bottom) */}
            {item.hospital && (
              <div className="pt-4 border-t border-slate-100 flex flex-col text-left mt-auto">
                <div className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-200">
                  {item.hospital}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
