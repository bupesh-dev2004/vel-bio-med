"use client";

import React from "react";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { motion } from "framer-motion";

interface Logo {
  id: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [],
  className = "",
}: Logos3Props) => {
  return (
    <section className={`py-14 bg-gradient-to-r from-blue-50/90 via-slate-50/70 to-amber-50/80 border-t border-blue-100/80 border-b border-amber-100/60 overflow-hidden relative ${className}`}>
      {/* Soft Ambient Background Glow Orbs (Blue + Orange/Amber) */}
      <div className="absolute -top-20 -left-20 w-full max-w-[500px] aspect-square rounded-full bg-gradient-to-br from-blue-400/20 via-sky-300/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-full max-w-[500px] aspect-square rounded-full bg-gradient-to-tl from-amber-400/20 via-orange-300/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[180px] bg-gradient-to-r from-blue-200/20 via-sky-100/10 to-amber-200/20 blur-2xl pointer-events-none" />

      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full flex flex-col items-center justify-center relative z-10"
      >
        <div className="container mx-auto flex flex-col items-center text-center px-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50/95 via-white to-amber-50/95 border border-blue-200/80 font-black tracking-widest text-[11px] uppercase mb-8 shadow-xs text-slate-800">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-amber-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 bg-clip-text text-transparent">{heading}</span>
          </span>
        </div>
        <div className="relative mx-auto flex items-center justify-center max-w-7xl w-full px-4">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1.2, stopOnInteraction: false, stopOnMouseEnter: false })]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="mx-4 flex shrink-0 items-center justify-center">
                    {logo.image ? (
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    ) : (
                      <div className="inline-flex items-center gap-3.5 px-5 py-3.5 select-none rounded-2xl border border-blue-200/70 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:border-amber-400 hover:bg-white hover:shadow-[0_10px_25px_rgba(245,158,11,0.15)] hover:scale-[1.03] transition-all duration-300 group cursor-pointer">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200/90 flex items-center justify-center text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-300 shadow-xs">
                          {logo.icon}
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-900 transition-colors tracking-wide">
                          {logo.description}
                        </span>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.div>
    </section>
  );
};

export { Logos3 };
export type { Logo, Logos3Props };
