"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Shield,
  Wrench,
  Activity,
  Sparkles,
  ArrowRight,
  Search,
  ChevronDown,
  Home,
  Info,
  Layers,
  Image,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useAppState } from "../../AppContext.js";
import { motion, AnimatePresence } from "framer-motion";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "./BrandSocialIcons.js";


export const Navbar5 = () => {
  const { currentTab, setCurrentTab, setSelectedCategory, searchQuery, setSearchQuery } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when fullscreen menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const containerVariants = {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    },
    closed: {
      transition: { staggerChildren: 0.03, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
        duration: 0.35
      }
    },
    closed: {
      y: 15,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
        duration: 0.25
      }
    }
  };

  // Dynamic clinical categories from our catalog database
  const productCategories = [
    {
      title: "Critical Care & ICU",
      description: "Infusion pumps, syringe flow controls, ventilators & monitors",
      icon: Shield,
      color: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "Modular OT",
      description: "Electric multi-function tables, surgical lightings & diathermy",
      icon: Wrench,
      color: "text-amber-500 bg-amber-50"
    },
    {
      title: "Hospital Furniture",
      description: "Bedside lockers, Over bed trolleys, Attender cots & IV stands",
      icon: Activity,
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "CSSD & Sterilization",
      description: "Steam autoclaves & ETO horizontal computerized sterilizers",
      icon: Sparkles,
      color: "text-purple-500 bg-purple-50"
    },
  ];

  const handleCategorySelect = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setCurrentTab("products");
    setMobileOpen(false);
  };

  const navigateTab = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentTab("products");
    }
  };

  return (
    <>
      {/* Premium Top Brand Accent Strip */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-500 z-[60] w-full" />

      <motion.section
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`py-1 sm:py-2 px-0 transition-all duration-500 border-b relative z-50 ${isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/5 border-slate-200/60"
          : "bg-white border-slate-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14 sm:h-16 lg:h-20 min-h-0">

            {/* Brand Logo Identity */}
            <motion.div
              className="flex-shrink-0 cursor-pointer flex items-center group relative"
              onClick={() => navigateTab("home")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle brand glow behind logo on hover */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/logo.png"
                alt="Vel Bio Med"
                className="h-10 sm:h-14 lg:h-[72px] w-auto max-w-[140px] sm:max-w-[180px] object-contain relative z-10"
              />
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1.5 relative">

              {/* Home */}
              <div className="relative">
                <button
                  onClick={() => navigateTab("home")}
                  className={`relative px-4 py-2.5 text-[13px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${currentTab === "home" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                >
                  <span className="relative z-10">Home</span>
                  {currentTab === "home" && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50/70 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              {/* About Us */}
              <div className="relative">
                <button
                  onClick={() => navigateTab("about")}
                  className={`relative px-4 py-2.5 text-[13px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${currentTab === "about" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                >
                  <span className="relative z-10">About Us</span>
                  {currentTab === "about" && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50/70 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>



              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    navigateTab("products");
                  }}
                  className={`relative px-4 py-2.5 text-[13px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent flex items-center gap-1 ${currentTab === "products" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    Products <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </span>
                  {currentTab === "products" && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50/70 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                {/* Dropdown Menu Panel */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-[min(580px,calc(100vw-2rem))] bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 grid grid-cols-2 gap-2 z-55"
                    >
                      <div className="col-span-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-blue-500" />
                          Explore Certified Categories
                        </span>
                        <button
                          onClick={() => {
                            setSelectedCategory("All");
                            navigateTab("products");
                            setIsDropdownOpen(false);
                          }}
                          className="text-[9px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider cursor-pointer border-none bg-transparent"
                        >
                          View All Products
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {productCategories.map((cat, idx) => {
                        const CatIcon = cat.icon;
                        return (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.35, ease: "easeOut" }}
                            onClick={() => {
                              handleCategorySelect(cat.title);
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-start gap-3.5 rounded-xl p-3 text-left transition-all hover:bg-slate-50 border border-transparent hover:border-slate-100/50 group cursor-pointer bg-transparent"
                          >
                            <div className={`p-2.5 rounded-lg shrink-0 transition-transform group-hover:scale-105 ${cat.color}`}>
                              <CatIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors mb-0.5">
                                {cat.title}
                              </p>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                {cat.description}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Gallery */}
              <div className="relative">
                <button
                  onClick={() => navigateTab("gallery")}
                  className={`relative px-4 py-2.5 text-[13px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${currentTab === "gallery" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                >
                  <span className="relative z-10">Gallery</span>
                  {currentTab === "gallery" && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50/70 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              {/* Contact Us */}
              <div className="relative">
                <button
                  onClick={() => navigateTab("contact")}
                  className={`relative px-4 py-2.5 text-[13px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${currentTab === "contact" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                >
                  <span className="relative z-10">Contact Us</span>
                  {currentTab === "contact" && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50/70 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Right Action Buttons & Inline Search */}
            <div className="hidden lg:flex items-center gap-4">
              <form onSubmit={handleSearchSubmit} className="relative w-44 xl:w-52 group">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-full py-2 pl-4 pr-9 text-xs focus:outline-none transition-all text-slate-800 font-bold"
                />
                <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer border-none bg-transparent">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Mobile Animated Hamburger Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-[80] p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer text-slate-700 flex items-center justify-center bg-white"
              aria-label="Toggle Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5">
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={false}
                  animate={mobileOpen ? { d: "M 4 4 L 20 20" } : { d: "M 4 6 L 20 6" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={false}
                  animate={mobileOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  d="M 4 12 L 20 12"
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={false}
                  animate={mobileOpen ? { d: "M 4 20 L 20 4" } : { d: "M 4 18 L 20 18" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </svg>
            </button>

            {/* Mobile Fullscreen Navigation Menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="fixed inset-0 w-full h-[100dvh] bg-white z-[70] flex flex-col justify-between overflow-y-auto overscroll-contain"
                >
                  {/* Matching main header height & brand identity */}
                  <div className="h-14 sm:h-16 px-4 sm:px-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center cursor-pointer" onClick={() => navigateTab("home")}>
                      <img
                        src="/logo.png"
                        alt="Vel Bio Med"
                        className="h-10 sm:h-12 w-auto max-w-[130px] object-contain"
                      />
                    </div>
                    {/* Spacer for toggle button which stays on top */}
                    <div className="w-10 h-10 lg:hidden" />
                  </div>

                  {/* Vertically Centered Content Container */}
                  <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-8 max-w-md mx-auto w-full">
                    {/* Navigation Links list */}
                    <motion.div
                      variants={containerVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="flex flex-col gap-3.5"
                    >
                      {/* Home */}
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => navigateTab("home")}
                          className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all cursor-pointer border-none text-left ${currentTab === "home"
                            ? "bg-blue-50 text-blue-600 font-extrabold border-l-4 border-blue-600 pl-3"
                            : "bg-slate-50/50 hover:bg-slate-50 text-slate-700 font-bold"
                            }`}
                        >
                          <span className="flex items-center gap-3.5">
                            <Home className="w-5 h-5 text-blue-500" />
                            <span className="text-sm uppercase tracking-wider">Home</span>
                          </span>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </button>
                      </motion.div>

                      {/* About Us */}
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => navigateTab("about")}
                          className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all cursor-pointer border-none text-left ${currentTab === "about"
                            ? "bg-blue-50 text-blue-600 font-extrabold border-l-4 border-blue-600 pl-3"
                            : "bg-slate-50/50 hover:bg-slate-50 text-slate-700 font-bold"
                            }`}
                        >
                          <span className="flex items-center gap-3.5">
                            <Info className="w-5 h-5 text-blue-500" />
                            <span className="text-sm uppercase tracking-wider">About Us</span>
                          </span>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </button>
                      </motion.div>



                      {/* Products & Categories custom accordion */}
                      <motion.div variants={itemVariants} className="flex flex-col">
                        <button
                          onClick={() => setIsProductsOpen(!isProductsOpen)}
                          className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all cursor-pointer border-none text-left ${currentTab === "products"
                            ? "bg-blue-50 text-blue-600 font-extrabold border-l-4 border-blue-600 pl-3"
                            : "bg-slate-50/50 hover:bg-slate-50 text-slate-700 font-bold"
                            }`}
                        >
                          <span className="flex items-center gap-3.5">
                            <Cpu className="w-5 h-5 text-blue-500" />
                            <span className="text-sm uppercase tracking-wider">Products & Categories</span>
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence initial={false}>
                          {isProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-2 mt-2 pl-6 border-l border-slate-100 ml-6 py-1">
                                <button
                                  onClick={() => {
                                    setSelectedCategory("All");
                                    navigateTab("products");
                                  }}
                                  className="text-left text-xs font-black text-blue-600 uppercase tracking-widest py-2 hover:translate-x-1 transition-transform border-none bg-transparent cursor-pointer"
                                >
                                  View All Products →
                                </button>
                                {productCategories.map((cat, index) => {
                                  const CatIcon = cat.icon;
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => handleCategorySelect(cat.title)}
                                      className="flex items-center gap-3 text-left text-xs font-bold text-slate-600 hover:text-blue-600 py-1.5 hover:translate-x-1 transition-all border-none bg-transparent cursor-pointer group"
                                    >
                                      <span className={`p-1.5 rounded-md ${cat.color} shrink-0 group-hover:scale-105 transition-transform`}>
                                        <CatIcon className="w-3.5 h-3.5" />
                                      </span>
                                      <span>{cat.title}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Gallery */}
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => navigateTab("gallery")}
                          className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all cursor-pointer border-none text-left ${currentTab === "gallery"
                            ? "bg-blue-50 text-blue-600 font-extrabold border-l-4 border-blue-600 pl-3"
                            : "bg-slate-50/50 hover:bg-slate-50 text-slate-700 font-bold"
                            }`}
                        >
                          <span className="flex items-center gap-3.5">
                            <Image className="w-5 h-5 text-blue-500" />
                            <span className="text-sm uppercase tracking-wider">Gallery</span>
                          </span>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </button>
                      </motion.div>

                      {/* Contact Us */}
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => navigateTab("contact")}
                          className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all cursor-pointer border-none text-left ${currentTab === "contact"
                            ? "bg-blue-50 text-blue-600 font-extrabold border-l-4 border-blue-600 pl-3"
                            : "bg-slate-50/50 hover:bg-slate-50 text-slate-700 font-bold"
                            }`}
                        >
                          <span className="flex items-center gap-3.5">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <span className="text-sm uppercase tracking-wider">Contact Us</span>
                          </span>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Empty spacer at the bottom to maintain even vertical balancing */}
                  <div className="h-24 shrink-0 pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>

          </nav>
        </div>
      </motion.section>
    </>
  );
};
