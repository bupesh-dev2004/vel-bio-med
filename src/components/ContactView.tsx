import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, HelpCircle, MessageSquare } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { motion, AnimatePresence, useMotionValue, useTransform, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const cardSlideIn: Variants = {
  hidden: { opacity: 0, x: -35, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14
    }
  }
};

export default function ContactView() {
  const { state, submitInquiry, inquiryMachineName, setInquiryMachineName } = useAppState();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // For 3D card tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-350, 350], [8, -8]);
  const rotateY = useTransform(mouseX, [-350, 350], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const defaultContact = {
    address: "704-B, Phoenix Corporate Park, Outer Ring Road, Bengaluru - 560103, Karnataka, India",
    phone: "+91 80 4930 2930",
    email: "sales@velbiomed.co.in",
    workingHours: "Monday - Saturday: 9:00 AM - 6:30 PM (IST)",
    mapUrl: "https://maps.google.com/maps?q=Vel%20Bio%20Med%20Outer%20Ring%20Road,%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
  };

  const contact = state?.contactInfo || defaultContact;

  // Form hooks
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    product: "",
    feedback: ""
  });

  const [formValidation, setFormValidation] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast Notification state
  const [toastNotification, setToastNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToastNotification({ type, message });
    setTimeout(() => {
      setToastNotification(null);
    }, 4500);
  };

  // Autofill product logic when user comes from products page selection!
  useEffect(() => {
    if (inquiryMachineName) {
      setFormData((prev) => ({
        ...prev,
        product: inquiryMachineName
      }));
    }
  }, [inquiryMachineName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Allow only digits
      const digitsOnly = value.replace(/\D/g, "");
      // Limit to 10 digits
      if (digitsOnly.length > 10) {
        return;
      }
      setFormData((prev) => ({
        ...prev,
        mobile: digitsOnly
      }));
      setFormValidation(null);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setFormValidation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Check basic validations
    if (!formData.name.trim()) {
      const msg = "Please fill in your Contact Person Name.";
      setFormValidation(msg);
      showToast("error", msg);
      return;
    }
    if (!formData.mobile.trim()) {
      const msg = "Please fill in your Mobile Number.";
      setFormValidation(msg);
      showToast("error", msg);
      return;
    }
    if (formData.mobile.length !== 10) {
      const msg = "Please provide a valid 10-digit Mobile Number.";
      setFormValidation(msg);
      showToast("error", msg);
      return;
    }
    if (!formData.email.trim()) {
      const msg = "Please fill in your Institutional Email address.";
      setFormValidation(msg);
      showToast("error", msg);
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      const msg = "Please provide a valid Institutional Email address (e.g. name@hospital.org).";
      setFormValidation(msg);
      showToast("error", msg);
      return;
    }
    if (!formData.feedback.trim()) {
      const msg = "Please fill in the Inquiry Details & Clinic Context.";
      setFormValidation(msg);
      showToast("error", msg);
      return;
    }

    setIsSubmitting(true);
    setFormValidation(null);

    const result = await submitInquiry({
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      product: formData.product || "General Consultation Request",
      feedback: formData.feedback.trim()
    });

    setIsSubmitting(false);

    if (result.success) {
      setFormSuccess(true);
      showToast("success", result.message || "Inquiry submitted successfully!");
      // Reset form variables
      setFormData({
        name: "",
        email: "",
        mobile: "",
        product: "",
        feedback: ""
      });
      // Clear product redirect identifier from global context
      setInquiryMachineName(null);
    } else {
      setFormValidation(result.message);
      showToast("error", result.message);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-slate-50 via-slate-100 to-blue-50/50 min-h-screen text-slate-800 selection:bg-blue-500/10 relative">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl max-w-md ${toastNotification.type === "success"
                ? "bg-slate-900/95 border-emerald-500/40 text-emerald-300"
                : "bg-slate-900/95 border-rose-500/40 text-rose-300"
              }`}
          >
            <div
              className={`p-2 rounded-xl ${toastNotification.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-rose-500/10 text-rose-400"
                }`}
            >
              {toastNotification.type === "success" ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <HelpCircle className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-black uppercase tracking-wider">
                {toastNotification.type === "success" ? "Success" : "Error"}
              </h5>
              <p className="text-xs font-medium mt-0.5 leading-relaxed text-slate-200">
                {toastNotification.message}
              </p>
            </div>
            <button
              onClick={() => setToastNotification(null)}
              className="text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top cover title with cinematic high-contrast backdrop */}
      <section className="relative py-32 border-b border-slate-900 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://wallpaperbat.com/img/1872990-modern-hospital-modular-in-environments.jpg')] bg-cover bg-center opacity-[0.25] pointer-events-none" />

        {/* Floating gradient radial accent spots */}
        <div className="absolute -top-40 right-0 w-[450px] h-[450px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 left-0 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gradient-to-r from-blue-500/10 to-sky-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full"
          >
            <span className="text-blue-300 font-extrabold tracking-widest text-[10px] uppercase block font-sans">
              Contact Desk
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Request <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">Quotations</span> & <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">Handovers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-semibold"
          >
            Our corporate clinical agents supply <span className="text-blue-300 font-bold">quote sheets</span>, arrange <span className="text-white">logistics timelines</span>, and program <span className="text-cyan-300 font-bold">live virtual system presentations</span> on request.
          </motion.p>
        </div>
      </section>

      {/* Split details page with grid pattern details */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle background mesh grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(135deg, #0f172a 0.5px, transparent 0.5px), linear-gradient(45deg, #0f172a 0.5px, transparent 0.5px)`,
            backgroundSize: '36px 36px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column Address Info - Premium Light-Frosted clinical panels */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-5 space-y-10"
            >
              <div className="space-y-4">
                <span className="text-blue-600 font-black tracking-widest text-xs uppercase block mb-1">Corporate Details</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                  Vel Bio <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-amber-500 bg-clip-text text-transparent">Med Administration</span>
                </h2>
                <div className="w-16 h-[3px] bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 rounded-full" />
              </div>

              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                Feel free to visit our central demonstration workspace in Bengaluru or submit an inquiry check sheet to secure specialized quote sheets.
              </p>

              {/* Contact Icons block */}
              <div className="space-y-5">
                <motion.div
                  variants={cardSlideIn}
                  className="flex gap-5 items-center relative bg-gradient-to-br from-white/95 via-slate-50/70 to-white/95 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:shadow-blue-500/8 hover:border-blue-500/40 hover:translate-x-2 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  {/* Left accent color strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 via-indigo-650 to-cyan-500 group-hover:w-2.5 transition-all duration-300" />

                  <div className="p-3.5 bg-gradient-to-br from-blue-50 to-indigo-100/60 text-blue-600 rounded-2xl border border-blue-100/80 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">Administration HQ Address</h4>
                    <p className="text-slate-800 text-xs sm:text-sm font-bold mt-1 leading-relaxed">{contact.address}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardSlideIn}
                  className="flex gap-5 items-center relative bg-gradient-to-br from-white/95 via-slate-50/70 to-white/95 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:shadow-amber-500/8 hover:border-amber-500/40 hover:translate-x-2 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  {/* Left accent color strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-orange-500 to-yellow-400 group-hover:w-2.5 transition-all duration-300" />

                  <div className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-100/60 text-amber-600 rounded-2xl border border-amber-100/80 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-amber-500 transition-colors">Direct Sourcing Hotlines</h4>
                    <p className="text-slate-800 text-xs sm:text-sm font-bold mt-1 leading-relaxed">{contact.phone}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardSlideIn}
                  className="flex gap-5 items-center relative bg-gradient-to-br from-white/95 via-slate-50/70 to-white/95 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:shadow-blue-500/8 hover:border-blue-500/40 hover:translate-x-2 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  {/* Left accent color strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 via-sky-600 to-cyan-500 group-hover:w-2.5 transition-all duration-300" />

                  <div className="p-3.5 bg-gradient-to-br from-blue-50 to-sky-100/60 text-blue-600 rounded-2xl border border-blue-100/80 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    <Mail className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">Electronic Mail Setup</h4>
                    <p className="text-blue-600 text-xs sm:text-sm font-bold mt-1 leading-relaxed">
                      <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardSlideIn}
                  className="flex gap-5 items-center relative bg-gradient-to-br from-white/95 via-slate-50/70 to-white/95 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:shadow-amber-500/8 hover:border-amber-500/40 hover:translate-x-2 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  {/* Left accent color strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-orange-500 to-yellow-400 group-hover:w-2.5 transition-all duration-300" />

                  <div className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-100/60 text-amber-600 rounded-2xl border border-amber-100/80 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    <Clock className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-amber-500 transition-colors">Administrative Working Hours</h4>
                    <p className="text-slate-800 text-xs sm:text-sm font-bold mt-1 leading-relaxed">{contact.workingHours}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column Interactive Form with premium glassmorphic fade-up effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 w-full relative z-10"
            >
              <div className="relative group">
                {/* Traveling border light beam effect */}
                <div className="absolute -inset-[1px] rounded-3xl overflow-hidden pointer-events-none">
                  {/* Top light beam */}
                  <motion.div
                    className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80"
                    animate={{ left: ["-50%", "100%"] }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                  />
                  {/* Right light beam */}
                  <motion.div
                    className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-80"
                    animate={{ top: ["-50%", "100%"] }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.7 }}
                  />
                  {/* Bottom light beam */}
                  <motion.div
                    className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80"
                    animate={{ right: ["-50%", "100%"] }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
                  />
                  {/* Left light beam */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-80"
                    animate={{ bottom: ["-50%", "100%"] }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 2.2 }}
                  />
                </div>

                {/* Card border shadow */}
                <div className="absolute -inset-[0.5px] rounded-3xl bg-gradient-to-r from-blue-500/10 via-amber-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Glass Card Body */}
                <div className="relative bg-slate-950 backdrop-blur-2xl rounded-3xl p-5 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden text-white">
                  {/* Subtle grid pattern inside */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {formSuccess ? (
                    <div className="py-12 px-4 text-center max-w-md mx-auto space-y-6">
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl border border-emerald-500/20">
                        <ShieldCheck className="w-10 h-10 animate-pulse" />
                      </div>
                      <h3 className="text-2.5xl font-black bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent tracking-tight">Inquiry Sheet Submitted!</h3>
                      <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                        Thank you. Your request sheet has been recorded successfully in our database. One of our biomedical sourcing directors will call or email you with formal catalogs shortly.
                      </p>
                      <button
                        onClick={() => {
                          setFormSuccess(false);
                          setInquiryMachineName(null);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold text-xs py-3.5 px-8 rounded-xl uppercase tracking-wider transition-all hover:scale-103 cursor-pointer border-none shadow-lg shadow-blue-500/20"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">Biomedical Inquiry Form</h3>
                        <p className="text-slate-400 text-xs font-semibold">Specify your clinic configuration to secure certified quote sheets.</p>
                      </div>

                      {/* Errors message display */}
                      {formValidation && (
                        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-black">
                          ⚠️ {formValidation}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Contact Person Name <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Dr. Shrivastava"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="mobile" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Mobile Number <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            placeholder="e.g. 9876543210 (10 digits)"
                            maxLength={10}
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Institutional Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="shrivastava@hospital.org"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all"
                          />
                        </div>

                        <div className="space-y-2 relative">
                          <label htmlFor="product" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Required Device or Machine
                          </label>
                          <div className="relative" ref={dropdownRef}>
                            <button
                              type="button"
                              onClick={() => setIsOpen(!isOpen)}
                              className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-3.5 text-xs font-bold text-left text-white flex items-center justify-between transition-all focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                              <span className={formData.product ? "text-white" : "text-slate-500"}>
                                {formData.product || "Select a Device / Machine"}
                              </span>
                              <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute z-50 w-full top-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl max-h-40 overflow-y-auto"
                                  style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#334155 transparent'
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, product: "General Sourcing Inquiry" }));
                                      setIsOpen(false);
                                    }}
                                    className="w-full px-3.5 py-2 text-left text-xs font-bold text-slate-300 hover:bg-blue-600 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
                                  >
                                    General Sourcing Inquiry
                                  </button>
                                  {(state?.products || []).map((prod) => (
                                    <button
                                      key={prod.id}
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => ({ ...prev, product: prod.name }));
                                        setIsOpen(false);
                                      }}
                                      className="w-full px-3.5 py-2 text-left text-xs font-bold text-white hover:bg-blue-600 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
                                    >
                                      {prod.name}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label htmlFor="feedback" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Inquiry Details & Clinic Context <span className="text-amber-500">*</span>
                          </label>
                          <textarea
                            name="feedback"
                            id="feedback"
                            rows={4}
                            placeholder="Specify AMC contracts, transducer requests, or setup timelines..."
                            value={formData.feedback}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all resize-none leading-relaxed"
                            required
                          />
                        </div>
                      </div>

                      {/* Native submit button with hover scale effects */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full p-0 relative group/btn border-none bg-transparent cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                      >
                        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black h-12 rounded-xl transition-all duration-300 flex items-center justify-center text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest shadow-lg shadow-blue-500/25">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -z-10"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                            style={{ opacity: isSubmitting ? 1 : 0 }}
                          />

                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center gap-2"
                              >
                                <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                                <span>Routing Sourcing Data...</span>
                              </motion.div>
                            ) : (
                              <motion.span
                                key="btn-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center gap-2"
                              >
                                Submit Sourcing Inquiry
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Embedded High accuracy Google map Iframe */}
      <section className="h-96 md:h-[450px] w-full relative group overflow-hidden">
        <iframe
          src={contact.mapUrl}
          className="w-full h-full border-0 absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
          title="Google Maps Location of Vel Bio Med Outer Ring Road, Bangalore"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-4 left-4 bg-slate-900/90 text-white p-4 rounded-xl shadow-2xl z-10 hidden sm:block max-w-xs border border-white/10 pointer-events-none">
          <p className="text-xs font-black uppercase tracking-wider text-amber-500">Headquarters</p>
          <p className="text-xs font-medium leading-relaxed mt-1 text-slate-150">Vel Bio Med Corporate Office is fully accessible during business operating hours.</p>
        </div>
      </section>
    </div>
  );
}
