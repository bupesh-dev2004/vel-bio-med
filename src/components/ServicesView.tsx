import React from "react";
import { Wrench, Shield, Briefcase, Activity, PhoneCall, ArrowRight, ShieldCheck, LifeBuoy } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { FlipWords } from "./ui/flip-words.js";

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

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Upper header cover */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-slate-950" />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Our Offerings</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Comprehensive <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Support Deliverables</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium">
              We cover all phases of medical machinery management—from architectural layouts to certification, periodic AMC maintenance, and calibration checkups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbServices.map((srv, idx) => {
              const isAmber = idx % 2 === 1;
              return (
                <div
                  key={srv.id}
                  className={`bg-slate-50 p-8 rounded-2xl border border-slate-100 transition-all duration-300 flex flex-col h-full group
                    ${isAmber 
                      ? "hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/5" 
                      : "hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/5"
                    }
                  `}
                >
                  <div className={`p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transition-all duration-300
                    ${isAmber 
                      ? "bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white" 
                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    }
                  `}>
                    {renderIcon(srv.iconName, isAmber)}
                  </div>

                  <h3 className={`text-xl font-bold text-slate-950 transition-colors mb-3
                    ${isAmber ? "group-hover:text-amber-600" : "group-hover:text-blue-600"}
                  `}>
                    {srv.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 flex-grow font-medium">
                    {srv.description}
                  </p>

                  <button
                    onClick={() => handleServiceSelect(srv.title)}
                    className={`mt-auto bg-white border font-bold text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wide cursor-pointer
                      ${isAmber 
                        ? "border-slate-200 hover:border-amber-500 text-slate-700 hover:text-amber-600" 
                        : "border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-600"
                      }
                    `}
                  >
                    Book Service <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinical Workflow Timeline */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-bold tracking-widest text-xs uppercase block mb-1">Our Process</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Biomedical Lifecycle <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Workflow</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium">
              How our certified team manages hospital machinery setups from initial evaluation to lifetime SLA verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: "01", title: "Comprehensive Site Audit", desc: "Detailed review of electrical harmonics, gas flow channels, and physical space ergonomics." },
              { step: "02", title: "OEM Certified Setup", desc: "Precise mounting, structural alignment, and telemetry configuration matching manufacturer specifications." },
              { step: "03", title: "Safety Rig Calibration", desc: "Comprehensive biometric verification to catalog active calibration logs under NABL reference standards." },
              { step: "04", title: "Continuous Uptime checks", desc: "Scheduled periodic checks, responsive maintenance visits, and emergency SLA dispatches." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-250/70 shadow-sm relative group hover:border-blue-400 transition-colors">
                <span className="absolute top-4 right-4 text-3xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">{item.step}</span>
                <h4 className="text-base font-bold text-slate-950 mb-2 mt-4 relative z-10">{item.title}</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium relative z-10">{item.desc}</p>
              </div>
            ))}
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
