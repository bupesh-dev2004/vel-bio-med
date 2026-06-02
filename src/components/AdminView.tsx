import React, { useState } from "react";
import { useAppState } from "../AppContext.js";
import { PlusCircle, Trash2, CheckCircle2, FileText, ShoppingBag, Image, PhoneCall, Award, Star, ListCollapse, List, Save, UserCheck, X, Lock, Unlock, User, Key, Eye, EyeOff, HelpCircle, ShieldAlert } from "lucide-react";
import { Product, Testimonial, GalleryItem, Service, HomeSlide, ContactInfo } from "../types.js";

export default function AdminView() {
  const {
    state,
    toggleInquiryAttended,
    deleteInquiry,
    createProduct,
    deleteProduct,
    createCategory,
    deleteCategory,
    updateContactInfo,
    addGalleryItem,
    deleteGalleryItem,
    createService,
    deleteService
  } = useAppState();
  const categories = state?.categories || [];

  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"inquiries" | "products" | "categories" | "slides" | "contact" | "gallery" | "services">("inquiries");

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

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
      await toggleInquiryAttended(id);
      displayMessage("Inquiry validation adjusted successfully.");
    } catch (e) {
      displayMessage("Error updating inquiry state.", true);
    }
  };

  const handleInquiryDelete = async (id: string) => {
    try {
      await deleteInquiry(id);
      displayMessage("Inquiry removed from database registers.");
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
      await createProduct({
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
      });

      displayMessage(`Product '${newProdName}' added successfully to catalog.`);
      // Reset inputs
      setNewProdName("");
      setNewProdImage("");
      setNewProdShort("");
      setNewProdDesc("");
      setNewProdFeatures("");
    } catch (err) {
      displayMessage("Failed to insert product.", true);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      displayMessage("Product deleted from catalogs.");
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
      await createCategory(newCategoryName.trim());
      displayMessage(`Category '${newCategoryName}' added.`);
      setNewCategoryName("");
    } catch (e) {
      displayMessage("Error adding category.", true);
    }
  };

  const handleDeleteCategory = async (cat: string) => {
    try {
      await deleteCategory(cat);
      displayMessage(`Category '${cat}' removed.`);
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
      await updateContactInfo({
        address: contactAddress,
        phone: contactPhone,
        email: contactEmail,
        whatsappNumber: contactWhatsapp,
        workingHours: state?.contactInfo?.workingHours || "Monday - Saturday: 9:00 AM - 6:30 PM (IST)",
        mapUrl: state?.contactInfo?.mapUrl || "https://maps.google.com/maps?q=Vel%20Bio%20Med%20Bengaluru&t=&z=13&ie=UTF8&iwloc=&output=embed"
      });
      displayMessage("Corporate and WhatsApp details saved successfully.");
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
      await addGalleryItem({
        title: newGalTitle,
        image: newGalImage,
        category: newGalCategory || "General Setup"
      });
      displayMessage("New visual portfolio element uploaded.");
      setNewGalTitle("");
      setNewGalImage("");
    } catch (e) {
      displayMessage("Error delivering gallery asset.", true);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    try {
      await deleteGalleryItem(id);
      displayMessage("Gallery visual file removed.");
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
      await createService({
        title: newSvcTitle,
        description: newSvcDesc,
        iconName: newSvcIcon
      });
      displayMessage(`AMC service model '${newSvcTitle}' published.`);
      setNewSvcTitle("");
      setNewSvcDesc("");
    } catch (e) {
      displayMessage("Error publishing support model.", true);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteService(id);
      displayMessage("AMC service option removed.");
    } catch (e) {
      displayMessage("Error deleting service option.", true);
    }
  };

  const defaultContactAddress = "704-B, Phoenix Corporate Park, Outer Ring Road, Bengaluru - 560103, Karnataka, India";
  const defaultContactPhone = "+91 80 4930 2930";
  const defaultContactEmail = "sales@velbiomed.co.in";
  const defaultContactWhatsapp = "918049302930";

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUser.trim().toLowerCase() === "admin" && inputPass === "Admin123") {
      setIsAuthenticated(true);
      setLoginError("");
      displayMessage("Authenticated successfully. Welcome back, Admin.");
    } else {
      setLoginError("Invalid username or password credentials.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-[80vh] font-sans flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow ambient design elements matching brand logo gradient */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            {/* Pulsing Lock Header Icon with Brand Logo Gradient */}
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300 animate-pulse">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-black text-slate-900 tracking-tight">
              Admin Gateway
            </h2>
            <p className="mt-2 text-center text-xs text-slate-500 uppercase tracking-widest font-black">
              Vel Bio Med Sourcing Registry
            </p>
          </div>

          <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/80 shadow-xl">
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="p-3.5 bg-rose-50 border border-rose-250 text-rose-705 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4.5 h-4.5 text-rose-500 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="username-input" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="username-input"
                      type="text"
                      required
                      value={inputUser}
                      onChange={(e) => setInputUser(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none transition-all text-slate-800"
                      placeholder="Enter administrator username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password-input" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Key className="w-4 h-4" />
                    </span>
                    <input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      required
                      value={inputPass}
                      onChange={(e) => setInputPass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-10 pr-10 text-xs font-semibold focus:outline-none transition-all text-slate-800"
                      placeholder="Enter verification password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-650"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs py-3.5 rounded-xl shadow-md shadow-blue-500/10 transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Unlock className="w-4 h-4" /> Verify Credentials
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 p-1 bg-slate-50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-xl bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">ISO Security Protocol</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  For healthcare infrastructure security compliance (ISO 13485 regulations), automated password resets are disabled.
                </p>
                <div className="bg-slate-50/80 border border-slate-150 p-4 rounded-2xl text-left space-y-2 text-xs font-semibold text-slate-650">
                  <p className="text-slate-950 font-bold uppercase tracking-wider text-[10px]">Manual Verification Required:</p>
                  <p>1. Contact Corporate IT Support at <span className="text-blue-600 select-all font-bold">admin@velbiomed.co.in</span></p>
                  <p>2. Provide your institutional authorization code.</p>
                  <p>3. Reset window requires active security clearance.</p>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs py-3 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Dashboard Title banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-amber-950/20 text-white rounded-3xl p-8 mb-8 shadow-xl border border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500" />
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

        {/* Quick Analytics Dashboard Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              label: "Active Products",
              value: state?.products?.length || 0,
              desc: "Catalog registers",
              color: "from-blue-600 to-sky-400",
              bg: "bg-blue-500/10",
              icon: (
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )
            },
            {
              label: "Pending Inquiries",
              value: state?.inquiries?.filter((i) => !i.attended)?.length || 0,
              desc: "Requires response",
              color: "from-rose-600 to-amber-500",
              bg: "bg-rose-500/10",
              icon: (
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 bg-rose-450 bg-rose-450 bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-550 bg-rose-500 flex items-center justify-center text-white text-[9px] font-black">
                    !
                  </span>
                </span>
              )
            },
            {
              label: "Gallery Assets",
              value: state?.gallery?.length || 0,
              desc: "Portfolio visuals",
              color: "from-sky-500 to-indigo-500",
              bg: "bg-sky-500/10",
              icon: (
                <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )
            },
            {
              label: "SLA Service Plans",
              value: state?.services?.length || 0,
              desc: "Active AMC layouts",
              color: "from-amber-500 to-orange-600",
              bg: "bg-amber-500/10",
              icon: (
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              )
            }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex items-center justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle line indicator matching the gradient */}
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="space-y-1">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <span className="block text-2xl sm:text-3xl font-black text-slate-900 leading-none">{stat.value}</span>
                <span className="block text-[10px] font-semibold text-slate-500">{stat.desc}</span>
              </div>
              <div className={`h-11 w-11 rounded-2xl ${stat.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Local responses notifications with animations */}
        {successMsg && (
          <div className="p-4 bg-emerald-50/90 backdrop-blur-xs border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold rounded-2xl mb-8 flex items-center gap-3 shadow-md shadow-emerald-500/5 animate-fadeIn">
            <div className="p-1 bg-emerald-500 text-white rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>Success: {successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-rose-50/90 backdrop-blur-xs border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold rounded-2xl mb-8 flex items-center gap-3 shadow-md shadow-rose-500/5 animate-fadeIn">
            <div className="p-1 bg-rose-500 text-white rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
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
                    ? "bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 text-white shadow-lg shadow-blue-500/10 scale-[1.02]"
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
                        className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                          inq.attended
                            ? "bg-slate-50/40 border-slate-200/60 opacity-60 hover:opacity-100"
                            : "bg-gradient-to-br from-blue-50/10 to-slate-50 border-blue-200/80 shadow-xs hover:shadow-md"
                        }`}
                      >
                        {/* Status border left */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${inq.attended ? "bg-slate-300" : "bg-gradient-to-b from-blue-600 via-sky-400 to-amber-500"}`} />

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-lg border border-blue-100">
                                {inq.product || "General Enquiry"}
                              </span>
                              {!inq.attended ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                  </span>
                                  <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded border border-rose-100">NEW INQUIRY</span>
                                </div>
                              ) : (
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                                  ✓ Attended
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-black text-slate-900 mt-2.5">{inq.name}</h4>
                            <p className="text-[11px] text-slate-500 font-bold mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span>Email: <span className="text-slate-800 select-all font-semibold">{inq.email}</span></span>
                              <span className="text-slate-300">•</span>
                              <span>Phone: <span className="text-slate-800 select-all font-semibold">{inq.mobile || "Not Provided"}</span></span>
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-extrabold bg-slate-100 px-2.5 py-1 rounded-lg">
                            {new Date(inq.date).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-slate-650 text-xs sm:text-sm leading-relaxed mb-5 whitespace-pre-line font-medium italic pl-2 border-l-2 border-slate-200">
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
                            {inq.attended ? "Re-open Ticket" : "Mark as Attended"}
                          </button>
                          <button
                            onClick={() => handleInquiryDelete(inq.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border border-red-200 hover:border-red-300 transition-all cursor-pointer flex items-center gap-1"
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

                  {/* Predefined Image Quick Selection Column/Grid */}
                  <div className="space-y-2.5">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Or Choose Predefined Biomedical Photo Asset:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                      {[
                        {
                          name: "ICU Ventilator",
                          url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop"
                        },
                        {
                          name: "ECG Monitor",
                          url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop"
                        },
                        {
                          name: "Anesthesia Unit",
                          url: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?q=80&w=600&auto=format&fit=crop"
                        },
                        {
                          name: "Ultrasound scan",
                          url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop"
                        },
                        {
                          name: "Autoclave Sterilizer",
                          url: "https://images.unsplash.com/photo-1607619056574-7b8f304b3c86?q=80&w=600&auto=format&fit=crop"
                        },
                        {
                          name: "Operation Theater",
                          url: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=600&auto=format&fit=crop"
                        }
                      ].map((preset) => {
                        const isSelected = newProdImage === preset.url;
                        return (
                          <div
                            key={preset.name}
                            onClick={() => setNewProdImage(preset.url)}
                            className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 group ${
                              isSelected
                                ? "border-amber-500 ring-2 ring-amber-500/20 scale-[1.03] shadow-md shadow-amber-500/10"
                                : "border-slate-200 hover:border-slate-350 hover:scale-[1.02]"
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className={`absolute inset-0 bg-slate-950/60 p-1.5 flex flex-col justify-end transition-opacity duration-200 ${
                              isSelected ? "opacity-100" : "opacity-75 group-hover:opacity-90"
                            }`}>
                              <p className="text-[8px] text-white font-black uppercase tracking-wider truncate">
                                {preset.name}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="absolute top-1 right-1 bg-amber-500 text-white rounded-full p-0.5 shadow-sm">
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
                    className="w-full bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-blue-500/10"
                  >
                    <PlusCircle className="w-4 h-4" /> Save Machine to Registers
                  </button>
                </form>

                <hr className="border-slate-100" />

                 {/* Database Catalog Listings with thumbnails & premium hover removal */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    Active Catalog Listings ({state?.products?.length || 0})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                    {state?.products?.map((p) => (
                      <div key={p.id} className="p-3.5 bg-slate-50 hover:bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between gap-3 text-xs font-medium transition-all duration-300 hover:shadow-md relative group overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="truncate min-w-0">
                            <p className="font-extrabold text-slate-900 truncate">{p.name}</p>
                            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">{p.category}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">{p.rating}★ Rating</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="w-full mt-2 py-2 text-rose-600 hover:text-white bg-white hover:bg-rose-600 border border-slate-200 hover:border-transparent rounded-xl transition-all duration-200 font-bold uppercase tracking-wider text-[9px] flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                          title="Delete Machine option"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete Machine
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
                      className="bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold text-xs px-6 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0 uppercase tracking-wider"
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
                  className="w-full bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-blue-500/10"
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
                    className="w-full bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-blue-500/10"
                  >
                    <PlusCircle className="w-4 h-4" /> Save Media Asset to Gallery
                  </button>
                </form>

                <hr className="border-slate-100" />

                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Image className="w-4 h-4 text-blue-600" />
                    Active Media Gallery Photos ({state?.gallery?.length || 0})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                    {state?.gallery?.map((g) => (
                      <div key={g.id} className="relative group bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs aspect-video transition-all duration-300 hover:shadow-md">
                        <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-blue-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md self-start truncate max-w-full">
                            {g.category || "Setup"}
                          </span>
                          <div className="space-y-1.5">
                            <p className="text-[10px] text-white font-extrabold truncate">{g.title}</p>
                            <button
                              onClick={() => handleDeleteGalleryItem(g.id)}
                              className="w-full bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-black uppercase tracking-wider py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
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
                    className="w-full bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-blue-500/10"
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
