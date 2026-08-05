import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  Mail,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Lock,
  Activity,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  HelpCircle,
  Compass,
  Globe,
  Award,
  Loader2
} from 'lucide-react';
import Logo from './Logo';
import HeartbeatLine from './HeartbeatLine';
import { useAppState } from '../AppContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Lenis from 'lenis';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16
    }
  }
};

export default function ContactView() {
  const { state, submitInquiry, setCurrentTab } = useAppState();

  // Initialize Lenis Smooth Scroll for buttery smooth 60fps scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const defaultContact = {
    address: "VEL BIO MED - Medical equipment supplier, Hari Divya Complex, 55, Palayam Bazaar , Woraiyur, Tiruchirappalli, Tamil Nadu 620003",
    phone: "9629515551 | 9445922066",
    email: "velbiomed@gmail.com",
    workingHours: "Monday - Saturday: 9:00 AM - 6:30 PM (IST)",
    mapUrl: "https://maps.google.com/maps?q=Hari%20Divya%20Complex,%20Woraiyur,%20Tiruchirappalli&t=&z=15&ie=UTF8&iwloc=&output=embed"
  };

  const contact = state?.contactInfo || defaultContact;

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    hospitalName: '',
    doctorName: '',
    city: '',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  // SweetAlert Modal & Reference Number states
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4500);
  };

  useEffect(() => () => {
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
  }, []);

  const onlyLetters = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.ctrlKey || e.metaKey || e.altKey ||
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Home', 'End', 'Escape'].includes(e.key)
    ) {
      return;
    }
    if (!/^[a-zA-Z\s]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyDigits = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.ctrlKey || e.metaKey || e.altKey ||
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Home', 'End', 'Escape'].includes(e.key)
    ) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const type = target.type;
    const checked = (target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.mobileNumber.replace(/\s+/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.consent) newErrors.consent = 'You must accept the contact terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchCity = async ({ coords }: GeolocationPosition) => {
    setLocationLoading(true);
    setLocationError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
      );
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        '';
      if (city) {
        setFormData(prev => ({ ...prev, city }));
        setErrors(prev => ({ ...prev, city: null }));
        showToast('success', `City detected: ${city}`);
      } else {
        setLocationError('Could not determine city from your location.');
      }
    } catch {
      setLocationError('Failed to fetch location data.');
    } finally {
      setLocationLoading(false);
    }
  };

  const handleDetectCity = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    if (isTracking && watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsTracking(false);
      setLocationLoading(false);
      return;
    }
    setLocationError('');
    setIsTracking(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      fetchCity,
      () => {
        setLocationError('Location access denied. Please type city manually.');
        setIsTracking(false);
        setLocationLoading(false);
        showToast('error', 'Location permission denied.');
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setIsLoadingModal(true); // Open smooth loading overlay

      // Submit inquiry and ensure smooth minimum 1.2s loading state
      const submitPromise = submitInquiry ? submitInquiry({
        name: formData.fullName.trim(),
        email: formData.emailAddress.trim(),
        mobile: formData.mobileNumber.trim(),
        product: `Hospital: ${formData.hospitalName} | Doctor: ${formData.doctorName || 'N/A'}`,
        feedback: `[City: ${formData.city}] ${formData.message.trim()}`
      }) : Promise.resolve();

      const timerPromise = new Promise(resolve => setTimeout(resolve, 1400));

      await Promise.all([submitPromise, timerPromise]);

      setIsSubmitting(false);
      setIsLoadingModal(false);

      // Generate Reference Number & Trigger SweetAlert Modal!
      const randomTicket = `VBM-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefNumber(randomTicket);
      setShowSweetAlert(true);

      setFormData({
        fullName: '',
        mobileNumber: '',
        emailAddress: '',
        hospitalName: '',
        doctorName: '',
        city: '',
        message: '',
        consent: false
      });
    } else {
      showToast('error', 'Please complete all required fields.');
    }
  };

  return (
    <div className="contact-page-wrapper bg-gradient-to-tr from-sky-50/40 via-slate-50 to-orange-50/30 min-h-screen relative text-slate-800 font-sans selection:bg-sky-500/20 overflow-hidden tracking-tight">

      {/* GPU Hardware-Accelerated Ambient Backdrop (Zero Scroll Lag) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 transform-gpu translate-z-0">
        <div className="absolute -top-40 -left-40 w-full max-w-[500px] aspect-square bg-gradient-to-br from-sky-400/12 via-blue-500/08 to-transparent rounded-full blur-[140px] will-change-transform" />
        <div className="absolute top-1/4 -right-40 w-full max-w-[500px] aspect-square bg-gradient-to-bl from-orange-400/12 via-amber-500/08 to-transparent rounded-full blur-[150px] will-change-transform" />
        <div className="absolute -bottom-40 left-10 w-full max-w-[500px] aspect-square bg-gradient-to-tr from-blue-600/08 via-sky-400/08 to-transparent rounded-full blur-[140px] will-change-transform" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(135deg, #0284c7 0.5px, transparent 0.5px), linear-gradient(45deg, #f97316 0.5px, transparent 0.5px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* EXECUTIVE SUBMISSION LOADING MODAL OVERLAY */}
      <AnimatePresence>
        {isLoadingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative bg-white rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100 z-10 space-y-5 overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500 absolute top-0 left-0 right-0 animate-pulse" />

              {/* Animated ECG Pulse Spinner */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center pt-2">
                <div className="w-16 h-16 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin" />
                <Activity className="w-7 h-7 text-sky-600 absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-black text-slate-900 tracking-tight">Processing Request...</h4>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  Encrypting specifications & routing to Vel Bio Biomedical Desk
                </p>
              </div>

              {/* Progress Line Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SWEETALERT SUCCESS MODAL POPUP */}
      <AnimatePresence>
        {showSweetAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSweetAlert(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* SweetAlert Executive Popup Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="relative bg-white rounded-3xl max-w-lg w-full text-center shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)] border border-slate-100 z-10 overflow-hidden"
            >
              {/* Gradient Top Accent Bar */}
              <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500" />

              <div className="p-7 sm:p-9 space-y-6">

                {/* Badge Header */}
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> Official Request Confirmed
                  </span>
                </div>

                {/* SweetAlert Animated Checkmark Badge */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 transform rotate-3"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-25" />
                </div>

                {/* Modal Title & Text */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Inquiry Sent Successfully!
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out to <span className="font-bold text-sky-600">Vel Bio Healthcare</span>. Our biomedical technical consultant will review your request and contact you shortly.
                  </p>
                </div>

                {/* Confirmation Details Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-left space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">Reference Ticket</span>
                    <span className="font-black text-slate-900 font-mono text-xs">{refNumber || 'VBM-2026-8942'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">Response Estimate</span>
                    <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">&lt; 2-4 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-extrabold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Consultant Assigned
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  {/* Explore Website Button -> Navigates to Home */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      setShowSweetAlert(false);
                      if (setCurrentTab) {
                        setCurrentTab('home');
                      }
                    }}
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 hover:from-sky-700 hover:to-blue-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Explore Website</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setShowSweetAlert(false)}
                    className="w-full sm:w-auto py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer border-none"
                  >
                    Close Window
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl max-w-md ${toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-900/95 border-rose-500/40 text-rose-300'
              }`}
          >
            <div className={`p-2 rounded-xl ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {toast.type === 'success' ? <ShieldCheck className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-black uppercase tracking-wider">
                {toast.type === 'success' ? 'Request Status' : 'Notice'}
              </h5>
              <p className="text-xs font-semibold mt-0.5 text-slate-200">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white border-none bg-transparent cursor-pointer">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT SECTION */}
      <section className="py-8 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT COLUMN: Executive Branding & Direct Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-8"
          >
            {/* Executive Branding Panel */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Award className="w-32 h-32 text-sky-600" />
              </div>
              <Logo />
              <div className="h-1 w-20 bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500 rounded-full" />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Vel Bio Healthcare is a premier medical & biomedical equipment supplier in India, specializing in high-precision ICU systems, diagnostic ultrasound, surgical OT setups, and 24/7 technical AMC services.
              </p>
            </motion.div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Direct Communication Channels
                </h3>
              </div>

              {/* Phone Hotline Card */}
              <motion.a
                variants={itemVariants}
                href="tel:+917094878251"
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-sky-400 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-sky-500 to-blue-600 group-hover:w-2.5 transition-all duration-300" />
                <div className="p-3.5 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Phone Hotline</span>
                  <span className="text-slate-900 font-extrabold text-sm sm:text-base group-hover:text-sky-600 transition-colors">9629515551 | 9677788859</span>
                  <span className="text-slate-500 text-xs block font-medium">Mon - Sat: 9:00 AM - 7:00 PM | Priority Desk</span>
                </div>
              </motion.a>

              {/* Email Desk Card */}
              <motion.a
                variants={itemVariants}
                href="mailto:velbio@gmail.com"
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-500 to-teal-600 group-hover:w-2.5 transition-all duration-300" />
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Mail className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Official Email Desk</span>
                  <span className="text-slate-900 font-extrabold text-sm sm:text-base group-hover:text-emerald-600 transition-colors">velbio@gmail.com</span>
                  <span className="text-slate-500 text-xs block font-medium">Guaranteed response within 24 business hours</span>
                </div>
              </motion.a>

              {/* Business Hours Card */}
              <motion.div
                variants={itemVariants}
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 to-orange-500 group-hover:w-2.5 transition-all duration-300" />
                <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Clock className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Business Hours</span>
                  <span className="text-slate-900 font-extrabold text-sm">Monday – Saturday: 9:00 AM – 7:00 PM</span>
                  <span className="text-slate-500 text-xs block font-medium">Sunday: Emergency Critical Care Support</span>
                </div>
              </motion.div>

              {/* Corporate Office Card */}
              <motion.a
                variants={itemVariants}
                href="https://www.google.com/maps/place/VEL+BIO+MED+-+Medical+equipment+supplier/@11.3431194,78.2216324,9.64z/data=!4m10!1m2!2m1!1sVel+Bio+Healthcare+India!3m6!1s0x3baaf51c4fca421d:0x599b7e0900cf70b5!8m2!3d10.827287!4d78.676879!15sChhWZWwgQmlvIEhlYWx0aGNhcmUgSW5kaWFaGiIYdmVsIGJpbyBoZWFsdGhjYXJlIGluZGlhkgEabWVkaWNhbF_lcXVpcG1lbnRfc3VwcGxpZXKaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjVPYjAxV2FFZFhWR3Q0V2xaa1RsZHFXWGRTUmpsVlZqRm9NMDlGUlJBQuABAPoBBAgAEDQ!16s%2Fg%2F11qkn5ljt_?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 group-hover:w-2.5 transition-all duration-300" />
                <div className="p-3.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Corporate Office</span>
                  <span className="text-slate-900 font-extrabold text-sm group-hover:text-indigo-600 transition-colors">Vel Bio Healthcare, India</span>
                  <span className="text-slate-500 text-xs block font-medium">Click to open Google Maps directions</span>
                </div>
              </motion.a>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Executive Official Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xl shadow-slate-200/60 relative overflow-hidden">

              {/* Form Header */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5 mb-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-extrabold uppercase tracking-wider border border-sky-100 mb-2">
                    Official Enquiry Desk <Send className="w-3 h-3 -rotate-45" />
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    Send an <span className="text-sky-600">Official Enquiry</span>
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    Fill out the form below. Our biomedical technical consultants will provide datasheets and an instant quote.
                  </p>
                </div>
                <div className="hidden sm:block">
                  <HeartbeatLine />
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 tracking-wide">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center group/input">
                      <User className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within/input:text-sky-600 transition-colors pointer-events-none" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="e.g. Dr. Rajesh Kumar"
                        value={formData.fullName}
                        onKeyDown={onlyLetters}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 transition-all duration-200"
                      />
                    </div>
                    {errors.fullName && <span className="text-xs text-rose-500 font-bold block">{errors.fullName}</span>}
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <label htmlFor="mobileNumber" className="block text-xs font-bold text-slate-700 tracking-wide">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center group/input">
                      <Phone className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within/input:text-sky-600 transition-colors pointer-events-none" />
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="10-digit mobile number"
                        value={formData.mobileNumber}
                        maxLength={10}
                        onKeyDown={onlyDigits}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 transition-all duration-200"
                      />
                    </div>
                    {errors.mobileNumber && <span className="text-xs text-rose-500 font-bold block">{errors.mobileNumber}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label htmlFor="emailAddress" className="block text-xs font-bold text-slate-700 tracking-wide">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center group/input">
                      <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within/input:text-sky-600 transition-colors pointer-events-none" />
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        placeholder="e.g. name@hospital.com"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 transition-all duration-200"
                      />
                    </div>
                    {errors.emailAddress && <span className="text-xs text-rose-500 font-bold block">{errors.emailAddress}</span>}
                  </div>

                  {/* Hospital Name */}
                  <div className="space-y-2">
                    <label htmlFor="hospitalName" className="block text-xs font-bold text-slate-700 tracking-wide">
                      Hospital / Clinic Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center group/input">
                      <Building2 className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within/input:text-sky-600 transition-colors pointer-events-none" />
                      <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        placeholder="e.g. Apollo Multi-Specialty Hospital"
                        value={formData.hospitalName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 transition-all duration-200"
                      />
                    </div>
                    {errors.hospitalName && <span className="text-xs text-rose-500 font-bold block">{errors.hospitalName}</span>}
                  </div>

                  {/* Doctor Name */}
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="doctorName" className="block text-xs font-bold text-slate-700 tracking-wide">
                      Doctor / Consultant Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative flex items-center group/input">
                      <Stethoscope className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within/input:text-sky-600 transition-colors pointer-events-none" />
                      <input
                        type="text"
                        id="doctorName"
                        name="doctorName"
                        placeholder="e.g. Dr. S. Sharma, Chief Cardiologist"
                        value={formData.doctorName}
                        onKeyDown={onlyLetters}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* City with Live Geolocation Detection */}
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="city" className="block text-xs font-bold text-slate-700 tracking-wide">
                      City / Location <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center group/input">
                      <button
                        type="button"
                        onClick={handleDetectCity}
                        title={isTracking ? 'Stop live tracking' : 'Detect my city using location'}
                        className="absolute left-3.5 p-1 rounded-lg hover:bg-slate-200/60 transition-colors z-10 flex items-center justify-center border-none bg-transparent cursor-pointer"
                        style={{
                          color: isTracking ? '#ef4444' : '#0284c7'
                        }}
                      >
                        <MapPin className={`w-4 h-4 ${isTracking ? 'animate-bounce text-rose-500' : 'text-sky-600'}`} />
                      </button>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder={locationLoading ? 'Detecting location...' : 'Type city name (or click location pin to auto-detect)'}
                        value={formData.city}
                        onChange={handleInputChange}
                        onKeyDown={onlyLetters}
                        className="w-full pl-11 pr-20 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 transition-all duration-200"
                      />
                      {isTracking && (
                        <span className="absolute right-3.5 text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                          LIVE GPS
                        </span>
                      )}
                    </div>
                    {locationError && <span className="text-xs text-rose-500 font-bold block">{locationError}</span>}
                    {errors.city && <span className="text-xs text-rose-500 font-bold block">{errors.city}</span>}
                  </div>

                  {/* Message textarea */}
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 tracking-wide">
                      Message & Equipment Specifications <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Specify required equipment specs, transducers, quantity, or warranty preferences..."
                      maxLength={250}
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 transition-all duration-200 resize-none leading-relaxed"
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? (
                        <span className="text-xs text-rose-500 font-bold">{errors.message}</span>
                      ) : (
                        <span />
                      )}
                      <span className="text-[11px] font-semibold text-slate-400">{formData.message.length}/250 characters</span>
                    </div>
                  </div>

                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${formData.consent ? 'bg-sky-50/70 border-sky-300 shadow-sm' : 'bg-slate-50 border-slate-200'}`}>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-0.5 accent-sky-600 rounded cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                      <span className="text-xs font-semibold text-slate-700 leading-snug">
                        I authorize Vel Bio Healthcare representatives to contact me with official quotes, datasheets, and equipment specifications.
                      </span>
                    </div>
                  </label>
                  {errors.consent && <span className="text-xs text-rose-500 font-bold mt-1.5 block">{errors.consent}</span>}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden w-full py-4 px-8 bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 hover:from-sky-700 hover:to-blue-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-sky-600/30 hover:shadow-sky-600/40 disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2.5 border-none cursor-pointer group/btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Processing Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      <span>Submit Official Enquiry</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </motion.button>

                {/* Lock privacy footer */}
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>SSL Encrypted & Confidential | ISO Standard Process</span>
                </div>
              </form>

            </div>
          </motion.div>

        </div>
      </section>

      {/* EMBEDDED GOOGLE MAP SECTION */}
      <section className="py-6 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative h-64 sm:h-96 md:h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl group">
          <iframe
            src={contact.mapUrl}
            className="w-full h-full border-0 absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            title="Google Maps Location of Vel Bio Med Outer Ring Road, Bangalore"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute top-4 left-4 bg-slate-900/90 text-white p-4 rounded-2xl shadow-2xl z-10 hidden sm:block max-w-xs border border-white/10 pointer-events-none backdrop-blur-md">
            <p className="text-xs font-black uppercase tracking-wider text-amber-400">Corporate Headquarters</p>
            <p className="text-xs font-medium leading-relaxed mt-1 text-slate-200">
              Vel Bio Med Central Office is open Monday to Saturday for scheduled client demonstrations and equipment pickups.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
