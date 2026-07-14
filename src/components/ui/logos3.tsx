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
    <section className={`py-14 bg-slate-950 border-t border-slate-900/60 border-b border-slate-950 overflow-hidden relative ${className}`}>
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full flex flex-col items-center justify-center relative z-10"
      >
        <div className="container mx-auto flex flex-col items-center text-center px-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-500 mb-8">
            {heading}
          </h2>
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
                      <div className="inline-flex items-center gap-3 px-5 py-3 select-none rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] hover:scale-[1.03] transition-all duration-300 group cursor-pointer">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                          {logo.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors tracking-wide">
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
