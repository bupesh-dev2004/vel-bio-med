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
      title: "Medical Equipment Installation",
      description: "Precision setup, calibration, and safety validation of intensive-care machines, diagnostics consoles, and surgical fixtures.",
      iconName: "Wrench"
    },
    {
      id: "srv-2",
      title: "Comprehensive Maintenance & AMC",
      description: "Flexible Annual Maintenance Contracts (AMC) and comprehensive service cycles backed by original vendor spare inventories.",
      iconName: "Shield"
    },
    {
      id: "srv-3",
      title: "Biomedical Calibration SLA",
      description: "High-precision testing under certified diagnostic tools to guarantee accuracy standards across high-acuity ventilators and anesthesia setups.",
      iconName: "Activity"
    },
    {
      id: "srv-4",
      title: "Emergency Breakdown Sourcing",
      description: "24/7 priority dispatch framework addressing hospital facility failures with immediate temporary hot-swap backups.",
      iconName: "PhoneCall"
    },
    {
      id: "srv-5",
      title: "Biomedical Training & Handovers",
      description: "On-site and virtual tutorial workshops empowering clinical personnel to operate advanced clinical instrumentation.",
      iconName: "Briefcase"
    },
    {
      id: "srv-6",
      title: "Regulatory Compliance Certification",
      description: "Rigorous electrical and biometric safety checkups confirming absolute compliance with international hospital certification norms.",
      iconName: "LifeBuoy"
    }
  ];

  // Helper to resolve icon from key names
  const renderIcon = (name: string, isAmber: boolean) => {
    const iconColor = isAmber ? "text-amber-600 group-hover:text-white" : "text-blue-600 group-hover:text-white";
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
    if (lowerTitle.includes("installation")) {
      return [
        "Site readiness & space planning",
        "OEM specification alignment",
        "Final electrical safety certification"
      ];
    }
    if (lowerTitle.includes("maintenance") || lowerTitle.includes("amc")) {
      return [
        "Scheduled quarterly preventative audits",
        "24/7 priority emergency dispatch",
        "Certified vendor parts integration"
      ];
    }
    if (lowerTitle.includes("calibration") || lowerTitle.includes("sla")) {
      return [
        "NABL traceable documentation",
        "NIST standard precision tools",
        "System accuracy drift validation"
      ];
    }
    if (lowerTitle.includes("breakdown") || lowerTitle.includes("emergency")) {
      return [
        "15-minute response triage desk",
        "Hot-swap replacement systems",
        "On-site patient safety overrides"
      ];
    }
    if (lowerTitle.includes("training") || lowerTitle.includes("handover")) {
      return [
        "Operational SOP review workshops",
        "Hands-on simulations & testing",
        "Clinical certification handovers"
      ];
    }
    if (lowerTitle.includes("regulatory") || lowerTitle.includes("compliance") || lowerTitle.includes("certification")) {
      return [
        "Joint Commission compliance audits",
        "Electrical leakage profiling",
        "Legal compliance record filing"
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

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Upper header cover */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://altosengineers.com/wp-content/uploads/2023/01/5-Keys-to-Proper-Setup-of-Medical-Equipment-1.jpg')] bg-cover bg-center opacity-85" />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
          <span className="text-blue-500 font-black tracking-widest text-xs uppercase block">Full Services & Support</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span>Biomedical Service</span>
            <span className="min-w-[280px] sm:min-w-[320px] text-center sm:text-left inline-block">
              <FlipWords
                words={["Calibration", "Maintenance", "Installation", "Emergency SLA"]}
                duration={3000}
                className="text-amber-500 font-bold"
              />
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Our qualified biomedical engineers maintain peak machinery uptime, ensuring maximum patient safety under rigorous clinical load factors.
          </p>
        </div>
      </section>

      {/* Dynamic Trust Benchmarks */}
      <section className="py-12 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-amber-550 text-amber-500 font-black text-3xl block">15+ mins</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">Emergency Response Desk</span>
            </div>
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-blue-400 font-black text-3xl block">100%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">NABL Calibrated Rigs</span>
            </div>
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-amber-500 font-black text-3xl block">10,000+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">Hours Managed Annually</span>
            </div>
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm">
              <span className="text-blue-400 font-black text-3xl block">99.8%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">Uptime Level Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl pointer-events-none translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Our Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Comprehensive <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Support Deliverables</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">
              We cover all phases of medical machinery management—from architectural layouts to certification, periodic AMC maintenance, and calibration checkups.
            </p>
          </div>

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
                  className={`bg-white/95 border border-slate-200/60 p-8 rounded-3xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]
                    ${isAmber
                      ? "hover:border-amber-400/80 hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)]"
                      : "hover:border-blue-400/80 hover:shadow-[0_20px_40px_rgba(59,130,246,0.06)]"
                    }
                  `}
                >
                  {/* Decorative card gradient glow */}
                  <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                    ${isAmber
                      ? "bg-amber-500/10"
                      : "bg-blue-500/10"
                    }
                  `} />

                  <span className="absolute top-8 right-8 text-[10px] font-black tracking-widest text-slate-300 group-hover:text-slate-400 uppercase transition-colors">
                    Service {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className={`p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-all duration-500 shadow-sm border
                    ${isAmber
                      ? "bg-amber-50/50 border-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white group-hover:rotate-6 group-hover:scale-110"
                      : "bg-blue-50/50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110"
                    }
                  `}>
                    {renderIcon(srv.iconName, isAmber)}
                  </div>

                  <h3 className={`text-xl font-extrabold text-slate-900 transition-colors mb-3 pr-8
                    ${isAmber ? "group-hover:text-amber-600" : "group-hover:text-blue-600"}
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
                            ${isAmber ? "text-amber-500" : "text-blue-500"}
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
                        ? "border-slate-150 text-slate-700 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
                        : "border-slate-150 text-slate-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
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
      <section className="py-24 bg-slate-50 border-t border-slate-200/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-amber-600 font-bold tracking-widest text-xs uppercase block mb-1">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Biomedical Lifecycle <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Workflow</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">
              How our certified team manages hospital machinery setups from initial evaluation to lifetime SLA verification.
            </p>
          </div>

          <div className="relative">
            {/* Timeline connecting line (Desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500/30 via-amber-500/30 to-blue-500/30 -translate-y-12 pointer-events-none" />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
            >
              {processSteps.map((item, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-400/60 transition-all duration-500 group relative flex flex-col h-full z-10"
                  >
                    {/* Step Badge */}
                    <div className={`absolute -top-4 left-6 w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-md
                      ${isEven
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/20"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/20"
                      }
                    `}>
                      {item.step}
                    </div>

                    <div className={`self-end p-2.5 rounded-xl border mb-3 transition-colors duration-350
                      ${isEven
                        ? "bg-amber-50/50 border-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white"
                        : "bg-blue-50/50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white"
                      }
                    `}>
                      {item.icon}
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {item.subTitle}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                      {item.desc}
                    </p>

                    {/* Output Badge */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Output: {item.output}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SLA Guarantees Block */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-14 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-10">
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
          </div>
        </div>
      </section>
    </div>
  );
}
