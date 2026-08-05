import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Award, ShieldCheck, Zap, Activity, Star, Eye, MessageSquare, Check, ArrowRight, StarHalf, Building, ThumbsUp, CheckSquare, Heart, Stethoscope, HeartPulse, Dna, Wrench, Shield, Briefcase, PhoneCall, LifeBuoy, CheckCircle2, Sparkles, HeartHandshake, Cross, Hospital, Brain, Microscope, Globe, Building2, PlusCircle, BadgePlus } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { Product } from "../types.js";
import { FrostedGlassCard } from "@/components/ui/interactive-frosted-glass-card";
import { BorderRotate } from "@/components/ui/animated-gradient-border";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
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
import AutoScroll from "embla-carousel-auto-scroll";

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

function AnimatedCounter({ target, duration = 1500, suffix = "", startSignal }: { target: number; duration?: number; suffix?: string; startSignal?: boolean }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // If an external startSignal is provided, use it; otherwise use IntersectionObserver
  useEffect(() => {
    if (startSignal !== undefined) {
      if (startSignal && !hasStarted) {
        const timer = setTimeout(() => setHasStarted(true), 400);
        return () => clearTimeout(timer);
      }
      return;
    }

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
  }, [startSignal, hasStarted]);

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
  const trendingAutoScroll = useRef(
    AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );
  const [productsApi, setProductsApi] = useState<any>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [productSnaps, setProductSnaps] = useState<number[]>([]);
  const [isTestimonialsPaused, setIsTestimonialsPaused] = useState(false);

  useEffect(() => {
    if (!productsApi) return;

    const updateSnaps = () => {
      setProductSnaps(productsApi.scrollSnapList());
      setCurrentProductIndex(productsApi.selectedScrollSnap());
    };

    updateSnaps();
    productsApi.on("select", updateSnaps);
    productsApi.on("reInit", updateSnaps);

    return () => {
      productsApi.off("select", updateSnaps);
      productsApi.off("reInit", updateSnaps);
    };
  }, [productsApi]);

  // Slider State (just slides data for background image)
  const slides = state?.homeSlides || [];

  // Products filters - Target only the 3 specified products in exact order for Trending Machinery
  const targetTrendingIds = ["prod-7", "prod-60", "prod-22"];
  const trendingThree = targetTrendingIds
    .map((id) => state?.products?.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const trendingCarouselItems = [
    ...trendingThree,
    ...trendingThree,
    ...trendingThree,
    ...trendingThree,
  ];

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

  // Clients Mock - Trusted Medical Institutions
  const clientLogos = [
    { name: "GVN Hospital", icon: <Building className="w-4 h-4" /> },
    { name: "Sundaram Hospital", icon: <HeartPulse className="w-4 h-4" /> },
    { name: "Velan Hospital", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Curious Hospital", icon: <Sparkles className="w-4 h-4" /> },
    { name: "ABC Hospital", icon: <Activity className="w-4 h-4" /> },
    { name: "Frontline Hospital", icon: <Shield className="w-4 h-4" /> },
    { name: "Pineapple Diagonisis Center", icon: <Microscope className="w-4 h-4" /> },
    { name: "Neuro One", icon: <Brain className="w-4 h-4" /> },
    { name: "Atlas Hospital", icon: <Globe className="w-4 h-4" /> },
    { name: "Dhanalakshmi Srinivasan Hospital", icon: <Building2 className="w-4 h-4" /> },
    { name: "HM Hospital", icon: <Stethoscope className="w-4 h-4" /> },
    { name: "Silverline Hospital", icon: <Award className="w-4 h-4" /> },
    { name: "Sugam Hospital", icon: <HeartHandshake className="w-4 h-4" /> },
    { name: "Kumaran Hospital", icon: <CheckCircle2 className="w-4 h-4" /> },
    { name: "Harshamitra Hospital", icon: <Heart className="w-4 h-4" /> },
    { name: "KMC Hospital", icon: <Hospital className="w-4 h-4" /> },
    { name: "Rathna Global", icon: <Globe className="w-4 h-4" /> },
    { name: "Sri Ramya Hospital", icon: <Cross className="w-4 h-4" /> },
    { name: "Janet Hospital", icon: <PlusCircle className="w-4 h-4" /> },
    { name: "Gastro Care Hospital", icon: <Activity className="w-4 h-4" /> },
    { name: "Galaxy Hospital", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Srinivasa Hospital", icon: <Building className="w-4 h-4" /> },
    { name: "Ponni Hospital", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Rana Hospital", icon: <BadgePlus className="w-4 h-4" /> },
    { name: "Arun Hospital", icon: <Stethoscope className="w-4 h-4" /> },
    { name: "CSI Hospital", icon: <Hospital className="w-4 h-4" /> },
    { name: "Child Jesus", icon: <Heart className="w-4 h-4" /> },
    { name: "Murugan Health Care", icon: <HeartPulse className="w-4 h-4" /> },
    { name: "Rajarajeshwari Hospital", icon: <Award className="w-4 h-4" /> },
    { name: "Chandhan Hospital", icon: <Building2 className="w-4 h-4" /> },
    { name: "City Hospital", icon: <Building className="w-4 h-4" /> },
    { name: "Bharathi Hospital", icon: <Shield className="w-4 h-4" /> },
    { name: "MR Hospital", icon: <Activity className="w-4 h-4" /> },
    { name: "KTM Hospital", icon: <Hospital className="w-4 h-4" /> },
    { name: "TMCH Hospital", icon: <Stethoscope className="w-4 h-4" /> },
    { name: "Venkateshwara Hospital", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Dravidan Hospital", icon: <Cross className="w-4 h-4" /> },
    { name: "Anu Hospital", icon: <HeartPulse className="w-4 h-4" /> },
    { name: "Kamatchi Hospital", icon: <Heart className="w-4 h-4" /> },
    { name: "Srinivasan Hospital", icon: <Building2 className="w-4 h-4" /> },
    { name: "Annai Hospital", icon: <HeartHandshake className="w-4 h-4" /> },
    { name: "Sai Hospital", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Kavi Hospital", icon: <BadgePlus className="w-4 h-4" /> },
    { name: "AS Hospital", icon: <Building className="w-4 h-4" /> },
    { name: "Garbaraksha Hospital", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Aarthi Hospital", icon: <Stethoscope className="w-4 h-4" /> },
    { name: "KS Hospital", icon: <Activity className="w-4 h-4" /> },
    { name: "ALVS Cardiac Center", icon: <HeartPulse className="w-4 h-4" /> },
    { name: "V Care", icon: <HeartHandshake className="w-4 h-4" /> },
    { name: "Sai Speed Hospital", icon: <Zap className="w-4 h-4" /> },
    { name: "Shifa Hospital", icon: <PlusCircle className="w-4 h-4" /> },
    { name: "Sumathi Hospital", icon: <Building2 className="w-4 h-4" /> }
  ];

  // Testimonials Columns Layout Setup
  const DEFAULT_TESTIMONIALS = [
    {
      id: "tst-1",
      name: "Dr. Govindarajan",
      specialization: "Oncology",
      hospital: "GVN Hospital, Trichy",
      reviewText: "Vel Bio Med delivered our equipment on schedule and handled the installation professionally. Their technical team ensured everything was fully operational before handover. We are extremely satisfied with their reliable service and ongoing support."
    },
    {
      id: "tst-2",
      name: "Dr. Vivek Sundaram",
      specialization: "General Medicine",
      hospital: "Sundaram Hospital, Trichy",
      reviewText: "We have been highly impressed with Vel Bio Med's professionalism and commitment to quality. Their installation process was seamless, and their after-sales support has always been prompt and reliable."
    },
    {
      id: "tst-3",
      name: "Dr. Rajavel",
      specialization: "Orthopaedics",
      hospital: "Velan Hospital, Trichy",
      reviewText: "The quality of the medical equipment supplied by Vel Bio Med has been excellent. Their technical team completed the installation efficiently and provided comprehensive training to our staff."
    },
    {
      id: "tst-4",
      name: "Dr. S. K. Naganathan",
      specialization: "Internal Medicine",
      hospital: "Naganathan Hospital, Trichy",
      reviewText: "Vel Bio Med understood our hospital's requirements and recommended the right solutions. Their attention to detail and dependable customer support have made them a trusted partner."
    },
    {
      id: "tst-5",
      name: "Dr. Muhundhan",
      specialization: "General Surgery",
      hospital: "ABC Hospital, Trichy",
      reviewText: "From procurement to installation, the entire experience with Vel Bio Med was smooth and professional. We appreciate their timely delivery and commitment to customer satisfaction."
    },
    {
      id: "tst-6",
      name: "Dr. Radhakrishnan",
      specialization: "Anaesthesiology",
      hospital: "Frontline Hospital, Trichy",
      reviewText: "Vel Bio Med delivered exactly what was promised. Their engineers handled the installation with great care, and their technical support has been exceptional whenever required."
    },
    {
      id: "tst-7",
      name: "Dr. Vel Aravinth",
      specialization: "Radiology",
      hospital: "Pineapple Diagnosis Center, Trichy",
      reviewText: "The diagnostic equipment supplied by Vel Bio Med has consistently delivered reliable performance. Their responsive support team and technical expertise have exceeded our expectations."
    },
    {
      id: "tst-8",
      name: "Dr. Vijayakumar",
      specialization: "Neurology",
      hospital: "Neuro One, Trichy",
      reviewText: "Vel Bio Med has been a dependable partner for our hospital. Their product quality, timely service, and knowledgeable engineers have made every project successful."
    },
    {
      id: "tst-9",
      name: "Dr. Jai Krish",
      specialization: "Nephrology",
      hospital: "Atlas Hospital, Trichy",
      reviewText: "We are pleased with the quality of equipment and the professionalism shown by the Vel Bio Med team. Their installation was completed on time, and the entire process was hassle-free."
    },
    {
      id: "tst-10",
      name: "Dr. Mahesh Yogaraj",
      specialization: "Critical Care Medicine",
      hospital: "HM Hospital, Trichy",
      reviewText: "Vel Bio Med consistently provides high-quality medical equipment backed by excellent technical support. Their commitment to customer satisfaction has been outstanding."
    },
    {
      id: "tst-11",
      name: "Dr. V. Ashok Kumar",
      specialization: "Cardiology",
      hospital: "Silverline Hospital, Karur",
      reviewText: "The equipment supplied by Vel Bio Med has been reliable and efficient in our daily operations. Their technical support team responds quickly whenever assistance is needed."
    },
    {
      id: "tst-12",
      name: "Dr. K. Ravikumar",
      specialization: "Pulmonology",
      hospital: "Sugam Hospital, Karur",
      reviewText: "Vel Bio Med has exceeded our expectations with quality products and professional service. Their team ensured a smooth installation and provided excellent user training."
    },
    {
      id: "tst-13",
      name: "Dr. S. Kumaran",
      specialization: "Arthroscopy & Trauma",
      hospital: "Kumaran Hospital, Karur",
      reviewText: "We appreciate Vel Bio Med's commitment to delivering dependable medical equipment. Their engineers completed the installation efficiently and answered all our technical questions."
    },
    {
      id: "tst-14",
      name: "Dr. Karthikeyan",
      specialization: "Emergency Medicine",
      hospital: "Harshamitra Hospital, Karur",
      reviewText: "Working with Vel Bio Med has been a wonderful experience. Their products are reliable, and the after-sales support has always been prompt and professional."
    },
    {
      id: "tst-15",
      name: "Dr. Rathnavel",
      specialization: "Cardiothoracic Surgery",
      hospital: "Rathna Global Hospital, Karur",
      reviewText: "Vel Bio Med demonstrated exceptional professionalism throughout our procurement process. Their quality standards and technical expertise are truly commendable."
    },
    {
      id: "tst-16",
      name: "Dr. Ramya",
      specialization: "Obstetrics & Gynaecology",
      hospital: "Sri Ramya Hospital, Karur",
      reviewText: "The installation was completed on time, and every piece of equipment was tested thoroughly before handover. We appreciate the team's dedication and attention to detail."
    },
    {
      id: "tst-17",
      name: "Dr. Janet",
      specialization: "Paediatrics",
      hospital: "Janet Hospital, Karur",
      reviewText: "Vel Bio Med has become one of our trusted medical equipment suppliers. Their prompt service, quality products, and experienced technical team have been impressive."
    },
    {
      id: "tst-18",
      name: "Dr. Saravanan",
      specialization: "Gastroenterology",
      hospital: "Gastro Care Hospital, Karur",
      reviewText: "We are extremely pleased with the quality of products supplied by Vel Bio Med. Their engineers provided excellent installation support and ensured everything functioned perfectly."
    },
    {
      id: "tst-19",
      name: "Dr. Anand",
      specialization: "Urology",
      hospital: "Galaxy Hospital, Karur",
      reviewText: "The professionalism shown by the Vel Bio Med team throughout the project was remarkable. Their customer support and technical guidance have been consistently excellent."
    },
    {
      id: "tst-20",
      name: "Dr. Srinivasan",
      specialization: "Vascular Surgery",
      hospital: "Srinivasa Hospital, Karur",
      reviewText: "Vel Bio Med delivers dependable medical equipment with exceptional customer service. Their commitment to quality and timely support has made them a valued healthcare partner."
    }
  ];

  const testimonials = DEFAULT_TESTIMONIALS;

  // Desktop (3 columns)
  const desktopCol1 = testimonials.filter((_, idx) => idx % 3 === 0);
  const desktopCol2 = testimonials.filter((_, idx) => idx % 3 === 1);
  const desktopCol3 = testimonials.filter((_, idx) => idx % 3 === 2);

  // Tablet (2 columns)
  const tabletCol1 = testimonials.filter((_, idx) => idx % 2 === 0);
  const tabletCol2 = testimonials.filter((_, idx) => idx % 2 === 1);

  const startInquiry = (productName: string) => {
    setInquiryMachineName(productName);
    setCurrentTab("contact");
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100dvh] md:min-h-[82vh] lg:min-h-0 lg:h-auto xl:min-h-[100dvh] w-full flex flex-col md:flex-row items-stretch md:items-center bg-slate-50 overflow-hidden pt-4 pb-8 md:pt-6 md:pb-10 lg:pt-6 lg:pb-16 xl:pt-8 xl:pb-8">
        {/* Background with zoom and fade in effect */}
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={showPreloader ? { opacity: 0, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <picture className="block w-full h-full overflow-hidden">
            {/* Desktop: screens 1025px and larger */}
            <source media="(min-width: 1025px)" type="image/webp" srcSet="/desktop-pic.webp" />
            <source media="(min-width: 1025px)" type="image/png" srcSet="/desktop%20pic.png" />
            {/* Tablet: screens 768px to 1024px */}
            <source media="(min-width: 768px)" type="image/webp" srcSet="/tablet-pic.webp" />
            <source media="(min-width: 768px)" type="image/png" srcSet="/tablet%20pic.png" />
            {/* Mobile: screens below 768px */}
            <source type="image/webp" srcSet="/mobile-pic.webp" />
            <img
              src="/mobile-pic.webp"
              alt="Vel Bio Med Hero Background"
              className="w-full h-full object-cover pointer-events-none"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
          {/* Light readability white gradient overlay (removed on desktop md/lg for crispness) */}
          <div className="absolute inset-0 bg-transparent pointer-events-none z-[5]" />
        </motion.div>

        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-full max-w-[500px] aspect-square bg-radial from-blue-500/12 via-blue-900/0 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full max-w-[500px] aspect-square bg-radial from-amber-500/10 via-amber-650/0 to-transparent rounded-full pointer-events-none z-10" />

        {/* Hero Content Wrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 xl:px-10 w-full z-20 relative flex flex-col justify-start md:justify-stretch h-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start md:items-center h-full w-full">
            {/* Left Side (45% on desktop xl, 58% on tablet/medium desktop) */}
            <div className="col-span-1 md:col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-start md:justify-between lg:justify-start xl:justify-start h-auto md:h-full lg:h-auto text-center md:text-center lg:text-left text-slate-900 translate-y-0 md:translate-y-0 lg:translate-x-0 lg:translate-y-0 xl:translate-x-0 xl:translate-y-0">
              <motion.div
                initial="hidden"
                animate={showPreloader ? "hidden" : "visible"}
                variants={heroContainerVariants}
                className="flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left text-slate-900 justify-start md:justify-between lg:justify-start xl:justify-start h-auto md:h-full lg:h-auto w-full gap-y-[clamp(10px,2vw,16px)] md:gap-y-0 xl:gap-y-5"
              >
                {/* Top Group: Text & Buttons */}
                <div className="hero-top-group flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left gap-y-[clamp(8px,1.8vw,16px)] md:gap-y-0 xl:gap-y-4 w-full mt-2 sm:mt-0 pt-2 lg:pt-0">
                  {/* Badge */}
                  <motion.div variants={heroItemVariants} className="w-full text-center md:text-center lg:text-left translate-y-1 md:translate-y-2 lg:translate-y-0 xl:translate-y-0">
                    <span className="small-mobile-badge inline-block bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 text-white text-[10.5px] md:text-[13px] lg:text-[14px] xl:text-[13.5px] font-black tracking-widest px-3 py-1 md:px-3 md:py-1 rounded-full uppercase shadow-lg shadow-blue-500/20 animate-pulse">
                      Clinical Sourcing Excellence
                    </span>
                  </motion.div>
                  {/* Heading */}
                  <motion.h1
                    variants={heroItemVariants}
                    className="small-mobile-heading text-[clamp(1.45rem,4vw+0.5rem,2.75rem)] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[2.65rem] font-black tracking-tight leading-[1.15] text-slate-900 max-w-[680px] md:max-w-[780px] lg:max-w-[760px] xl:max-w-[720px] w-full text-center md:text-center lg:text-left mt-3 md:mt-4 lg:mt-3 xl:mt-2"
                  >
                    <span className="whitespace-nowrap">
                      Transforming{" "}
                    </span>
                    <AnimatedText
                      asSpan
                      text="Healthcare"
                      gradientColors="linear-gradient(90deg, #0A6EBD 0%, #00e5ff 30%, #3b82f6 50%, #00e5ff 70%, #0A6EBD 100%)"
                      gradientAnimationDuration={1.6}
                      textClassName="bg-clip-text text-transparent"
                    />
                    <br />
                    One Installation at a Time
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    variants={heroItemVariants}
                    className="small-mobile-paragraph text-[clamp(13px,1.5vw+9px,15px)] md:text-[17px] lg:text-[17px] xl:text-lg text-slate-650 leading-relaxed font-semibold max-w-[520px] md:max-w-[680px] lg:max-w-[600px] xl:max-w-[560px] w-full text-center md:text-center lg:text-left mt-3 md:mt-4 lg:mt-4 xl:mt-2"
                  >
                    Vel Bio Med delivers high-caliber diagnostics, ICU patient monitors, operation theatre machinery, and life-support equipment to premium hospitals.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    variants={heroItemVariants}
                    className="small-mobile-btn-container flex flex-row justify-center md:justify-center lg:justify-start gap-3 sm:gap-4 w-full mt-[clamp(6px,2vw,20px)] md:mt-5 lg:mt-5 xl:mt-5"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                        boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentTab("products")}
                      className="small-mobile-btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11.5px] sm:text-xs md:text-[clamp(10px,0.8vw+8px,12px)] lg:text-base xl:text-sm py-2 px-3 sm:px-6 xl:px-7 rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer border-none h-10 md:h-[clamp(38px,1vw+34px,44px)] lg:h-14 xl:h-12 flex-1 sm:flex-initial max-w-[180px] sm:max-w-none"
                    >
                      Explore Products <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentTab("contact")}
                      className="small-mobile-btn bg-white border border-slate-200 text-blue-600 hover:bg-slate-50 font-bold text-[11.5px] sm:text-xs md:text-[clamp(10px,0.8vw+8px,12px)] lg:text-base xl:text-sm py-2 px-3 sm:px-6 xl:px-7 rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer h-10 md:h-[clamp(38px,1vw+34px,44px)] lg:h-14 xl:h-12 flex-1 sm:flex-initial max-w-[180px] sm:max-w-none"
                    >
                      <PhoneCall className="w-4 h-4 text-blue-600" /> Contact Us
                    </motion.button>
                  </motion.div>
                </div>

                {/* Statistics Cards (Desktop & Tablet View) */}
                <motion.div
                  variants={heroItemVariants}
                  className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-[clamp(8px,1.8vw,14px)] xl:gap-3.5 w-full md:mx-auto xl:mx-0 mt-[clamp(10px,2vw,16px)] md:mt-2 lg:mt-3 xl:mt-2 pt-2 xs:pt-3 sm:pt-4 xl:pt-0 justify-items-center md:translate-y-4 lg:-translate-y-4 xl:-translate-y-6 xl:-translate-x-6"
                >
                  {[
                    { target: 16, suffix: "+", label: "Years Exp.", icon: Award, color: "text-blue-600", iconBg: "bg-blue-50", border: "border-blue-100/40 hover:border-orange-200/60", glow: "from-blue-500/5" },
                    { target: 6000, suffix: "+", label: "Installations", icon: Wrench, color: "text-emerald-600", iconBg: "bg-emerald-50", border: "border-emerald-100/40 hover:border-orange-200/60", glow: "from-emerald-500/5" },
                    { target: 800, suffix: "+", label: "Hospitals", icon: Building, color: "text-sky-600", iconBg: "bg-sky-50", border: "border-sky-100/40 hover:border-orange-200/60", glow: "from-sky-500/5" },
                    { target: 1000, suffix: "+", label: "Clients", icon: ThumbsUp, color: "text-rose-500", iconBg: "bg-rose-50", border: "border-rose-100/40 hover:border-orange-200/60", glow: "from-rose-500/5" }
                  ].map((m, idx) => {
                    const IconComponent = m.icon;
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-center text-center gap-1 py-2.5 sm:py-3 md:py-5 lg:py-6 xl:py-3.5 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-2 rounded-xl sm:rounded-2xl border ${m.border} bg-gradient-to-br from-blue-500/8 via-white/80 to-orange-500/8 backdrop-blur-[3px] sm:backdrop-blur-sm shadow-[0_1px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_3px_14px_rgba(0,0,0,0.09)] hover:scale-[1.02] transition-all duration-200 w-full`}
                      >
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-9 xl:h-9 flex items-center justify-center rounded-lg sm:rounded-xl ${m.iconBg} border border-white/90 shadow-sm`}>
                          <IconComponent className={`w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-4.5 xl:h-4.5 ${m.color}`} strokeWidth={2} />
                        </div>
                        <p className="text-[13.5px] sm:text-[15px] md:text-xl lg:text-2xl xl:text-lg font-black text-slate-800 tracking-tight leading-none mt-1">
                          <AnimatedCounter target={m.target} suffix={m.suffix} duration={2000} startSignal={!showPreloader} />
                        </p>
                        <p className="text-[8px] sm:text-[9.5px] md:text-[11px] lg:text-[12px] xl:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider leading-none mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side (55%) is empty to allow the background operation theatre image to display fully */}
            <div className="hidden xl:block xl:col-span-7 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 1.5 MOBILE STATISTICS SECTION (Mobile View Only) */}
      <section className="block md:hidden py-6 sm:py-8 px-4 sm:px-6 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-y border-blue-100/60 relative shadow-sm z-20">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { target: 16, suffix: "+", label: "Years Exp.", icon: Award, color: "text-blue-600", iconBg: "bg-blue-50", border: "border-blue-100/40 hover:border-orange-200/60" },
              { target: 6000, suffix: "+", label: "Installations", icon: Wrench, color: "text-emerald-600", iconBg: "bg-emerald-50", border: "border-emerald-100/40 hover:border-orange-200/60" },
              { target: 800, suffix: "+", label: "Hospitals", icon: Building, color: "text-sky-600", iconBg: "bg-sky-50", border: "border-sky-100/40 hover:border-orange-200/60" },
              { target: 1000, suffix: "+", label: "Clients", icon: ThumbsUp, color: "text-rose-500", iconBg: "bg-rose-50", border: "border-rose-100/40 hover:border-orange-200/60" }
            ].map((m, idx) => {
              const IconComponent = m.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center text-center gap-1.5 py-4 px-3 rounded-2xl border ${m.border} bg-white/90 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 w-full`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${m.iconBg} border border-white/90 shadow-sm`}>
                    <IconComponent className={`w-5 h-5 ${m.color}`} strokeWidth={2} />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
                    <AnimatedCounter target={m.target} suffix={m.suffix} duration={2000} />
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none mt-0.5">
                    {m.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUSTED BY PREMIUM MEDICAL INSTITUTIONS */}
      <Logos3
        heading="Trusted By Premium Medical Institutions"
        logos={clientLogos.map((client, idx) => ({
          id: `medical-client-${idx}`,
          description: client.name,
          icon: client.icon
        }))}
      />

      {/* 2. WHY CHOOSE VEL BIO MED SECTION */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-[#f0f6ff] via-white to-[#fff7ed] border-t border-blue-100/60 relative overflow-hidden">
        {/* Ambient background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 w-full max-w-[500px] aspect-square rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(120px)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 w-full max-w-[500px] aspect-square rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", filter: "blur(120px)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="bg-white/80 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 md:p-16 border border-blue-100/80 shadow-2xl relative overflow-hidden"
          >
            {/* Inner card subtle decorative items */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-orange-500/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-br from-blue-500/5 to-orange-500/5 rounded-full blur-3xl -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side: Header & Graphic representation of core benefits */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-5 space-y-6"
              >
                <motion.span variants={fadeUpVariants} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-blue-700 border border-blue-100 font-extrabold tracking-widest text-[10px] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Your Sourcing Advantage
                </motion.span>
                <motion.h2 variants={fadeUpVariants} className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Why Choose <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-[#f97316] bg-clip-text text-transparent">Vel Bio Med</span>?
                </motion.h2>
                <motion.p variants={fadeUpVariants} className="text-slate-600 text-sm font-semibold leading-relaxed">
                  Partnering with Vel Bio Med means securing top-tier healthcare solutions from a premier Medical Equipment Supplier in Tamil Nadu and India. Backed by extensive regional expertise and OEM relationships, we provide comprehensive hospital equipment supply, ICU machinery, operation theatre setups, and dedicated biomedical engineering services.
                </motion.p>

                {/* Floating Badges */}
                <motion.div variants={containerVariants} className="grid grid-cols-1 gap-3.5 pt-4">
                  {[
                    { label: "Excellence", desc: "Top-tier quality controls", icon: Award, color: "from-blue-500 to-blue-700", hoverBg: "hover:bg-blue-50/30 hover:border-blue-300/80", hoverText: "group-hover:text-blue-650 text-blue-600" },
                    { label: "Reliability", desc: "Unwavering client uptime", icon: ShieldCheck, color: "from-amber-500 to-orange-600", hoverBg: "hover:bg-orange-50/30 hover:border-orange-300/80", hoverText: "group-hover:text-orange-650 text-orange-600" },
                    { label: "Satisfaction", desc: "Dedicated partnerships", icon: HeartHandshake, color: "from-indigo-500 to-blue-600", hoverBg: "hover:bg-indigo-50/30 hover:border-indigo-300/80", hoverText: "group-hover:text-indigo-650 text-indigo-600" }
                  ].map((badge, idx) => {
                    const IconComponent = badge.icon;
                    return (
                      <motion.div
                        variants={fadeUpVariants}
                        key={idx}
                        className={`group flex flex-row items-center gap-4 p-4 rounded-2xl bg-white border border-blue-50/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-1.5 justify-start w-full text-left cursor-default ${badge.hoverBg}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${badge.color} shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                          <IconComponent className="w-5 h-5" strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <span className={`text-xs sm:text-sm font-black text-slate-800 block leading-tight transition-colors duration-300 ${badge.hoverText}`}>{badge.label}</span>
                          <span className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 block leading-tight">{badge.desc}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Right Side: Professional text blocks with premium styling */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-7 space-y-6 text-slate-700"
              >
                <motion.div variants={fadeUpVariants} className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/50 to-white backdrop-blur-md border border-blue-100/80 shadow-inner hover:border-blue-300 transition-colors">
                  <p className="text-base sm:text-lg font-medium leading-relaxed">
                    When you choose <span className="font-extrabold bg-gradient-to-r from-blue-600 to-[#f97316] bg-clip-text text-transparent">Vel Bio Med</span>, you are partnering with a leading <span className="font-extrabold text-blue-700 underline decoration-blue-400/50 decoration-2">Medical Equipment Supplier</span> committed to excellence, reliability, and customer satisfaction across hospitals in Tamil Nadu & South India. As a trusted hospital equipment distributor, we deliver certified ECG machines, patient monitors, steam sterilizers, electric OT tables, and 24/7 AMC maintenance to power critical care delivery.
                  </p>
                </motion.div>

                <motion.div variants={fadeUpVariants} className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0f2445] to-[#251508] text-slate-200 shadow-xl border border-blue-900/30">
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    Thank you for considering Vel Bio Med as your trusted biomedical equipment supplier and hospital equipment dealer. We look forward to serving your healthcare institution with rapid equipment installation, preventive maintenance, and expert technical support.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR PRODUCTS SECTION */}
      <section className="py-14 sm:py-24 bg-linear-to-br from-blue-50/50 via-white to-orange-50/50 relative overflow-hidden border-b border-slate-100">


        {/* Ambient Decorative Light Orbs - Blue and Orange Gradient Glows */}
        <div className="absolute top-10 -left-10 w-full max-w-[500px] aspect-square bg-radial from-blue-500/15 via-blue-900/0 to-transparent rounded-full pointer-events-none" />
        <div className="absolute bottom-10 -right-10 w-full max-w-[500px] aspect-square bg-radial from-orange-500/12 via-orange-950/0 to-transparent rounded-full pointer-events-none" />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-200/50 text-blue-600 font-extrabold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" /> Sourcing Catalogue
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
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
          <Carousel
            setApi={setProductsApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              breakpoints: {
                "(min-width: 640px)": { slidesToScroll: 2 },
                "(min-width: 1024px)": { slidesToScroll: 3 }
              }
            }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 0.8,
                stopOnInteraction: false,
                stopOnMouseEnter: true
              })
            ]}
            className="w-full max-w-6xl mx-auto relative px-0 sm:px-4"
          >
            <CarouselContent className="-ml-4">
              {dynamicProducts.map((p, idx) => {
                const isAmber = idx % 2 === 1;
                return (
                  <CarouselItem key={p.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <motion.div
                      variants={fadeUpVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      onClick={() => onOpenProductModal(p)}
                      className={`group relative bg-gradient-to-b from-white to-slate-50/40 border border-slate-200/60 rounded-[32px] p-4 sm:p-6 hover:-translate-y-2.5 transition-[transform,border-color,box-shadow] duration-500 flex flex-col min-h-[400px] sm:min-h-[500px] overflow-hidden cursor-pointer
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
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Certified Unit
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
                    </motion.div>
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
                  className={`h-2 rounded-full transition-all duration-350 ${currentProductIndex === index
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
      <section className="py-14 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 relative overflow-hidden border-b border-slate-900">


        {/* Glowing Ambient Light Orbs */}
        <div className="absolute -top-40 -left-40 w-full max-w-[500px] aspect-square bg-radial from-blue-600/18 via-blue-950/0 to-transparent rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-full max-w-[500px] aspect-square bg-radial from-amber-500/10 via-amber-950/0 to-transparent rounded-full pointer-events-none" />

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

          {/* Auto Slider showing the 3 products in continuous infinite scroll */}
          <div className="w-full max-w-6xl mx-auto px-0 sm:px-4">
            <Carousel
              plugins={[trendingAutoScroll.current]}
              opts={{ align: "start", loop: true }}
              className="w-full relative px-2 sm:px-6 md:px-12"
            >
              <CarouselContent className="-ml-4">
                {trendingCarouselItems.map((item, idx) => (
                  <CarouselItem key={`${item.id}-${idx}`} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div
                      onClick={() => onOpenProductModal(item)}
                      className="flex flex-col bg-slate-900/80 backdrop-blur-md p-4 sm:p-6 border border-slate-800/80 rounded-3xl shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-[transform,border-color,box-shadow] duration-300 group relative overflow-hidden min-h-[400px] sm:min-h-[440px] justify-between cursor-pointer"
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
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest truncate">
                            {item.category}
                          </span>
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
                            if (setInquiryMachineName) setInquiryMachineName(item.name);
                            setCurrentTab("contact");
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
      <section id="services-section" className="py-14 sm:py-24 bg-slate-50/40 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-1/3 left-0 w-full max-w-[500px] aspect-square bg-blue-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-full max-w-[500px] aspect-square bg-orange-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {dbServices.map((srv, idx) => {
              const isAmber = idx % 2 === 1;
              const deliverables = getDeliverables(srv.title);
              return (
                <div
                  key={srv.id}
                  className={`border p-5 sm:p-8 rounded-3xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]
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

      {/* 6. TESTIMONIALS REVIEW SECTION */}
      <section className="py-12 sm:py-20 bg-white overflow-hidden">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-2">Our Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Voices of Trust inside Hospital Wings</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-4 rounded-full" />
          </div>

          <div
            onMouseEnter={() => setIsTestimonialsPaused(true)}
            onMouseLeave={() => setIsTestimonialsPaused(false)}
            onTouchStart={() => setIsTestimonialsPaused(true)}
            onTouchEnd={() => setIsTestimonialsPaused(false)}
            className="relative h-[500px] sm:h-[600px] lg:h-[650px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]"
          >
            {/* Desktop (≥1024px): 3 scrolling columns */}
            <div className="hidden lg:grid grid-cols-3 gap-8 h-full">
              <TestimonialsColumn testimonials={desktopCol1} duration={13} isPaused={isTestimonialsPaused} />
              <TestimonialsColumn testimonials={desktopCol2} duration={15} isPaused={isTestimonialsPaused} />
              <TestimonialsColumn testimonials={desktopCol3} duration={12} isPaused={isTestimonialsPaused} />
            </div>

            {/* Tablet (768px–1023px): 2 scrolling columns */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 h-full">
              <TestimonialsColumn testimonials={tabletCol1} duration={14} isPaused={isTestimonialsPaused} />
              <TestimonialsColumn testimonials={tabletCol2} duration={15} isPaused={isTestimonialsPaused} />
            </div>

            {/* Mobile (<768px): 1 single scrolling column for all 20 cards */}
            <div className="grid md:hidden grid-cols-1 gap-6 h-full w-full max-w-md mx-auto">
              <TestimonialsColumn testimonials={testimonials} duration={21} isPaused={isTestimonialsPaused} />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
