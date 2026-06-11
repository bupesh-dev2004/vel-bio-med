import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  src: string;
  title: string;
  category: string;
  description?: string;
  objectFit?: "cover" | "contain";
}

const medicalImages: GalleryItem[] = [
  {
    src: "https://storage.googleapis.com/avante/images/13448-1-drager-fabius-os.jpg",
    title: "ANAESTHESIA MACHINE",
    category: "Operating Theatre (OT)",
    description: "Advanced anaesthesia delivery system engineered for precise gas administration, patient safety, and reliable performance during surgical procedures",
    objectFit: "contain"
  },
  {
    src: "https://5.imimg.com/data5/HD/TV/MY-9082765/diathermy-machine-500x500.png",
    title: "SURGICAL DIATHERMY",
    category: "Operating Theatre (OT)",
    description: "Surgical Diathermy: Advanced electrosurgical system designed for precise cutting, coagulation, and tissue management during surgical procedures, ensuring enhanced surgical efficiency and patient safety.",
    objectFit: "contain"
  },
  {
    src: "https://static.wixstatic.com/media/83a223_539cedb9b63e44689f4d77bb420fa4c0~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/83a223_539cedb9b63e44689f4d77bb420fa4c0~mv2.jpg",
    title: "ECG MACHINE 3 CHANNEL",
    category: "Critical Care & ICU",
    description: "Compact and efficient electrocardiography system designed for accurate cardiac monitoring, rapid diagnostics, and dependable clinical performance.",
    objectFit: "contain"
  },
  {
    src: "https://5.imimg.com/data5/SELLER/Default/2024/6/428020518/CO/WP/OU/45018337/horizontal-semi-automatic-single-door-cylindrical-steam-sterilizer-1000x1000.png",
    title: "STEAM STERILIZER AUTO/SEMI",
    category: "CSSD & Sterilization",
    description: "Advanced steam sterilization system designed for reliable and efficient infection control in hospitals, laboratories, and healthcare facilities.",
    objectFit: "contain"
  },
  {
    src: "https://meubon.com/cdn/shop/files/H490d3b68175b40a79e001740ba0454deq_1200x1200.webp?v=1731630708",
    title: "FETAL MONITOR PORTABLE",
    category: "Diagnostics & Imaging",
    description: "Fetal Monitor – Portable: Advanced portable fetal monitoring system designed for accurate assessment of fetal heart rate, uterine activity, and maternal well-being during pregnancy and labor.",
    objectFit: "contain"
  },
  {
    src: "https://ventekindia.com/wp-content/uploads/2024/09/electra-4001.png",
    title: "OT TABLE ELECTRIC",
    category: "Operating Theatre (OT)",
    description: "OT Table – Electric: Advanced electrically operated surgical table designed to provide precise positioning, stability, and flexibility for a wide range of surgical procedures, ensuring optimal patient care and surgical efficiency.",
    objectFit: "contain"
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
        <div className="flex flex-col lg:flex-row items-center gap-3 h-auto lg:h-[450px] w-full max-w-6xl mt-2 px-6">
          {medicalImages.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={cn(
                "relative group flex-grow transition-all duration-700 ease-out rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/60 cursor-pointer w-full lg:w-28 h-[250px] lg:h-full",
                hoveredIdx === idx ? "lg:flex-[3.5]" : "lg:flex-[1]"
              )}
            >
              {/* Image with zoom on hover */}
              <img
                className={cn(
                  "h-full w-full transition-transform duration-1000 ease-out group-hover:scale-105",
                  item.objectFit === "contain"
                    ? "object-contain p-6 bg-white"
                    : "object-cover object-center"
                )}
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
                    {item.description || "Delivered, calibrated, and maintained to the highest clinical parameters by Vel Bio Med."}
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
