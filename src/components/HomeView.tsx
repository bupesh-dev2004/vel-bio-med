import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Award, ShieldCheck, Zap, Activity, Star, Eye, MessageSquare, Check, ArrowRight, StarHalf, Building, ThumbsUp, CheckSquare, Heart } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { Product } from "../types.js";
import { FrostedGlassCard } from "@/components/ui/interactive-frosted-glass-card";
import { BorderRotate } from "@/components/ui/animated-gradient-border";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { Logos3 } from "@/components/ui/logos3";
import ImageGallery from "@/components/ui/image-gallery";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HomeViewProps {
  onOpenProductModal: (p: Product) => void;
}

function AnimatedCounter({ target, duration = 1500, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = target;
    const isDecimal = !Number.isInteger(target);
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const currentVal = easeProgress * (end - start) + start;

      if (isDecimal) {
        setCount(parseFloat(currentVal.toFixed(1)));
      } else {
        setCount(Math.floor(currentVal));
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasStarted, target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function HomeView({ onOpenProductModal }: HomeViewProps) {
  const { state, setCurrentTab, setInquiryMachineName } = useAppState();

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = state?.homeSlides || [];
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [slides.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    if (slides.length > 0) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const handlePrevSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoSlide();
  };

  const handleNextSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  // Products filters
  const trendingProducts = state?.products?.filter((p) => p.trending) || [];
  const dynamicProducts = state?.products || [];
  const latestAcquisitions = state?.products ? [...state.products].slice(-4).reverse() : [];

  // Clients Mock
  const clientLogos = [
    { name: "Fortis Healthcare", icon: "🏥" },
    { name: "Apollo Hospitals", icon: "⚕️" },
    { name: "Max Health", icon: "🩺" },
    { name: "Aster CMI", icon: "💉" },
    { name: "Manipal Hospital", icon: "❤️" },
    { name: "Medanta Medicity", icon: "🎗️" },
    { name: "Narayana Health", icon: "🧬" }
  ];

  // Testimonials Carousel
  const testimonials = state?.testimonials || [];

  const startInquiry = (productName: string) => {
    setInquiryMachineName(productName);
    setCurrentTab("contact");
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. HERO SLIDER */}
      <section className="relative h-[480px] md:h-[600px] overflow-hidden bg-slate-900 group/slider">
        {slides.length > 0 ? (
          slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              {/* Background with subtle Zoom effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms]"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  transform: idx === currentSlide ? "scale(1.05)" : "scale(1)"
                }}
              />
              {/* Overlay with Medical blue tint gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-blue-950/40" />

              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial from-blue-500/12 via-blue-900/0 to-transparent rounded-full pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-radial from-amber-500/10 via-amber-650/0 to-transparent rounded-full pointer-events-none z-10" />

              {/* Slider content */}
              <div className="absolute inset-0 flex items-center z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl text-left text-white space-y-4 md:space-y-6">
                    <span className="inline-block bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 text-white text-[10px] sm:text-xs font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg shadow-blue-500/20">
                      {slide.tagline}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                      {idx === 0 && (
                        <span>Transforming <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">Healthcare</span> One Installation at a Time</span>
                      )}
                      {idx === 1 && (
                        <span>Your Trusted Partner in <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Medical Excellence</span></span>
                      )}
                      {idx === 2 && (
                        <span>Innovative Medical <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">Equipment</span> Solutions</span>
                      )}
                      {idx >= 3 && slide.heading}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-medium">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-3.5 pt-2">
                      <button
                        onClick={() => setCurrentTab("products")}
                        className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-black text-xs sm:text-sm py-3.5 px-6 sm:px-8 rounded-xl shadow-xl shadow-blue-500/25 hover:scale-103 transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer border-none"
                      >
                        Explore Products <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentTab("contact")}
                        className="bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white font-black text-xs sm:text-sm py-3.5 px-6 sm:px-8 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-103 transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer border-none"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-blue-900 flex items-center justify-center text-white">
            No Homepage Slides Available
          </div>
        )}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/45 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/45 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                stopAutoSlide();
                setCurrentSlide(idx);
                startAutoSlide();
              }}
              className={`w-3.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-blue-500 w-7" : "bg-white/40"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. ELEVATING HEALTHCARE EXCELLENCE SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        {/* Ambient Decorative Light Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Sticky Summary & Stats Counters */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 font-bold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4 border border-blue-100/80">
                  <Activity className="w-3.5 h-3.5" /> Our Performance
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Elevating <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Healthcare Excellence</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mt-4 rounded-full" />
              </div>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                Supporting health clinics and emergency services globally with cutting-edge bioscience machinery and specialized training setup. We bridge technical operations with flawless medical readiness.
              </p>

              {/* High-Impact Stat Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-sm transition-all duration-300">
                  <span className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight block">
                    <AnimatedCounter target={12} suffix="+" />
                  </span>
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block mt-1">Years Experience</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-sm transition-all duration-300">
                  <span className="text-3xl md:text-4xl font-extrabold text-amber-500 tracking-tight block">
                    <AnimatedCounter target={450} suffix="+" />
                  </span>
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block mt-1">Doctors Trusted</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-sm transition-all duration-300">
                  <span className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight block">
                    <AnimatedCounter target={1500} suffix="+" />
                  </span>
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block mt-1">ICU Installations</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-sm transition-all duration-300">
                  <span className="text-3xl md:text-4xl font-extrabold text-amber-500 tracking-tight block">
                    <AnimatedCounter target={99.8} suffix="%" />
                  </span>
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block mt-1">Calibration SLA</span>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful Interactive Detail Cards */}
            <div className="lg:col-span-7 space-y-6">

              {/* Pillar Card 1 */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 group-hover:h-full transition-all" />
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                  <Award className="w-7 h-7" />
                </div>
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Extensive Experience</h3>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-blue-100">Pillar 01</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Over 12+ years of providing turnkey equipment configurations, technical safety clearance, and customized installations for multi-specialty hospitals. We handle layout logistics, heavy compliance checks, and secure continuous operation contracts.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentTab("about")}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors group/btn cursor-pointer"
                    >
                      Read Our Vision <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pillar Card 2 */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 group-hover:h-full transition-all" />
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
                  <ThumbsUp className="w-7 h-7" />
                </div>
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Client Satisfaction</h3>
                    <span className="bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-100">Pillar 02</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Trusted by 450+ doctors and critical care specialists for zero-tolerance product quality, high accuracy metrics, and quick repair responses. Our emergency servicing support remains available 24/7.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentTab("contact")}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-800 transition-colors group/btn cursor-pointer"
                    >
                      Work With Us <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pillar Card 3 */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 group-hover:h-full transition-all" />
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                  <CheckSquare className="w-7 h-7" />
                </div>
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Proven Installations</h3>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-blue-100">Pillar 03</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Successful setup of 1500+ ICU respiratory beds, diagnostics ultrasound machinery chambers, and double-door steam sanitization centers. We maintain direct logistics linkages with global medical providers.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentTab("gallery")}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors group/btn cursor-pointer"
                    >
                      Browse Portfolios <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>



      {/* 3. LATEST PRODUCTS GALLERY */}
      <ImageGallery />

      {/* 4. TRENDING PRODUCTS GRID */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-2">Specialty Focus</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Trending Critical Machinery</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium">
              Medical setups demanded in high acuity clinical rooms. Certified with absolute safety standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto justify-items-center">
            {trendingProducts.length > 0 ? (
              trendingProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl w-full hover:shadow-lg hover:border-slate-350 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Left Side: Image container */}
                  <div className="relative w-full h-56 md:h-44 md:w-48 mb-4 md:mb-0 flex-shrink-0 bg-slate-200 rounded-base overflow-hidden">
                    <img
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 text-transparent"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded shadow-sm z-10">
                      HOT SELLING
                    </div>
                  </div>

                  {/* Right Side: Product Details */}
                  <div className="flex flex-col justify-between flex-grow md:pl-6 leading-normal w-full min-w-0">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest truncate mr-2">
                          {item.category}
                        </span>
                        {/* Star Rating */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[11px] text-slate-500 font-bold">({item.rating}.0)</span>
                        </div>
                      </div>

                      <h5 className="mb-2 text-xl font-bold tracking-tight text-heading group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.name}
                      </h5>
                      <p className="mb-5 text-xs text-body leading-relaxed font-medium line-clamp-2">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50">
                      <button
                        type="button"
                        onClick={() => onOpenProductModal(item)}
                        className="inline-flex items-center w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-bold leading-5 rounded-base text-[11px] px-3.5 py-2.5 focus:outline-none cursor-pointer transition-all gap-1"
                      >
                        Quick View
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => startInquiry(item.name)}
                        className="inline-flex items-center w-auto text-white bg-blue-600 box-border border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-100 shadow-xs font-bold leading-5 rounded-base text-[11px] px-3.5 py-2.5 focus:outline-none cursor-pointer transition-all gap-1"
                      >
                        Inquire Now
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400">No trending items configured.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Glow ambient design elements */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side Image wrapped in rotating gradient border */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl transform rotate-2 scale-103 opacity-15 blur-sm" />

              <BorderRotate
                animationMode="auto-rotate"
                animationSpeed={6}
                borderWidth={3.5}
                borderRadius={28}
                gradientColors={{
                  primary: '#3b82f6',
                  secondary: '#6366f1',
                  accent: '#06b6d4'
                }}
                backgroundColor="#020617"
                className="p-1"
              >
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                    alt="Vel Bio Med critical care service support"
                    className="w-full h-auto object-cover relative z-10 shadow-2xl"
                  />
                </div>
              </BorderRotate>

              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden sm:block border border-blue-500/30">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-100 mt-1">Uptime SLA Support</p>
                <p className="text-blue-100 text-[11px] mt-2 font-medium leading-relaxed">Our engineers are dispatched immediately for high emergency troubleshooting alerts.</p>
              </div>
            </div>

            {/* Right side content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-blue-400 font-bold tracking-widest text-xs uppercase block mb-1">Corporate Strengths</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Our Uncompromising Standard of Reliability
                </h2>
                <div className="w-12 h-1 bg-blue-50 mt-4 rounded-full" />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                Vel Bio Med bridges the technical void in biological science distribution by delivering world-class hospital equipment, fast emergency servicing response, and long term comprehensive warranties.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  {
                    title: "Continuous Quality",
                    subtitle: "Tier-1 Calibration",
                    desc: "Every medical monitor and digital scanner system is calibrated rigorously against original parameters before dispatch.",
                    icon: <ShieldCheck className="w-7 h-7 text-white" />,
                    bgColor: "bg-blue-600/90"
                  },
                  {
                    title: "Turnkey Setups",
                    subtitle: "End-to-End Compliance",
                    desc: "Our biomedical crew supervises gas setups, electrical compliance testing, and critical OT layouts end-to-end.",
                    icon: <Zap className="w-7 h-7 text-white" />,
                    bgColor: "bg-indigo-600/90"
                  },
                  {
                    title: "Clinical Engineers",
                    subtitle: "Specialist Supervision",
                    desc: "Access the training expertise of specialists registered under critical medical equipment regulatory protocols.",
                    icon: <Activity className="w-7 h-7 text-white" />,
                    bgColor: "bg-teal-600/90"
                  },
                  {
                    title: "Friendly Contracts",
                    subtitle: "Flexible AMC Frameworks",
                    desc: "Leverage affordable AMC frameworks designed for individual clinics to corporate multi-wing hospital systems.",
                    icon: <ThumbsUp className="w-7 h-7 text-white" />,
                    bgColor: "bg-amber-600/90"
                  }
                ].map((item, idx) => (
                  <FrostedGlassCard
                    key={idx}
                    title={item.title}
                    subtitle={item.subtitle}
                    description={item.desc}
                    icon={item.icon}
                    iconBgColor={item.bgColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VALUABLE CLIENTS LOGO SLIDER */}
      <Logos3
        heading="Trusted By Premium Medical Institutions"
        logos={clientLogos.map((client, idx) => ({
          id: `medical-client-${idx}`,
          description: client.name,
          icon: client.icon
        }))}
      />

      {/* 7. TESTIMONIALS REVIEW SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-2">Our Testimonials</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Voices of Trust inside Hospital Wings</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <TestimonialSlider
            testimonials={testimonials.map((t: any) => ({
              image: t.image,
              quote: t.reviewText,
              name: t.name,
              role: t.designation,
              rating: t.rating
            }))}
          />
        </div>
      </section>
    </div>
  );
}
