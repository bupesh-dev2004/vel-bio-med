import { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider, useAppState } from "./AppContext.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomeView from "./components/HomeView.js";
import AboutView from "./components/AboutView.js";
import GalleryView from "./components/GalleryView.js";
import ProductsView from "./components/ProductsView.js";
import ContactView from "./components/ContactView.js";
import ScrollToTop from "./components/ScrollToTop.js";
import FloatingSocialMenu from "./components/FloatingSocialMenu.js";
import { Product } from "./types.js";
import { Activity, ShieldAlert, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}

function AppContent() {
  const { currentTab, setCurrentTab, isLoading, error, refreshState, state } = useAppState();

  // Selected product modal state - shared so hot-selling or latest items on Home can open detail modal immediately!
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  // Local state for the initial website preloader
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Hide preloader after 1800ms
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenProductModal = (product: Product) => {
    setSelectedProductModal(product);
    setCurrentTab("products");
  };

  const handleCloseProductModal = () => {
    setSelectedProductModal(null);
  };

  useEffect(() => {
    // Set custom page title matching premium corporate aesthetic
    document.title = "Vel Bio Med | Sourcing Hospital Equipment & Machinery";
  }, []);

  // 1. Loading Indicator screen with medical pulse icon
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 select-none overflow-hidden relative font-sans">
        {/* Glow ambient design elements */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-100/40 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col items-center space-y-8 relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-44 h-44 rounded-full border-2 border-slate-100 border-t-blue-500 animate-spin" />
            <div className="absolute w-48 h-48 rounded-full border border-dashed border-amber-400/30 animate-spin [animation-duration:12s]" />

            <div className="w-32 h-32 p-4 bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-150/50 flex items-center justify-center relative z-10">
              <img
                src="/logo.png"
                alt="Vel Bio Med Logo"
                className="w-auto h-20 object-contain"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-black tracking-widest text-slate-800 uppercase">
              VEL BIO MED
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full" />

            <div className="w-48 h-1 bg-slate-100 rounded-full mx-auto overflow-hidden mt-3 relative">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-sky-400 to-amber-500 rounded-full w-full -translate-x-[40%] animate-pulse" style={{ animationDuration: '1.5s' }} />
            </div>

            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
              Validating secure database assets...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Fatal backend connection recovery boundary
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6 space-y-6 font-sans">
        <div className="p-5 bg-rose-500/10 text-rose-500 rounded-3xl border border-rose-500/20 shadow-2xl">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <div className="text-center space-y-2 max-w-md">
          <h2 className="text-2xl font-black text-white tracking-tight">Database Connectivity Timeout</h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
            We are having trouble communicating with the Vel Bio Med JSON database layers. This configuration requires a running local Express server: {error}
          </p>
        </div>
        <button
          onClick={() => {
            refreshState();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-8 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Re-poll server state
        </button>
      </div>
    );
  }

  // 3. Complete Loaded Website Template
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white pt-[116px]">
      <ScrollToTopOnRoute />
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              translateY: -30,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[9999] bg-slate-50 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          >
            {/* Glow ambient design elements */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-100/40 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center space-y-8 relative z-10">
              <div className="relative flex items-center justify-center">
                {/* Spinner ring around the logo card */}
                <div className="absolute w-44 h-44 rounded-full border-2 border-slate-100 border-t-blue-500 animate-spin" />
                <div className="absolute w-48 h-48 rounded-full border border-dashed border-amber-400/30 animate-spin [animation-duration:12s]" />

                {/* The Logo container */}
                <div className="w-32 h-32 p-4 bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-150/50 flex items-center justify-center relative z-10">
                  <img
                    src="/logo.png"
                    alt="Vel Bio Med Logo"
                    className="w-auto h-20 object-contain animate-pulse"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-black tracking-widest text-slate-800 uppercase">
                  VEL BIO MED
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full" />

                {/* Progress bar simulation */}
                <div className="w-48 h-1 bg-slate-200/60 rounded-full mx-auto overflow-hidden mt-3 relative">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-sky-400 to-amber-500 rounded-full"
                  />
                </div>

                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                  Clinical Sourcing & Sizing Schedulers
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Sticky Header Navigation */}
      <Header />


      {/* Main active sub views switcher panel */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeView onOpenProductModal={handleOpenProductModal} showPreloader={showPreloader} />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/products" element={
            <ProductsView
              selectedProductModal={selectedProductModal}
              onOpenProductModal={handleOpenProductModal}
              onCloseProductModal={handleCloseProductModal}
            />
          } />
          <Route path="/contact" element={<ContactView />} />
          <Route path="*" element={<HomeView onOpenProductModal={handleOpenProductModal} showPreloader={showPreloader} />} />
        </Routes>
      </main>

      {/* Shared Deep blue footer block */}
      <Footer />

      {/* Shared dynamic floating social and chat hub */}
      <FloatingSocialMenu />

      {/* Shared Scroll to safe top anchor widget */}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
