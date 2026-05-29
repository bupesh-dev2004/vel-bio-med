import React from "react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "./ui/BrandSocialIcons.js";

export default function FloatingSocialSidebar() {
  const socials = [
    {
      name: "Facebook",
      url: "https://facebook.com/velbiomed",
      icon: <FacebookIcon className="w-4 h-4" />,
      hoverColor: "hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:shadow-blue-500/20",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/velbiomed",
      icon: <InstagramIcon className="w-4 h-4" />,
      hoverColor: "hover:bg-pink-600 hover:text-white hover:border-pink-500 hover:shadow-pink-500/20",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/velbiomed",
      icon: <LinkedinIcon className="w-4 h-4" />,
      hoverColor: "hover:bg-blue-700 hover:text-white hover:border-blue-600 hover:shadow-blue-600/20",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/velbiomed",
      icon: <XIcon className="w-4 h-4" />,
      hoverColor: "hover:bg-black hover:text-white hover:border-slate-800 hover:shadow-black/20",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/velbiomed",
      icon: <YoutubeIcon className="w-4 h-4" />,
      hoverColor: "hover:bg-red-650 hover:text-white hover:border-red-600 hover:shadow-red-500/20",
    },
  ];

  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 p-2.5 rounded-2xl shadow-2xl"
      aria-label="Social media floating links"
    >
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 bg-slate-950/60 border border-slate-800/80 hover:-translate-x-1 hover:scale-105 transition-all duration-300 shadow-md ${social.hoverColor}`}
          title={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
