import React from "react";
import { MessageSquare, X } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon, WhatsappIcon } from "./ui/BrandSocialIcons.js";
import { MenuItem, MenuContainer } from "./ui/fluid-menu.js";
import { useAppState } from "../AppContext.js";

// Custom trigger button that dynamically switches icons based on expansion state
const MenuTrigger = ({ isExpanded }: { isExpanded?: boolean }) => {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {isExpanded ? (
        <X className="w-6 h-6 transition-all duration-300 rotate-0 scale-100" />
      ) : (
        <MessageSquare className="w-6 h-6 transition-all duration-300 rotate-0 scale-100 animate-pulse text-white" />
      )}
    </div>
  );
};

export default function FloatingSocialMenu() {
  const { state } = useAppState();

  const whatsappNumber = state?.contactInfo?.whatsappNumber || "919629515551";
  const whatsappText = encodeURIComponent("Hello Vel Bio Med! Please provide me more information about your medical machinery and hospital equipment solutions.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  const socials = [
    {
      name: "WhatsApp",
      url: whatsappUrl,
      icon: <WhatsappIcon className="w-5 h-5 text-white" />,
      className: "bg-emerald-500 border border-emerald-400 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/vel-bio-med/",
      icon: <LinkedinIcon className="w-5 h-5 text-white" />,
      className: "bg-blue-700 border border-blue-600 hover:bg-blue-800 text-white shadow-lg shadow-blue-700/20",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/Velbiomed1",
      icon: <FacebookIcon className="w-5 h-5 text-white" />,
      className: "bg-blue-600 border border-blue-500 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/velbiomed/",
      icon: <InstagramIcon className="w-5 h-5 text-white" />,
      className: "bg-pink-600 border border-pink-500 hover:bg-pink-700 text-white shadow-lg shadow-pink-600/20",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/velbiomed",
      icon: <XIcon className="w-5 h-5 text-white" />,
      className: "bg-black border border-slate-800 hover:bg-slate-900 text-white shadow-lg shadow-black/20",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@Velbiomed",
      icon: <YoutubeIcon className="w-5 h-5 text-white" />,
      className: "bg-red-650 border border-red-500 hover:bg-red-700 text-white shadow-lg shadow-red-600/20",
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40" id="floating-social-dashboard">
      <MenuContainer upward={true}>
        <MenuTrigger />
        {socials.map((social) => (
          <MenuItem
            key={social.name}
            icon={social.icon}
            className={social.className}
            onClick={() => window.open(social.url, "_blank", "noopener,noreferrer")}
            title={social.name}
          />
        ))}
      </MenuContainer>
    </div>
  );
}
