'use client';

import React, { useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Award,
  ArrowRight,
  Send,
  CheckCircle2,
  Sparkles
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
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() === "") return;
    setIsSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <footer className="relative w-full border-t border-slate-900 bg-[#040d1a] px-6 pt-20 pb-8 font-sans overflow-hidden">
      {/* Background Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top radial gradient aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(10,110,189,0.12),transparent_65%)] pointer-events-none rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/2 left-1/2 h-[2px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#0A6EBD]/55 to-transparent rounded-full blur-[1px]" />

      {/* ISO Certifications Ribbon */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-slate-900/60 pb-10 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-8 relative z-10">
        <AnimatedContainer className="flex items-center gap-4 flex-1">
          <div className="p-4 bg-gradient-to-br from-[#0A6EBD]/20 to-[#0A6EBD]/5 rounded-2xl text-[#0A6EBD] border border-[#0A6EBD]/30 shadow-lg shadow-[#0A6EBD]/10 flex-shrink-0">
            <Award className="w-7 h-7 animate-pulse text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-black text-white tracking-wide flex flex-wrap items-center gap-1.5">
              ISO 13485 Certified Medical Supplier
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-black uppercase tracking-wider whitespace-nowrap">
                <Sparkles className="w-2.5 h-2.5" /> High Quality
              </span>
            </p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl">
              Assuring world-class quality controls, rigorous compliance verification, and premium equipment testing standards for state-of-the-art diagnostic and clinical ICU setups.
            </p>
          </div>
        </AnimatedContainer>
        <AnimatedContainer delay={0.2} className="flex flex-wrap items-center gap-5 justify-start lg:justify-end">
          <div className="text-left lg:text-right">
            <span className="text-xs text-slate-300 font-bold block">Looking for a tailored medical setup?</span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Custom configurations designed for modern hospitals</span>
          </div>
          <button
            onClick={() => setCurrentTab("contact")}
            className="group relative bg-[#0A6EBD] hover:bg-[#085a9c] text-white font-black text-xs py-3 px-6 rounded-xl shadow-lg shadow-[#0A6EBD]/20 hover:shadow-[#0A6EBD]/40 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-103 active:scale-97 overflow-hidden border border-white/10"
          >
            <span className="relative z-10 tracking-wider uppercase">Get Free Sourcing Quote</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
        </AnimatedContainer>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative z-10">
        {/* Column 1: Brand Info & Newsletter (lg:col-span-5) */}
        <AnimatedContainer className="space-y-6 lg:col-span-5">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentTab("home")}>
            <img
              src="/logo.png"
              alt="Vel Bio Med Logo"
              className="h-20 w-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md font-medium">
            Vel Bio Med is a premier medical infrastructure partner, sourcing elite high-acuity ventilators, premium diagnostics scanners, and state-of-the-art modular operation theatre systems for healthcare leaders globally.
          </p>

          <div className="flex items-center gap-2.5 pt-3">
            {[
              {
                icon: <FacebookIcon className="w-4 h-4" />,
                url: "https://facebook.com/velbiomed",
                hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[#1877F2]/20 hover:text-white"
              },
              {
                icon: <InstagramIcon className="w-4 h-4" />,
                url: "https://instagram.com/velbiomed",
                hoverClass: "hover:bg-[#E1306C] hover:border-[#E1306C] hover:shadow-[#E1306C]/20 hover:text-white"
              },
              {
                icon: <LinkedinIcon className="w-4 h-4" />,
                url: "https://linkedin.com/company/velbiomed",
                hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[#0A66C2]/20 hover:text-white"
              },
              {
                icon: <XIcon className="w-4 h-4" />,
                url: "https://twitter.com/velbiomed",
                hoverClass: "hover:bg-black hover:border-slate-800 hover:shadow-black/20 hover:text-white"
              },
              {
                icon: <YoutubeIcon className="w-4 h-4" />,
                url: "https://youtube.com/velbiomed",
                hoverClass: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[#FF0000]/20 hover:text-white"
              }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className={`p-3 bg-slate-900/60 rounded-xl text-slate-400 border border-slate-800/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${social.hoverClass}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </AnimatedContainer>

        {/* Column 2: Navigation Links (lg:col-span-2) */}
        <AnimatedContainer delay={0.2} className="lg:col-span-2 lg:pl-4">
          <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-b border-slate-900 pb-2 relative">
            Company Info
            <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#0A6EBD]" />
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-400">
            {["home", "about", "services", "gallery", "products", "contact"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    if (tab === "services") {
                      setCurrentTab("home");
                      setTimeout(() => {
                        const element = document.getElementById("services-section");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    } else {
                      setCurrentTab(tab);
                    }
                  }}
                  className="hover:text-[#00A8CC] hover:translate-x-2 transition-all outline-none text-left flex items-center gap-1.5 cursor-pointer font-bold tracking-wide"
                >
                  <span className="text-[#0A6EBD] font-extrabold text-xs">›</span>
                  <span className="capitalize">
                    {tab === "about" ? "About Us" : tab === "contact" ? "Contact Us" : tab}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        {/* Column 3: Categories (lg:col-span-2) */}
        <AnimatedContainer delay={0.3} className="lg:col-span-2">
          <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-b border-slate-900 pb-2 relative">
            Our Offerings
            <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#0A6EBD]" />
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-400">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCurrentTab("products")}
                  className="hover:text-[#00A8CC] hover:translate-x-2 transition-all text-left flex items-center gap-1.5 cursor-pointer font-bold tracking-wide"
                >
                  <span className="text-[#0A6EBD] font-extrabold text-xs">›</span>
                  <span>{cat}</span>
                </button>
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        {/* Column 4: Contact Details (lg:col-span-3) */}
        <AnimatedContainer delay={0.4} className="lg:col-span-3">
          <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-b border-slate-900 pb-2 relative">
            Contact Details
            <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#0A6EBD]" />
          </h3>
          <ul className="space-y-5 text-xs text-slate-400">
            <li className="flex items-start gap-3.5">
              <div className="p-1.5 bg-slate-900/60 rounded-lg border border-slate-800 text-[#0A6EBD] mt-0.5 flex-shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="leading-relaxed font-bold tracking-wide">{contact.address}</span>
            </li>
            <li className="flex items-center gap-3.5">
              <div className="p-1.5 bg-slate-900/60 rounded-lg border border-slate-800 text-[#0A6EBD] flex-shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <a href={`tel:${contact.phone}`} className="hover:text-[#00A8CC] font-bold tracking-wide transition-colors">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <div className="p-1.5 bg-slate-900/60 rounded-lg border border-slate-800 text-[#0A6EBD] flex-shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <a href={`mailto:${contact.email}`} className="hover:text-[#00A8CC] font-bold tracking-wide transition-colors">
                {contact.email}
              </a>
            </li>
          </ul>
        </AnimatedContainer>
      </div>

      {/* Bottom Bar copyright & Admin trigger */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 text-xs text-slate-500 font-bold flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-center md:text-left select-none">
          © {currentYear} Vel Bio Med. All Rights Reserved. Engineered for clinical perfection & patient safety.
        </p>
        <div className="flex gap-6">
          <button onClick={() => setCurrentTab("about")} className="hover:text-[#00A8CC] cursor-pointer transition-colors">Privacy Policy</button>
          <button onClick={() => setCurrentTab("contact")} className="hover:text-[#00A8CC] cursor-pointer transition-colors">Terms & Conditions</button>
        </div>
      </div>
    </footer>
  );
}
