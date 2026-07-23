import React from "react";
import { Wrench, Shield, Briefcase, Activity, PhoneCall, ArrowRight, ShieldCheck, LifeBuoy, ClipboardCheck, Settings2, CheckCircle2 } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { FlipWords } from "./ui/flip-words.js";
import { motion } from "framer-motion";

export default function ServicesView() {
  const { state, setCurrentTab, setInquiryMachineName } = useAppState();

  const handleServiceSelect = (serviceTitle: string) => {
    setInquiryMachineName(`Service Booking: ${serviceTitle}`);
    setCurrentTab("contact");
  };

  const dbServices = state?.services || [
    {
      id: "srv-1",
      title: "AMC for Operation Theatre Equipment",
      description: "An Annual Maintenance Contract (AMC) for operation theatre and ICU equipment ensures regular preventive maintenance, calibration, component replacement, and 24/7 emergency support across hospitals in Tamil Nadu and South India to optimize machinery performance.",
      iconName: "Shield"
    },
    {
      id: "srv-2",
      title: "Troubleshooting of all medical equipment (Any brand)",
      description: "We provide expert biomedical troubleshooting and repair services for all medical equipment brands, resolving electronic, mechanical, and sensor issues to maintain uninterrupted hospital equipment reliability.",
      iconName: "Wrench"
    },
    {
      id: "srv-3",
      title: "Installation & Commissioning of new medical equipment",
      description: "We excel in the seamless medical equipment installation and commissioning of new healthcare devices, ensuring optimal functionality, safety compliance, and operational staff training for multi-specialty hospitals.",
      iconName: "Briefcase"
    },
    {
      id: "srv-4",
      title: "Restoration of medical equipment",
      description: "We specialize in restoring medical equipment to peak performance through biomedical engineering services, component recalibration, and hardware refurbishing to extend life-support machinery longevity.",
      iconName: "Activity"
    },
    {
      id: "srv-5",
      title: "Customised Product solutions for all medical equipment",
      description: "We provide customized healthcare equipment solutions and OEM adaptations for all medical devices, meeting diverse hospital needs with precision engineering and innovation.",
      iconName: "PhoneCall"
    },
    {
      id: "srv-6",
      title: "Hygienic Cleaning services",
      description: "Our hygienic cleaning services ensure meticulous sterilization and sanitation of medical equipment, autoclaves, and clinical facilities, maintaining impeccable standards for patient safety and healthcare hygiene.",
      iconName: "LifeBuoy"
    }
  ];

  // Helper to resolve icon from key names
  const renderIcon = (name: string, isAmber: boolean) => {
    const iconColor = isAmber ? "text-orange-600 group-hover:text-white" : "text-blue-600 group-hover:text-white";
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

  const processSteps = [
    {
      step: "01",
      subTitle: "Phase 01 / Assessment",
      title: "Comprehensive Site Audit",
      desc: "Detailed review of electrical harmonics, gas flow channels, and physical space ergonomics.",
      output: "Site Readiness Report",
      icon: <ClipboardCheck className="w-5 h-5" />
    },
    {
      step: "02",
      subTitle: "Phase 02 / Deployment",
      title: "OEM Certified Setup",
      desc: "Precise mounting, structural alignment, and telemetry configuration matching manufacturer specifications.",
      output: "Installation Log",
      icon: <Settings2 className="w-5 h-5" />
    },
    {
      step: "03",
      subTitle: "Phase 03 / Validation",
      title: "Safety Rig Calibration",
      desc: "Comprehensive biometric verification to catalog active calibration logs under NABL reference standards.",
      output: "NABL Calibration Cert",
      icon: <Activity className="w-5 h-5" />
    },
    {
      step: "04",
      subTitle: "Phase 04 / Lifecycle SLA",
      title: "Continuous Uptime Checks",
      desc: "Scheduled periodic checks, responsive maintenance visits, and emergency SLA dispatches.",
      output: "Active SLA Registry",
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
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

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Upper header cover */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://altosengineers.com/wp-content/uploads/2023/01/5-Keys-to-Proper-Setup-of-Medical-Equipment-1.jpg')] bg-cover bg-center opacity-85" />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6"
        >
          <motion.span
            variants={fadeUpVariants}
            className="text-blue-500 font-black tracking-widest text-xs uppercase block"
          >
            Full Services & Support
          </motion.span>
          <motion.h1
            variants={fadeUpVariants}
            className="text-3xl md:text-5xl font-extrabold tracking-tight flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2"
          >
            <span>Biomedical Service</span>
            <span className="min-w-[280px] sm:min-w-[320px] text-center sm:text-left inline-block">
              <FlipWords
                words={["Calibration", "Maintenance", "Installation", "Emergency SLA"]}
                duration={3000}
                className="text-amber-500 font-bold"
              />
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed font-medium"
          >
            Our qualified biomedical engineers maintain peak machinery uptime, ensuring maximum patient safety under rigorous clinical load factors.
          </motion.p>
        </motion.div>
      </section>

      {/* Dynamic Trust Benchmarks */}
      <section className="py-12 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={cardVariants} className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-amber-550 text-amber-500 font-black text-3xl block">15+ mins</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">Emergency Response Desk</span>
            </motion.div>
            <motion.div variants={cardVariants} className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-blue-400 font-black text-3xl block">100%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">NABL Calibrated Rigs</span>
            </motion.div>
            <motion.div variants={cardVariants} className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-amber-500 font-black text-3xl block">10,000+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">Hours Managed Annually</span>
            </motion.div>
            <motion.div variants={cardVariants} className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-blue-400 font-black text-3xl block">99.8%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">Uptime Level Guarantee</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Our Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Comprehensive <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Support Deliverables</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">
              We cover all phases of medical machinery management—from architectural layouts to certification, periodic AMC maintenance, and calibration checkups.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {dbServices.map((srv, idx) => {
              const isAmber = idx % 2 === 1;
              const deliverables = getDeliverables(srv.title);
              return (
                <motion.div
                  key={srv.id}
                  variants={cardVariants}
                  className={`border p-8 rounded-3xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]
                    ${isAmber
                      ? "bg-gradient-to-br from-orange-50/40 via-white to-white border-orange-200/80 hover:border-orange-400 hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)]"
                      : "bg-gradient-to-br from-blue-50/40 via-white to-white border-blue-200/80 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.08)]"
                    }
                  `}
                >
                  {/* Decorative card gradient glow */}
                  <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                    ${isAmber
                      ? "bg-orange-500/10"
                      : "bg-blue-500/10"
                    }
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
                    {renderIcon(srv.iconName, isAmber)}
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
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-650 font-medium">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0
                            ${isAmber ? "text-orange-500" : "text-blue-500"}
                          `} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleServiceSelect(srv.title)}
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Clinical Workflow Timeline */}
      <section className="py-24 bg-[#060b13] border-t border-slate-900 relative overflow-hidden">
        {/* Scientific grid dot background */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_0.7px,transparent_0.7px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

        {/* Ambient top aura glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none rounded-full blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_70%)] pointer-events-none rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-amber-550 text-amber-500 font-black tracking-widest text-xs uppercase block mb-1">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Biomedical Lifecycle <span className="bg-gradient-to-r from-blue-400 to-amber-500 bg-clip-text text-transparent">Workflow</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-400 text-sm mt-4 font-medium leading-relaxed">
              How our certified team manages hospital machinery setups from initial evaluation to lifetime SLA verification.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline connecting line (Desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500/25 via-amber-500/25 to-blue-500/25 -translate-y-12 pointer-events-none" />

            {/* Vertical connecting line for mobile & tablet (hidden on lg) */}
            <div className="absolute left-[34px] sm:left-[42px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500/30 via-amber-500/30 to-indigo-500/30 lg:hidden pointer-events-none" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative"
            >
              {processSteps.map((item, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div key={idx} className="relative">
                    {/* Timeline Node on the line (Mobile/Tablet only) */}
                    <div className={`lg:hidden absolute left-[34px] sm:left-[42px] top-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs text-white z-20 -translate-x-1/2 shadow-lg border-2 border-[#060b13]
                      ${isEven
                        ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30"
                        : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
                      }
                    `}>
                      {item.step}
                    </div>

                    <motion.div
                      variants={cardVariants}
                      className={`border rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-500 group relative flex flex-col h-full z-10 ml-12 sm:ml-16 lg:ml-0
                        ${isEven
                          ? "bg-gradient-to-br from-slate-900/60 via-[#131722]/80 to-slate-900/60 border-slate-800/80 hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)]"
                          : "bg-gradient-to-br from-slate-900/60 via-[#0e1626]/80 to-slate-900/60 border-slate-800/80 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]"
                        }
                      `}
                    >
                      {/* Decorative card gradient glow */}
                      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                        ${isEven ? "bg-amber-500/10" : "bg-blue-500/10"}
                      `} />

                      {/* Step Badge (Desktop only) */}
                      <div className={`hidden lg:flex absolute -top-4 left-6 w-9 h-9 rounded-xl items-center justify-center font-black text-sm text-white shadow-md
                        ${isEven
                          ? "bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-orange-500/20"
                          : "bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 shadow-blue-500/20"
                        }
                      `}>
                        {item.step}
                      </div>

                      <div className={`self-end p-2.5 rounded-xl border mb-3 transition-colors duration-350
                        ${isEven
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white"
                          : "bg-blue-500/10 border-blue-500/30 text-blue-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white"
                        }
                      `}>
                        {item.icon}
                      </div>

                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                        {item.subTitle}
                      </span>
                      
                      <h4 className={`text-base sm:text-lg font-black mb-2 transition-colors
                        ${isEven ? "text-slate-100 group-hover:text-amber-400" : "text-slate-100 group-hover:text-blue-400"}
                      `}>
                        {item.title}
                      </h4>
                      
                      <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
                        {item.desc}
                      </p>

                      {/* Output Badge */}
                      <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          Output: <span className={isEven ? "text-amber-400" : "text-blue-400"}>{item.output}</span>
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SLA Guarantees Block */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-slate-950 text-white rounded-3xl p-8 md:p-14 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-10"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> 100% Secure Maintenance SLA
              </div>
              <h3 className="text-2xl md:text-3.5xl font-extrabold tracking-tight">Need an Emergency Biomedical Dispatch?</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Our support team operates under extreme triage frameworks. Emergency breakdown notifications are solved on-site within hours, incorporating temporary backup machinery to support patient care workflows.
              </p>
            </div>
            <button
              onClick={() => handleServiceSelect("Emergency Breakdown Support Request")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-bold text-sm rounded-xl hover:scale-103 transition-all uppercase tracking-wider relative z-10 cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/10"
            >
              <PhoneCall className="w-4 h-4" /> Request Dispatch
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
