import { Wrench, Shield, Briefcase, Activity, PhoneCall, HelpCircle, ArrowRight, ShieldCheck, LifeBuoy } from "lucide-react";
import { useAppState } from "../AppContext.js";

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
    }
  ];

  // Helper to resolve icon from key names
  const renderIcon = (name: string) => {
    switch (name) {
      case "Wrench":
        return <Wrench className="w-6 h-6 text-blue-600" />;
      case "Shield":
        return <Shield className="w-6 h-6 text-blue-600" />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6 text-blue-600" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-blue-600" />;
      case "PhoneCall":
        return <PhoneCall className="w-6 h-6 text-blue-600" />;
      default:
        return <LifeBuoy className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Upper header cover */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-4">
          <span className="text-blue-500 font-black tracking-widest text-xs uppercase block">Full Services & Support</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Technical Service Level Perfection</h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
            Our qualified biomedical engineers maintain peak machinery uptime, ensuring maximum patient safety under rigorous clinical load factors.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Our Offerings</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Comprehensive Support Deliverables
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium">
              We cover all phases of medical machinery management—from architectural layouts to certification, periodic AMC maintenance, and calibration checkups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="p-4 bg-blue-50 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {renderIcon(srv.iconName)}
                </div>

                <h3 className="text-xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors mb-3">
                  {srv.title}
                </h3>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 flex-grow font-medium">
                  {srv.description}
                </p>

                <button
                  onClick={() => handleServiceSelect(srv.title)}
                  className="mt-auto bg-white border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wide cursor-pointer"
                >
                  Book Service <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Guarantees Block */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-14 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> 100% Secure Maintenance SLA
              </div>
              <h3 className="text-2xl md:text-3.5xl font-extrabold tracking-tight">Need an Emergency Biomedical Dispatch?</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Our support team operates under extreme triage frameworks. Emergency breakdown notifications are solved on-site within hours, incorporating temporary backup machinery to support patient care workflows.
              </p>
            </div>
            <button
              onClick={() => handleServiceSelect("Emergency Breakdown Support Request")}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl hover:scale-103 transition-all uppercase tracking-wider relative z-10 cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Request Dispatch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
