import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Target, CheckCircle2, Zap, Shield, Globe, Heart, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number = 0) => ({
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
      className="relative rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-8 overflow-hidden group transition-all duration-300"
      style={{
        background: `linear-gradient(145deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        border: `1px solid rgba(255, 255, 255, 0.85)`,
        boxShadow: `0 15px 45px ${glowColor}, 0 4px 15px rgba(10,37,64,0.03)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Abstract top-right decorative shapes */}
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500"
        style={{ background: shapeColor, filter: "blur(40px)", opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="absolute top-6 right-6 w-20 h-20 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500"
        style={{ background: shapeColor, filter: "blur(18px)", opacity: 0.35 }}
      />

      {/* Dot-grid texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.045] transition-opacity duration-300"
        style={{
          backgroundImage: "radial-gradient(circle, #0A2540 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Icon block */}
      <div className="relative z-10 flex items-start gap-5">
        <div className="relative flex-shrink-0">
          <motion.div
            animate={{ boxShadow: [`0 0 0px ${accent}40`, `0 0 22px ${accent}60`, `0 0 0px ${accent}40`] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg group-hover:rotate-6 transition-transform duration-300"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accentSoft})` }}
          >
            <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
          </motion.div>
          <div className="absolute -inset-1.5 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition-opacity -z-10" style={{ backgroundColor: accent }} />
        </div>

        <div className="pt-1">
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border animate-pulse"
            style={{ background: `${accent}12`, color: accent, borderColor: `${accent}25` }}
          >
            <Sparkles className="w-2.5 h-2.5" /> {badge}
          </span>
          <h3
            className="text-[26px] md:text-[30px] font-black leading-tight tracking-tight text-slate-900"
            style={{ fontFamily: "'Poppins', 'Satoshi', sans-serif", letterSpacing: "-0.02em" }}
          >
            {heading}
          </h3>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full rounded-full relative z-10 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-slate-300 transition-all duration-300"
      />

      {/* Body text */}
      <p
        className="relative z-10 leading-[1.8] font-medium text-slate-600 group-hover:text-slate-700 transition-colors duration-300"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}
      >
        {body}
      </p>

      {/* Bullet points */}
      <ul className="relative z-10 space-y-4">
        {points.map(({ icon: BulletIcon, text }, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-4 group/item"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover/item:scale-110 shadow-sm mt-0.5"
              style={{ background: `${accent}08`, borderColor: `${accent}18` }}
            >
              <BulletIcon className="w-4 h-4 transition-transform duration-300" style={{ color: accent }} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover/item:text-slate-900 transition-colors duration-300">{text}</span>
          </motion.li>
        ))}
      </ul>

      {/* Bottom accent bar */}
      <div
        className="relative z-10 h-1.5 w-16 rounded-full mt-auto group-hover:w-24 transition-all duration-300"
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
      style={{ background: "linear-gradient(170deg, #FFFFFF 0%, #F4F8FD 40%, #E9F1FC 100%)" }}
    >
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 animate-pulse"
        style={{ background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)", filter: "blur(110px)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #00B4D8 0%, transparent 70%)", filter: "blur(90px)" }} />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-10 w-[300px] h-[300px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          className="text-center mb-16 space-y-5"
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest border border-blue-200/50 bg-blue-50 text-blue-600"
          >
            Our Foundation
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight"
            style={{ color: "#0A2540", fontFamily: "'Poppins', 'Satoshi', sans-serif", letterSpacing: "-0.025em" }}
          >
            Where Purpose Meets{" "}
            <span
              className="inline-block bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"
            >
              Precision
            </span>
          </h2>
          <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-orange-500" />
          <p className="max-w-xl mx-auto text-base leading-relaxed font-medium text-slate-500">
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
            heading="Our Vision"
            body="At Vel Bio Med, we envision leading the charge in advancing healthcare solutions. Our goal is to make cutting-edge medical equipment easily accessible, empowering healthcare providers to deliver top-notch care. We’re driven by a vision that embraces innovation, adaptability, and a relentless pursuit of excellence."
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
            heading="Our Mission"
            body="Our mission is simple yet powerful: to make quality healthcare a fundamental right. We achieve this by providing reliable, innovative, and cost-effective medical solutions. Through our services, we support healthcare institutions in their mission to enhance patient care, making a positive impact on the healthcare landscape."
            points={missionPoints}
          />
        </div>

      </div>
    </section>
  );
}