import React, { useState } from "react";
import { useAppState } from "../AppContext.js";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryView() {
  const { state } = useAppState();
  const galleryItems = state?.gallery || [];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Lightbox overlay state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Derive unique categories
  const categories = ["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))];

  // Filter gallery list
  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (idx: number) => {
    // Find absolute index inside filtered items
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

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Upper header banner */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584515901367-f1c21b29f30a?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-4">
          <span className="text-blue-500 font-black tracking-widest text-xs uppercase block font-sans">Media Portfolio</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">On-Site Installations Gallery</h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
            A visual overview of real diagnostic setup deliveries, trauma clinics, and intensive care installations completed by our expert engineering crew.
          </p>
        </div>
      </section>

      {/* Filter tabs and masonry grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry image grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/85 transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div className="relative pt-[70%] bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="flex items-center gap-2 text-white">
                        <Maximize2 className="w-5 h-5 text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">Expand Photo</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-grow">
                    <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <p className="text-slate-400 text-sm">No portfolio assets found under this filtering selection.</p>
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
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-slate-900/50 hover:bg-blue-600 p-2.5 rounded-full transition-all cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          {filteredItems.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-slate-900/50 hover:bg-blue-600 p-3 rounded-full transition-all cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Inner Photo Display Container */}
          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="text-center mt-5 space-y-2">
              <span className="inline-block bg-blue-600/95 text-white text-[10px] sm:text-xs font-black tracking-widest px-3 py-1.5 rounded-full uppercase">
                {filteredItems[lightboxIndex].category}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                {filteredItems[lightboxIndex].title}
              </h2>
            </div>
          </div>

          {/* Right Arrow */}
          {filteredItems.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-slate-900/50 hover:bg-blue-600 p-3 rounded-full transition-all cursor-pointer"
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
