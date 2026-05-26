import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, HelpCircle, MessageSquare } from "lucide-react";
import { useAppState } from "../AppContext.js";

export default function ContactView() {
  const { state, submitInquiry, inquiryMachineName, setInquiryMachineName } = useAppState();

  const defaultContact = {
    address: "704-B, Phoenix Corporate Park, Outer Ring Road, Bengaluru - 560103, Karnataka, India",
    phone: "+91 80 4930 2930",
    email: "sales@velbiomed.co.in",
    workingHours: "Monday - Saturday: 9:00 AM - 6:30 PM (IST)",
    mapUrl: "https://maps.google.com/maps?q=Vel%20Bio%20Med%20Outer%20Ring%20Road,%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
  };

  const contact = state?.contactInfo || defaultContact;

  // Form hooks
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    product: "",
    feedback: ""
  });

  const [formValidation, setFormValidation] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Autofill product logic when user comes from products page selection!
  useEffect(() => {
    if (inquiryMachineName) {
      setFormData((prev) => ({
        ...prev,
        product: inquiryMachineName
      }));
    }
  }, [inquiryMachineName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setFormValidation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check basic validations
    if (!formData.name.trim()) {
      setFormValidation("Please fill in your full name.");
      return;
    }
    if (!formData.email.trim() && !formData.mobile.trim()) {
      setFormValidation("Please supply either an email address or mobile number so we can reach back.");
      return;
    }
    if (formData.email && !formData.email.includes("@")) {
      setFormValidation("Please provide a valid email structure.");
      return;
    }

    setIsSubmitting(true);
    setFormValidation(null);

    const success = await submitInquiry({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      product: formData.product || "General Consultation Request",
      feedback: formData.feedback
    });

    setIsSubmitting(false);

    if (success) {
      setFormSuccess(true);
      // Reset form variables
      setFormData({
        name: "",
        email: "",
        mobile: "",
        product: "",
        feedback: ""
      });
      // Clear product redirect identifier from global context
      setInquiryMachineName(null);
    } else {
      setFormValidation("Failed to deliver inquiry metrics. Please try again or call our support directly.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top cover title */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-4">
          <span className="text-blue-500 font-black tracking-widest text-xs uppercase block font-sans">Contact Desk</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Request Quotations & Handovers</h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
            Our corporate clinical agents supply quotes, arrange logistics timelines, and program live virtual system presentations on request.
          </p>
        </div>
      </section>

      {/* Split details page */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column Address Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block mb-1">Corporate Details</span>
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Vel Bio Med Head Administration
                </h2>
                <div className="w-12 h-1 bg-blue-600 rounded-full" />
              </div>

              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                Feel free to visit our central demonstration workspace in Bengaluru or submit an inquiry check sheet to secure specialized quote sheets.
              </p>

              {/* Contact Icons block */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-150 transition-colors">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Administration HQ Address:</h4>
                    <p className="text-slate-800 text-sm font-bold mt-1 leading-relaxed">{contact.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-150 transition-colors">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Direct Sourcing Hotlines:</h4>
                    <p className="text-slate-800 text-sm font-bold mt-1">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-150 transition-colors">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Electronic Mail Setup:</h4>
                    <p className="text-slate-800 text-sm font-bold mt-1 hover:text-blue-600 transition-colors">
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-150 transition-colors">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Administrative Working Hours:</h4>
                    <p className="text-slate-800 text-sm font-bold mt-1">{contact.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Interactive Form */}
            <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full pointer-events-none" />

              {formSuccess ? (
                <div className="py-12 px-4 text-center max-w-md mx-auto space-y-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2.5xl font-extrabold text-slate-950 tracking-tight">Inquiry Sheet Submitted!</h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                    Thank you. Your request sheet has been recorded successfully in our database. One of our biomedical sourcing directors will call or email you with formal catalogs shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSuccess(false);
                      setInquiryMachineName(null);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Healthcare Sourcing Inquiry Sheet</h3>
                    <p className="text-slate-500 text-xs mt-1 font-medium">Please specify which device or clinical configuration you want a quotation for.</p>
                  </div>

                  {/* Errors message display */}
                  {formValidation && (
                    <div className="p-3.5 bg-rose-50 border border-rose-250 rounded-xl text-rose-600 text-xs font-bold font-sans">
                      ⚠️ {formValidation}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Contact Person Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Dr. Shrivastava"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 text-slate-800 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Institutional Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="shrivastava@hospital.org"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 text-slate-800 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="mobile" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Mobile Phone Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        placeholder="+91 98765 XXXXX"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 text-slate-800 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="product" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Required Machine or Device (Selection List)
                      </label>
                      <input
                        type="text"
                        name="product"
                        id="product"
                        placeholder="e.g. GE Voluson E10, Dräger Primus Setup"
                        value={formData.product}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 text-slate-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="feedback" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Inquiry Details & Clinic Context
                    </label>
                    <textarea
                      name="feedback"
                      id="feedback"
                      rows={4}
                      placeholder="Please clarify if you require an Annual Maintenance Contract (AMC), specific transducer arrays, or emergency training handovers."
                      value={formData.feedback}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 text-slate-800 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg shadow-blue-500/10 transition-transform uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Saving Inquiry Sourcing Metrics..."
                    ) : (
                      <>
                        Submit Sourcing Inquiry <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded High accuracy Google map Iframe */}
      <section className="h-96 md:h-[450px] w-full relative group">
        <iframe
          src={contact.mapUrl}
          className="w-full h-full border-0 absolute inset-0"
          title="Google Maps Location of Vel Bio Med Outer Ring Road, Bangalore"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-4 left-4 bg-slate-900/90 text-white p-4 rounded-xl shadow-2xl z-10 hidden sm:block max-w-xs border border-white/10 pointer-events-none">
          <p className="text-xs font-black uppercase tracking-wider text-blue-400">Headquarters</p>
          <p className="text-xs font-medium leading-relaxed mt-1 text-slate-150">Vel Bio Med Corporate Office is fully accessible during business operating hours.</p>
        </div>
      </section>
    </div>
  );
}
