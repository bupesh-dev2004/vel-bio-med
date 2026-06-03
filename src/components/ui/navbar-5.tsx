"use client";

import React, { useState, useEffect } from "react";
import {
  MenuIcon,
  Cpu,
  Shield,
  Wrench,
  Activity,
  Sparkles,
  ArrowRight,
  Search,
  ChevronDown
} from "lucide-react";
import { useAppState } from "../../AppContext.js";
import { motion, AnimatePresence } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion.js";
import { Button } from "./button.js";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet.js";

export const Navbar5 = () => {
  const { currentTab, setCurrentTab, setSelectedCategory } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic clinical categories from our catalog database
  const productCategories = [
    {
      title: "Diagnostics & Imaging",
      description: "ECG Channels, portable fetal monitors, ultrasound scans",
      icon: Activity,
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "Critical Care & ICU",
      description: "Infusion pumps, syringe flow controls, ventilators & monitors",
      icon: Shield,
      color: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "Operating Theatre (OT)",
      description: "Electric multi-function tables, surgical lightings & diathermy",
      icon: Wrench,
      color: "text-amber-500 bg-amber-50"
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
      
      <section 
        className={`py-2 px-0 transition-all duration-500 border-b relative z-50 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/5 border-slate-200/60" 
            : "bg-white border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-24">

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
                className="h-20 w-auto object-contain relative z-10"
              />
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1.5 relative">
              
              {/* Home */}
              <div className="relative">
                <button
                  onClick={() => navigateTab("home")}
                  className={`relative px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${
                    currentTab === "home" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
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
                  className={`relative px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${
                    currentTab === "about" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
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

              {/* Services */}
              <div className="relative">
                <button
                  onClick={() => navigateTab("services")}
                  className={`relative px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${
                    currentTab === "services" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  <span className="relative z-10">Services</span>
                  {currentTab === "services" && (
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
                  className={`relative px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent flex items-center gap-1 ${
                    currentTab === "products" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
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
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 grid grid-cols-2 gap-2 z-55"
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
                          <button
                            key={idx}
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
                          </button>
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
                  className={`relative px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${
                    currentTab === "gallery" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
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
                  className={`relative px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent ${
                    currentTab === "contact" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
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
              <form onSubmit={handleSearchSubmit} className="relative w-48 group">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-full py-2.5 pl-4 pr-9 text-xs focus:outline-none transition-all text-slate-800 font-bold"
                />
                <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer border-none bg-transparent">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Mobile Sheet Navigation Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" className="rounded-lg border-slate-200">
                  <MenuIcon className="h-5 w-5 text-slate-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto bg-white border-b border-slate-100">
                <SheetHeader className="pb-4 border-b border-slate-100">
                  <SheetTitle>
                    <div className="flex items-center cursor-pointer" onClick={() => navigateTab("home")}>
                      <img
                        src="/logo.png"
                        alt="Vel Bio Med"
                        className="h-18 w-auto object-contain"
                      />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-2 px-1">

                  <Accordion type="single" collapsible className="w-full">

                    {/* Features / Categories inside Mobile Drawer */}
                    <AccordionItem value="products-accordion" className="border-b border-slate-100">
                      <AccordionTrigger className="text-sm font-bold uppercase tracking-wider text-slate-700 hover:no-underline hover:text-blue-600 py-3 border-none bg-transparent">
                        Products & Categories
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4 py-2">
                          <button
                            onClick={() => {
                              setSelectedCategory("All");
                              navigateTab("products");
                            }}
                            className="text-left text-xs font-extrabold text-blue-600 uppercase tracking-widest py-1.5 border-none bg-transparent"
                          >
                            View All Products
                          </button>
                          {productCategories.map((cat, index) => (
                            <button
                              key={index}
                              onClick={() => handleCategorySelect(cat.title)}
                              className="text-left text-xs font-semibold text-slate-600 hover:text-blue-600 py-1.5 transition-colors border-none bg-transparent"
                            >
                              {cat.title}
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-col gap-4 py-4 border-b border-slate-100">
                    <button
                      onClick={() => navigateTab("home")}
                      className="text-left text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 border-none bg-transparent"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => navigateTab("about")}
                      className="text-left text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 border-none bg-transparent"
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => navigateTab("services")}
                      className="text-left text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 border-none bg-transparent"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => navigateTab("gallery")}
                      className="text-left text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 border-none bg-transparent"
                    >
                      Gallery
                    </button>
                    <button
                      onClick={() => navigateTab("contact")}
                      className="text-left text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 border-none bg-transparent"
                    >
                      Contact Us
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-xs focus:outline-none text-slate-800"
                      />
                      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 border-none bg-transparent">
                        <Search className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

          </nav>
        </div>
      </section>
    </>
  );
};
