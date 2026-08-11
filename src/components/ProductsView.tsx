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
  Bookmark,
  ChevronDown,
  LayoutGrid
} from "lucide-react";
import { useAppState } from "../AppContext.js";
import { Product } from "../types.js";
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import Pagination from "./ui/Pagination.js";

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
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useAppState();

  const productsList = state?.products || [];
  const categories = state?.categories || [];

  // Filter & Search states
  // Managed globally via AppContext (searchQuery)
  const [sortBy, setSortBy] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);

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
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  // Filter calculations
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

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

  // Pagination calculation
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("products-catalog-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const triggerInquiryFlow = (productName: string) => {
    setInquiryMachineName(productName);
    onCloseProductModal();
    setCurrentTab("contact");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-slate-50 min-h-screen"
    >
      {/* Search and Category filter banner with premium midnight-tech radial gradient and premium hospital background image */}
      <section className="bg-slate-950 text-white border-b border-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative shadow-2xl">
        {/* Background decorative wrapper to isolate overflow hiding to background elements only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Background cover image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-55 pointer-events-none" />
          <div className="absolute inset-0 bg-slate-955/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-955/75 to-slate-950 pointer-events-none" />

          {/* Glow rings */}
          <div className="absolute top-0 right-0 w-full max-w-[500px] aspect-square bg-radial from-blue-600/10 via-blue-900/5 to-transparent rounded-full -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full max-w-[500px] aspect-square bg-radial from-amber-500/10 via-amber-650/5 to-transparent rounded-full -ml-20 -mb-20 pointer-events-none" />

          {/* Abstract grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        </div>

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
                Explore our world-class inventory of high-acuity ventilators, precise ECG monitors, modular OT setups, and certified CSSD sterilization suites.
              </motion.p>
            </motion.div>

            {/* In-tab search bar & high-tech statistics */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end w-full lg:w-auto">
              <div className="relative w-full sm:w-72 lg:w-80">
                <input
                  type="text"
                  placeholder="Search machines, specs, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500 focus:bg-slate-950 rounded-2xl py-3 sm:py-4 pl-10 sm:pl-12 pr-4 text-xs focus:outline-none transition-all text-white font-medium shadow-inner placeholder:text-slate-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 sm:left-4.5 top-1/2 -translate-y-1/2" />
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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category tags horizontal select */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`group px-5 sm:px-7 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 sm:gap-2.5 active:scale-[0.98] select-none bg-gradient-to-r from-[#2563EB] to-[#22D3EE] text-white shadow-[0_0_20px_rgba(37,99,235,0.45)] hover:shadow-[0_0_25px_rgba(34,211,238,0.55)] hover:-translate-y-[2px] hover:brightness-110 border border-transparent ${
                  selectedCategory === "All"
                    ? "ring-2 ring-cyan-300/80 ring-offset-2 ring-offset-slate-950 scale-[1.02]"
                    : "opacity-90 hover:opacity-100"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span>ALL CATEGORIES</span>
                <span className="ml-0.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-white text-blue-900 shadow-sm flex items-center justify-center min-w-[20px] h-5">
                  {productsList.length}
                </span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-5 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white shadow-lg shadow-blue-500/10 scale-102"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800/60"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sorting custom dropdown */}
            <div className="relative z-30">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between gap-3 bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 select-none min-w-[200px]"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By:</span>
                  <span className="text-xs font-bold text-white">
                    {sortBy === "rating"
                      ? "Top Rated (Stars)"
                      : sortBy === "name-asc"
                        ? "Alphabetical (A - Z)"
                        : sortBy === "name-desc"
                          ? "Alphabetical (Z - A)"
                          : "Default Order"}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isSortOpen ? "rotate-180 text-amber-500" : ""}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    {/* Click outside backdrop/overlay */}
                    <div className="fixed inset-0 z-45" onClick={() => setIsSortOpen(false)} />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-full min-w-[200px] bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden z-50 p-1"
                    >
                      {[
                        { value: "default", label: "Default Order" },
                        { value: "rating", label: "Top Rated (Stars)" },
                        { value: "name-asc", label: "Alphabetical (A - Z)" },
                        { value: "name-desc", label: "Alphabetical (Z - A)" }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between ${sortBy === opt.value
                              ? "bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-amber-500/10 text-white font-bold border-l-2 border-amber-500 pl-2.5"
                              : "text-slate-400 hover:text-white hover:bg-slate-900/60 font-semibold"
                            }`}
                        >
                          {opt.label}
                          {sortBy === opt.value && (
                            <Check className="w-3.5 h-3.5 text-amber-500" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Display Section with subtle premium medical background */}
      <section id="products-catalog-section" className="py-14 relative overflow-hidden">
        {/* Hospital corridor watermark background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-[0.16] pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-400 text-xs sm:text-sm font-semibold mb-8 flex justify-between items-center bg-slate-100/60 p-4 rounded-xl border border-slate-200/50">
            <span>
              Showing <strong className="text-slate-800">{paginatedProducts.length}</strong> of <strong className="text-slate-800">{sortedProducts.length}</strong> certified machines matching requirements
            </span>
            {selectedCategory !== "All" && (
              <span className="text-xs bg-amber-500/10 text-amber-700 border border-amber-200/50 px-3 py-1 rounded-lg font-bold uppercase tracking-wider">
                {selectedCategory}
              </span>
            )}
          </div>

          <LayoutGroup>
            <motion.div
              key={`products-grid-${selectedCategory}-${searchQuery}-${sortBy}-${currentPage}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
              initial={shouldAnimate ? "hidden" : "visible"}
              animate="visible"
              variants={cardContainerVariants}
            >
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p, idx) => {
                  const isAmber = idx % 2 === 1;
                  return (
                    <motion.div
                      key={p.id}
                      layoutId={`product-${p.id}`}
                      className="bg-white border border-slate-200/60 overflow-hidden rounded-3xl shadow-sm hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:border-slate-350 transition-all duration-355 flex flex-col h-full group cursor-pointer"
                      variants={cardVariants}
                      whileHover={shouldAnimate ? {
                        y: -6,
                        scale: 1.01,
                        transition: { duration: 0.3, ease: "easeOut" }
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
                          className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Premium glassmorphic details overlay */}
                        <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                          <div className="p-3 bg-white/95 rounded-full shadow-lg text-blue-600 scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center mb-1">
                            <Eye className="w-5 h-5 animate-pulse" />
                          </div>
                          <span className="text-white text-[10px] font-black uppercase tracking-wider">Inspect Specs</span>
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
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-600/25"
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
                      setSearchQuery("");
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

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </motion.div>
  );
}
