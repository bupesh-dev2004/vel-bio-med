import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Award, Stethoscope, TrendingUp, Users } from "lucide-react";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: i * 0.12,
            ease: "easeOut" as const,
        },
    }),
};

const stats = [
    { icon: TrendingUp, value: "20+", label: "Years Leading" },
    { icon: Users, value: "450+", label: "Hospitals Served" },
    { icon: Award, value: "1,500+", label: "Installations" },
    { icon: Stethoscope, value: "100%", label: "Uptime SLA" },
];

const highlights: [string, string][] = [
    ["zero headroom for compromise", "text-orange-500 font-bold not-italic"],
    ["Annual Maintenance Contracts (AMC)", "text-blue-600 font-bold not-italic"],
    ["benchmark for biological engineering", "text-[#0A2540] font-bold not-italic"],
];

function highlightText(text: string) {
    let result: (string | React.ReactElement)[] = [text];
    highlights.forEach(([phrase, cls]) => {
        result = result.flatMap((part) => {
            if (typeof part !== "string") return [part];
            const segments = part.split(phrase);
            return segments.flatMap((seg, i) =>
                i < segments.length - 1
                    ? [seg, <mark key={`${phrase}-${i}`} className={`bg-transparent ${cls}`}>{phrase}</mark>]
                    : [seg]
            );
        });
    });
    return result;
}

export default function LeadershipMessage() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const para1 =
        `At Vel Bio Med, we define technology as a platform to secure lives. When a ventilator or anesthetic station undergoes calibration inside our labs, we remind our engineers of the human aspect involved. There is simply zero headroom for compromise in hospital critical setups.`;
    const para2 =
        `By establishing comprehensive Annual Maintenance Contracts (AMC) and ensuring direct availability of critical spare components, we help clinical facilities operate seamlessly without unexpected emergency breaks. Our goal is to set the benchmark for biological engineering service operations.`;

    return (
        <section
            ref={ref}
            className="relative py-28 md:py-36 overflow-hidden"
            style={{ background: "linear-gradient(160deg, #F0F7FF 0%, #F8FBFF 55%, #EEF4FF 100%)" }}
        >
            {/* ── Ambient glow blobs ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, #00B4D8 0%, transparent 70%)", filter: "blur(80px)" }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)", filter: "blur(80px)" }}
            />

            {/* ── Subtle dot-grid overlay ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: "radial-gradient(circle, #0A2540 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* ── Section header ── */}
                <motion.div
                    className="text-center mb-16 space-y-4"
                    initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                >
                    <span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest border"
                        style={{ background: "rgba(10,110,189,0.08)", borderColor: "rgba(10,110,189,0.2)", color: "#0A6EBD" }}
                    >
                        <Award className="w-3.5 h-3.5" /> Leadership Vision
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight"
                        style={{ color: "#0A2540", fontFamily: "'Poppins', 'Satoshi', sans-serif" }}
                    >
                        A Message From Our
                        <span
                            className="block"
                            style={{ background: "linear-gradient(90deg, #0A6EBD, #00B4D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                        >
                            Managing Founder
                        </span>
                    </h2>
                    {/* gradient underline accent */}
                    <div className="mx-auto w-20 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #0A6EBD, #00B4D8)" }} />
                </motion.div>

                {/* ── Two-column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-start">

                    {/* ════ LEFT COLUMN ════ */}
                    <div className="space-y-8">

                        {/* Quote card */}
                        <motion.div
                            custom={1} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            whileHover={{ y: -4, transition: { duration: 0.3 } }}
                            className="relative rounded-[28px] p-8 md:p-10 overflow-hidden"
                            style={{
                                background: "rgba(255,255,255,0.72)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255,255,255,0.9)",
                                boxShadow: "0 8px 40px rgba(10,110,189,0.10), 0 2px 8px rgba(10,37,64,0.06)",
                            }}
                        >
                            {/* Faded background quote icon */}
                            <span
                                aria-hidden
                                className="absolute -top-6 -left-2 select-none pointer-events-none font-serif leading-none"
                                style={{ fontSize: "160px", color: "#0A6EBD", opacity: 0.06 }}
                            >
                                "
                            </span>

                            {/* Decorative foreground quote icon */}
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                                style={{ background: "linear-gradient(135deg, #0A6EBD, #00B4D8)", boxShadow: "0 4px 16px rgba(10,110,189,0.35)" }}
                            >
                                <span className="text-white text-2xl font-serif leading-none">"</span>
                            </div>

                            <div
                                className="space-y-5 italic relative z-10"
                                style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", lineHeight: "1.9", color: "#4B5563" }}
                            >
                                <p>{highlightText(para1)}</p>
                                <p>{highlightText(para2)}</p>
                            </div>

                            {/* Elegant divider */}
                            <div
                                className="my-7 h-px w-full rounded-full"
                                style={{ background: "linear-gradient(90deg, transparent, rgba(10,110,189,0.25), transparent)" }}
                            />

                            {/* Signature section */}
                            <div className="flex items-center gap-5">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0"
                                    style={{ background: "linear-gradient(135deg, #0A2540, #0A6EBD)" }}
                                >
                                    VV
                                </div>
                                <div>
                                    <p
                                        className="font-extrabold text-xl tracking-tight"
                                        style={{ color: "#0A2540", fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        Dr. Vivek Vardhan Rao
                                    </p>
                                    <p
                                        className="text-[11px] font-extrabold uppercase tracking-widest mt-0.5"
                                        style={{ background: "linear-gradient(90deg, #0A6EBD, #00B4D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                    >
                                        Founder & Managing Director
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Credentials row */}
                        <motion.div
                            custom={2} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { label: "ISO 13485:2016", sub: "Certified Systems" },
                                { label: "FDA & CE", sub: "Approved Portfolio" },
                            ].map((c) => (
                                <div
                                    key={c.label}
                                    className="rounded-2xl px-5 py-4 flex items-center gap-3"
                                    style={{
                                        background: "rgba(255,255,255,0.65)",
                                        backdropFilter: "blur(12px)",
                                        border: "1px solid rgba(10,110,189,0.15)",
                                        boxShadow: "0 2px 12px rgba(10,110,189,0.07)",
                                    }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                                        style={{ background: "linear-gradient(135deg, #0A6EBD, #00B4D8)" }}
                                    >
                                        ✓
                                    </div>
                                    <div>
                                        <p className="font-extrabold text-sm" style={{ color: "#0A2540" }}>{c.label}</p>
                                        <p className="text-[11px] font-semibold" style={{ color: "#6B7280" }}>{c.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ════ RIGHT COLUMN ════ */}
                    <div className="space-y-6">

                        {/* Founder image card */}
                        <motion.div
                            custom={1.5} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            whileHover={{ y: -6, transition: { duration: 0.35 } }}
                            className="relative rounded-[28px] overflow-hidden"
                            style={{
                                background: "rgba(255,255,255,0.65)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255,255,255,0.85)",
                                boxShadow: "0 12px 48px rgba(10,110,189,0.13), 0 2px 8px rgba(10,37,64,0.07)",
                            }}
                        >
                            {/* Soft gradient glow behind image */}
                            <div
                                aria-hidden
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(0,180,216,0.18) 0%, transparent 65%)" }}
                            />

                            {/* Image */}
                            <div className="relative overflow-hidden" style={{ borderRadius: "28px 28px 0 0" }}>
                                <motion.img
                                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                                    alt="Dr. Vivek Vardhan Rao – Founder & Managing Director"
                                    className="w-full object-cover"
                                    style={{ height: "340px", objectPosition: "top" }}
                                    whileHover={{ scale: 1.04, transition: { duration: 0.5 } }}
                                />
                                {/* Gradient overlay on image bottom */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                                    style={{ background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)" }}
                                />

                                {/* Floating experience badge */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-5 right-5 rounded-2xl px-4 py-2.5 text-center"
                                    style={{
                                        background: "rgba(10,37,64,0.88)",
                                        backdropFilter: "blur(16px)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                                    }}
                                >
                                    <p
                                        className="text-2xl font-black leading-none"
                                        style={{ background: "linear-gradient(90deg, #F97316, #FBBF24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                    >
                                        20+
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mt-0.5">Years</p>
                                </motion.div>

                                {/* Floating medical UI chip */}
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-6 left-5 rounded-xl px-3.5 py-2 flex items-center gap-2"
                                    style={{
                                        background: "rgba(255,255,255,0.92)",
                                        backdropFilter: "blur(12px)",
                                        border: "1px solid rgba(10,110,189,0.2)",
                                        boxShadow: "0 4px 16px rgba(10,110,189,0.15)",
                                    }}
                                >
                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00B4D8" }} />
                                    <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "#0A2540" }}>
                                        Clinical Machinery Expert
                                    </span>
                                </motion.div>
                            </div>

                            {/* Name plate inside card */}
                            <div className="px-7 py-5">
                                <p
                                    className="font-extrabold text-2xl tracking-tight"
                                    style={{ color: "#0A2540", fontFamily: "'Poppins', sans-serif" }}
                                >
                                    Dr. Vivek Vardhan Rao
                                </p>
                                <p
                                    className="text-[11px] font-extrabold uppercase tracking-widest mt-1"
                                    style={{ background: "linear-gradient(90deg, #0A6EBD, #00B4D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                >
                                    Founder & Managing Director, Vel Bio Med
                                </p>
                                <p className="mt-3 text-sm leading-relaxed font-medium" style={{ color: "#6B7280" }}>
                                    Leveraging over two decades directing critical trauma panels and sourcing bioscience products across global health systems.
                                </p>
                            </div>
                        </motion.div>

                        {/* Achievement stats grid */}
                        <motion.div
                            custom={2.5} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            className="grid grid-cols-2 gap-4"
                        >
                            {stats.map(({ icon: Icon, value, label }, i) => (
                                <motion.div
                                    key={label}
                                    whileHover={{ y: -3, transition: { duration: 0.25 } }}
                                    className="rounded-[20px] p-5 flex flex-col gap-3"
                                    style={{
                                        background: "rgba(255,255,255,0.70)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                        border: "1px solid rgba(255,255,255,0.9)",
                                        boxShadow: "0 4px 20px rgba(10,110,189,0.09)",
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: i % 2 === 0 ? "linear-gradient(135deg, #0A6EBD, #00B4D8)" : "linear-gradient(135deg, #0A2540, #0A6EBD)" }}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p
                                            className="text-2xl font-black leading-none"
                                            style={{ 
                                                background: i % 2 === 1 
                                                    ? "linear-gradient(90deg, #F97316, #FBBF24)" 
                                                    : "linear-gradient(90deg, #0A6EBD, #00B4D8)", 
                                                WebkitBackgroundClip: "text", 
                                                WebkitTextFillColor: "transparent" 
                                            }}
                                        >
                                            {value}
                                        </p>
                                        <p className="text-[11px] font-bold uppercase tracking-wider mt-1" style={{ color: "#6B7280" }}>{label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}