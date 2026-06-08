import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, HelpCircle, MessageSquare } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export default function ContactView() {
  const { state, submitInquiry, inquiryMachineName, setInquiryMachineName } = useAppState();

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

  // Autofill product logic when user comes from products page selection!
  useEffect(() => {
    if (inquiryMachineName) {
      setFormData((prev) => ({
        ...prev,
        product: inquiryMachineName
      }));
    }
  }, [inquiryMachineName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setFormValidation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check basic validations
    if (!formData.name.trim()) {
      setFormValidation("Please fill in your full name.");
      return;
    }
    if (!formData.email.trim() && !formData.mobile.trim()) {
      setFormValidation("Please supply either an email address or mobile number so we can reach back.");
      return;
    }
    if (formData.email && !formData.email.includes("@")) {
      setFormValidation("Please provide a valid email structure.");
      return;
    }

    setIsSubmitting(true);
    setFormValidation(null);

    const success = await submitInquiry({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      product: formData.product || "General Consultation Request",
      feedback: formData.feedback
    });

    setIsSubmitting(false);

    if (success) {
      setFormSuccess(true);
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
      setFormValidation("Failed to deliver inquiry metrics. Please try again or call our support directly.");
    }
  };

  return (
    <div className="bg-gradient-to-tr from-slate-50 via-slate-100 to-blue-50/50 min-h-screen text-slate-800 selection:bg-blue-500/10">
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
            <div className="lg:col-span-5 space-y-10">
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
                <div className="flex gap-5 items-start bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:border-blue-500/40 hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Administration HQ Address</h4>
                    <p className="text-slate-800 text-xs sm:text-sm font-bold mt-1.5 leading-relaxed">{contact.address}</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:border-amber-500/40 hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Sourcing Hotlines</h4>
                    <p className="text-slate-800 text-xs sm:text-sm font-bold mt-1.5 leading-relaxed">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:border-blue-500/40 hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Electronic Mail Setup</h4>
                    <p className="text-blue-600 text-xs sm:text-sm font-bold mt-1.5 hover:text-blue-500 transition-colors">
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 items-start bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 hover:border-amber-500/40 hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Administrative Working Hours</h4>
                    <p className="text-slate-800 text-xs sm:text-sm font-bold mt-1.5 leading-relaxed">{contact.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Interactive Form with stable glassmorphic fade-in effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
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
                  <div className="relative bg-slate-950 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden text-white">
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
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="space-y-2"
                          >
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
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="space-y-2"
                          >
                            <label htmlFor="email" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Institutional Email <span className="text-amber-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="shrivastava@hospital.org"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all"
                              required
                            />
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="space-y-2"
                          >
                            <label htmlFor="mobile" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Mobile Number
                            </label>
                            <input
                              type="tel"
                              name="mobile"
                              id="mobile"
                              placeholder="+91 98765 XXXXX"
                              value={formData.mobile}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all"
                            />
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="space-y-2"
                          >
                            <label htmlFor="product" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Required Device or Machine
                            </label>
                            <input
                              type="text"
                              name="product"
                              id="product"
                              placeholder="e.g. GE Voluson E10, Dräger Primus"
                              value={formData.product}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all"
                            />
                          </motion.div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="space-y-2"
                        >
                          <label htmlFor="feedback" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Inquiry Details & Clinic Context
                          </label>
                          <textarea
                            name="feedback"
                            id="feedback"
                            rows={4}
                            placeholder="Specify AMC contracts, transducer requests, or setup timelines..."
                            value={formData.feedback}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-slate-800 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white/10 text-white placeholder:text-slate-600 transition-all resize-none leading-relaxed"
                          />
                        </motion.div>

                        {/* Native submit button with hover scale effects */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full relative group/btn border-none bg-transparent cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                        >
                          <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />

                          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black h-12 rounded-xl transition-all duration-300 flex items-center justify-center text-xs sm:text-sm uppercase tracking-widest shadow-lg shadow-blue-500/25">
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
