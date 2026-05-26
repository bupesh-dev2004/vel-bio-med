import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Eye, MessageSquare, Star, ArrowUpRight, Check, X, ShieldAlert } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { Product } from "../types.js";

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
  const { state, setCurrentTab, setInquiryMachineName, inquiryMachineName, setInquiryMachineName: clearSearchInquiry } = useAppState();

  const productsList = state?.products || [];
  const categories = state?.categories || [];

  // Filter & Search states
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Local state for toggling product sheet tabs inside the modal
  const [activeModalTab, setActiveModalTab] = useState<"features" | "specs" | "desc">("desc");

  // Track if search parameter came from header searchQuery
  useEffect(() => {
    // If we want to hook up some state or handle default search
  }, []);

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
      {/* Search and Category filter banner */}
      <section className="bg-white border-b border-slate-200 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Header info */}
            <div>
              <span className="text-blue-600 font-bold tracking-widest text-[10px] sm:text-xs uppercase block mb-1">Vel Bio Med Inventory</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Machinery & Devices Catalog</h1>
            </div>

            {/* In-tab search bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by name, category..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs focus:outline-none transition-all text-slate-800 font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Filtering Tools Layout */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category tags horizontal select */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-950"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sorting trigger select */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <label htmlFor="sort-dropdown" className="text-xs font-bold uppercase text-slate-400">Sort By:</label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-lg py-2 px-3 text-xs font-semibold focus:outline-none text-slate-700"
              >
                <option value="default">Default Order</option>
                <option value="rating">Top Rated (Stars)</option>
                <option value="name-asc">Alphabetical (A - Z)</option>
                <option value="name-desc">Alphabetical (Z - A)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Display Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-400 text-xs sm:text-sm font-semibold mb-6 flex justify-between items-center bg-slate-100/60 p-4 rounded-xl border border-slate-200/50">
            <span>
              Showing <strong className="text-slate-800">{sortedProducts.length}</strong> machines matching requirements
            </span>
            {selectedCategory !== "All" && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase">
                {selectedCategory}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Photo area with tag indicators */}
                  <div className="relative pt-[65%] overflow-hidden bg-slate-200">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                      {p.trending && (
                        <span className="bg-orange-500 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                          TRENDING
                        </span>
                      )}
                      {p.newest && (
                        <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                          NEW ARRIVAL
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body textual information */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase block mb-1">
                      {p.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-grow font-medium">
                      {p.shortDesc}
                    </p>

                    <div className="flex items-center gap-1.5 mb-5 pt-3 border-t border-slate-100">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(p.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-bold ml-1">({p.rating}.0)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        onClick={() => onOpenProductModal(p)}
                        className="bg-white border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                      <button
                        onClick={() => triggerInquiryFlow(p.name)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Select Machine
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white max-w-lg mx-auto w-full px-6 flex flex-col items-center">
                <ShieldAlert className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No medical products found</h3>
                <p className="text-slate-500 text-xs mt-2 text-center max-w-sm">
                  We currently cannot find any machinery matching your filtering setup. Try searching a generic item parameter such as "Ventilator" or "GE".
                </p>
                <button
                  onClick={() => {
                    setSearchText("");
                    setSelectedCategory("All");
                  }}
                  className="bg-blue-550 bg-blue-100 text-blue-600 hover:bg-blue-200 font-bold text-xs py-2.5 px-6 rounded-lg uppercase tracking-wide transition-all mt-4"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Information Modal Layout */}
      {selectedProductModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={onCloseProductModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row relative animate-scaleUp max-h-[90vh] md:max-h-[85vh] my-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Cross button */}
            <button
              onClick={onCloseProductModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-2 rounded-full transition-all z-20 cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View */}
            <div className="w-full md:w-1/2 bg-slate-100 relative">
              <img
                src={selectedProductModal.image}
                alt={selectedProductModal.name}
                className="w-full h-full object-cover min-h-[250px] md:min-h-full max-h-[350px] md:max-h-full"
              />
            </div>

            {/* Right Information Sheet */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase block mb-1">
                  {selectedProductModal.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight pr-8">
                  {selectedProductModal.name}
                </h2>

                <div className="flex items-center gap-2 mt-2 mb-5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(selectedProductModal.rating) ? "fill-amber-400" : "text-slate-350"
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
                    className={`pb-2.5 pr-4 border-b-2 font-bold uppercase transition-all tracking-wider ${
                      activeModalTab === "desc" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    About Unit
                  </button>
                  <button
                    onClick={() => setActiveModalTab("features")}
                    className={`pb-2.5 px-4 border-b-2 font-bold uppercase transition-all tracking-wider ${
                      activeModalTab === "features" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Key Features
                  </button>
                  <button
                    onClick={() => setActiveModalTab("specs")}
                    className={`pb-2.5 pl-4 border-b-2 font-bold uppercase transition-all tracking-wider ${
                      activeModalTab === "specs" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Specs Sheet
                  </button>
                </div>

                {/* Dynamic Content based on tab */}
                <div className="min-h-[140px] text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                  {activeModalTab === "desc" && (
                    <p className="whitespace-pre-line text-slate-600">
                      {selectedProductModal.description}
                    </p>
                  )}

                  {activeModalTab === "features" && (
                    <ul className="space-y-2.5 text-slate-700">
                      {Boolean(selectedProductModal.features?.length) ? (
                        selectedProductModal.features.map((fea, index) => (
                          <li key={index} className="flex gap-2.5 items-start">
                            <div className="p-1 px-[5px] bg-blue-500 text-white rounded text-[8px] mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold">{fea}</span>
                          </li>
                        ))
                      ) : (
                        <p className="text-slate-400">Features checklist under review by biomedical panels.</p>
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
                                <td className="py-2.5 px-3 text-slate-600 truncate max-w-[150px]">
                                  {val}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="p-4 text-xs text-slate-400 text-center">Specifications sheet being updated by engineers.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Core CTA */}
              <div className="pt-6 border-t border-slate-200 mt-6 flex justify-end">
                <button
                  onClick={() => triggerInquiryFlow(selectedProductModal.name)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3.5 px-8 rounded-xl shadow-lg transition-transform flex items-center gap-1.5 uppercase tracking-wide cursor-pointer"
                >
                  Confirm & Inquire Machine <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
