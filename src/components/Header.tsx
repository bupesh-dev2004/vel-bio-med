import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useAppState } from "../AppContext.js";

export default function Header() {
  const { currentTab, setCurrentTab, state } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Direct user to products catalog tab and set search context
      setCurrentTab("products");
      // Find the input on products page and fill it, or we can handle it via a global state mechanism if necessary.
      // For now, simple URL/context navigation works nicely.
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "products", label: "Products" },
    { id: "contact", label: "Contact Us" },
  ];

  const contact = state?.contactInfo || {
    phone: "+91 80 4930 2930",
    email: "sales@velbiomed.co.in",
  };

  return (
    <header className="w-full relative z-50 bg-white">
      {/* Primary Sticky Header */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-3 group" onClick={() => setCurrentTab("home")}>
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

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 uppercase tracking-wider relative ${
                    currentTab === item.id
                      ? "text-blue-600 bg-blue-50/75 font-semibold"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {currentTab === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Right side search bar & Admin button in the top right corner */}
            <div className="hidden md:flex items-center gap-3">
              <div className="hidden lg:block w-52">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Scan machines, ventilators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-full py-1.5 pl-4 pr-10 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Top Right corner Admin Portal Button styled with brand logo gradient */}
              <button
                onClick={() => setCurrentTab("admin")}
                className={`py-2 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 ${
                  currentTab === "admin"
                    ? "bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 text-white shadow-blue-500/10 scale-102"
                    : "bg-slate-900 hover:bg-slate-950 text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin
              </button>
            </div>

            {/* Mobile menu trigger button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-50 border-t border-slate-100 py-3 px-4 animate-fadeIn absolute left-0 right-0 shadow-lg">
            <div className="flex flex-col space-y-2">
              <form onSubmit={handleSearchSubmit} className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search products & equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-xs focus:outline-none text-slate-800"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="w-4 h-4" />
                </button>
              </form>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                    currentTab === item.id ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-blue-600 hover:bg-slate-150"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <hr className="border-slate-200 my-2" />
              <button
                onClick={() => {
                  setCurrentTab("admin");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-amber-500 text-white text-sm font-black shadow-md transition-all uppercase tracking-wider cursor-pointer"
              >
                Admin Panel
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
