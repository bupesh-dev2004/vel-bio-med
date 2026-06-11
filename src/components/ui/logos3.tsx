"use client";

import React from "react";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Astro",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto filter invert opacity-80",
    },
    {
      id: "logo-2",
      description: "Figma",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
      className: "h-7 w-auto filter invert opacity-80",
    },
    {
      id: "logo-3",
      description: "Next.js",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
      className: "h-7 w-auto filter invert opacity-80",
    },
    {
      id: "logo-4",
      description: "React",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg",
      className: "h-7 w-auto filter invert opacity-80",
    },
    {
      id: "logo-5",
      description: "shadcn/ui",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
      className: "h-7 w-auto filter invert opacity-80",
    },
    {
      id: "logo-6",
      description: "Supabase",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
      className: "h-7 w-auto filter invert opacity-80",
    },
    {
      id: "logo-7",
      description: "Tailwind CSS",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
      className: "h-4 w-auto filter invert opacity-80",
    },
    {
      id: "logo-8",
      description: "Vercel",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
      className: "h-7 w-auto filter invert opacity-80",
    },
  ],
  className = "",
}: Logos3Props) => {
  return (
    <section className={`py-14 bg-slate-950 border-t border-slate-800/60 border-b border-slate-950 overflow-hidden relative ${className}`}>
      <div className="container flex flex-col items-center text-center px-4">
        <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-500 mb-8">
          {heading}
        </h2>
      </div>
      <div className="relative mx-auto flex items-center justify-center max-w-7xl">
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
        <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-slate-950 via-slate-950/75 to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export { Logos3 };
export type { Logo, Logos3Props };
