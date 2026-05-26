import { Target, Compass, Award, ShieldCheck, Users, Activity, Sparkles, Building2 } from "lucide-react";

export default function AboutView() {
  const metrics = [
    { value: "12+", label: "Years of Experience" },
    { value: "450+", label: "Hospital Customers" },
    { value: "1,500+", label: "Setup Installations" },
    { value: "100%", label: "Uptime SLA Response" }
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
      {/* Top Banner Cover */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-4">
          <span className="text-blue-500 font-black tracking-widest text-xs uppercase block">Who We Are</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Your Partner in Clinical Longevity</h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
            Vel Bio Med stands for premium grade healthcare sourcing, bridging elite overseas factories to regional clinics with extreme delivery precision.
          </p>
        </div>
      </section>

      {/* Corporate Overview Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative">
              <img
                src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=800&q=80"
                alt="Hospital Operating Theatre Installation"
                className="rounded-3xl shadow-xl w-full h-auto object-cover border-4 border-slate-50"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden sm:block">
                <span className="text-xl font-black block">12+ Years</span>
                <span className="text-xs uppercase font-extrabold tracking-wide text-slate-100">Sourcing Excellence</span>
              </div>
            </div>

            {/* Right content info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Corporate Profile</span>
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Sourcing Global Diagnostics of Unparalleled Metric Confidence
                </h2>
                <div className="w-12 h-1 bg-blue-600 mt-4 rounded-full" />
              </div>

              <div className="text-slate-600 text-sm leading-relaxed space-y-4 font-medium">
                <p>
                  Founded as an exclusive distributor for advanced ultrasonic solutions and neonatal systems, Vel Bio Med has emerged as a premier turn-key partner for clinical centers. Our product inventory spans from premium diagnostic scanners to advanced anesthetic delivery desks.
                </p>
                <p>
                  We collaborate with recognized clinical panels, medical engineers, and institutional stakeholders to install configurations that pass stringent licensing reviews smoothly. Quality is verified across incoming, in-transit, and calibration parameters before deployment.
                </p>
              </div>

              {/* Check features block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  "ISO 13485:2016 Compliant Systems",
                  "FDA and CE certified equipment portfolio",
                  "Rapid logistics supply network",
                  "24/7 dedicated engineering service desk"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Setup Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left CEO message */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Leadership Vision</span>
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">A Message From Our Managing Founder</h2>
                <div className="w-12 h-1 bg-blue-600 mt-4 rounded-full" />
              </div>

              <div className="text-slate-600 text-sm leading-relaxed space-y-4 font-medium italic relative">
                <span className="absolute -left-4 -top-4 text-6xl text-slate-200 pointer-events-none">“</span>
                <p className="relative z-10">
                  "At Vel Bio Med, we define technology as a platform to secure lives. When a ventilator or anesthetic station undergoes calibration inside our labs, we remind our engineers of the human aspect involved. There is simply zero headroom for compromise in hospital critical setups."
                </p>
                <p className="relative z-10">
                  "By establishing comprehensive Annual Maintenance Contracts (AMC) and ensuring direct availability of critical spare components, we help clinical facilities operate seamlessly without unexpected emergency breaks. Our goal is to set the benchmark for biological engineering service operations."
                </p>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900">Dr. Vivek Vardhan Rao</h4>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-0.5">Founder & Managing Director</p>
              </div>
            </div>

            {/* Right Founder Side Frame */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                  alt="Dr. Vivek Vardhan Rao MD"
                  className="w-48 h-48 rounded-2xl object-cover shadow-md border-4 border-slate-50"
                />
                <div className="bg-blue-50 py-2 px-4 rounded-full text-blue-700 text-xs font-extrabold uppercase tracking-wide">
                  Clinical Machinery Expert
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                  Leveragement over twenty years directing critical trauma panels and sourcing bioscience products across global health systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Container */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 rounded-3xl shadow-xl space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
              <div className="p-3.5 bg-white/10 rounded-xl text-white inline-block">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Our Noble Vision</h3>
              <p className="text-slate-100 text-sm leading-relaxed font-light">
                To transform regional clinical diagnostics by giving every clinic direct, affordable, and certified access to international quality machinery, establishing trust-driven patient care across demographics.
              </p>
            </div>

            {/* Mission Container */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-950 text-white p-10 rounded-3xl shadow-xl space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-10 -mt-10" />
              <div className="p-3.5 bg-blue-500/10 rounded-xl text-blue-500 inline-block">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Our Mission Matrix</h3>
              <p className="text-slate-200 text-sm leading-relaxed font-light">
                Commitment to premium response times, strict inspection of biomedical products, comprehensive technician handovers, and continuous technical maintenance structures that safeguard lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-2">Our Foundation</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Corporate Values</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:border-blue-400 hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center group"
              >
                <div className="text-3xl mb-4 p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">{v.icon}</div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{v.title}</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Metric Blocks */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-2 py-4 lg:py-0">
                <p className="text-4xl md:text-5xl font-black text-blue-500 tracking-tight">{m.value}</p>
                <p className="text-xs font-black text-slate-300 uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
