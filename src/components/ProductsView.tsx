import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  MessageSquare,
  Star,
  ArrowUpRight,
  Check,
  X,
  ShieldAlert,
  Sparkles,
  ShieldCheck,
  Activity,
  Award,
  Cpu,
  Bookmark
} from "lucide-react";
import { useAppState } from "../AppContext.js";
import { Product } from "../types.js";
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";

interface ProductsViewProps {
  selectedProductModal: Product | null;
  onOpenProductModal: (p: Product) => void;
  onCloseProductModal: () => void;
}

export default function ProductsView({
  selectedProductModal,
  onOpenProductModal,
  onCloseProductModal,
}: ProductsViewProps) {
  const { 
    state, 
    setCurrentTab, 
    setInquiryMachineName, 
    inquiryMachineName,
    selectedCategory,
    setSelectedCategory
  } = useAppState();

  const productsList = state?.products || [];
  const categories = state?.categories || [];

  // Filter & Search states
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Local state for toggling product sheet tabs inside the modal
  const [activeModalTab, setActiveModalTab] = useState<"features" | "specs" | "desc">("desc");

  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 280,
        damping: 22,
      }
    }
  };

  // Filter calculations
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchText.toLowerCase()) ||
      p.category.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort calculations
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    return 0; // default order
  });

  const triggerInquiryFlow = (productName: string) => {
    setInquiryMachineName(productName);
    onCloseProductModal();
    setCurrentTab("contact");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search and Category filter banner with premium midnight-tech radial gradient and premium hospital background image */}
      <section className="bg-slate-950 text-white border-b border-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-2xl">
        {/* Background cover image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-55 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-slate-950/60 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/75 to-slate-950 pointer-events-none z-0" />

        {/* Glow rings */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial from-blue-600/10 via-blue-900/5 to-transparent rounded-full -mr-40 -mt-40 pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial from-amber-500/10 via-amber-650/5 to-transparent rounded-full -ml-20 -mb-20 pointer-events-none z-0" />

        {/* Abstract grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Header info */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.1
                  }
                }
              }}
              className="max-w-2xl"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="flex flex-wrap items-center gap-2 mb-3"
              >
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/25 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" /> Global Standard Inventory
                </span>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/25 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> ISO 13485 Certified
                </span>
              </motion.div>

              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-4"
              >
                Biomedical Equipment <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">Catalog</span>
              </motion.h1>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed max-w-xl"
              >
                Explore our world-class inventory of high-acuity ventilators, precise ECG monitors, surgical operating theatre setups, and certified CSSD sterilization suites.
              </motion.p>
            </motion.div>

            {/* In-tab search bar & high-tech statistics */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end w-full lg:w-auto">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search machines, specs, category..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500 focus:bg-slate-950 rounded-2xl py-4 pl-12 pr-4 text-xs focus:outline-none transition-all text-white font-medium shadow-inner placeholder:text-slate-500"
                />
                <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Live counter badges */}
              <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800/85 p-3 rounded-2xl backdrop-blur-md">
                <div className="text-center px-3 border-r border-slate-800">
                  <div className="text-base font-extrabold text-blue-400">21+</div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Units</div>
                </div>
                <div className="text-center px-3 border-r border-slate-800">
                  <div className="text-base font-extrabold text-amber-400">100%</div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Safety Compliance</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-base font-extrabold text-emerald-400">24/7</div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Tech Service</div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-900 my-8" />

          {/* Filtering Tools Layout */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category tags horizontal select */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${selectedCategory === "All"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-650 to-amber-500 text-white shadow-lg shadow-blue-500/10 scale-102"
                  : "bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800/60"
                  }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 via-indigo-650 to-amber-500 text-white shadow-lg shadow-blue-500/10 scale-102"
                    : "bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800/60"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sorting trigger select */}
            <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/80 px-4 py-2 rounded-xl">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-dropdown" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By:</label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs font-bold focus:outline-none text-white cursor-pointer pr-1"
              >
                <option value="default" className="bg-slate-900 text-white">Default Order</option>
                <option value="rating" className="bg-slate-900 text-white">Top Rated (Stars)</option>
                <option value="name-asc" className="bg-slate-900 text-white">Alphabetical (A - Z)</option>
                <option value="name-desc" className="bg-slate-900 text-white">Alphabetical (Z - A)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Display Section with subtle premium medical background */}
      <section className="py-14 relative overflow-hidden">
        {/* Hospital corridor watermark background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-[0.16] pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-400 text-xs sm:text-sm font-semibold mb-8 flex justify-between items-center bg-slate-100/60 p-4 rounded-xl border border-slate-200/50">
            <span>
              Showing <strong className="text-slate-800">{sortedProducts.length}</strong> certified machines matching requirements
            </span>
            {selectedCategory !== "All" && (
              <span className="text-xs bg-amber-500/10 text-amber-700 border border-amber-200/50 px-3 py-1 rounded-lg font-bold uppercase tracking-wider">
                {selectedCategory}
              </span>
            )}
          </div>

          <LayoutGroup>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
              initial={shouldAnimate ? "hidden" : "visible"}
              animate="visible"
              variants={cardContainerVariants}
            >
              {sortedProducts.length > 0 ? (
                sortedProducts.map((p, idx) => {
                  const isAmber = idx % 2 === 1;
                  return (
                    <motion.div
                      key={p.id}
                      layoutId={`product-${p.id}`}
                      className="bg-white border border-slate-200/60 overflow-hidden rounded-3xl shadow-sm hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:border-slate-350 transition-all duration-355 flex flex-col h-full group cursor-pointer"
                      variants={cardVariants}
                      whileHover={shouldAnimate ? {
                        y: -8,
                        scale: 1.015,
                        transition: { type: "spring" as const, stiffness: 400, damping: 25 }
                      } : {}}
                      onClick={() => onOpenProductModal(p)}
                    >
                      {/* Photo area with tag indicators */}
                      <motion.div
                        layoutId={`product-image-${p.id}`}
                        className="relative pt-[68%] overflow-hidden bg-slate-200"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Premium glassmorphic details overlay */}
                        <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                          <div className="p-3 bg-white/95 rounded-full shadow-lg text-blue-600 scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center mb-1">
                            <Eye className="w-5 h-5 animate-pulse" />
                          </div>
                          <span className="text-white text-[10px] font-black uppercase tracking-wider">Inspect Specs</span>
                        </div>

                        {/* Top indicators */}
                        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
                          {p.trending && (
                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-widest border border-amber-400/20">
                              TRENDING
                            </span>
                          )}
                          {p.newest && (
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-650 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-widest border border-blue-500/20">
                              NEW ARRIVAL
                            </span>
                          )}
                        </div>
                      </motion.div>

                      {/* Body textual information */}
                      <motion.div
                        layoutId={`product-content-${p.id}`}
                        className="p-6 flex flex-col flex-grow"
                      >
                        {/* Category Label */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <Bookmark className={`w-3.5 h-3.5 ${isAmber ? "text-amber-500" : "text-blue-600"}`} />
                          <span className={`text-[10px] font-bold tracking-widest uppercase block
                            ${isAmber ? "text-amber-500" : "text-blue-600"}
                          `}>
                            {p.category}
                          </span>
                        </div>

                        {/* Title */}
                        <motion.h3
                          layoutId={`product-title-${p.id}`}
                          className={`text-lg font-black text-slate-900 transition-colors mb-2 line-clamp-1
                            ${isAmber ? "group-hover:text-amber-500" : "group-hover:text-blue-600"}
                          `}
                        >
                          {p.name}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-grow font-medium">
                          {p.shortDesc}
                        </p>

                        {/* Info details pill */}
                        <div className="flex items-center justify-between mb-5 pt-3.5 border-t border-slate-100">
                          <div className="flex items-center gap-1 bg-amber-50/70 border border-amber-100/50 px-2.5 py-1 rounded-full">
                            <div className="flex text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.35)]">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < Math.floor(p.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200"
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-amber-700 font-extrabold ml-0.5">{p.rating}.0</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Certified Unit
                          </span>
                        </div>

                        {/* Interactive CTA */}
                        <div className="mt-auto pt-4 border-t border-slate-100/60">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerInquiryFlow(p.name);
                            }}
                            className={`w-full font-bold text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer text-white shadow-md hover:shadow-lg active:scale-[0.98]
                              ${isAmber
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-500/25"
                                : "bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-600/25"
                              }
                            `}
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Select Machine
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center border border-dashed border-slate-200 rounded-3xl bg-white max-w-lg mx-auto w-full px-6 flex flex-col items-center shadow-sm">
                  <ShieldAlert className="w-12 h-12 text-slate-350 mb-4 animate-bounce" />
                  <h3 className="text-lg font-black text-slate-800">No medical products found</h3>
                  <p className="text-slate-500 text-xs mt-2 text-center max-w-sm font-medium leading-relaxed">
                    We currently cannot find any machinery matching your filtering setup. Try searching a generic item parameter such as "Ventilator" or "GE".
                  </p>
                  <button
                    onClick={() => {
                      setSearchText("");
                      setSelectedCategory("All");
                    }}
                    className="bg-amber-50 text-amber-600 hover:bg-amber-100 font-black text-xs py-3 px-6 rounded-xl uppercase tracking-wider transition-all mt-4"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      {/* Product Information Modal Layout */}
      <AnimatePresence>
        {selectedProductModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseProductModal}
            />

            {/* Expanded Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 lg:p-12 z-55 overflow-y-auto">
              <motion.div
                layoutId={`product-${selectedProductModal.id}`}
                className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row border border-slate-150 z-56"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Cross button */}
                <button
                  onClick={onCloseProductModal}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-2 rounded-full transition-all z-20 cursor-pointer shadow-sm"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Image View */}
                <motion.div
                  layoutId={`product-image-${selectedProductModal.id}`}
                  className="w-full md:w-1/2 bg-slate-100 relative"
                >
                  <img
                    src={selectedProductModal.image}
                    alt={selectedProductModal.name}
                    className="w-full h-full object-cover min-h-[250px] md:min-h-full max-h-[350px] md:max-h-full"
                  />
                  {/* Visual clinical overlay tag inside modal */}
                  <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-slate-800 tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" /> Diagnostic Calibrated
                  </div>
                </motion.div>

                {/* Right Information Sheet */}
                <motion.div
                  layoutId={`product-content-${selectedProductModal.id}`}
                  className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto justify-between max-h-[50vh] md:max-h-none"
                >
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase block mb-1">
                      {selectedProductModal.category}
                    </span>
                    <motion.h2
                      layoutId={`product-title-${selectedProductModal.id}`}
                      className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight pr-8"
                    >
                      {selectedProductModal.name}
                    </motion.h2>

                    <div className="flex items-center gap-2 mt-2 mb-5">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(selectedProductModal.rating) ? "fill-amber-400" : "text-slate-350"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-bold">({selectedProductModal.rating}.0 Customer Stars)</span>
                    </div>

                    {/* Sub Tab selection triggers */}
                    <div className="flex border-b border-slate-200 mb-6 font-medium text-xs">
                      <button
                        onClick={() => setActiveModalTab("desc")}
                        className={`pb-2.5 pr-4 border-b-2 font-bold uppercase transition-all tracking-wider ${activeModalTab === "desc" ? "border-amber-500 text-amber-500" : "border-transparent text-slate-500 hover:text-slate-800"
                          }`}
                      >
                        About Unit
                      </button>
                      <button
                        onClick={() => setActiveModalTab("features")}
                        className={`pb-2.5 px-4 border-b-2 font-bold uppercase transition-all tracking-wider ${activeModalTab === "features" ? "border-amber-500 text-amber-500" : "border-transparent text-slate-500 hover:text-slate-800"
                          }`}
                      >
                        Key Features
                      </button>
                      <button
                        onClick={() => setActiveModalTab("specs")}
                        className={`pb-2.5 pl-4 border-b-2 font-bold uppercase transition-all tracking-wider ${activeModalTab === "specs" ? "border-amber-500 text-amber-500" : "border-transparent text-slate-500 hover:text-slate-800"
                          }`}
                      >
                        Specs Sheet
                      </button>
                    </div>

                    {/* Dynamic Content based on tab */}
                    <div className="min-h-[140px] text-xs sm:text-sm text-slate-655 leading-relaxed font-sans font-medium">
                      {activeModalTab === "desc" && (
                        <p className="whitespace-pre-line text-slate-600 font-medium">
                          {selectedProductModal.description}
                        </p>
                      )}

                      {activeModalTab === "features" && (
                        <ul className="space-y-2.5 text-slate-700">
                          {Boolean(selectedProductModal.features?.length) ? (
                            selectedProductModal.features.map((fea, index) => (
                              <li key={index} className="flex gap-2.5 items-start">
                                <div className="p-1 px-[5px] bg-amber-500 text-white rounded text-[8px] mt-0.5">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold">{fea}</span>
                              </li>
                            ))
                          ) : (
                            <p className="text-slate-400 font-medium">Features checklist under review by biomedical panels.</p>
                          )}
                        </ul>
                      )}

                      {activeModalTab === "specs" && (
                        <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50">
                          {Boolean(Object.keys(selectedProductModal.specifications || {}).length) ? (
                            <table className="w-full text-xs text-left divide-y divide-slate-150">
                              <tbody>
                                {Object.entries(selectedProductModal.specifications).map(([key, val]) => (
                                  <tr key={key} className="even:bg-white divide-x divide-slate-150 font-medium">
                                    <td className="py-2.5 px-3 font-semibold text-slate-700 bg-slate-50/50 w-2/5">
                                      {key}
                                    </td>
                                    <td className="py-2.5 px-3 text-slate-600 truncate max-w-[150px] font-semibold">
                                      {val}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="p-4 text-xs text-slate-400 text-center font-medium">Specifications sheet being updated by engineers.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Core CTA */}
                  <div className="pt-6 border-t border-slate-200 mt-6 flex justify-end">
                    <button
                      onClick={() => triggerInquiryFlow(selectedProductModal.name)}
                      className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm py-3.5 px-8 rounded-xl shadow-lg transition-transform flex items-center gap-1.5 uppercase tracking-wide cursor-pointer"
                    >
                      Confirm & Inquire Machine <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
