import React, { useState } from "react";
import { useAppState } from "../AppContext.js";
import {
  Maximize2, X, ChevronLeft, ChevronRight, ArrowRight, Zap, Play,
  LayoutGrid, Activity, Heart, ShieldCheck, Video, Eye, Info, Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GalleryView() {
  const { state, setCurrentTab, setInquiryMachineName } = useAppState();
  const galleryItems = state?.gallery || [];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Lightbox overlay state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Derive unique categories
  const categories = ["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))];

  // Helpers for category visual overhaul
  const getCategoryCount = (category: string) => {
    if (category === "All") return galleryItems.length;
    return galleryItems.filter((item) => item.category === category).length;
  };

  const getCategoryIcon = (category: string) => {
    const classVal = "w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110";
    switch (category) {
      case "All":
        return <LayoutGrid className={classVal} />;
      case "Operation Theatre Setup":
        return <Activity className={classVal} />;
      case "Critical Care":
        return <Heart className={classVal} />;
      case "Diagnostics":
        return <Eye className={classVal} />;
      case "Sterilization CSSD":
        return <ShieldCheck className={classVal} />;
      case "Video Testimonials":
        return <Video className={classVal} />;
      default:
        return <Info className={classVal} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  // Filter gallery list
  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1));
    }
  };

  const handleScrollToGrid = () => {
    const element = document.getElementById("portfolio-showcase");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Immersive Hero/Landing Section with Premium Background Image */}
      <div className="relative w-full min-h-[60vh] sm:min-h-[75vh] bg-slate-950 overflow-hidden flex flex-col items-center justify-center py-12 sm:py-20">
        {/* Background Image with elegant overlay */}
        <div
          className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/053/732/763/small/comfortable-patient-room-featuring-advanced-equipment-and-relaxing-bed-design-free-photo.jpg')] bg-cover bg-center opacity-30"
          aria-hidden="true"
        />
        {/* Top Gradient Overlay to blend with sticky navigation */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#081d38]/70 to-transparent pointer-events-none z-10" />

        {/* Bottom overlay blending into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />

        {/* Glow effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/50 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />

        <div className="relative z-10 text-center space-y-8 sm:space-y-12 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-amber-500/10 border border-blue-500/20 backdrop-blur-xl shadow-2xl"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 via-transparent to-amber-500/5 animate-pulse" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              <span className="relative z-10 text-xs font-black tracking-widest text-blue-400 uppercase">MEDIA PORTFOLIO</span>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping animation-delay-500" />
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.9] select-none text-white"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <span className="block font-light text-slate-300/85 mb-2 text-2xl md:text-3xl lg:text-4xl">
                  Visualizing
                </span>
                <span className="block relative">
                  <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-amber-500 bg-clip-text text-transparent font-black relative z-10">
                    Our Work
                  </span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-sky-400 to-amber-500 bg-clip-text text-transparent font-black blur-2xl opacity-50 scale-105"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Our Work
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                    className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-blue-500 via-sky-400 to-amber-500 rounded-full shadow-lg shadow-blue-500/50"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-3xl mx-auto space-y-4"
            >
              <p
                className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed font-semibold"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                A visual overview of real diagnostic setup deliveries, trauma clinics, and{" "}
                <span className="text-amber-500 font-extrabold">
                  intensive care installations
                </span>{" "}
                completed by our expert engineering crew.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center pt-4 w-full px-4 sm:px-0"
          >
            <motion.button
              onClick={handleScrollToGrid}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 25px rgba(56, 189, 248, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 text-white rounded-xl font-bold text-sm sm:text-base shadow-xl hover:shadow-blue-500/30 transition-all duration-500 overflow-hidden border border-blue-400/20 cursor-pointer w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative z-10 tracking-wide">Browse Gallery</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            <motion.button
              onClick={() => setCurrentTab("contact")}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "#f59e0b",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2), 0 0 15px rgba(245, 158, 11, 0.2)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-3 px-5 sm:px-8 py-3 sm:py-4 border-2 border-slate-700 rounded-xl font-bold text-sm sm:text-base text-white hover:border-amber-500 transition-all duration-500 backdrop-blur-xl bg-slate-900/60 hover:bg-slate-900/90 shadow-lg overflow-hidden cursor-pointer w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="relative z-10 w-5 h-5 text-amber-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <span className="relative z-10 tracking-wide">Contact Sourcing</span>
            </motion.button>
          </motion.div>
        </div>
      </div>



      {/* Filter tabs and masonry grid */}
      <section id="portfolio-showcase" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-t border-slate-100">
        {/* Ambient Decorative Elements */}
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Category Filter buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-16">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "group px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border flex items-center gap-2.5 active:scale-95",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 text-white border-transparent shadow-xl shadow-blue-500/25 scale-105"
                      : "bg-white text-slate-600 hover:text-blue-600 hover:bg-slate-50/80 border-slate-200/80 hover:border-slate-300"
                  )}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full font-black transition-colors duration-300",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                  )}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry image grid */}
          {filteredItems.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => {
                  const isAmber = idx % 2 === 1;
                  const isVideoCategory = item.category === "Video Testimonials" || Boolean(item.video);
                  const hasVideoUrl = Boolean(item.video && item.video.trim().length > 0);
                  const showVideoPlaceholder = isVideoCategory && (!hasVideoUrl || !item.image || item.image.trim().length === 0 || item.image.includes("gal-v"));

                  return (
                    <motion.div
                      layout
                      variants={cardVariants}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      key={item.id}
                      onClick={() => {
                        if (!showVideoPlaceholder) {
                          openLightbox(idx);
                        }
                      }}
                      className={cn(
                        "relative group rounded-[24px] z-10",
                        !showVideoPlaceholder ? "cursor-pointer" : "cursor-default"
                      )}
                    >
                      {/* Glowing shadow effect behind card on hover */}
                      <div
                        className={cn(
                          "absolute -inset-1 rounded-[24px] blur-xl opacity-0 group-hover:opacity-15 transition-all duration-500 -z-10",
                          isAmber ? "bg-amber-500" : "bg-blue-500"
                        )}
                      />

                      {/* Glowing outer border line inside card on hover */}
                      <div
                        className={cn(
                          "absolute inset-0 border-2 rounded-[24px] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-all duration-500",
                          isAmber ? "border-amber-400/50" : "border-blue-400/50"
                        )}
                      />

                      {/* Main card container */}
                      <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-slate-800 shadow-md group-hover:shadow-2xl transition-all duration-500 bg-slate-900">
                        {showVideoPlaceholder ? (
                          /* Clean Official YouTube SVG Logo Placeholder Card */
                          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center z-10">
                            {/* Media Tag Badge at top-right */}
                            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white shadow-md">
                              <Video className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Video</span>
                            </div>

                            {/* Centered Official YouTube SVG Icon */}
                            <div className="mb-3 transform group-hover:scale-110 transition-transform duration-500">
                              <svg className="w-16 h-16 drop-shadow-[0_4px_16px_rgba(255,0,0,0.4)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
                                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF"/>
                              </svg>
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                              Video Testimonial
                            </h3>
                            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-400">
                              Coming Soon
                            </span>

                            {/* Description */}
                            <p className="text-slate-400 text-xs mt-2.5 max-w-xs font-medium leading-relaxed">
                              Customer testimonial videos will be available here soon.
                            </p>
                          </div>
                        ) : (
                          /* Standard Clean Image Card / Active Video Preview */
                          <>
                            <img
                              src={item.image || `https://img.youtube.com/vi/${item.video?.split('/')?.pop()}/hqdefault.jpg`}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />

                            {/* Play Button Overlay for Active Videos */}
                            {hasVideoUrl && (
                              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                <div className={cn(
                                  "w-14 h-14 rounded-full flex items-center justify-center text-white backdrop-blur-md border shadow-lg transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12",
                                  isAmber
                                    ? "bg-amber-500/20 border-amber-400/40 shadow-amber-500/20 group-hover:bg-amber-500/40 group-hover:border-amber-400/60"
                                    : "bg-blue-600/20 border-blue-400/40 shadow-blue-600/20 group-hover:bg-blue-600/40 group-hover:border-blue-400/60"
                                )}>
                                  <Play className="w-6 h-6 fill-white ml-0.5" />
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-24 text-center border border-dashed border-slate-200 rounded-[24px] bg-slate-50">
              <p className="text-slate-400 text-sm font-medium">No portfolio assets found under this filtering selection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal Window */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close trigger button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-slate-900/50 hover:bg-amber-500 p-2 sm:p-2.5 rounded-full transition-all cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          {filteredItems.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-slate-900/50 hover:bg-blue-600 p-2 sm:p-3 rounded-full transition-all cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Inner Photo Display Container */}
          <div
            className="max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems[lightboxIndex].video ? (
              <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <iframe
                  src={`${filteredItems[lightboxIndex].video}?autoplay=1`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={filteredItems[lightboxIndex].title}
                />
              </div>
            ) : (
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            )}
          </div>

          {/* Right Arrow */}
          {filteredItems.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-slate-900/50 hover:bg-blue-600 p-2 sm:p-3 rounded-full transition-all cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
