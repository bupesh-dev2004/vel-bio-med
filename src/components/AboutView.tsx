import { Award, ShieldCheck, Users, Activity, Sparkles, Building2 } from "lucide-react";
import LeadershipMessage from "./ui/LeadershipMessage";
import VisionMission from "./ui/VisionMission";
import React, { useEffect, useRef, useState } from "react";

interface ValueItem {
  title: string;
  desc: string;
  icon: string;
}

function ValuesCarousel({ values, cardColors }: { values: ValueItem[]; cardColors: string[] }) {
  const total = values.length;
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Pause 2.8s on active card, then transition 0.8s, then advance
    const pauseTimer = setTimeout(() => {
      setTransitioning(true);
      const advanceTimer = setTimeout(() => {
        setActive((prev) => (prev + 1) % total);
        setTransitioning(false);
      }, 800);
      return () => clearTimeout(advanceTimer);
    }, 2800);
    return () => clearTimeout(pauseTimer);
  }, [active, total]);

  const getCardStyle = (idx: number): React.CSSProperties => {
    const offset = ((idx - active + total) % total);
    // Map offset to position: 0=center, 1=right1, 2=right2(hidden), total-1=left1, total-2=left2(hidden)
    const positions: Record<number, { x: number; rotateY: number; scale: number; z: number; opacity: number }> = {
      0: { x: 0, rotateY: 0, scale: 1.08, z: 40, opacity: 1 },
      1: { x: 260, rotateY: -18, scale: 0.88, z: 10, opacity: 0.72 },
      2: { x: 460, rotateY: -28, scale: 0.72, z: -20, opacity: 0 },
      [total - 1]: { x: -260, rotateY: 18, scale: 0.88, z: 10, opacity: 0.72 },
      [total - 2]: { x: -460, rotateY: 28, scale: 0.72, z: -20, opacity: 0 },
    };
    const pos = positions[offset] ?? { x: 0, rotateY: 0, scale: 0.6, z: -40, opacity: 0 };
    return {
      transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotateY}deg) scale(${pos.scale})`,
      opacity: transitioning && offset === 0 ? 0.6 : pos.opacity,
      zIndex: pos.z + 50,
      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-extrabold tracking-widest text-[10px] uppercase">
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Core Corporate Values
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
        </div>
      </div>

      {/* Carousel Stage */}
      <div className="values-stage">
        <div className="values-track" style={{ perspective: "1000px" }}>
          {values.map((v, idx) => {
            const isActive = idx === active;
            const rgb = cardColors[idx];
            return (
              <div
                key={idx}
                className="values-card-item"
                style={getCardStyle(idx)}
                onClick={() => { if (!transitioning) setActive(idx); }}
              >
                {/* Glow behind active card */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl blur-2xl -z-10 scale-110"
                    style={{ background: `rgba(${rgb}, 0.35)` }}
                  />
                )}
                {/* Card face */}
                <div
                  className="values-card-face"
                  style={{
                    background: `linear-gradient(145deg, rgba(${rgb}, 0.18) 0%, rgba(${rgb}, 0.38) 100%)`,
                    borderColor: `rgba(${rgb}, ${isActive ? 0.9 : 0.45})`,
                    boxShadow: isActive
                      ? `0 20px 60px rgba(${rgb}, 0.35), 0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)`
                      : `0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15)`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="values-icon-wrap"
                    style={{ background: `rgba(${rgb}, 0.22)`, borderColor: `rgba(${rgb}, 0.5)` }}
                  >
                    <span className="text-3xl leading-none">{v.icon}</span>
                  </div>
                  {/* Text */}
                  <h4 className="values-title">{v.title}</h4>
                  <p className="values-desc">{v.desc}</p>
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="values-active-dot" style={{ background: `rgba(${rgb}, 1)` }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot navigation */}
        <div className="values-dots">
          {values.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { if (!transitioning) setActive(idx); }}
              className="values-dot"
              style={{
                width: idx === active ? "28px" : "8px",
                background: idx === active ? `rgba(${cardColors[idx]}, 1)` : "rgba(100,116,139,0.4)",
                boxShadow: idx === active ? `0 0 10px rgba(${cardColors[idx]}, 0.7)` : "none",
              }}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
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
    { value: "12+", label: "Years of Experience" },
    { value: "450+", label: "Hospital Customers" },
    { value: "1,500+", label: "Setup Installations" },
    { value: "100%", label: "Uptime SLA Response" }
  ];

  const cardColors = [
    "142, 202, 252",
    "142, 252, 204",
    "215, 252, 142",
    "252, 208, 142",
    "204, 142, 252",
  ];

  const values = [
    {
      title: "Uncompromising Integrity",
      desc: "Every contract and delivery aligns with premium regulatory safety criteria, building life-long medical trust.",
      icon: "⚖️"
    },
    {
      title: "Constant Technological Innovation",
      desc: "We prioritize supply of advanced high acuity solutions that assist clinical personnel in fast diagnosis.",
      icon: "🧬"
    },
    {
      title: "100% Patient Centricity",
      desc: "Our machinery setups center on seamless ergonomics that minimize stress on long hospital recovery phases.",
      icon: "🩺"
    },
    {
      title: "Unyielding Reliability",
      desc: "Emergency bio-medical breakdown tickets are processed within hours of notification, maintaining absolute ward uptime.",
      icon: "🛡️"
    },
    {
      title: "Comprehensive Team Collaboration",
      desc: "We consult clinical architects directly to install optimal space-saving modular hospital theatre gas systems.",
      icon: "🤝"
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
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold tracking-widest text-xs uppercase animate-pulse mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Who We Are
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                Your Partner in <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Clinical</span> <span className="bg-gradient-to-r from-amber-400 to-[#F97316] bg-clip-text text-transparent">Longevity</span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#0A6EBD] to-[#F97316] mx-auto rounded-full" />
              <p className="max-w-2xl mx-auto text-slate-200 text-sm md:text-lg leading-relaxed font-medium">
                Vel Bio Med stands for premium grade healthcare sourcing, bridging elite overseas factories to regional clinics with extreme delivery precision.
              </p>
            </div>
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
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left Column Asymmetrical Image Block */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute inset-0 bg-blue-600/10 rounded-[2.5rem] blur-2xl transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-xl bg-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                    alt="Hospital Operating Theatre Installation"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-slate-900/95 backdrop-blur-md text-white p-7 rounded-2xl shadow-2xl border border-slate-800 hidden sm:block transition-all duration-300 hover:-translate-y-1">
                  <span className="text-2xl font-black block tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">12+ Years</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Clinical Sourcing Excellence</span>
                </div>
              </div>

              {/* Right Column Corporate Profile */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-extrabold tracking-widest text-[10px] uppercase">
                    Corporate Profile
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Sourcing Global Diagnostics of <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Unparalleled</span> <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Metric Confidence</span>
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full" />
                </div>

                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 font-medium">
                  <p>
                    Founded as an exclusive distributor for advanced ultrasonic solutions and neonatal systems, Vel Bio Med has emerged as a premier turn-key partner for clinical centers. Our product inventory spans from premium diagnostic scanners to advanced anesthetic delivery desks.
                  </p>
                  <p>
                    We collaborate with recognized clinical panels, medical engineers, and institutional stakeholders to install configurations that pass stringent licensing reviews smoothly. Quality is verified across incoming, in-transit, and calibration parameters before deployment.
                  </p>
                </div>

                {/* Highly structured checklists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "ISO 13485:2016 Compliant Systems",
                    "FDA and CE certified equipment portfolio",
                    "Rapid logistics supply network",
                    "24/7 dedicated engineering service desk"
                  ].map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-3 bg-slate-50 border border-slate-100/70 p-3.5 rounded-xl transition-colors ${idx % 2 === 1 ? 'hover:border-orange-200' : 'hover:border-blue-200'}`}>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-extrabold text-xs ${
                        idx % 2 === 1 
                          ? 'bg-orange-50 border-orange-100 text-orange-600' 
                          : 'bg-blue-50 border-blue-100 text-blue-600'
                      }`}>
                        ✓
                      </div>
                      <span className="text-slate-800 font-bold text-xs tracking-tight">{item}</span>
                    </div>
                  ))}
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
        <ValuesCarousel values={values} cardColors={cardColors} />

        {/* Success Stories Metric Blocks */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-5 pointer-events-none" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10 relative z-10">
                {metrics.map((m, idx) => (
                  <div key={idx} className="space-y-2 py-4 lg:py-0">
                    <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
                      {m.value}
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
