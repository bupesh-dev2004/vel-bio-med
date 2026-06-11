import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Stethoscope, TrendingUp, Users, Quote } from "lucide-react";

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
    { icon: TrendingUp, value: "12+", label: "Years Leading", gradient: "from-blue-400 to-cyan-300", iconColor: "text-blue-400", bgGlow: "bg-slate-800/80" },
    { icon: Users, value: "450+", label: "Hospitals Served", gradient: "from-emerald-400 to-teal-300", iconColor: "text-emerald-400", bgGlow: "bg-slate-800/80" },
    { icon: Award, value: "1,500+", label: "Installations", gradient: "from-amber-400 to-orange-300", iconColor: "text-amber-400", bgGlow: "bg-slate-800/80" },
    { icon: Stethoscope, value: "100%", label: "Uptime SLA", gradient: "from-indigo-400 to-purple-300", iconColor: "text-indigo-400", bgGlow: "bg-slate-800/80" },
];

const highlights: [string, string][] = [
    ["visionary and inspiring founder", "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-extrabold not-italic"],
    ["excellence and innovation", "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-extrabold not-italic"],
    ["make a difference in healthcare", "text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 font-extrabold not-italic"],
];

function highlightText(text: string) {
    let result: (string | React.ReactElement)[] = [text];
    highlights.forEach(([phrase, cls]) => {
        result = result.flatMap((part) => {
            if (typeof part !== "string") return [part];
            const segments = part.split(phrase);
            return segments.flatMap((seg, i) =>
                i < segments.length - 1
                    ? [seg, <span key={`${phrase}-${i}`} className={cls}>{phrase}</span>]
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
        `At Vel Bio Med, our journey is led by Mr. Muralikrishnan Gokulakrishnan, a visionary and inspiring founder. His leadership is the compass that guides our team towards success. With a focus on excellence and innovation, he instills a culture of dedication and professionalism, shaping Vel Bio Med into a dynamic player in the medical equipment field.`;
    const para2 =
        `Under his guidance, we move forward with confidence, driven by a commitment to make a difference in healthcare.`;

    return (
        <section
            ref={ref}
            className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 border-t border-b border-slate-800/60"
        >
            {/* Ambient background glows */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-25 animate-pulse"
                style={{ background: "radial-gradient(circle, #00B4D8 0%, transparent 70%)", filter: "blur(100px)" }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)", filter: "blur(80px)" }}
            />

            {/* Subtle dot-grid overlay */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Section header */}
                <motion.div
                    className="text-center mb-20 space-y-4"
                    initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                >
                    <span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest border border-blue-900/50 bg-blue-950/40 text-blue-400"
                    >
                        <Award className="w-3.5 h-3.5" /> Leadership Vision
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-white"
                        style={{ fontFamily: "'Poppins', 'Satoshi', sans-serif" }}
                    >
                        A Message From Our{" "}
                        <span
                            className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent"
                        >
                            Managing Founder
                        </span>
                    </h2>
                    {/* gradient underline accent */}
                    <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* LEFT COLUMN - Refined Quote */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            custom={1} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            whileHover={{ y: -4, transition: { duration: 0.3 } }}
                            className="relative rounded-[2rem] p-8 md:p-10 overflow-hidden bg-slate-950/50 border border-slate-800/80 shadow-2xl backdrop-blur-md"
                        >
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 right-8 text-slate-800 opacity-20 pointer-events-none">
                                <Quote className="w-24 h-24" />
                            </div>

                            <div
                                className="space-y-6 relative z-10 font-medium text-slate-300 text-base sm:text-lg leading-relaxed"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                <p>{highlightText(para1)}</p>
                                <p>{highlightText(para2)}</p>
                            </div>

                            {/* Elegant divider */}
                            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

                            {/* Signature Section */}
                            <div className="flex items-center gap-5">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
                                >
                                    MG
                                </div>
                                <div>
                                    <p
                                        className="font-extrabold text-xl tracking-tight text-white"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        Mr. Muralikrishnan Gokulakrishnan
                                    </p>
                                    <p
                                        className="text-[11px] font-extrabold uppercase tracking-widest mt-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                                    >
                                        Founder & Managing Director
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Credentials row */}
                        <motion.div
                            custom={2} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {[
                                { label: "ISO 13485:2016", sub: "Certified Systems" },
                                { label: "FDA & CE", sub: "Approved Portfolio" },
                            ].map((c) => (
                                <div
                                    key={c.label}
                                    className="rounded-2xl px-6 py-4 flex items-center gap-4 bg-slate-900/40 border border-slate-800/60 shadow-md backdrop-blur-md hover:border-slate-700 transition-all duration-300"
                                >
                                    <div
                                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500"
                                    >
                                        ✓
                                    </div>
                                    <div>
                                        <p className="font-extrabold text-sm text-white">{c.label}</p>
                                        <p className="text-[11px] font-semibold text-slate-400">{c.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN - Portrait & Modern Stats */}
                    <div className="lg:col-span-5 space-y-8">
                        
                        {/* Portrait Container */}
                        <motion.div
                            custom={1.5} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            className="relative rounded-[2rem] overflow-hidden bg-slate-900/40 border border-slate-800/80 shadow-2xl backdrop-blur-md"
                        >
                            {/* Glow */}
                            <div
                                aria-hidden
                                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10"
                            />

                            {/* Image wrapper */}
                            <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                                    alt="Mr. Muralikrishnan Gokulakrishnan – Founder & Managing Director"
                                    className="w-full h-full object-cover object-top"
                                    whileHover={{ scale: 1.04, transition: { duration: 0.5 } }}
                                />

                                {/* Floating experience badge */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-5 right-5 rounded-2xl px-4 py-2.5 text-center bg-slate-950/90 border border-slate-800/80 shadow-xl backdrop-blur-md z-20"
                                >
                                    <p
                                        className="text-2xl font-black leading-none bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent"
                                    >
                                        12+
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">Years</p>
                                </motion.div>

                                {/* Floating expert chip */}
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-5 left-5 rounded-xl px-3.5 py-2 flex items-center gap-2 bg-slate-900/90 border border-slate-800/80 shadow-lg backdrop-blur-md z-20"
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200">
                                        Clinical Machinery Expert
                                    </span>
                                </motion.div>
                            </div>

                            {/* Refined Bio plate inside card */}
                            <div className="p-6 sm:p-8 space-y-2 relative z-20">
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                                    Our Founder's Vision
                                </span>
                                <p className="text-sm leading-relaxed font-medium text-slate-300">
                                    Founded with a vision to elevate healthcare standards, Mr. Muralikrishnan Gokulakrishnan envisioned Vel Bio Med as a company that not only delivers top-notch medical equipment but also focuses on building enduring relationships with our valued clients.
                                </p>
                            </div>
                        </motion.div>

                        {/* Upgrade stats grid */}
                        <motion.div
                            custom={2.5} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}
                            className="grid grid-cols-2 gap-4"
                        >
                            {stats.map(({ icon: Icon, value, label, gradient, iconColor, bgGlow }, i) => (
                                <motion.div
                                    key={label}
                                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                                    className="rounded-2xl p-5 flex flex-col gap-3 bg-slate-900/40 border border-slate-800/60 shadow-md backdrop-blur-md hover:border-slate-700 transition-all duration-300 group"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgGlow} border border-slate-700/50 group-hover:rotate-6 transition-transform duration-300`}
                                    >
                                        <Icon className={`w-5 h-5 ${iconColor}`} />
                                    </div>
                                    <div>
                                        <p
                                            className={`text-2xl font-black leading-none bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                                        >
                                            {value}
                                        </p>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">{label}</p>
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