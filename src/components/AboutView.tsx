import { Award, ShieldCheck, Users, Activity, Sparkles, Building2, Globe, HeartHandshake, Scale, Cpu, Heart } from "lucide-react";
import LeadershipMessage from "./ui/LeadershipMessage";
import VisionMission from "./ui/VisionMission";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
}

function CorporateValueCard({ handleShuffle, title, desc, icon: IconComponent, gradient, position }: CorporateValueCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const getPositionStyles = () => {
    switch (position) {
      case "front":
        return { rotate: "-6deg", x: "0%", zIndex: 30, opacity: 1, scale: 1 };
      case "middle":
        return { rotate: "0deg", x: "18%", zIndex: 20, opacity: 0.9, scale: 0.94 };
      case "back":
        return { rotate: "6deg", x: "36%", zIndex: 10, opacity: 0.75, scale: 0.88 };
      case "far-back":
        return { rotate: "10deg", x: "54%", zIndex: 5, opacity: 0.5, scale: 0.82 };
      default:
        return { rotate: "12deg", x: "72%", zIndex: 0, opacity: 0, scale: 0.76 };
    }
  };

  const posStyles = getPositionStyles();

  return (
    <motion.div
      style={{
        zIndex: posStyles.zIndex
      }}
      animate={{
        rotate: posStyles.rotate,
        x: posStyles.x,
        scale: posStyles.scale,
        opacity: posStyles.opacity
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        const clientX = 'clientX' in e ? e.clientX : (e as any).touches?.[0]?.clientX || 0;
        dragRef.current = clientX;
      }}
      onDragEnd={(e) => {
        const clientX = 'clientX' in e ? e.clientX : (e as any).changedTouches?.[0]?.clientX || 0;
        if (dragRef.current - clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 flex flex-col justify-between h-[380px] w-[290px] sm:h-[430px] sm:w-[330px] select-none rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl text-white backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing hover:border-slate-755" : ""
      }`}
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

  const handleShuffle = () => {
    setPositions((prev) => {
      const copy = [...prev];
      const popped = copy.pop();
      if (popped) copy.unshift(popped);
      return copy;
    });
  };

  return (
    <section className="py-24 md:py-36 bg-slate-950 text-slate-100 border-t border-slate-900 relative overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
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
          <div className="lg:col-span-7 flex justify-center lg:justify-end items-center h-[480px] relative">
            <div className="relative h-[380px] w-[290px] sm:h-[430px] sm:w-[330px] -ml-[30px] sm:-ml-[60px] lg:mr-28">
              {values.map((v, index) => (
                <CorporateValueCard
                  key={index}
                  {...v}
                  handleShuffle={handleShuffle}
                  position={positions[index]}
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
      title: "Uncompromising Integrity",
      desc: "Every contract and delivery aligns with premium regulatory safety criteria, building life-long medical trust.",
      icon: Scale,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Constant Technological Innovation",
      desc: "We prioritize supply of advanced high acuity solutions that assist clinical personnel in fast diagnosis.",
      icon: Cpu,
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      title: "100% Patient Centricity",
      desc: "Our machinery setups center on seamless ergonomics that minimize stress on long hospital recovery phases.",
      icon: Heart,
      gradient: "from-rose-500 to-orange-500"
    },
    {
      title: "Unyielding Reliability",
      desc: "Emergency bio-medical breakdown tickets are processed within hours of notification, maintaining absolute ward uptime.",
      icon: ShieldCheck,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Comprehensive Team Collaboration",
      desc: "We consult clinical architects directly to install optimal space-saving modular hospital theatre gas systems.",
      icon: Users,
      gradient: "from-amber-500 to-orange-600"
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
              className="max-w-3xl mx-auto space-y-6"
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
          className="arrow"
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
        <section className="py-24 md:py-36 bg-gradient-to-br from-[#f8fafc] via-[#f0f6ff] to-[#f8fafc] relative overflow-hidden">
          {/* Subtle background ambient glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full opacity-30 animate-pulse"
            style={{ background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)", filter: "blur(80px)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)", filter: "blur(80px)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left Column Asymmetrical Image Block */}
              <div className="lg:col-span-5 relative">
                {/* Glow behind the card */}
                <div className="absolute inset-0 bg-blue-600/10 rounded-[2.5rem] blur-2xl transform translate-x-4 translate-y-4" />

                {/* Main Image Layer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative overflow-hidden rounded-[2.5rem] border-2 border-slate-100 shadow-2xl bg-white group"
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
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
                  className="absolute -top-4 -right-4 rounded-xl px-4 py-2 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-blue-100 shadow-xl"
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
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-extrabold tracking-widest text-[10px] uppercase">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> Corporate Profile
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Sourcing Global Diagnostics of <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">Unparalleled</span> <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 bg-clip-text text-transparent">Metric Confidence</span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 rounded-full" />
                </div>

                <div className="space-y-5">
                  <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-semibold">
                    Founded as an exclusive distributor for advanced ultrasonic solutions and neonatal systems, Vel Bio Med has emerged as a premier turn-key partner for clinical centers. Our product inventory spans from premium diagnostic scanners to advanced anesthetic delivery desks.
                  </p>
                  <div className="pl-4 border-l-4 border-orange-500 bg-slate-50/70 p-4 rounded-r-xl">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium italic">
                      We collaborate with recognized clinical panels, medical engineers, and institutional stakeholders to install configurations that pass stringent licensing reviews smoothly. Quality is verified across incoming, in-transit, and calibration parameters before deployment.
                    </p>
                  </div>
                </div>

                {/* Highly structured, premium interactive grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                  {[
                    {
                      title: "ISO 13485:2016 Compliant Systems",
                      desc: "Strict international biological engineering standards for healthcare quality and safety.",
                      icon: ShieldCheck,
                      gradient: "from-blue-500 to-cyan-500",
                      cardBg: "from-blue-50/70 via-white/95 to-blue-50/20",
                      borderColor: "border-blue-100/80 hover:border-blue-300/80 hover:shadow-[0_12px_30px_rgba(59,130,246,0.1)]",
                      hoverGlow: "from-blue-100/50 to-cyan-100/30"
                    },
                    {
                      title: "FDA and CE Certified Portfolio",
                      desc: "Elite diagnostic machinery passing stringent overseas regulatory board certifications.",
                      icon: Award,
                      gradient: "from-orange-500 to-amber-500",
                      cardBg: "from-orange-50/70 via-white/95 to-orange-50/20",
                      borderColor: "border-orange-100/80 hover:border-orange-300/80 hover:shadow-[0_12px_30px_rgba(249,115,22,0.1)]",
                      hoverGlow: "from-orange-100/50 to-amber-100/30"
                    },
                    {
                      title: "Rapid Logistics Supply Network",
                      desc: "Smooth global-to-regional import logistics ensuring prompt and safe hardware delivery.",
                      icon: Globe,
                      gradient: "from-blue-600 to-indigo-600",
                      cardBg: "from-indigo-50/70 via-white/95 to-indigo-50/20",
                      borderColor: "border-indigo-100/80 hover:border-indigo-300/80 hover:shadow-[0_12px_30px_rgba(99,102,241,0.1)]",
                      hoverGlow: "from-indigo-100/50 to-blue-100/30"
                    },
                    {
                      title: "24/7 Dedicated Engineering Service",
                      desc: "Expert biomedical assistance desk ensuring absolute clinical uptime and calibrations.",
                      icon: HeartHandshake,
                      gradient: "from-amber-500 to-orange-600",
                      cardBg: "from-amber-50/70 via-white/95 to-amber-50/20",
                      borderColor: "border-amber-100/80 hover:border-amber-300/80 hover:shadow-[0_12px_30px_rgba(245,158,11,0.1)]",
                      hoverGlow: "from-amber-100/50 to-orange-100/30"
                    },
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        className={`group p-5 rounded-2xl border bg-gradient-to-br ${item.cardBg} ${item.borderColor} transition-all duration-300 relative overflow-hidden`}
                      >
                        {/* Hover glow background */}
                        <div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 bg-gradient-to-br ${item.hoverGlow}`}
                        />

                        <div className="flex gap-4 items-start">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:rotate-6 shadow-md`}
                          >
                            <IconComponent className="w-5 h-5" strokeWidth={2.2} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-slate-900 font-extrabold text-sm tracking-tight leading-snug">
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
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Leadership Founder Message Section */}
        <LeadershipMessage />

        {/* Vision & Mission Section */}
        <VisionMission />

        {/* Core Values Section */}
        <CorporateValuesStack values={values} />

        {/* Success Stories Metric Blocks */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-5 pointer-events-none" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
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
