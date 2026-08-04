'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Mail } from "lucide-react";
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
    address: "VEL BIO MED - Medical equipment supplier, Hari Divya Complex, 55, Palayam Bazaar Rd, Woraiyur, Tiruchirappalli, Tamil Nadu 620003",
    phone: "9629515551 | 9445922066",
    email: "velbiomed@gmail.com",
  };

  const contact = state?.contactInfo || defaultContact;
  const categories = state?.categories || [
    "Critical Care & ICU",
    "Modular OT",
    "Hospital Furniture",
    "CSSD & Sterilization"
  ];

  return (
    <footer className="relative w-full border-t border-slate-900 bg-[#040d1a] px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-8 font-sans overflow-hidden">
      {/* Background Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top radial gradient aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(10,110,189,0.12),transparent_65%)] pointer-events-none rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/2 left-1/2 h-[2px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#0A6EBD]/55 to-transparent rounded-full blur-[1px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 relative z-10">
        {/* Column 1: Brand Info & Newsletter (lg:col-span-5) */}
        <AnimatedContainer className="space-y-5 sm:space-y-6 col-span-1 sm:col-span-2 lg:col-span-5">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentTab("home")}>
            <img
              src="/logo.png"
              alt="Vel Bio Med Logo"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md font-medium">
            Vel Bio Med is a premier medical infrastructure partner, sourcing elite high-acuity ventilators, premium diagnostics scanners, and state-of-the-art modular operation theatre systems for healthcare leaders globally.
          </p>

          <div className="flex items-center gap-2 flex-wrap pt-2 sm:pt-3">
            {[
              {
                icon: <FacebookIcon className="w-4 h-4" />,
                url: "https://www.facebook.com/Velbiomed1",
                hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[#1877F2]/20 hover:text-white"
              },
              {
                icon: <InstagramIcon className="w-4 h-4" />,
                url: "https://www.instagram.com/velbiomed/",
                hoverClass: "hover:bg-[#E1306C] hover:border-[#E1306C] hover:shadow-[#E1306C]/20 hover:text-white"
              },
              {
                icon: <LinkedinIcon className="w-4 h-4" />,
                url: "https://www.linkedin.com/company/vel-bio-med/",
                hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[#0A66C2]/20 hover:text-white"
              },
              {
                icon: <XIcon className="w-4 h-4" />,
                url: "https://twitter.com/velbiomed",
                hoverClass: "hover:bg-black hover:border-slate-800 hover:shadow-black/20 hover:text-white"
              },
              {
                icon: <YoutubeIcon className="w-4 h-4" />,
                url: "https://www.youtube.com/@Velbiomed",
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
        <AnimatedContainer delay={0.2} className="lg:col-span-2 lg:pl-4 col-span-1">
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
        <AnimatedContainer delay={0.3} className="lg:col-span-2 col-span-1">
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
        <AnimatedContainer delay={0.4} className="lg:col-span-3 col-span-1 sm:col-span-2">
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

      {/* Bottom Bar copyright */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-slate-900 text-xs text-slate-500 font-bold flex flex-col items-center gap-1.5 relative z-10">
        <p className="text-center select-none">© {currentYear} Vel Bio Med. All Rights Reserved.</p>
        <p className="text-center select-none">
          Designed & Developed by{" "}
          <a href="https://www.izonetech.in/" target="_blank" rel="noreferrer" className="text-sky-400 hover:text-[#00A8CC] transition-colors">Izone Technologies</a>
        </p>
      </div>
    </footer>
  );
}
