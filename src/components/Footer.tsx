'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  ArrowRight 
} from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "./ui/BrandSocialIcons.js";
import { useAppState } from "../AppContext.js";

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: 8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const { setCurrentTab, state } = useAppState();
  const currentYear = new Date().getFullYear();

  const defaultContact = {
    address: "704-B, Phoenix Corporate Park, Outer Ring Road, Bengaluru - 560103, Karnataka, India",
    phone: "+91 80 4930 2930",
    email: "sales@velbiomed.co.in",
  };

  const contact = state?.contactInfo || defaultContact;
  const categories = state?.categories || [
    "Diagnostics & Imaging",
    "Critical Care & ICU",
    "Operating Theatre (OT)",
    "CSSD & Sterilization"
  ];

  return (
    <footer className="relative w-full border-t border-slate-800 bg-slate-950 bg-[radial-gradient(45%_140px_at_50%_0%,rgba(59,130,246,0.06),transparent)] px-6 pt-16 pb-8 font-sans overflow-hidden">
      {/* Dynamic top blue blur glow effect */}
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 bg-blue-500/40 rounded-full blur-md" />

      {/* ISO Certifications Ribbon */}
      <div className="max-w-7xl mx-auto mb-12 border-b border-slate-900 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <AnimatedContainer className="flex items-center gap-3.5">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20 shadow-lg shadow-blue-500/5">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white tracking-wide">ISO 13485 Certified Medical Supplier</p>
            <p className="text-xs text-slate-400 mt-0.5">Assuring world-class quality controls and compliance for high-end critical ICU setups.</p>
          </div>
        </AnimatedContainer>
        <AnimatedContainer delay={0.2} className="flex flex-wrap items-center gap-4">
          <span className="text-xs text-slate-400 font-medium">Need immediate product consulting?</span>
          <button
            onClick={() => setCurrentTab("contact")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-lg shadow-md hover:shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98"
          >
            Get Free Quote <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </AnimatedContainer>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand Info */}
        <AnimatedContainer className="space-y-5">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentTab("home")}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              V
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight block">
                Vel Bio <span className="text-amber-500 font-extrabold">Med</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 block -mt-1 tracking-widest">
                Medical Excellence
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Vel Bio Med stands parallel with clinical perfection, delivering innovative critical life supports, high frequency diagnostics, and state of the art modular sterilizers across prime hospitals.
          </p>
          <div className="flex items-center gap-2.5 pt-2">
            {[
              { 
                icon: <FacebookIcon className="w-4 h-4" />, 
                url: "https://facebook.com/velbiomed",
                hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[#1877F2]/20" 
              },
              { 
                icon: <InstagramIcon className="w-4 h-4" />, 
                url: "https://instagram.com/velbiomed",
                hoverClass: "hover:bg-[#E1306C] hover:border-[#E1306C] hover:shadow-[#E1306C]/20" 
              },
              { 
                icon: <LinkedinIcon className="w-4 h-4" />, 
                url: "https://linkedin.com/company/velbiomed",
                hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[#0A66C2]/20" 
              },
              { 
                icon: <XIcon className="w-4 h-4" />, 
                url: "https://twitter.com/velbiomed",
                hoverClass: "hover:bg-black hover:border-slate-800 hover:shadow-black/20" 
              },
              { 
                icon: <YoutubeIcon className="w-4 h-4" />, 
                url: "https://youtube.com/velbiomed",
                hoverClass: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[#FF0000]/20" 
              }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.url} 
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 bg-slate-900/80 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${social.hoverClass}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </AnimatedContainer>

        {/* Column 2: Navigation Links */}
        <AnimatedContainer delay={0.2}>
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-slate-900 pb-2">
            Company Info
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-400">
            {["home", "about", "services", "gallery", "products", "contact"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setCurrentTab(tab)}
                  className="hover:text-blue-400 hover:translate-x-1.5 transition-all outline-none text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-500 font-bold text-[10px]">›</span>
                  <span className="capitalize font-medium tracking-wide">
                    {tab === "about" ? "About Us" : tab === "contact" ? "Contact Us" : tab}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        {/* Column 3: Categories */}
        <AnimatedContainer delay={0.3}>
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-slate-900 pb-2">
            Our Offerings
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-400">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCurrentTab("products")}
                  className="hover:text-blue-400 hover:translate-x-1.5 transition-all text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-500 font-bold text-[10px]">›</span>
                  <span className="font-medium tracking-wide">{cat}</span>
                </button>
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        {/* Column 4: Contact Details */}
        <AnimatedContainer delay={0.4}>
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-slate-900 pb-2">
            Contact Details
          </h3>
          <ul className="space-y-4 text-xs text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium tracking-wide">{contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <a href={`tel:${contact.phone}`} className="hover:text-blue-400 font-medium tracking-wide transition-colors">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:text-blue-400 font-medium tracking-wide transition-colors">
                {contact.email}
              </a>
            </li>
          </ul>
        </AnimatedContainer>
      </div>

      {/* Bottom Bar copyright & Admin trigger */}
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-slate-900 text-xs text-slate-500 font-medium flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {currentYear} Vel Bio Med. All Rights Reserved. Engineered for clinical perfection.</p>
        <div className="flex gap-6">
          <button onClick={() => setCurrentTab("about")} className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</button>
          <button onClick={() => setCurrentTab("contact")} className="hover:text-blue-400 cursor-pointer transition-colors">Terms & Conditions</button>
        </div>
      </div>
    </footer>
  );
}
