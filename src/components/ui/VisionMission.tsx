import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Compass, Target, CheckCircle2, Zap, Shield, Globe, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const visionPoints = [
  { icon: Globe,        text: "Certified access to international-grade clinical machinery" },
  { icon: Heart,        text: "Trust-driven patient care across all demographics" },
  { icon: CheckCircle2, text: "Affordable diagnostics for regional healthcare centers" },
];

const missionPoints = [
  { icon: Zap,          text: "Premium response times with 24/7 engineering support" },
  { icon: Shield,       text: "Strict multi-stage biomedical product inspection" },
  { icon: CheckCircle2, text: "Continuous AMC structures that safeguard clinical uptime" },
];

interface CardProps {
  index: number;
  inView: boolean;
  accent: string;
  accentSoft: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  badge: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  heading: string;
  body: string;
  points: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>; text: string }[];
  shapeColor: string;
}

function PremiumCard({
  index, inView, accent, accentSoft, gradientFrom, gradientTo,
  glowColor, badge, Icon, heading, body, points, shapeColor,
}: CardProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
      className="relative rounded-[32px] p-8 md:p-10 flex flex-col gap-8 overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        border: `1px solid rgba(255,255,255,0.85)`,
        boxShadow: `0 8px 40px ${glowColor}, 0 2px 8px rgba(10,37,64,0.06)`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Abstract top-right decorative shape */}
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: shapeColor, filter: "blur(40px)", opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="absolute top-6 right-6 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: shapeColor, filter: "blur(18px)", opacity: 0.35 }}
      />

      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #0A2540 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Icon block */}
      <div className="relative z-10 flex items-start gap-5">
        <motion.div
          animate={{ boxShadow: [`0 0 0px ${accent}40`, `0 0 22px ${accent}60`, `0 0 0px ${accent}40`] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accentSoft})` }}
        >
          <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
        </motion.div>

        <div className="pt-1">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-2"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
          >
            {badge}
          </span>
          <h3
            className="text-[28px] md:text-[32px] font-extrabold leading-tight tracking-tight"
            style={{ color: "#0A2540", fontFamily: "'Poppins', 'Satoshi', sans-serif", letterSpacing: "-0.02em" }}
          >
            {heading}
          </h3>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full rounded-full relative z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
      />

      {/* Body text */}
      <p
        className="relative z-10 leading-[1.9]"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "#4B5563" }}
      >
        {body}
      </p>

      {/* Bullet points */}
      <ul className="relative z-10 space-y-3.5">
        {points.map(({ icon: BulletIcon, text }, i) => (
          <motion.li
            key={i}
            custom={index + i * 0.2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="flex items-center gap-3.5"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
            >
              <BulletIcon className="w-4 h-4" style={{ color: accent }} strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold" style={{ color: "#374151" }}>{text}</span>
          </motion.li>
        ))}
      </ul>

      {/* Bottom accent bar */}
      <div
        className="relative z-10 h-1 w-16 rounded-full mt-auto"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentSoft})` }}
      />
    </motion.div>
  );
}

export default function VisionMission() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(170deg, #ffffff 0%, #F0F7FF 50%, #EEF4FF 100%)" }}
    >
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)", filter: "blur(90px)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #00B4D8 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          className="text-center mb-16 space-y-5"
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest border"
            style={{ background: "rgba(10,110,189,0.08)", borderColor: "rgba(10,110,189,0.2)", color: "#0A6EBD" }}
          >
            Our Foundation
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight"
            style={{ color: "#0A2540", fontFamily: "'Poppins', 'Satoshi', sans-serif", letterSpacing: "-0.025em" }}
          >
            Where Purpose Meets{" "}
            <span
              className="inline-block"
              style={{ background: "linear-gradient(90deg, #0A6EBD, #F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Precision
            </span>
          </h2>
          <div className="mx-auto w-20 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #0A6EBD, #F97316)" }} />
          <p className="max-w-xl mx-auto text-base leading-relaxed font-medium" style={{ color: "#6B7280" }}>
            Every decision at Vel Bio Med is anchored in a clear vision and an unwavering mission to elevate clinical outcomes.
          </p>
        </motion.div>
 
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
          <PremiumCard
            index={1}
            inView={inView}
            accent="#0A6EBD"
            accentSoft="#00B4D8"
            gradientFrom="rgba(240,247,255,0.92)"
            gradientTo="rgba(224,242,255,0.85)"
            glowColor="rgba(10,110,189,0.12)"
            shapeColor="rgba(10,110,189,0.18)"
            badge="Our Vision"
            Icon={Compass}
            heading="Our Noble Vision"
            body="To transform regional clinical diagnostics by giving every clinic direct, affordable, and certified access to international quality machinery — establishing trust-driven patient care across all demographics."
            points={visionPoints}
          />
          <PremiumCard
            index={2}
            inView={inView}
            accent="#F97316"
            accentSoft="#FBBF24"
            gradientFrom="rgba(255,247,237,0.92)"
            gradientTo="rgba(254,243,199,0.85)"
            glowColor="rgba(249,115,22,0.12)"
            shapeColor="rgba(249,115,22,0.20)"
            badge="Our Mission"
            Icon={Target}
            heading="Our Mission Matrix"
            body="Commitment to premium response times, strict multi-stage inspection of biomedical products, comprehensive technician handovers, and continuous maintenance structures that safeguard lives around the clock."
            points={missionPoints}
          />
        </div>

      </div>
    </section>
  );
}