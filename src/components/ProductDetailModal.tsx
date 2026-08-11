import { useState, useEffect } from "react";
import { X, Activity, Check, ArrowUpRight, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types.js";
import { useAppState } from "../AppContext.js";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { setInquiryMachineName, setCurrentTab } = useAppState();
  const [activeModalTab, setActiveModalTab] = useState<"desc" | "features" | "specs">("desc");

  // Reset tab to description whenever a new product is selected
  useEffect(() => {
    if (product) {
      setActiveModalTab("desc");
    }
  }, [product?.id]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && product) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const triggerInquiryFlow = (productName: string) => {
    if (setInquiryMachineName) setInquiryMachineName(productName);
    onClose();
    setCurrentTab("contact");
  };

  const handleViewAllProducts = () => {
    onClose();
    setCurrentTab("products");
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Expanded Modal Container */}
          <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-12 z-[55] overflow-y-auto">
            <motion.div
              layoutId={`product-${product.id}`}
              className="w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl overflow-y-auto shadow-2xl relative max-h-[92dvh] sm:max-h-[90vh] flex flex-col md:flex-row border border-slate-150 z-[56]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Cross button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-2 rounded-full transition-all z-20 cursor-pointer shadow-sm"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Image View */}
              <motion.div
                layoutId={`product-image-${product.id}`}
                className="w-full md:w-1/2 bg-white relative flex items-center justify-center p-4 sm:p-6 min-h-[200px] sm:min-h-[250px] md:min-h-full"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-[220px] sm:max-h-[300px] md:max-h-[500px] object-contain"
                />
                {/* Visual clinical overlay tag inside modal */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-slate-800 tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-emerald-400 animate-pulse" /> Diagnostic Calibrated
                </div>
              </motion.div>

              {/* Right Information Sheet */}
              <motion.div
                layoutId={`product-content-${product.id}`}
                className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col md:overflow-y-auto justify-between md:max-h-none"
              >
                <div>
                  <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase block mb-1">
                    {product.category}
                  </span>
                  <motion.h2
                    layoutId={`product-title-${product.id}`}
                    className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight pr-8"
                  >
                    {product.name}
                  </motion.h2>

                  <div className="mb-5" />

                  {/* Sub Tab selection triggers */}
                  <div className="flex border-b border-slate-200 mb-6 font-medium text-xs">
                    <button
                      onClick={() => setActiveModalTab("desc")}
                      className={`pb-2.5 pr-4 border-b-2 font-bold uppercase transition-all tracking-wider ${
                        activeModalTab === "desc" ? "border-amber-500 text-amber-500" : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      About Unit
                    </button>
                    <button
                      onClick={() => setActiveModalTab("features")}
                      className={`pb-2.5 px-4 border-b-2 font-bold uppercase transition-all tracking-wider ${
                        activeModalTab === "features" ? "border-amber-500 text-amber-500" : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Key Features
                    </button>
                    <button
                      onClick={() => setActiveModalTab("specs")}
                      className={`pb-2.5 pl-4 border-b-2 font-bold uppercase transition-all tracking-wider ${
                        activeModalTab === "specs" ? "border-amber-500 text-amber-500" : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Specs Sheet
                    </button>
                  </div>

                  {/* Dynamic Content based on tab */}
                  <div className="max-h-[200px] sm:max-h-[260px] md:max-h-[280px] overflow-y-auto pr-1 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {activeModalTab === "desc" && (
                      <p className="whitespace-pre-line text-slate-600 font-medium">
                        {product.description}
                      </p>
                    )}

                    {activeModalTab === "features" && (
                      <ul className="space-y-2.5 text-slate-700">
                        {Boolean(product.features?.length) ? (
                          product.features.map((fea, index) => (
                            <li key={index} className="flex gap-2.5 items-start">
                              <div className="p-1 px-[5px] bg-amber-500 text-white rounded text-[8px] mt-0.5 shrink-0">
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
                      <div className="border border-slate-200/80 rounded-xl overflow-auto max-h-[250px] bg-slate-50 shadow-xs">
                        {Boolean(Object.keys(product.specifications || {}).length) ? (
                          <table className="w-full text-xs text-left divide-y divide-slate-150">
                            <tbody>
                              {Object.entries(product.specifications).map(([key, val]) => (
                                <tr key={key} className="even:bg-white divide-x divide-slate-150 font-medium">
                                  <td className="py-2.5 px-3 font-bold text-slate-700 bg-slate-50/70 w-2/5 shrink-0 align-top">
                                    {key}
                                  </td>
                                  <td className="py-2.5 px-3 text-slate-700 font-semibold break-words leading-relaxed align-top">
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

                {/* Core CTA & Navigation Options */}
                <div className="pt-6 border-t border-slate-200 mt-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <button
                    onClick={handleViewAllProducts}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                  >
                    <LayoutGrid className="w-4 h-4 text-slate-500" /> View All Products
                  </button>

                  <button
                    onClick={() => triggerInquiryFlow(product.name)}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-lg transition-transform flex items-center justify-center gap-1.5 uppercase tracking-wide cursor-pointer"
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
  );
}
