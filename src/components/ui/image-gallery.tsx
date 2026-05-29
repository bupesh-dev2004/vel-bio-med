import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  src: string;
  title: string;
  category: string;
}

const medicalImages: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
    title: "GE Voluson E10 Ultrasound",
    category: "Diagnostics & Imaging"
  },
  {
    src: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=1000&q=80",
    title: "Dräger Primus Anesthesia Station",
    category: "Operating Theatre (OT)"
  },
  {
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80",
    title: "Philips IntelliVue MX450",
    category: "Critical Care & ICU"
  },
  {
    src: "https://images.unsplash.com/photo-1584036561566-baf245fdb76f?auto=format&fit=crop&w=1000&q=80",
    title: "AeroMed Ventilator Pro-7",
    category: "Critical Care & ICU"
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
    title: "Belimed MST-V Autoclave",
    category: "CSSD & Sterilization"
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    title: "Olympus EVIS EXERA Video Scope",
    category: "Operating Theatre (OT)"
  }
];

export default function ImageGallery() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <>
      <section className="w-full flex flex-col items-center justify-start py-20 bg-slate-50 relative overflow-hidden border-y border-slate-100">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl text-center px-6 mb-12">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 font-bold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4 border border-blue-100/80">
            State of the Art Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Latest <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Acquisitions</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 text-sm md:text-base mt-4 font-medium max-w-2xl mx-auto leading-relaxed">
            High acuity bedside systems, multi-frequency digital ultrasound machinery, and specialized operational setups from certified global healthcare leaders.
          </p>
        </div>

        {/* Dynamic Accordion Gallery */}
        <div className="flex flex-col md:flex-row items-center gap-3 h-auto md:h-[450px] w-full max-w-6xl mt-2 px-6">
          {medicalImages.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={cn(
                "relative group flex-grow transition-all duration-700 ease-out rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/60 cursor-pointer w-full md:w-28 h-[250px] md:h-full",
                hoveredIdx === idx ? "md:flex-[3.5]" : "md:flex-[1]"
              )}
            >
              {/* Image with zoom on hover */}
              <img
                className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                src={item.src}
                alt={item.title}
                loading="lazy"
              />

              {/* Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Left-Border accent highlight matching logo brand colors */}
              <div 
                className={cn(
                  "absolute top-0 left-0 w-1.5 h-full transition-all duration-500",
                  idx % 2 === 0 ? "bg-blue-500" : "bg-amber-500"
                )} 
              />

              {/* Text content card details */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end min-h-[120px] text-white">
                <span 
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-all duration-500 mb-1.5 block",
                    idx % 2 === 0 ? "text-sky-300" : "text-amber-400"
                  )}
                >
                  {item.category}
                </span>

                {/* Title changes structure when active/hovered */}
                <h3 className="text-base md:text-lg font-bold tracking-tight text-white line-clamp-1 leading-snug">
                  {item.title}
                </h3>

                {/* Subtitle description revealed smoothly on accordion expand */}
                <div 
                  className={cn(
                    "grid transition-all duration-700 ease-out opacity-0",
                    hoveredIdx === idx ? "grid-rows-[1fr] opacity-100 mt-2.5" : "grid-rows-[0fr]"
                  )}
                >
                  <p className="text-xs text-slate-300 font-medium leading-relaxed overflow-hidden">
                    Delivered, calibrated, and maintained to the highest clinical parameters by Vel Bio Med.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
