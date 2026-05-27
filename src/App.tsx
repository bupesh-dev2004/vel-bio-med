import { useEffect, useState } from "react";
import { AppProvider, useAppState } from "./AppContext.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomeView from "./components/HomeView.js";
import AboutView from "./components/AboutView.js";
import ServicesView from "./components/ServicesView.js";
import GalleryView from "./components/GalleryView.js";
import ProductsView from "./components/ProductsView.js";
import ContactView from "./components/ContactView.js";
import AdminView from "./components/AdminView.js";
import Breadcrumbs from "./components/Breadcrumbs.js";
import ScrollToTop from "./components/ScrollToTop.js";
import FloatingSocialMenu from "./components/FloatingSocialMenu.js";
import { Product } from "./types.js";
import { Activity, ShieldAlert, RotateCcw } from "lucide-react";

function AppContent() {
  const { currentTab, setCurrentTab, isLoading, error, refreshState, state } = useAppState();

  // Selected product modal state - shared so hot-selling or latest items on Home can open detail modal immediately!
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  const handleOpenProductModal = (product: Product) => {
    setSelectedProductModal(product);
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
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 space-y-4 font-sans select-none">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
          <div className="p-6 bg-slate-950 rounded-full text-blue-500 animate-pulse border border-slate-800">
            <Activity className="w-8 h-8" />
          </div>
        </div>
        <div className="text-center space-y-1 pt-4">
          <h2 className="text-lg font-black tracking-widest text-white uppercase">Vel Bio Med Sourcing</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Validating secure database assets...</p>
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
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Dynamic Sticky Header Navigation */}
      <Header />

      {/* Dynamic Breadcrumbs Navigation indicator bar */}
      <Breadcrumbs currentTab={currentTab} onNavigate={setCurrentTab} extraItem={selectedProductModal?.name} />

      {/* Main active sub views switcher panel */}
      <main className="flex-grow">
        {currentTab === "home" && <HomeView onOpenProductModal={handleOpenProductModal} />}
        {currentTab === "about" && <AboutView />}
        {currentTab === "services" && <ServicesView />}
        {currentTab === "gallery" && <GalleryView />}
        {currentTab === "products" && (
          <ProductsView
            selectedProductModal={selectedProductModal}
            onOpenProductModal={handleOpenProductModal}
            onCloseProductModal={handleCloseProductModal}
          />
        )}
        {currentTab === "contact" && <ContactView />}
        {currentTab === "admin" && <AdminView />}
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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
