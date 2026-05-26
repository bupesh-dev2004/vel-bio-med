import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Award, ShieldCheck, Zap, Activity, Star, Eye, MessageSquare, Check, ArrowRight, StarHalf, Building, ThumbsUp, CheckSquare, Heart } from "lucide-react";
import { useAppState } from "../AppContext.js";
import { Product } from "../types.js";

interface HomeViewProps {
  onOpenProductModal: (p: Product) => void;
}

export default function HomeView({ onOpenProductModal }: HomeViewProps) {
  const { state, setCurrentTab, setInquiryMachineName } = useAppState();

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = state?.homeSlides || [];
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [slides.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    if (slides.length > 0) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const handlePrevSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoSlide();
  };

  const handleNextSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  // Products filters
  const trendingProducts = state?.products?.filter((p) => p.trending) || [];
  const dynamicProducts = state?.products || [];

  // Clients Mock
  const clientLogos = [
    { name: "Fortis Healthcare", icon: "🏥" },
    { name: "Apollo Hospitals", icon: "⚕️" },
    { name: "Max Health", icon: "🩺" },
    { name: "Aster CMI", icon: "💉" },
    { name: "Manipal Hospital", icon: "❤️" },
    { name: "Medanta Medicity", icon: "🎗️" },
    { name: "Narayana Health", icon: "🧬" }
  ];

  // Testimonials Carousel
  const testimonials = state?.testimonials || [];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const startInquiry = (productName: string) => {
    setInquiryMachineName(productName);
    setCurrentTab("contact");
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. HERO SLIDER */}
      <section className="relative h-[480px] md:h-[600px] overflow-hidden bg-slate-900 group/slider">
        {slides.length > 0 ? (
          slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background with subtle Zoom effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms]"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  transform: idx === currentSlide ? "scale(1.05)" : "scale(1)"
                }}
              />
              {/* Overlay with Medical blue tint gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-blue-900/35" />

              {/* Slider content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl text-left text-white space-y-4 md:space-y-6">
                    <span className="inline-block bg-blue-600/95 text-white text-[10px] sm:text-xs font-black tracking-widest px-3 py-1.5 rounded-full uppercase shadow-lg shadow-blue-600/25">
                      {slide.tagline}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                      {slide.heading}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-medium">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-3.5 pt-2">
                      <button
                        onClick={() => setCurrentTab("products")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-lg shadow-xl shadow-blue-500/25 hover:scale-103 transition-all flex items-center gap-2 uppercase tracking-wide cursor-pointer"
                      >
                        Explore Products <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentTab("contact")}
                        className="bg-slate-100/10 hover:bg-white hover:text-slate-950 text-white font-bold text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-lg border border-white/20 transition-all flex items-center gap-2 uppercase tracking-wide cursor-pointer"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-blue-900 flex items-center justify-center text-white">
            No Homepage Slides Available
          </div>
        )}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/45 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/45 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                stopAutoSlide();
                setCurrentSlide(idx);
                startAutoSlide();
              }}
              className={`w-3.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-blue-500 w-7" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. ELEVATING HEALTHCARE EXCELLENCE SECTION */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-2">Our Performance</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Elevating Healthcare Excellence
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium">
              Supporting health clinics and emergency services globally with cutting-edge bioscience machinery and specialized training setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 group-hover:h-full transition-all" />
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors">Extensive Experience</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                Over 12+ years of providing turnkey equipment configurations, technical safety clearance, and customized installations for multi-specialty hospitals.
              </p>
              <button onClick={() => setCurrentTab("about")} className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-auto flex items-center gap-1 group/btn">
                Read Vision <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 group-hover:h-full transition-all" />
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors">Client Satisfaction</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                Trusted by 450+ doctors and critical care specialists for zero-tolerance product quality, high accuracy metrics, and quick repair responses.
              </p>
              <button onClick={() => setCurrentTab("contact")} className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-auto flex items-center gap-1 group/btn">
                Work With Us <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 group-hover:h-full transition-all" />
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors">Proven Installations</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                Successful setup of 1500+ ICU respiratory beds, diagnostics ultrasound machinery chambers, and double-door steam sanitization centers.
              </p>
              <button onClick={() => setCurrentTab("gallery")} className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-auto flex items-center gap-1 group/btn">
                Browse Portfolios <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST PRODUCTS CAROUSEL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-xl">
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">State of the Art Solutions</span>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Our Latest Acquisitions</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                High acuity bedside systems and multi-frequency digital ultrasound machinery from certified global healthcare leaders.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("products")}
              className="mt-4 md:mt-0 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-1.5 uppercase tracking-wide cursor-pointer self-start md:self-auto"
            >
              See All Catalogues <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dynamicProducts.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative pt-[65%] overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded">
                    LATEST
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
                    {item.shortDesc}
                  </p>
                  <div className="flex items-center gap-1.5 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(item.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-slate-500 font-bold ml-1">({item.rating}.0)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/50">
                    <button
                      onClick={() => onOpenProductModal(item)}
                      className="bg-white border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                    <button
                      onClick={() => startInquiry(item.name)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Inquiry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRENDING PRODUCTS GRID */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-2">Specialty Focus</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Trending Critical Machinery</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4 font-medium">
              Medical setups demanded in high acuity clinical rooms. Certified with absolute safety standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.length > 0 ? (
              trendingProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative pt-[65%] bg-slate-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                      HOT SELLING
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
                      {item.shortDesc}
                    </p>

                    <div className="flex items-center gap-1.5 mb-5 pt-3 border-t border-slate-100">
                      <div className="flex text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <span className="text-xs text-slate-500 font-bold">(5.0 Rating)</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onOpenProductModal(item)}
                        className="flex-1 bg-white border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer"
                      >
                        Quick View
                      </button>
                      <button
                        onClick={() => startInquiry(item.name)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400">No trending items configured.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side Image with design elements */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-300 rounded-3xl transform rotate-2 scale-103 opacity-10" />
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="Vel Bio Med critical care service support"
                className="w-full h-auto rounded-3xl object-cover relative z-10 shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden sm:block">
                <p className="text-3xl font-black text-blue-500">100%</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">Uptime SLA Support</p>
                <p className="text-slate-400 text-[11px] mt-2 font-medium">Our engineers are dispatched immediately for high emergency troubleshooting alerts.</p>
              </div>
            </div>

            {/* Right side content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Corporate Strengths</span>
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Our Uncompromising Standard of Reliability
                </h2>
                <div className="w-12 h-1 bg-blue-600 mt-4 rounded-full" />
              </div>

              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Vel Bio Med bridges the technical void in biological science distribution by delivering world-class hospital equipment, fast emergency servicing response, and long term comprehensive warranties.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Continuous Quality Assurance", desc: "Every medical monitor and digital scanner system is calibrated rigorously against original parameters before dispatch." },
                  { title: "Trusted Turnkey Configurations", desc: "Our biomedical crew supervises gas setups, electrical compliance testing, and critical OT layouts end-to-end." },
                  { title: "Certified Clinical Engineers", desc: "Access the training expertise of specialists registered under critical medical equipment regulatory protocols." },
                  { title: "Budget-Friendly Hospital Contracts", desc: "Leverage affordable AMC frameworks designed for individual clinics to corporate multi-wing hospital systems." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors">
                    <div className="p-1 px-1.5 bg-blue-500 text-white rounded-lg mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 text-xs mt-1 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VALUABLE CLIENTS LOGO SLIDER */}
      <section className="py-14 bg-slate-900 overflow-hidden relative border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center text-slate-400">
          <p className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Trusted By Premium Medical Institutions</p>
        </div>
        <div className="flex gap-16 animate-marquee whitespace-nowrap min-w-full">
          {clientLogos.concat(clientLogos).map((client, idx) => (
            <div key={idx} className="inline-flex items-center gap-3.5 select-none bg-slate-950/40 py-2.5 px-6 rounded-full border border-slate-800/80">
              <span className="text-2xl">{client.icon}</span>
              <span className="text-xs font-black text-slate-300 tracking-wider uppercase">{client.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS REVIEW SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-2">Our Testimonials</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Voices of Trust inside Hospital Wings</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          {testimonials.length > 0 ? (
            <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm relative">
              <div className="absolute top-10 right-10 text-slate-200 text-8xl font-serif pointer-events-none select-none">“</div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-blue-500 flex-shrink-0"
                  loading="lazy"
                />
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm md:text-base italic leading-relaxed font-medium">
                    "{testimonials[activeTestimonial].reviewText}"
                  </p>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                      {testimonials[activeTestimonial].designation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Dots/Controls */}
              <div className="flex justify-end gap-2 mt-8 md:mt-3 border-t border-slate-200/50 pt-5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3.5 h-1.5 rounded-full transition-all ${
                      idx === activeTestimonial ? "bg-blue-600 w-8" : "bg-slate-350"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-50 rounded-2xl">
              <p className="text-slate-400 text-sm">No client reviews listed at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
