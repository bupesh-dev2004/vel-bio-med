import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Award, ShieldCheck, Zap, Activity, Star, Eye, MessageSquare, Check, ArrowRight, StarHalf, Building, ThumbsUp, CheckSquare, Heart, Stethoscope, HeartPulse, Dna, Wrench, Shield, Briefcase, PhoneCall, LifeBuoy, CheckCircle2 } from "lucide-react";
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
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import { FlipWords } from "@/components/ui/flip-words";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

interface HomeViewProps {
  onOpenProductModal: (p: Product) => void;
  showPreloader?: boolean;
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

export default function HomeView({ onOpenProductModal, showPreloader = false }: HomeViewProps) {
  const { state, setCurrentTab, setInquiryMachineName } = useAppState();
  const [trendingApi, setTrendingApi] = useState<any>(null);
  const [productsApi, setProductsApi] = useState<any>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [productSnaps, setProductSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!trendingApi) return;
    let intervalId: any = null;

    const startAutoplay = () => {
      stopAutoplay();
      intervalId = setInterval(() => {
        if (!trendingApi) return;
        if (trendingApi.canScrollNext()) {
          trendingApi.scrollNext();
        } else {
          trendingApi.scrollTo(0);
        }
      }, 3500);
    };

    const stopAutoplay = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    startAutoplay();
    trendingApi.on("pointerDown", stopAutoplay);
    trendingApi.on("settle", startAutoplay);

    return () => {
      trendingApi.off("pointerDown", stopAutoplay);
      trendingApi.off("settle", startAutoplay);
      stopAutoplay();
    };
  }, [trendingApi]);

  useEffect(() => {
    if (!productsApi) return;

    const updateSnaps = () => {
      setProductSnaps(productsApi.scrollSnapList());
      setCurrentProductIndex(productsApi.selectedScrollSnap());
    };

    updateSnaps();
    productsApi.on("select", updateSnaps);
    productsApi.on("reInit", updateSnaps);

    let intervalId: any = null;

    const startAutoplay = () => {
      stopAutoplay();
      intervalId = setInterval(() => {
        if (!productsApi) return;
        if (productsApi.canScrollNext()) {
          productsApi.scrollNext();
        } else {
          productsApi.scrollTo(0);
        }
      }, 3000);
    };

    const stopAutoplay = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    startAutoplay();
    productsApi.on("pointerDown", stopAutoplay);
    productsApi.on("settle", startAutoplay);

    return () => {
      productsApi.off("select", updateSnaps);
      productsApi.off("reInit", updateSnaps);
      productsApi.off("pointerDown", stopAutoplay);
      productsApi.off("settle", startAutoplay);
      stopAutoplay();
    };
  }, [productsApi]);

  // Slider State (just slides data for background image)
  const slides = state?.homeSlides || [];

  // Products filters
  const trendingProducts = state?.products?.filter((p) => p.trending) || [];
  const trendingThree = trendingProducts.slice(0, 3);
  const dynamicProducts = state?.products || [];
  const latestAcquisitions = state?.products ? [...state.products].slice(-4).reverse() : [];

  // Service Icon resolver helper
  const renderServiceIcon = (name: string, isAmber: boolean) => {
    const iconColor = isAmber ? "text-orange-650 group-hover:text-white" : "text-blue-650 group-hover:text-white";
    switch (name) {
      case "Wrench":
        return <Wrench className={`w-6 h-6 ${iconColor}`} />;
      case "Shield":
        return <Shield className={`w-6 h-6 ${iconColor}`} />;
      case "Briefcase":
        return <Briefcase className={`w-6 h-6 ${iconColor}`} />;
      case "Activity":
        return <Activity className={`w-6 h-6 ${iconColor}`} />;
      case "PhoneCall":
        return <PhoneCall className={`w-6 h-6 ${iconColor}`} />;
      default:
        return <LifeBuoy className={`w-6 h-6 ${iconColor}`} />;
    }
  };

  const getDeliverables = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("amc")) {
      return [
        "Regular preventative maintenance audits",
        "24/7 priority operational room dispatch",
        "Original vendor parts & seal checkups"
      ];
    }
    if (lowerTitle.includes("troubleshooting")) {
      return [
        "Multi-brand diagnostic testing",
        "Fast fault isolation & repairs",
        "Component reliability restoration"
      ];
    }
    if (lowerTitle.includes("installation")) {
      return [
        "Pre-installation layout planning",
        "OEM-standard equipment testing",
        "Operational certification handovers"
      ];
    }
    if (lowerTitle.includes("restoration")) {
      return [
        "Full structural & cosmetic overhaul",
        "Electronic component recalibration",
        "Longevity validation testing"
      ];
    }
    if (lowerTitle.includes("customised") || lowerTitle.includes("customized")) {
      return [
        "Tailored adapter & housing designs",
        "Precision workflow integration",
        "Innovative engineering adjustments"
      ];
    }
    if (lowerTitle.includes("cleaning") || lowerTitle.includes("hygienic")) {
      return [
        "Meticulous sanitization protocols",
        "Certified biological sterilization check",
        "Healthcare hygiene standard compliance"
      ];
    }
    return [
      "OEM-standard diagnostic audits",
      "Certified engineering oversight",
      "Full compliance & safety documentation"
    ];
  };

  const dbServices = state?.services || [
    {
      id: "srv-1",
      title: "AMC for Operation Theatre Equipment",
      description: "An Annual Maintenance Contract (AMC) for operation theatre equipment ensures regular maintenance, emergency support to optimize equipment performance.",
      iconName: "Shield"
    },
    {
      id: "srv-2",
      title: "Troubleshooting of all medical equipment (Any brand)",
      description: "We provide expert troubleshooting services for all medical equipment brands, resolution of issues to maintain uninterrupted equipment reliability.",
      iconName: "Wrench"
    },
    {
      id: "srv-3",
      title: "Installation & Commissioning of new medical equipment",
      description: "We excel in the seamless installation and commissioning of new medical equipment, ensuring optimal functionality and readiness .",
      iconName: "Briefcase"
    },
    {
      id: "srv-4",
      title: "Restoration of medical equipment",
      description: "We specialize in restoring medical equipment to peak performance, ensuring reliability and longevity to support uninterrupted patient care.",
      iconName: "Activity"
    },
    {
      id: "srv-5",
      title: "Customised Product solutions for all medical equipment",
      description: "We provide customized solutions for all medical equipment, meeting diverse needs with precision and innovation.",
      iconName: "PhoneCall"
    },
    {
      id: "srv-6",
      title: "Hygienic Cleaning services",
      description: "Our hygienic cleaning services ensure meticulous sterilization and sanitation of medical equipment and facilities, maintaining impeccable standards for patient safety and healthcare hygiene.",
      iconName: "LifeBuoy"
    }
  ];

  // Clients Mock
  const clientLogos = [
    { name: "Fortis Healthcare", icon: <Building className="w-4 h-4" /> },
    { name: "Apollo Hospitals", icon: <HeartPulse className="w-4 h-4" /> },
    { name: "Max Health", icon: <Stethoscope className="w-4 h-4" /> },
    { name: "Aster CMI", icon: <Award className="w-4 h-4" /> },
    { name: "Manipal Hospital", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Medanta Medicity", icon: <Activity className="w-4 h-4" /> },
    { name: "Narayana Health", icon: <Dna className="w-4 h-4" /> }
  ];

  // Testimonials Carousel
  const testimonials = state?.testimonials || [];

  const startInquiry = (productName: string) => {
    setInquiryMachineName(productName);
    setCurrentTab("contact");
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-[480px] md:h-[600px] overflow-hidden bg-slate-900">
        {/* Background with zoom and fade in effect */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={showPreloader ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[0]?.image || "/icu-monitor.png"})`
          }}
        />
        {/* Overlay with Medical blue tint gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-blue-950/40" />

        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial from-blue-500/12 via-blue-900/0 to-transparent rounded-full pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-radial from-amber-500/10 via-amber-650/0 to-transparent rounded-full pointer-events-none z-10" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="hidden"
              animate={showPreloader ? "hidden" : "visible"}
              variants={heroContainerVariants}
              className="max-w-2xl text-left text-white space-y-4 md:space-y-6"
            >
              <motion.span
                variants={heroItemVariants}
                className="inline-block bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 text-white text-[10px] sm:text-xs font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg shadow-blue-500/20"
              >
                Clinical Sourcing Excellence
              </motion.span>
              <motion.h1
                variants={heroItemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
              >
                Transforming <AnimatedText asSpan text="Healthcare" gradientColors="linear-gradient(90deg, #0A6EBD 0%, #00e5ff 30%, #ffffff 50%, #00e5ff 70%, #0A6EBD 100%)" gradientAnimationDuration={1.6} textClassName="bg-clip-text text-transparent" /> One Installation at a Time
              </motion.h1>
              <motion.p
                variants={heroItemVariants}
                className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-medium"
              >
                Vel Bio Med delivers high-caliber diagnostics and life-support machinery from world-renowned healthcare manufacturers to premium hospitals.
              </motion.p>
              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap gap-3.5 pt-2"
              >
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OUR PRODUCTS SECTION */}
      <section className="py-24 bg-linear-to-br from-blue-50/50 via-white to-orange-50/50 relative overflow-hidden border-b border-slate-100">


        {/* Ambient Decorative Light Orbs - Blue and Orange Gradient Glows */}
        <div className="absolute top-10 -left-10 w-[500px] h-[500px] bg-radial from-blue-500/15 via-blue-900/0 to-transparent rounded-full pointer-events-none" />
        <div className="absolute bottom-10 -right-10 w-[500px] h-[500px] bg-radial from-orange-500/12 via-orange-950/0 to-transparent rounded-full pointer-events-none" />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-200/50 text-blue-600 font-extrabold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" /> Sourcing Catalogue
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                Our <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Products</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-xl">
                High-performance medical equipment, diagnostic machinery, and clinical instrumentation sourced from leading global manufacturers.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("products")}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-blue-600 text-slate-800 hover:text-blue-600 font-extrabold text-[11px] rounded-xl shadow-xs hover:shadow-[0_10px_25px_rgba(37,99,235,0.06)] hover:scale-102 transition-all duration-300 uppercase tracking-wider cursor-pointer self-start md:self-end"
            >
              <span>See Full Products</span>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Embla Carousel Slider */}
          <Carousel setApi={setProductsApi} opts={{ align: "start", loop: true, slidesToScroll: 1, breakpoints: { "(min-width: 640px)": { slidesToScroll: 2 }, "(min-width: 1024px)": { slidesToScroll: 3 } } }} className="w-full max-w-6xl mx-auto relative px-0 sm:px-4">
            <CarouselContent className="-ml-4">
              {dynamicProducts.map((p, idx) => {
                const isAmber = idx % 2 === 1;
                return (
                  <CarouselItem key={p.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div
                      onClick={() => onOpenProductModal(p)}
                      className={`group relative bg-gradient-to-b from-white to-slate-50/40 border border-slate-200/60 rounded-[32px] p-4 sm:p-6 hover:-translate-y-2.5 transition-[transform,border-color,box-shadow] duration-500 flex flex-col h-[400px] sm:h-[500px] overflow-hidden cursor-pointer
                        ${isAmber 
                          ? "hover:border-amber-300 hover:shadow-[0_20px_45px_rgba(245,158,11,0.08)]" 
                          : "hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)]"
                        }
                      `}
                    >
                      {/* Top Accent Gradient Border Glow on Hover */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${isAmber ? "from-amber-400 to-orange-500" : "from-blue-600 to-sky-400"} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                      {/* Photo area with technical notched framing */}
                      <div className="relative h-40 sm:h-52 w-full rounded-2xl overflow-hidden bg-white flex items-center justify-center p-4 sm:p-6 border border-slate-100/80 flex-shrink-0 group-hover:border-slate-200/80 transition-all duration-300 mb-4 sm:mb-6">
                        {/* Technical corner notches */}
                        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-slate-350/50" />
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-slate-355/50" />
                        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-slate-355/50" />
                        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-slate-355/50" />

                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out [backface-visibility:hidden] transform-gpu"
                          loading="lazy"
                        />
                        {/* Specs badge that appears on hover */}
                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 pointer-events-none shadow-sm">
                          <Eye className="w-3.5 h-3.5" /> Specs
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-between flex-grow">
                        <div className="space-y-2.5">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest uppercase ${isAmber ? "text-amber-600" : "text-blue-600"}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isAmber ? "bg-amber-500 animate-pulse" : "bg-blue-500 animate-pulse"}`} />
                            {p.category}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-slate-500 text-xs line-clamp-2 sm:line-clamp-3 leading-relaxed font-medium">
                            {p.shortDesc}
                          </p>
                        </div>

                        {/* Footer with Star rating & Specs Button reveal on hover */}
                        <div className="relative pt-3 sm:pt-5 border-t border-slate-100 mt-3 sm:mt-5 h-10 flex items-center justify-between">
                          <div className="flex items-center gap-4 group-hover:opacity-0 transition-opacity duration-300 w-full justify-between">
                            <div className="flex items-center gap-1 bg-amber-50/70 border border-amber-100/50 px-2.5 py-1 rounded-full text-amber-700 font-extrabold text-[10px]">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span>{p.rating}.0</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Certified
                            </span>
                          </div>

                          {/* Hover State: reveal "View Specifications" button */}
                          <div className="absolute inset-x-0 bottom-0 top-3 sm:top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between pointer-events-none">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Certified Unit
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${isAmber ? "text-amber-600" : "text-blue-600"}`}>
                              View Specs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="flex left-2 md:-left-4 lg:-left-16 bg-white border border-slate-200 text-slate-800 shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 w-9 h-9 sm:w-11 sm:h-11 top-24 sm:top-1/2 transition-all duration-300 z-30" />
            <CarouselNext className="flex right-2 md:-right-4 lg:-right-16 bg-white border border-slate-200 text-slate-800 shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 w-9 h-9 sm:w-11 sm:h-11 top-24 sm:top-1/2 transition-all duration-300 z-30" />
          </Carousel>

          {/* Slide indicator dots */}
          {productSnaps.length > 1 && (
            <div className="flex justify-center items-center gap-2.5 mt-10">
              {productSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => productsApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-350 ${
                    currentProductIndex === index 
                      ? "w-8 bg-gradient-to-r from-blue-600 to-indigo-500 shadow-sm" 
                      : "w-2 bg-slate-300 hover:bg-slate-400 cursor-pointer"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* 3. TRENDING PRODUCTS GRID */}
      <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 relative overflow-hidden border-b border-slate-900">


        {/* Glowing Ambient Light Orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-radial from-blue-600/18 via-blue-950/0 to-transparent rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-radial from-amber-500/10 via-amber-950/0 to-transparent rounded-full pointer-events-none" />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/10 mb-4">
              Specialty Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
              Trending <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-amber-400 bg-clip-text text-transparent">Critical Machinery</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-5 rounded-full" />
            <p className="text-slate-400 text-xs sm:text-sm mt-4 font-medium leading-relaxed">
              Medical setups demanded in high acuity clinical rooms. Certified with absolute safety standards.
            </p>
          </div>

          {/* Auto Slider showing exactly 3 cards */}
          <div className="w-full max-w-4xl mx-auto px-0 sm:px-4">
            <Carousel setApi={setTrendingApi} opts={{ align: "start", loop: true }} className="w-full relative px-6 md:px-16">
              <CarouselContent className="-ml-4">
                {trendingThree.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2">
                    <div
                      onClick={() => onOpenProductModal(item)}
                      className="flex flex-col bg-slate-900/80 backdrop-blur-md p-4 sm:p-6 border border-slate-800/80 rounded-3xl shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-[transform,border-color,box-shadow] duration-300 group relative overflow-hidden h-[400px] sm:h-[440px] justify-between cursor-pointer"
                    >
                      <div>
                        {/* Image - beautifully aligned in white container */}
                        <div className="relative w-full h-36 sm:h-44 bg-white rounded-2xl overflow-hidden mb-3 sm:mb-4 p-3 sm:p-4 flex items-center justify-center border border-slate-100/10 shadow-inner shrink-0">
                          <img
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                            src={item.image}
                            alt={item.name}
                          />
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded shadow-md z-10">
                            HOT SELLING
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest truncate mr-2">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[11px] text-slate-400 font-bold">({item.rating}.0)</span>
                          </div>
                        </div>

                        <h5 className="mb-1.5 text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                          {item.name}
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-2 sm:line-clamp-3">
                          {item.shortDesc}
                        </p>
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2 pt-3 sm:pt-4 border-t border-slate-800/60 mt-3 sm:mt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProductModal(item);
                          }}
                          className="inline-flex items-center justify-center flex-grow text-slate-300 bg-slate-900 border border-slate-800/80 hover:bg-slate-800 hover:text-white shadow-sm font-bold rounded-xl text-[10px] py-2.5 cursor-pointer transition-all gap-1"
                        >
                          Quick View
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startInquiry(item.name);
                          }}
                          className="inline-flex items-center justify-center flex-grow text-white bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-600 shadow-md hover:shadow-blue-500/20 font-bold rounded-xl text-[10px] py-2.5 cursor-pointer transition-all gap-1 border-none"
                        >
                          Inquire Now
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 md:left-4 bg-white border border-slate-200 text-slate-800 shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 w-9 h-9 sm:w-10 sm:h-10 top-[88px] sm:top-1/2 transition-all z-30 animate-pulse" style={{ animationDuration: '3s' }} />
              <CarouselNext className="absolute right-2 md:right-4 bg-white border border-slate-200 text-slate-800 shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 w-9 h-9 sm:w-10 sm:h-10 top-[88px] sm:top-1/2 transition-all z-30 animate-pulse" style={{ animationDuration: '3s' }} />
            </Carousel>
          </div>
        </motion.div>
      </section>

      {/* 4. SERVICES SECTION - COMPREHENSIVE SUPPORT DELIVERABLES */}
      <section className="py-24 bg-slate-50/40 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-200/50 text-blue-600 font-extrabold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" /> Our Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight text-center">
              <span className="block md:inline-block">Comprehensive </span>
              <span className="block md:inline-block md:ml-2">
                <FlipWords
                  words={["Support", "Maintenance", "Engineering", "Installation", "Restoration", "Technical"]}
                  className="text-blue-600 font-black"
                  duration={1000}
                />
              </span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-black block lg:inline-block lg:ml-2">Deliverables</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-5 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">
              We cover all phases of medical machinery management—from architectural layouts to certification, periodic AMC maintenance, and calibration checkups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbServices.map((srv, idx) => {
              const isAmber = idx % 2 === 1;
              const deliverables = getDeliverables(srv.title);
              return (
                <div
                  key={srv.id}
                  className={`border p-8 rounded-3xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]
                    ${isAmber
                      ? "bg-gradient-to-br from-orange-50/40 via-white to-white border-orange-200/80 hover:border-orange-400 hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)]"
                      : "bg-gradient-to-br from-blue-50/40 via-white to-white border-blue-200/80 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.08)]"
                    }
                  `}
                >
                  {/* Decorative card gradient glow */}
                  <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                    ${isAmber ? "bg-orange-500/10" : "bg-blue-500/10"}
                  `} />

                  <span className="absolute top-8 right-8 text-[10px] font-black tracking-widest text-slate-350 group-hover:text-slate-400 uppercase transition-colors">
                    Service {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className={`p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-all duration-500 shadow-sm border
                    ${isAmber
                      ? "bg-orange-50 border-orange-200 text-orange-650 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white group-hover:rotate-6 group-hover:scale-110"
                      : "bg-blue-50 border-blue-200 text-blue-650 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110"
                    }
                  `}>
                    {renderServiceIcon(srv.iconName, isAmber)}
                  </div>

                  <h3 className={`text-xl font-extrabold text-slate-900 transition-colors mb-3 pr-8
                    ${isAmber ? "group-hover:text-orange-600" : "group-hover:text-blue-600"}
                  `}>
                    {srv.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    {srv.description}
                  </p>

                  {/* Key Deliverables Checklists */}
                  <div className="border-t border-slate-100 pt-5 mt-auto mb-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Key Deliverables</span>
                    <ul className="space-y-2.5">
                      {deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-655 font-medium">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isAmber ? "text-orange-500" : "text-blue-500"}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => startInquiry(`Service: ${srv.title}`)}
                    className={`w-full bg-slate-50 border font-bold text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer hover:shadow-sm
                      ${isAmber
                        ? "border-orange-100 text-slate-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                        : "border-blue-100 text-slate-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                      }
                    `}
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 5. GALLERY SECTION */}
      <ImageGallery />

      {/* 6. VALUABLE CLIENTS LOGO SLIDER */}
      <Logos3
        heading="Trusted By Premium Medical Institutions"
        logos={[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => ({
          id: `medical-client-${idx}`,
          description: client.name,
          icon: client.icon
        }))}
      />

      {/* 7. TESTIMONIALS REVIEW SECTION */}
      <section className="py-20 bg-white overflow-hidden">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
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
        </motion.div>
      </section>
    </div>
  );
}
