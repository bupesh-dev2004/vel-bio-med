import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
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

const ALL_GALLERY_IMAGES = [
  { id: "gal-1", src: "/images/gal-1.jpeg", title: "Surgical Suite Live Installation", category: "Operation Theatre Setup" },
  { id: "gal-2", src: "/images/gal-2.jpeg", title: "ICU Patient Monitor Setup", category: "Critical Care" },
  { id: "gal-3", src: "/images/gal-3.jpeg", title: "Diagnostic Radiology Console Calibration", category: "Diagnostics" },
  { id: "gal-4", src: "/images/gal-4.jpeg", title: "Belimed CSSD Autoclave Training Session", category: "Sterilization CSSD" },
  { id: "gal-5", src: "/images/gal-5.jpeg", title: "Multidisciplinary Trauma Center Integration", category: "Operation Theatre Setup" },
  { id: "gal-6", src: "/images/gal-6.jpeg", title: "Anaesthesia Setup & Delivery", category: "Operation Theatre Setup" },
  { id: "gal-7", src: "/images/gal-7.jpeg", title: "Infusion & Syringe Pump Station", category: "Critical Care" },
  { id: "gal-8", src: "/images/gal-8.jpeg", title: "Operating Theatre LED Illumination Suite", category: "Operation Theatre Setup" },
  { id: "gal-9", src: "/images/gal-9.jpeg", title: "Neonatal Radiant Warmer Installation", category: "Critical Care" },
  { id: "gal-10", src: "/images/gal10.jpeg", title: "Digital ECG Diagnostic Station", category: "Diagnostics" },
  { id: "gal-11", src: "/images/gal-11.jpeg", title: "Emergency Crash Cart Supply Unit", category: "Critical Care" },
  { id: "gal-12", src: "/images/gal-12.jpeg", title: "Modular OT Panel Infrastructure", category: "Operation Theatre Setup" },
  { id: "gal-13", src: "/images/gal-13.jpeg", title: "High-Vacuum Surgical Suction Unit", category: "Operation Theatre Setup" },
  { id: "gal-14", src: "/images/gal-14.jpeg", title: "Portable Fetal Monitor Diagnostics", category: "Diagnostics" },
  { id: "gal-15", src: "/images/gal-15.jpeg", title: "Motorized ICU Cot & Bedside Ward Furniture", category: "Critical Care" },
  { id: "gal-16", src: "/images/gal-16.jpeg", title: "Low-Temperature ETO Sterilizer Setup", category: "Sterilization CSSD" },
  { id: "gal-17", src: "/images/gal-17.jpeg", title: "Electro-Hydraulic OT Table Integration", category: "Operation Theatre Setup" },
  { id: "gal-18", src: "/images/gal-18.jpeg", title: "Biphasic Cardiac Defibrillator Unit", category: "Critical Care" },
  { id: "gal-19", src: "/images/gal-19.jpeg", title: "Turbine Critical Care Ventilator", category: "Critical Care" },
  { id: "gal-20", src: "/images/gal-20.jpeg", title: "Neonatal Phototherapy Unit", category: "Critical Care" }
];

function getRandomTenImages(pool: typeof ALL_GALLERY_IMAGES) {
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 10);
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
};

export default function ImageGallery() {
  const { state, setCurrentTab } = useAppState();
  const [show, setShow] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
  
  const dbGallery = state?.gallery || [];
  const galleryImagePool = dbGallery.length >= 20
    ? dbGallery
        .filter((item: any) => !item.video && item.image)
        .map((item: any) => ({
          id: item.id,
          src: item.image,
          title: item.title,
          category: item.category
        }))
    : ALL_GALLERY_IMAGES;

  const pool = galleryImagePool.length >= 10 ? galleryImagePool : ALL_GALLERY_IMAGES;
  const [selectedTen, setSelectedTen] = useState<typeof ALL_GALLERY_IMAGES>(() => getRandomTenImages(pool));

  useEffect(() => {
    setSelectedTen(getRandomTenImages(pool));
  }, []);

  const gridClasses = [
    "block relative bg-slate-900 w-full h-24 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 row-span-2 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 col-span-2 row-span-2 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 row-span-2 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 w-full h-24 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 row-span-2 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 col-span-2 row-span-2 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 row-span-2 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300",
    "block relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md group hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300"
  ];

  const displayImages = selectedTen.map((item, idx) => {
    return {
      thumb: item.src,
      full: item.src,
      title: item.title,
      category: item.category,
      className: gridClasses[idx]
    };
  });

  const open = (url: string) => {
    setActiveImageUrl(url);
    setShow(true);
  };

  const close = () => {
    setShow(false);
    setTimeout(() => {
      setActiveImageUrl(null);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

          {/* Dynamic Grid Gallery */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            className="mt-6 max-w-4xl w-full mx-auto grid gap-3 grid-cols-4 grid-rows-5 px-6 h-[600px]"
          >
            {displayImages.map((image, index) => (
              <motion.a
                variants={fadeUpVariants}
                key={index}
                href={image.full}
                onClick={(e) => {
                  e.preventDefault();
                  open(image.full);
                }}
                className={image.className}
              >
                <img
                  src={image.thumb}
                  alt={image.title || `Gallery showcase image ${index + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </motion.a>
            ))}
          </motion.div>
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

      {/* Lightbox Modal */}
      {show && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 transition-opacity duration-300 animate-fade-in cursor-zoom-out"
        >
          <img
            src={activeImageUrl ?? ""}
            alt="Enlarged gallery view"
            className="max-w-[90%] max-h-[90%] object-contain object-center rounded-lg shadow-2xl transition-all duration-300"
          />
        </div>
      )}
    </>
  );
}
