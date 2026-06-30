import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "../../AppContext.js";
import { ArrowRight } from "lucide-react";

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

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

export default function ImageGallery() {
  const { state, setCurrentTab } = useAppState();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const dbGallery = state?.gallery || [];

  // Normalize items from state.gallery, fallback to medicalImages if empty
  const displayItems: GalleryItem[] = dbGallery.length > 0
    ? dbGallery.slice(0, 6).map((item: any) => ({
      src: item.image,
      title: item.title,
      category: item.category,
      description: item.video
        ? "Interactive video walkthrough and clinical customer feedback for this modular installation setup."
        : `Professional real-world clinical sizing and installation of ${item.title} under category ${item.category} by Vel Bio Med.`,
      objectFit: "cover" as const
    }))
    : medicalImages;

  return (
    <>
      <section className="w-full flex flex-col items-center justify-start py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden border-y border-slate-950">
        {/* Ambient Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-radial from-blue-600/8 via-transparent to-transparent rounded-full pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-radial from-amber-500/4 via-transparent to-transparent rounded-full pointer-events-none blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-radial from-indigo-500/5 via-transparent to-transparent rounded-full pointer-events-none blur-3xl" />

        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col items-center justify-start relative z-10"
        >
          <div className="max-w-4xl text-center px-6 mb-12 relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4 shadow-lg shadow-blue-500/10">
              State of the Art Solutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Our Professional <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-5 rounded-full" />
            <p className="text-slate-400 text-sm md:text-base mt-4 font-medium max-w-2xl mx-auto leading-relaxed">
              Take a visual tour of real ICU setups, certified operating theatres, and high-performance diagnostic imaging suites installed and configured by our engineers.
            </p>
          </div>

          {/* Dynamic Accordion Gallery */}
          <div className="flex flex-col lg:flex-row items-center gap-3 h-auto lg:h-[450px] w-full max-w-6xl mt-2 px-6">
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  "relative group flex-grow transition-[flex-grow,border-color,box-shadow] duration-700 ease-out rounded-[24px] overflow-hidden shadow-xl border cursor-pointer w-full lg:w-28 h-[250px] lg:h-full [backface-visibility:hidden] transform-gpu",
                  hoveredIdx === idx
                    ? "lg:flex-[3.5] shadow-blue-500/5"
                    : "lg:flex-[1] shadow-black/40",
                  hoveredIdx === idx
                    ? (idx % 2 === 0 ? "border-blue-500/40" : "border-amber-500/40")
                    : "border-slate-800/80 hover:border-slate-700/80"
                )}
              >
                {/* Image with zoom on hover */}
                <img
                  className={cn(
                    "h-full w-full transition-transform duration-1000 ease-out group-hover:scale-105",
                    item.objectFit === "contain"
                      ? "object-contain p-6 bg-white"
                      : "object-cover object-center bg-slate-900"
                  )}
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                />

                {/* Gradient Overlay for text contrast */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t to-transparent transition-all duration-500 z-10",
                    hoveredIdx === idx
                      ? "from-slate-950 via-slate-950/40 opacity-95"
                      : "from-slate-950 via-slate-950/20 opacity-80"
                  )}
                />

                {/* Top Accent Gradient Border */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-1 transition-all duration-500 z-20",
                    idx % 2 === 0
                      ? "bg-gradient-to-r from-blue-500 via-sky-400 to-transparent"
                      : "bg-gradient-to-r from-amber-500 via-orange-400 to-transparent"
                  )}
                />

                {/* Text content card details */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end min-h-[120px] text-white z-20">
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

          {/* View Full Gallery Button */}
          <div className="mt-12 flex justify-center relative z-10">
            <button
              onClick={() => setCurrentTab("gallery")}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-slate-900/80 hover:bg-slate-955 text-slate-100 hover:text-white border border-slate-800 hover:border-blue-500/40 rounded-xl shadow-lg hover:shadow-blue-500/5 hover:scale-102 transition-all duration-300 uppercase tracking-wider font-extrabold text-[11px] cursor-pointer"
            >
              <span>View Full Gallery Section</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-sky-400" />
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
