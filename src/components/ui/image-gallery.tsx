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
  const baseItems = dbGallery.length > 0
    ? dbGallery.map((item: any) => ({
        src: item.image,
        title: item.title,
        category: item.category
      }))
    : medicalImages;

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

  const displayImages = Array.from({ length: 10 }).map((_, idx) => {
    const item = baseItems[idx % baseItems.length];
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
                  alt={image.title}
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
