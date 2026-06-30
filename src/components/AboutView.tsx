import { Award, ShieldCheck, Users, Activity, Sparkles, Building2, Globe, HeartHandshake, Scale, Cpu, Heart, MapPin, ThumbsUp, CheckSquare, Zap, ArrowRight } from "lucide-react";
import LeadershipMessage from "./ui/LeadershipMessage";
import VisionMission from "./ui/VisionMission";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "../AppContext.js";
import { FrostedGlassCard } from "@/components/ui/interactive-frosted-glass-card";
import { BorderRotate } from "@/components/ui/animated-gradient-border";


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

function AnimatedCounter({ target, duration = 1500, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [countStr, setCountStr] = useState("0");
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

      let formattedVal = "";
      if (isDecimal) {
        formattedVal = currentVal.toFixed(1);
      } else {
        formattedVal = Math.floor(currentVal).toLocaleString();
      }
      setCountStr(formattedVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasStarted, target, duration]);

  return <span ref={elementRef}>{countStr}{suffix}</span>;
}

interface ValueItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient: string;
}

interface CorporateValueCardProps {
  handleShuffle: () => void;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient: string;
  position: string;
  isMobile: boolean;
}

function CorporateValueCard({ handleShuffle, title, desc, icon: IconComponent, gradient, position, isMobile }: CorporateValueCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const getPositionStyles = () => {
    const shift = isMobile ? 8 : 18;
    switch (position) {
      case "front":
        return { rotate: "-6deg", x: "0%", zIndex: 30, opacity: 1, scale: 1 };
      case "middle":
        return { rotate: "0deg", x: `${shift}%`, zIndex: 20, opacity: 0.9, scale: 0.94 };
      case "back":
        return { rotate: "4deg", x: `${shift * 2}%`, zIndex: 10, opacity: 0.75, scale: 0.88 };
      case "far-back":
        return { rotate: "8deg", x: `${shift * 3}%`, zIndex: 5, opacity: 0.5, scale: 0.82 };
      default:
        return { rotate: "12deg", x: `${shift * 4}%`, zIndex: 0, opacity: 0, scale: 0.76 };
    }
  };

  const posStyles = getPositionStyles();

  return (
    <motion.div
      style={{
        zIndex: posStyles.zIndex,
        willChange: "transform, opacity"
      }}
      animate={{
        rotate: posStyles.rotate,
        x: posStyles.x,
        scale: posStyles.scale,
        opacity: posStyles.opacity
      }}
      drag={isFront ? "x" : false}
      dragElastic={0.25}
      dragListener={isFront}
      dragConstraints={{
        left: -200,
        right: 200,
        top: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        const clientX = 'clientX' in e ? e.clientX : (e as any).touches?.[0]?.clientX || 0;
        dragRef.current = clientX;
      }}
      onDragEnd={(e) => {
        const clientX = 'clientX' in e ? e.clientX : (e as any).changedTouches?.[0]?.clientX || 0;
        if (dragRef.current - clientX > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute left-0 top-0 flex flex-col justify-between h-[340px] w-[250px] sm:h-[430px] sm:w-[330px] select-none rounded-3xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 shadow-2xl text-white ${isFront ? "cursor-grab active:cursor-grabbing hover:border-slate-700" : ""}`}
    >
      {/* Decorative top line */}
      <div className={`absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${gradient}`} />

      {/* Main card body */}
      <div className="space-y-6">
        {/* Icon Wrap */}
        <div className="relative inline-block">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${gradient} shadow-lg`}>
            <IconComponent className="w-7 h-7" strokeWidth={2} />
          </div>
          <div className={`absolute -inset-2 rounded-3xl blur-xl opacity-30 -z-10 bg-gradient-to-br ${gradient}`} />
        </div>

        {/* Title */}
        <h4 className="text-slate-100 font-extrabold text-xl sm:text-2xl tracking-tight leading-snug">
          {title}
        </h4>

        {/* Description */}
        <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Slide hint for user interaction */}
      {isFront && (
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-[10px] text-slate-500 uppercase tracking-widest font-black">
          <span>Drag left to shuffle</span>
          <span className="animate-bounce">←</span>
        </div>
      )}
    </motion.div>
  );
}

function CorporateValuesStack({ values }: { values: ValueItem[] }) {
  const [positions, setPositions] = useState(["front", "middle", "back", "far-back", "hidden"]);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleShuffle = () => {
    setPositions((prev) => {
      const copy = [...prev];
      const popped = copy.pop();
      if (popped) copy.unshift(popped);
      return copy;
    });
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleShuffle();
    }, 1800);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-16 sm:py-24 md:py-36 bg-slate-950 text-slate-100 border-t border-slate-900 relative overflow-hidden">
      {/* Dark premium grids and glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
        style={{ background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)", filter: "blur(100px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side text */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/50 text-blue-400 border border-blue-900/50 font-extrabold tracking-widest text-[10px] uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Our Foundation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Our Core <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">Corporate Values</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
            <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
              Guiding our clinical operations, quality checks, and client support paradigms daily. Drag and swipe the interactive cards on the right to browse our core pillars.
            </p>
          </div>

          {/* Right Side card stack */}
          <div
            className="lg:col-span-7 flex justify-center lg:justify-end items-center h-[390px] sm:h-[480px] relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-[340px] w-[250px] sm:h-[430px] sm:w-[330px] -ml-[20px] sm:-ml-[60px] lg:mr-28">
              {values.map((v, index) => (
                <CorporateValueCard
                  key={index}
                  {...v}
                  handleShuffle={handleShuffle}
                  position={positions[index]}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function AboutView() {
  const { setCurrentTab } = useAppState();
  const bgRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Update Shade Opacity (starts at 0.65, increases to 0.90 as you scroll)
      const num = 0.65 + (scrollTop / 500) * 0.25;
      if (shadeRef.current) {
        shadeRef.current.style.opacity = Math.min(num, 0.90).toString();
      }

      // Update BG Scale
      const num2mod = 1 + (scrollTop * 0.0004);
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(${num2mod})`;
      }

      // Update Text translation (parallax speed effect)
      const num3mod = scrollTop * 0.2;
      if (textRef.current) {
        textRef.current.style.transform = `translateY(-${num3mod}px)`;
      }

      // Fade out arrow as we scroll down
      if (arrowRef.current) {
        const arrowOpacity = Math.max(1 - (scrollTop / 300), 0);
        arrowRef.current.style.opacity = arrowOpacity.toString();
        arrowRef.current.style.pointerEvents = arrowOpacity === 0 ? "none" : "auto";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const metrics = [
    { target: 12, suffix: "+", label: "Years of Experience" },
    { target: 450, suffix: "+", label: "Hospital Customers" },
    { target: 1500, suffix: "+", label: "Setup Installations" },
    { target: 100, suffix: "%", label: "Uptime SLA Response" }
  ];

  const values = [
    {
      title: "Integrity",
      desc: "Upholding honesty, transparency, and ethical conduct is non-negotiable. We build trust through our commitment to the highest standards of integrity",
      icon: Scale,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Customer-Centricity",
      desc: "Our customers are our priority. We are dedicated to understanding and surpassing their expectations, delivering tailored solutions to meet their unique needs.",
      icon: Heart,
      gradient: "from-rose-500 to-orange-500"
    },
    {
      title: "Team Collaboration",
      desc: "We value collaboration and teamwork. By creating an inclusive work environment, we harness the collective skills of our team to achieve common goals.",
      icon: Users,
      gradient: "from-amber-500 to-orange-600"
    },
    {
      title: "Innovation",
      desc: "We foster a culture of continuous improvement and innovation. Staying updated on the latest advancements ensures our clients have access to cutting-edge solutions.",
      icon: Cpu,
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      title: "Reliability",
      desc: "Vel Bio Med is synonymous with reliability. Our commitment is unwavering, ensuring the quality of our products and the efficiency of our services instill confidence in our clients",
      icon: ShieldCheck,
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Parallax Hero Cover with Zoom and Fade Effects */}
      <div className="heroEffects">
        {/* Parallax Background */}
        <div
          ref={bgRef}
          className="bg"
        />

        {/* Dark Overlay (Shade) that darkens as you scroll */}
        <div
          ref={shadeRef}
          className="shade"
        />

        {/* Top Gradient Overlay to blend with sticky navigation */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#081d38]/75 to-transparent pointer-events-none z-10" />

        {/* Title Content */}
        <div className="title">
          <div
            ref={textRef}
            className="text"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl mx-auto space-y-6 px-6"
            >
              <motion.span
                variants={fadeUpVariants}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold tracking-widest text-xs uppercase animate-pulse mb-2"
              >
                <Sparkles className="w-3.5 h-3.5" /> Who We Are
              </motion.span>
              <motion.h1
                variants={fadeUpVariants}
                className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none"
              >
                Your Partner in <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Clinical</span> <span className="bg-gradient-to-r from-amber-400 to-[#F97316] bg-clip-text text-transparent">Longevity</span>
              </motion.h1>
              <motion.div
                variants={fadeUpVariants}
                className="w-20 h-1 bg-gradient-to-r from-[#0A6EBD] to-[#F97316] mx-auto rounded-full"
              />
              <motion.p
                variants={fadeUpVariants}
                className="max-w-2xl mx-auto text-slate-200 text-sm md:text-lg leading-relaxed font-medium"
              >
                Vel Bio Med stands for premium grade healthcare sourcing, bridging elite overseas factories to regional clinics with extreme delivery precision.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Bouncy Scroll Indicator Arrow */}
        <div
          ref={arrowRef}
          className="arrow hidden sm:block"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight - 80,
              behavior: "smooth"
            });
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Scroll Down</span>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all hover:scale-110 active:scale-95 shadow-lg bouncy">
              <svg height="15" width="30" viewBox="0 0 50 25">
                <polygon points="0,0 25,10 50,0 25,25" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Subsequent Content Wrapper - scrolls over fixed background */}
      <div className="relative z-10 bg-slate-50 border-t border-slate-200/40">
        {/* Corporate Overview Story */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-[#f0f6ff] to-white relative overflow-hidden">
          {/* Scientific grid dot background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60" />

          {/* Subtle background ambient glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-25 animate-pulse"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(100px)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", filter: "blur(100px)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left Column Asymmetrical Image Block */}
              <div className="lg:col-span-5 relative">
                {/* Outlined border offset layer */}
                <div className="absolute -inset-4 border border-blue-500/10 rounded-[2.75rem] -z-10 transform translate-x-3 translate-y-3" />

                {/* Glow behind the card */}
                <div className="absolute inset-0 bg-blue-600/10 rounded-[2.5rem] blur-2xl transform translate-x-4 translate-y-4 -z-10" />

                {/* Main Image Layer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative overflow-hidden rounded-[2.5rem] border-2 border-slate-100 shadow-2xl bg-white group"
                >
                  <motion.img
                    src="/corporate-profile.png"
                    alt="Hospital Operating Theatre Installation"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle glass overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Floating Experience Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="absolute -bottom-6 -left-6 bg-slate-900/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-slate-800 hidden sm:block"
                >
                  <span className="text-3xl font-black block tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                    12+ Years
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1 block">
                    Clinical Sourcing Excellence
                  </span>
                </motion.div>

                {/* Floating Partner Chip */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute top-2 right-2 sm:-top-4 sm:-right-4 rounded-xl px-4 py-2 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-blue-100 shadow-xl"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 pl-1">
                    Global Partners
                  </span>
                </motion.div>
              </div>

              {/* Right Column Corporate Profile */}
              <div className="lg:col-span-7 space-y-8">
                 <div className="space-y-4 border border-blue-200 bg-white/90 p-5 rounded-3xl sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none shadow-md">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-extrabold tracking-widest text-[10px] uppercase">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> Corporate Profile
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Sourcing Global Diagnostics of{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">Unparalleled</span>{" "}
                    <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">Metric Confidence</span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 rounded-full" />
                </div>

                <div className="space-y-6">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
                    At Vel Bio Med, we are dedicated to providing cutting-edge medical equipment, unparalleled service, and unwavering commitment to healthcare excellence. Established in 2013 by Mr. Muralikrishnan Gokulakrishnan, Vel Bio Med started as a proprietorship and has since grown to become a leading player in the medical equipment industry, offering sales and services across the vibrant healthcare landscape of Tamil Nadu.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-3 items-start p-4 bg-white/60 rounded-xl border border-blue-50/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm block">Established 2013</span>
                        <span className="text-slate-500 text-xs mt-0.5 block">Founded by Mr. Muralikrishnan Gokulakrishnan</span>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-4 bg-white/60 rounded-xl border border-orange-50/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                      <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm block">State-Wide Reach</span>
                        <span className="text-slate-500 text-xs mt-0.5 block">Sales and services across Tamil Nadu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Highly structured, premium interactive grids */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-20"
            >
              {[
                {
                  title: "Location",
                  desc: "Headquartered in Trichy, Vel Bio Med strategically positions itself to cater to the diverse healthcare needs of the region. Our central location enables us to efficiently reach and serve medical establishments throughout Tamil Nadu.",
                  icon: MapPin,
                  gradient: "from-blue-500 to-blue-600",
                  cardBg: "from-blue-50/20 via-white to-white",
                  borderColor: "border-blue-200 hover:border-blue-400 hover:shadow-[0_15px_35px_rgba(59,130,246,0.08)]",
                  hoverGlow: "from-blue-50/50 to-blue-100/20",
                  badgeColor: "text-blue-500 bg-blue-50"
                },
                {
                  title: "Comprehensive Sales & Service",
                  desc: "At Vel Bio Med, we specialize in the sales and service of a wide array of medical equipment. Whether you are a hospital, clinic, or healthcare facility, we understand the importance of reliable and efficient equipment to provide optimum patient care. Our team of experts is committed to delivering prompt and effective service to keep your medical equipment in optimal condition.",
                  icon: Activity,
                  gradient: "from-orange-500 to-orange-600",
                  cardBg: "from-orange-50/20 via-white to-white",
                  borderColor: "border-orange-200 hover:border-orange-400 hover:shadow-[0_15px_35px_rgba(249,115,22,0.08)]",
                  hoverGlow: "from-orange-50/50 to-orange-100/20",
                  badgeColor: "text-orange-500 bg-orange-50"
                },
                {
                  title: "Authorized Dealer for Leading Brands",
                  desc: "We take pride in being authorized dealers for renowned brands in the medical equipment industry. Vel Bio Med is the trusted dealer for Maestros, Akas Infusions, Sharkclave Systems, and SIMED. These partnerships ensure that our clients receive state-of-the-art products backed by the latest technology and innovation.",
                  icon: Award,
                  gradient: "from-blue-500 to-blue-600",
                  cardBg: "from-blue-50/20 via-white to-white",
                  borderColor: "border-blue-200 hover:border-blue-400 hover:shadow-[0_15px_35px_rgba(59,130,246,0.08)]",
                  hoverGlow: "from-blue-50/50 to-blue-100/20",
                  badgeColor: "text-blue-500 bg-blue-50"
                },
                {
                  title: "Strategic Collaborations",
                  desc: "Vel Bio Med believes in the power of collaboration. We have established strong ties with numerous companies to ensure a seamless and continuous supply of high-quality medical equipment. Our collaborations enable us to offer a diverse range of products to meet the evolving needs of the healthcare sector.",
                  icon: HeartHandshake,
                  gradient: "from-orange-500 to-orange-600",
                  cardBg: "from-orange-50/20 via-white to-white",
                  borderColor: "border-orange-200 hover:border-orange-400 hover:shadow-[0_15px_35px_rgba(249,115,22,0.08)]",
                  hoverGlow: "from-orange-50/50 to-orange-100/20",
                  badgeColor: "text-orange-500 bg-orange-50"
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariants}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`group p-5 sm:p-8 rounded-3xl border bg-gradient-to-br ${item.cardBg} ${item.borderColor} transition-all duration-500 relative overflow-hidden flex flex-col justify-between`}
                  >
                    {/* Hover glow background */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 bg-gradient-to-br ${item.hoverGlow}`}
                    />

                    <div className="space-y-5">
                      <div className="flex justify-between items-center">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-br ${item.gradient} transition-all duration-500 group-hover:rotate-6 shadow-md`}
                        >
                          <IconComponent className="w-6 h-6" strokeWidth={2.2} />
                        </div>
                        <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                          0{idx + 1}
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        <h4 className="text-slate-900 font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 font-medium text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </section>


        {/* Leadership Founder Message Section */}
        <LeadershipMessage />

        {/* Vision & Mission Section */}
        <VisionMission />

        {/* Core Values Section */}
        <CorporateValuesStack values={values} />

        {/* Why Choose Vel Bio Med Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#f0f6ff] via-white to-[#fff7ed] border-t border-blue-100/60 relative overflow-hidden">
          {/* Ambient background glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(120px)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", filter: "blur(120px)" }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-5 sm:p-10 md:p-16 border border-blue-100/80 shadow-2xl relative overflow-hidden"
            >
              {/* Inner card subtle decorative items */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-orange-500/5 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-br from-blue-500/5 to-orange-500/5 rounded-full blur-3xl -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Side: Header & Graphic representation of core benefits */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-extrabold tracking-widest text-[10px] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Your Sourcing Advantage
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Why Choose <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-[#f97316] bg-clip-text text-transparent">Vel Bio Med</span>?
                  </h2>
                  <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                    Partnering with us means securing top-tier medical solutions backed by regional expertise and global manufacturer relationships.
                  </p>
                  
                  {/* Floating Badges */}
                  <div className="grid grid-cols-1 gap-3.5 pt-4">
                    {[
                      { label: "Excellence", desc: "Top-tier quality controls", icon: Award, color: "from-blue-500 to-blue-700", hoverBg: "hover:bg-blue-50/30 hover:border-blue-300/80", hoverText: "group-hover:text-blue-650 text-blue-600" },
                      { label: "Reliability", desc: "Unwavering client uptime", icon: ShieldCheck, color: "from-amber-500 to-orange-600", hoverBg: "hover:bg-orange-50/30 hover:border-orange-300/80", hoverText: "group-hover:text-orange-650 text-orange-600" },
                      { label: "Satisfaction", desc: "Dedicated partnerships", icon: HeartHandshake, color: "from-indigo-500 to-blue-600", hoverBg: "hover:bg-indigo-50/30 hover:border-indigo-300/80", hoverText: "group-hover:text-indigo-650 text-indigo-600" }
                    ].map((badge, idx) => {
                      const IconComponent = badge.icon;
                      return (
                        <div
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
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Professional text blocks with premium styling */}
                <div className="lg:col-span-7 space-y-6 text-slate-700">
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/50 to-white backdrop-blur-md border border-blue-100/80 shadow-inner hover:border-blue-300 transition-colors">
                    <p className="text-base sm:text-lg font-medium leading-relaxed">
                      When you choose <span className="font-extrabold bg-gradient-to-r from-blue-600 to-[#f97316] bg-clip-text text-transparent">Vel Bio Med</span>, you are choosing a partner committed to <span className="font-extrabold text-blue-700 underline decoration-blue-400/50 decoration-2">excellence</span>, <span className="font-extrabold text-[#e0690f] underline decoration-orange-400/50 decoration-2">reliability</span>, and <span className="font-extrabold text-indigo-700 underline decoration-indigo-400/50 decoration-2">customer satisfaction</span>. We are dedicated to making a positive impact on healthcare delivery by providing superior products and services.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0f2445] to-[#251508] text-slate-200 shadow-xl border border-blue-900/30">
                    <p className="text-sm sm:text-base font-medium leading-relaxed">
                      Thank you for considering Vel Bio Med as your trusted partner in medical solutions. We look forward to serving you and contributing to the success of your healthcare endeavors.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Corporate Strengths Section (relocated from Home) */}
        <section className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
          {/* Glow ambient design elements */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left side Image wrapped in rotating gradient border */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="lg:col-span-6 relative"
              >
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

                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden sm:block border border-blue-50/30">
                  <p className="text-3xl font-black text-white">100%</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-100 mt-1">Uptime SLA Support</p>
                  <p className="text-blue-100 text-[11px] mt-2 font-medium leading-relaxed">Our engineers are dispatched immediately for high emergency troubleshooting alerts.</p>
                </div>
              </motion.div>

              {/* Right side content */}
              <div className="lg:col-span-6 space-y-6">
                <motion.div
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-6"
                >
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
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
                >
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
                    <motion.div key={idx} variants={fadeUpVariants}>
                      <FrostedGlassCard
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.desc}
                        icon={item.icon}
                        iconBgColor={item.bgColor}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Metric Blocks */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-5 pointer-events-none" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-white/10 relative z-10">
                {metrics.map((m, idx) => (
                  <div key={idx} className="space-y-2 py-4 md:py-0">
                    <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
                      <AnimatedCounter target={m.target} suffix={m.suffix} />
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
