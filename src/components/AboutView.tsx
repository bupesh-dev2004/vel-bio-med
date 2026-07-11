import { Award, ShieldCheck, Users, Activity, Sparkles, Building2, Globe, HeartHandshake, Scale, Cpu, Heart, MapPin, ThumbsUp, CheckSquare, Zap, ArrowRight } from "lucide-react";
import LeadershipMessage from "./ui/LeadershipMessage";
import VisionMission from "./ui/VisionMission";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

const timelineMilestones = [
  {
    year: "2006",
    title: "Company Foundation",
    description: "Vel Bio Med is established with a foundational vision: bridging the gap in biological science distribution by delivering world-class hospital and diagnostic machinery.",
    icon: Building2
  },
  {
    year: "2010",
    title: "Expanding Critical Care",
    description: "We expanded our product portfolio to provide comprehensive critical care equipment and life-support systems, earning the trust of regional clinics.",
    icon: Cpu
  },
  {
    year: "2013",
    title: "Official Incorporation",
    description: "Officially incorporated under the leadership of Mr. Muralikrishnan Gokulakrishnan, committing to robust turnkey installations across Tamil Nadu.",
    icon: Globe
  },
  {
    year: "2017",
    title: "Authorized Dealerships",
    description: "Secured official status as authorized dealers for renowned global healthcare brands including Maestros, Akas Infusions, and Sharkclave Systems.",
    icon: Award
  },
  {
    year: "2019",
    title: "Advanced Service Division",
    description: "Launched our dedicated 24/7 service engineering and AMC support division, ensuring maximum operating uptime for all critical care installations.",
    icon: Activity
  },
  {
    year: "2023",
    title: "6,000+ Successful Installations",
    description: "Celebrated a major milestone of over 6,000 successful medical equipment installations serving more than 800 premium hospitals state-wide.",
    icon: ThumbsUp
  },
  {
    year: "2026",
    title: "Clinical Sourcing Excellence",
    description: "Celebrating 20 years of clinical sourcing leadership, delivering state-of-the-art diagnostics and intensive care units with certified quality.",
    icon: Sparkles
  }
];

function TimelineMilestone({ milestone, index, activeIndex, setActiveIndex }: {
  milestone: typeof timelineMilestones[0];
  index: number;
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const isActive = index === activeIndex;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth out scroll progress using spring physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.8 });
  const opacity = useTransform(smoothProgress, [0.15, 0.45, 0.55, 0.85], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0.15, 0.45, 0.55, 0.85], [60, 0, 0, -60]);
  
  // Dynamic horizontal fly-in based on alternating column position (left or right)
  const rawX = useTransform(smoothProgress, [0.15, 0.45, 0.55, 0.85], [isLeft ? -45 : 45, 0, 0, isLeft ? -45 : 45]);
  const x = useSpring(rawX, { stiffness: 80, damping: 25, mass: 0.8 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && activeIndex !== index) {
          setActiveIndex(index);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [index, activeIndex, setActiveIndex]);

  const IconComponent = milestone.icon;

  return (
    <div ref={ref} className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[380px] flex items-center w-full py-8 md:py-16">
      {/* Node dot on the vertical timeline with expanding scale and pulse shadow */}
      <motion.div 
        animate={{
          scale: isActive ? 1.3 : 1,
          backgroundColor: isActive ? "#0284C7" : "#cbd5e1",
          boxShadow: isActive ? "0 0 20px rgba(2, 132, 199, 0.6)" : "0 0 0px rgba(0,0,0,0)"
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 z-30 flex items-center justify-center rounded-full w-5 h-5 cursor-pointer"
      >
        {isActive && (
          <span className="absolute inset-0 rounded-full bg-[#0284C7] animate-ping opacity-75" />
        )}
        <div className="rounded-full w-2 h-2 bg-white" />
      </motion.div>

      {/* Horizontal Connector Line (desktop only) that expands smoothly when active */}
      <motion.div 
        animate={{ 
          width: isActive ? "5%" : "0%", 
          backgroundColor: isActive ? "#0284C7" : "#e2e8f0" 
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 z-20 ${isLeft ? "left-[45%]" : "right-[45%]"}`}
      />

      {/* Card Wrapper with Parallax Scroll Transition (Vertical + Horizontal Fly-in) */}
      <motion.div 
        style={{ opacity, y, x }}
        className={`w-full flex ${isLeft ? "md:justify-start" : "md:justify-end"} pl-12 md:pl-0`}
      >
        <motion.div 
          whileHover={{
            y: -10,
            scale: isActive ? 1.05 : 1.01,
            boxShadow: isActive 
              ? "0 30px 60px -15px rgba(2, 132, 199, 0.2)" 
              : "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
          }}
          animate={{
            scale: isActive ? 1.03 : 0.98,
            borderColor: isActive ? "#bae6fd" : "#f1f5f9",
            boxShadow: isActive ? "0 25px 50px -12px rgba(2, 132, 199, 0.12)" : "0 4px 6px -1px rgba(0, 0, 0, 0.03)"
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[45%] rounded-3xl p-6 sm:p-8 bg-white border flex flex-col sm:flex-row gap-6 items-start cursor-pointer"
        >
          {/* Milestone Icon with glow, scale, and subtle hover wiggle */}
          <motion.div 
            whileHover={{
              rotate: [0, -10, 10, 0],
              scale: 1.15
            }}
            animate={{
              scale: isActive ? 1.1 : 1,
              boxShadow: isActive ? "0 10px 15px -3px rgba(2, 132, 199, 0.2)" : "0 0px 0px rgba(0,0,0,0)"
            }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${isLeft ? "from-sky-500 to-indigo-600" : "from-orange-500 to-amber-500"}`}
          >
            <IconComponent className="w-6 h-6" strokeWidth={2.2} />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-2 text-left">
            <span 
              className={`text-xl sm:text-2xl font-black tracking-tight transition-all duration-500 block
                ${isActive ? "text-[#0284C7]" : "text-slate-400"}
              `}
            >
              {milestone.year}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {milestone.title}
            </h3>
            <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] border border-sky-100 font-extrabold tracking-widest text-[10px] uppercase">
            <Activity className="w-3.5 h-3.5" /> Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Evolution & Milestones
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
            A timeline of continuous sourcing growth, critical installations, and healthcare transformations.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical progress timeline line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-[60px] bottom-[60px] w-1 bg-slate-200 z-10 rounded-full overflow-hidden">
            <div 
              className="w-full bg-[#0284C7] transition-all duration-500 ease-out origin-top" 
              style={{ height: `${(activeIndex / (timelineMilestones.length - 1)) * 100}%` }} 
            />
          </div>

          {/* Timeline Milestones list */}
          <div className="relative z-20 space-y-4">
            {timelineMilestones.map((m, idx) => (
              <TimelineMilestone 
                key={idx}
                milestone={m}
                index={idx}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
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

      // Update Shade Opacity (starts at 0.20, increases to 0.50 as you scroll)
      const num = 0.20 + (scrollTop / 500) * 0.30;
      if (shadeRef.current) {
        shadeRef.current.style.opacity = Math.min(num, 0.50).toString();
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
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0f172a]/60 to-transparent pointer-events-none z-10" />

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
                    16+ Years
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


          </div>
        </section>


        {/* Leadership Founder Message Section */}
        <LeadershipMessage />

        {/* Alternate Journey Timeline Section */}
        <TimelineSection />

        {/* Vision & Mission Section */}
        <VisionMission />

        {/* Core Values Section */}
        <CorporateValuesStack values={values} />



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
        </section>      </div>
    </div>
  );
}
