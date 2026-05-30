"use client";

import React, { useState } from "react";
import { 
  MenuIcon, 
  Cpu, 
  Shield, 
  Wrench, 
  Activity, 
  Sparkles, 
  ArrowRight,
  Search,
  Home,
  Info,
  Image,
  PhoneCall
} from "lucide-react";
import { useAppState } from "../../AppContext.js";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion.js";
import { Button } from "./button.js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu.js";
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
      // Pre-fill search input on products page could be handled via global state if desired,
      // but simple tab navigation gives a very clean baseline flow.
    }
  };

  return (
    <section className="py-2.5 bg-white border-b border-slate-150 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          
          {/* Brand Logo Identity */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-3 group" onClick={() => navigateTab("home")}>
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              V
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight block">
                Vel Bio <span className="text-amber-500 font-extrabold">Med</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                Healthcare Equipment
              </span>
            </div>
          </div>

          {/* Desktop Radix Navigation Menu */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="flex gap-1">
              
              <NavigationMenuItem>
                <button
                  onClick={() => navigateTab("home")}
                  className={`${navigationMenuTriggerStyle()} ${currentTab === "home" ? "bg-blue-50/70 text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"} uppercase tracking-wider text-xs font-bold`}
                >
                  Home
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => navigateTab("about")}
                  className={`${navigationMenuTriggerStyle()} ${currentTab === "about" ? "bg-blue-50/70 text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"} uppercase tracking-wider text-xs font-bold`}
                >
                  About Us
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => navigateTab("services")}
                  className={`${navigationMenuTriggerStyle()} ${currentTab === "services" ? "bg-blue-50/70 text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"} uppercase tracking-wider text-xs font-bold`}
                >
                  Services
                </button>
              </NavigationMenuItem>

              {/* PRODUCTS Hover dropdown with dynamic category list */}
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`uppercase tracking-wider text-xs font-bold hover:text-blue-600 ${
                    currentTab === "products" ? "bg-blue-50/70 text-blue-600 font-bold" : "text-slate-600"
                  }`}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[620px] grid-cols-2 p-4 gap-2 bg-white rounded-xl shadow-xl border border-slate-100/50">
                    <div className="col-span-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-500" />
                        Explore Certified Categories
                      </span>
                      <button 
                        onClick={() => {
                          setSelectedCategory("All");
                          navigateTab("products");
                        }}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider cursor-pointer border-none bg-transparent"
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
                          onClick={() => handleCategorySelect(cat.title)}
                          className="flex items-start gap-4 rounded-xl p-3 text-left transition-all hover:bg-slate-50 border border-transparent hover:border-slate-100/50 group cursor-pointer"
                        >
                          <div className={`p-2.5 rounded-lg shrink-0 transition-transform group-hover:scale-105 ${cat.color}`}>
                            <CatIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors mb-0.5">
                              {cat.title}
                            </p>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              {cat.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => navigateTab("gallery")}
                  className={`${navigationMenuTriggerStyle()} ${currentTab === "gallery" ? "bg-blue-50/70 text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"} uppercase tracking-wider text-xs font-bold`}
                >
                  Gallery
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => navigateTab("contact")}
                  className={`${navigationMenuTriggerStyle()} ${currentTab === "contact" ? "bg-blue-50/70 text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"} uppercase tracking-wider text-xs font-bold`}
                >
                  Contact Us
                </button>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Right Action Buttons & Inline Search */}
          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative w-48">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-full py-1.5 pl-4.5 pr-9 text-xs focus:outline-none transition-all text-slate-800 font-bold"
              />
              <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer border-none bg-transparent">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
            <Button 
              onClick={() => navigateTab("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer shadow-md shadow-blue-500/10"
            >
              Inquire SLA
            </Button>
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
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                      V
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-bold text-slate-900 tracking-tight block">
                        Vel Bio <span className="text-amber-500 font-extrabold">Med</span>
                      </span>
                    </div>
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
                  <Button 
                    onClick={() => navigateTab("contact")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-blue-500/10"
                  >
                    Get Inquiries
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </nav>
      </div>
    </section>
  );
};
