import React, { useState } from "react";
import { useAppState } from "../AppContext.js";
import { PlusCircle, Trash2, CheckCircle2, FileText, ShoppingBag, Image, PhoneCall, Award, Star, ListCollapse, List, Save, UserCheck, X } from "lucide-react";
import { Product, Testimonial, GalleryItem, Service, HomeSlide, ContactInfo } from "../types.js";

export default function AdminView() {
  const { state, refreshState } = useAppState();
  const categories = state?.categories || [];

  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"inquiries" | "products" | "categories" | "slides" | "contact" | "gallery" | "services">("inquiries");

  // Local feedback or messages
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const displayMessage = (msg: string, isErr = false) => {
    if (isErr) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), 5000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(null), 5000);
    }
  };

  // 1. INQUIRIES CONTROL
  const handleInquiryAttendedToggle = async (id: string, currentStatus: boolean | undefined) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attended: !currentStatus })
      });
      if (res.ok) {
        displayMessage("Inquiry validation adjusted successfully.");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error updating inquiry state.", true);
    }
  };

  const handleInquiryDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        displayMessage("Inquiry removed from database registers.");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error removing inquiry log.", true);
    }
  };

  // 2. PRODUCT MANAGEMENT (ADD/DELETE)
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdShort, setNewProdShort] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdRating, setNewProdRating] = useState(5);
  const [newProdFeatures, setNewProdFeatures] = useState("");
  const [newProdSpecs, setNewProdSpecs] = useState("Frequency, 1-18 MHz\nScreen, 23-inch OLED\nWarranty, 2 Years");

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdCategory) {
      displayMessage("Please provide a product title and selected category.", true);
      return;
    }

    // Process features (comma or newline separated list)
    const processedFeatures = newProdFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    // Process specifications keys lookup table from text (Format: "Key, Value")
    const processedSpecs: Record<string, string> = {};
    newProdSpecs.split("\n").forEach((line) => {
      const parts = line.split(",");
      if (parts.length >= 2) {
        processedSpecs[parts[0].trim()] = parts.slice(1).join(",").trim();
      }
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProdName,
          category: newProdCategory,
          image: newProdImage || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
          shortDesc: newProdShort || "General premium hospital clinical machine unit.",
          description: newProdDesc || "High reliability biological machinery setup with certified technical approvals.",
          rating: Number(newProdRating) || 5,
          features: processedFeatures,
          specifications: processedSpecs,
          trending: true,
          newest: true
        })
      });

      if (res.ok) {
        displayMessage(`Product '${newProdName}' added successfully to catalog.`);
        // Reset inputs
        setNewProdName("");
        setNewProdImage("");
        setNewProdShort("");
        setNewProdDesc("");
        setNewProdFeatures("");
        await refreshState();
      }
    } catch (err) {
      displayMessage("Failed to insert product.", true);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        displayMessage("Product deleted from catalogs.");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Failed to delete product.", true);
    }
  };

  // 3. CATEGORY CONTROL
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategoryName.trim() })
      });
      if (res.ok) {
        displayMessage(`Category '${newCategoryName}' added.`);
        setNewCategoryName("");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error adding category.", true);
    }
  };

  const handleDeleteCategory = async (cat: string) => {
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: cat })
      });
      if (res.ok) {
        displayMessage(`Category '${cat}' removed.`);
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error deleting category.", true);
    }
  };

  // 4. CONTACTS SETUP MODIFICATION
  const [contactAddress, setContactAddress] = useState(state?.contactInfo?.address || "");
  const [contactPhone, setContactPhone] = useState(state?.contactInfo?.phone || "");
  const [contactEmail, setContactEmail] = useState(state?.contactInfo?.email || "");
  const [contactWhatsapp, setContactWhatsapp] = useState(state?.contactInfo?.whatsappNumber || "");

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: contactAddress,
          phone: contactPhone,
          email: contactEmail,
          whatsappNumber: contactWhatsapp
        })
      });
      if (res.ok) {
        displayMessage("Corporate and WhatsApp details saved successfully.");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Failed to save credentials.", true);
    }
  };

  // 5. GALLERY ITEMS PUBLISH
  const [newGalTitle, setNewGalTitle] = useState("");
  const [newGalCategory, setNewGalCategory] = useState("");
  const [newGalImage, setNewGalImage] = useState("");

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle.trim() || !newGalImage.trim()) {
      displayMessage("Please supply a display title and asset photo URL.", true);
      return;
    }
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newGalTitle,
          image: newGalImage,
          category: newGalCategory || "General Setup"
        })
      });
      if (res.ok) {
        displayMessage("New visual portfolio element uploaded.");
        setNewGalTitle("");
        setNewGalImage("");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error delivering gallery asset.", true);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        displayMessage("Gallery visual file removed.");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error removing gallery file.", true);
    }
  };

  // 6. SERVICES CREATION
  const [newSvcTitle, setNewSvcTitle] = useState("");
  const [newSvcDesc, setNewSvcDesc] = useState("");
  const [newSvcIcon, setNewSvcIcon] = useState("Wrench");

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSvcTitle.trim()) return;
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newSvcTitle,
          description: newSvcDesc,
          iconName: newSvcIcon
        })
      });
      if (res.ok) {
        displayMessage(`AMC service model '${newSvcTitle}' published.`);
        setNewSvcTitle("");
        setNewSvcDesc("");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error publishing support model.", true);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        displayMessage("AMC service option removed.");
        await refreshState();
      }
    } catch (e) {
      displayMessage("Error deleting service option.", true);
    }
  };

  const defaultContactAddress = "704-B, Phoenix Corporate Park, Outer Ring Road, Bengaluru - 560103, Karnataka, India";
  const defaultContactPhone = "+91 80 4930 2930";
  const defaultContactEmail = "sales@velbiomed.co.in";
  const defaultContactWhatsapp = "918049302930";

  return (
    <div className="bg-slate-50 min-h-screen font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Dashboard Title banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 mb-8 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase">
                VEL BIO MED CENTRAL REGISTERS
              </span>
              <h1 className="text-2.5xl sm:text-3.5xl font-extrabold tracking-tight mt-2">
                Administration Control Panel
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium max-w-xl">
                Real-time control log of client diagnostic requests, catalog updates, gallery files, and emergency AMC support listings.
              </p>
            </div>
          </div>
        </div>

        {/* Local responses notifications */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-700 text-xs sm:text-sm font-bold rounded-2xl mb-8 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Success: {successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-250 text-rose-700 text-xs sm:text-sm font-bold rounded-2xl mb-8 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-rose-500" />
            <span>Error: {errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Sub Tabs */}
          <div className="lg:col-span-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2.5 font-sans">
            <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase block px-3.5 mb-2">Category Registers</span>
            {[
              { id: "inquiries", label: "Client Inquiries", icon: <FileText className="w-4 h-4" /> },
              { id: "products", label: "Manage Products", icon: <ShoppingBag className="w-4 h-4" /> },
              { id: "categories", label: "Manage Categories", icon: <ListCollapse className="w-4 h-4" /> },
              { id: "contact", label: "Update Contact Info", icon: <PhoneCall className="w-4 h-4" /> },
              { id: "gallery", label: "Manage Gallery", icon: <Image className="w-4 h-4" /> },
              { id: "services", label: "AMC Services Slas", icon: <Award className="w-4 h-4" /> }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveAdminSubTab(sub.id as any);
                  // Sync local contact text inputs when switching to Contact subtab
                  if (sub.id === "contact") {
                    setContactAddress(state?.contactInfo?.address || defaultContactAddress);
                    setContactPhone(state?.contactInfo?.phone || defaultContactPhone);
                    setContactEmail(state?.contactInfo?.email || defaultContactEmail);
                    setContactWhatsapp(state?.contactInfo?.whatsappNumber || defaultContactWhatsapp);
                  }
                }}
                className={`w-full text-left py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-3 transition-colors uppercase tracking-wider ${
                  activeAdminSubTab === sub.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {sub.icon}
                <span>{sub.label}</span>
              </button>
            ))}
          </div>

          {/* Right Side Working Forms Content */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm font-sans">

            {/* 1. INCOMING CLIENTS INQUIRIES PANELS */}
            {activeAdminSubTab === "inquiries" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Hospital Sourcing Inquiries Ticket List</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold">
                    Patients and doctors list generated since app initialization. Administrators can cross out or verify each ticket.
                  </p>
                </div>

                <div className="space-y-4">
                  {state?.inquiries?.length ? (
                    state.inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          inq.attended
                            ? "bg-slate-50/60 border-slate-100 opacity-65"
                            : "bg-blue-50/15 border-blue-200/80 shadow-sm"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-150 pb-4 mb-4">
                          <div>
                            <span className="text-xs bg-blue-105 bg-blue-100 text-blue-700 font-bold tracking-wide uppercase px-2.5 py-1 rounded">
                              {inq.product || "General Enquiry"}
                            </span>
                            <h4 className="text-sm font-black text-slate-900 mt-2">{inq.name}</h4>
                            <p className="text-[11px] text-slate-500 font-bold mt-1">
                              Email: <span className="text-slate-800">{inq.email}</span> | Phone: <span className="text-slate-800">{inq.mobile || "Not Provided"}</span>
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {new Date(inq.date).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 whitespace-pre-line font-medium italic">
                          "{inq.feedback || "Sender did not provide further feedback statements."}"
                        </p>

                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleInquiryAttendedToggle(inq.id, inq.attended)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 border ${
                              inq.attended
                                ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                : "bg-emerald-600 border-transparent text-white hover:bg-emerald-700"
                            }`}
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            {inq.attended ? "Attended Logged" : "Process Complete"}
                          </button>
                          <button
                            onClick={() => handleInquiryDelete(inq.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-650 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border border-red-200 hover:border-red-300 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No active diagnostic inquiry registers found.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. CATALOGUE PRODUCT CREATION AND REMOVE CARD */}
            {activeAdminSubTab === "products" && (
              <div className="space-y-10">
                {/* Product Sourcing Creator Form */}
                <form onSubmit={handleCreateProduct} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Add New Machine to Catalog</h3>
                    <p className="text-slate-500 text-xs mt-1 font-semibold">
                      Please enter the technical details and photo link for the new high-end diagnostic system.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Product Sourcing Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Philips ClearVue 350 Scanner"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category Section</label>
                      <select
                        value={newProdCategory}
                        id="new-prod-category"
                        name="new-prod-category"
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-xs font-semibold focus:outline-none focus:bg-white text-slate-700"
                        required
                      >
                        <option value="">-- Choose Category --</option>
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-sans">Product Display Photo URL</label>
                      <input
                        type="text"
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Stars Rating Level</label>
                      <select
                        value={newProdRating}
                        id="new-prod-rating"
                        name="new-prod-rating"
                        onChange={(e) => setNewProdRating(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-xs font-semibold focus:outline-none focus:bg-white text-slate-700"
                      >
                        <option value="5">5 Stars High Quality</option>
                        <option value="4">4 Stars Standard</option>
                        <option value="3">3 Stars Normal</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Short Description (Cards Block)</label>
                      <input
                        type="text"
                        placeholder="Compact, multi-parameter bedside anesthesia station configuration."
                        value={newProdShort}
                        onChange={(e) => setNewProdShort(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Long Full Description (Detail Modal Sheet)</label>
                      <textarea
                        rows={3}
                        placeholder="Insert clinical context details, thermal thresholds, and FDA approvals information..."
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800 resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Features (One point per line)</label>
                      <textarea
                        rows={3}
                        placeholder="E-Vent gas system support&#10;Water cooling technology&#10;Certified under FDA parameters..."
                        value={newProdFeatures}
                        onChange={(e) => setNewProdFeatures(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800 resize-none font-medium leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Technical Specifications List (Format: Key,Value on each line)</label>
                      <textarea
                        rows={3}
                        placeholder="Frequency range, 1.5 - 18 MHz&#10;Tidal Capacity, 1500 mL&#10;Power Supply, Standard 220V..."
                        value={newProdSpecs}
                        onChange={(e) => setNewProdSpecs(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800 resize-none font-medium leading-relaxed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" /> Save Machine to Registers
                  </button>
                </form>

                <hr className="border-slate-100" />

                {/* Database Catalog Listings for fast removal */}
                <div className="space-y-4">
                  <h4 className="text-base font-black text-slate-900 border-b border-slate-150 pb-2">Active Catalog Listings ({state?.products?.length || 0})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                    {state?.products?.map((p) => (
                      <div key={p.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between gap-3 text-xs font-medium">
                        <div className="truncate">
                          <p className="font-bold text-slate-900 truncate">{p.name}</p>
                          <p className="text-[10px] text-blue-600 font-semibold uppercase">{p.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-250 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                          title="Delete Machine option"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. CATEGORIES SETUP */}
            {activeAdminSubTab === "categories" && (
              <div className="space-y-6">
                <form onSubmit={handleCreateCategory} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Manage Sourcing Categories</h3>
                    <p className="text-slate-500 text-xs mt-1 font-semibold">Create or remove major medical equipment category compartments mapped to filters.</p>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="e.g. Pediatric ICU, Surgical Lasers"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-grow bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white text-slate-800"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0 uppercase tracking-wider"
                    >
                      <PlusCircle className="w-4 h-4" /> Add Slot
                    </button>
                  </div>
                </form>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Published Sourcing Compartments</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat} className="flex justify-between items-center py-2 px-4 bg-slate-50/80 border border-slate-150 rounded-xl text-xs font-bold text-slate-900/90">
                        <span>{cat}</span>
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="text-rose-600 hover:text-rose-700 p-1"
                          title="Remove Category compartment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. CONTACTS INFO LOG */}
            {activeAdminSubTab === "contact" && (
              <form onSubmit={handleUpdateContact} className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Configure Contact & Sourcing Coordinates</h3>
                  <p className="text-slate-500 text-xs mt-1 font-semibold">Change phone hotlines, emails, address blocks, and active WhatsApp number.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Institutional Postal Address</label>
                    <input
                      type="text"
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-sans">Sourcing Hotlines Phone</label>
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-sans font-medium">Configure WhatsApp Target (Numeric Only)</label>
                      <input
                        type="text"
                        value={contactWhatsapp}
                        onChange={(e) => setContactWhatsapp(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white text-slate-800 font-sans"
                        placeholder="e.g. 918049302930"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Support Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Sourcing Settings
                </button>
              </form>
            )}

            {/* 5. GALLERY MANAGEMENT */}
            {activeAdminSubTab === "gallery" && (
              <div className="space-y-8">
                <form onSubmit={handleAddGalleryItem} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Upload Gallery Image Frame</h3>
                    <p className="text-slate-500 text-xs mt-1 font-semibold">Publish high-res hospital installation photos on the Media Gallery page.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Display Header Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Operation Room 4 Live setup"
                        value={newGalTitle}
                        onChange={(e) => setNewGalTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Setup Category Mapped</label>
                      <input
                        type="text"
                        placeholder="e.g. Operation Theatre Setup, Critical Care"
                        value={newGalCategory}
                        onChange={(e) => setNewGalCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Image Asset Photo URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      value={newGalImage}
                      onChange={(e) => setNewGalImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" /> Save Media Asset to Gallery
                  </button>
                </form>

                <hr className="border-slate-100" />

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Active Media Visual Files ({state?.gallery?.length || 0})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                    {state?.gallery?.map((g) => (
                      <div key={g.id} className="relative group bg-slate-100 rounded-xl overflow-hidden shadow-sm aspect-video border border-slate-200">
                        <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/70 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] text-white font-black truncate">{g.title}</p>
                          <button
                            onClick={() => handleDeleteGalleryItem(g.id)}
                            className="bg-red-600 hover:bg-red-700 text-white rounded p-1 max-w-fit self-end text-[10px] font-black uppercase tracking-wider px-2 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. SERVICES AMC DELIVERABLES */}
            {activeAdminSubTab === "services" && (
              <div className="space-y-8">
                <form onSubmit={handleCreateService} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Publish Service Maintenance Option</h3>
                    <p className="text-slate-500 text-xs mt-1 font-semibold">List a specialized maintenance program or AMC assistance package.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Service Header Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Neonatal System Training Slas"
                        value={newSvcTitle}
                        onChange={(e) => setNewSvcTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Icon Representation</label>
                      <select
                        value={newSvcIcon}
                        id="new-svc-icon"
                        name="new-svc-icon"
                        onChange={(e) => setNewSvcIcon(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-xs font-semibold focus:outline-none focus:bg-white text-slate-700"
                      >
                        <option value="Wrench">Wrench Calibration Icon</option>
                        <option value="Shield">Shield Guarantee Icon</option>
                        <option value="Briefcase">Briefcase Sourcing Icon</option>
                        <option value="Activity">Activity Heartrate Icon</option>
                        <option value="PhoneCall">Phone Dispatch Handset</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-sans">Full Service Deliverable Description</label>
                    <textarea
                      rows={3}
                      placeholder="Insert detailed SLA cycles, biomedical diagnostics setups, or certified safety clearance protocols..."
                      value={newSvcDesc}
                      onChange={(e) => setNewSvcDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:bg-white text-slate-800 resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" /> Save Support Sla Deliverable
                  </button>
                </form>

                <hr className="border-slate-100" />

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Active Support Slas Listings ({state?.services?.length || 0})</h4>
                  <div className="space-y-2">
                    {state?.services?.map((s) => (
                      <div key={s.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-xs font-medium gap-3">
                        <div>
                          <p className="font-bold text-slate-900">{s.title}</p>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{s.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteService(s.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg flex-shrink-0 cursor-pointer"
                          title="Delete AMC services model"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
