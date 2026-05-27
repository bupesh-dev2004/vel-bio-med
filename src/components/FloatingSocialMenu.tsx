import React from "react";
import { MessageSquare, X, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
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

  const whatsappNumber = state?.contactInfo?.whatsappNumber || "918049302930";
  const whatsappText = encodeURIComponent("Hello Vel Bio Med! Please provide me more information about your medical machinery and hospital equipment solutions.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  const socials = [
    {
      name: "WhatsApp",
      url: whatsappUrl,
      icon: <MessageSquare className="w-5 h-5 text-white" />,
      className: "bg-emerald-500 border border-emerald-400 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/velbiomed",
      icon: <Linkedin className="w-5 h-5 text-white" />,
      className: "bg-blue-700 border border-blue-600 hover:bg-blue-800 text-white shadow-lg shadow-blue-700/20",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/velbiomed",
      icon: <Facebook className="w-5 h-5 text-white" />,
      className: "bg-blue-600 border border-blue-500 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/velbiomed",
      icon: <Instagram className="w-5 h-5 text-white" />,
      className: "bg-pink-600 border border-pink-500 hover:bg-pink-700 text-white shadow-lg shadow-pink-600/20",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/velbiomed",
      icon: <Twitter className="w-5 h-5 text-white" />,
      className: "bg-sky-500 border border-sky-400 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/velbiomed",
      icon: <Youtube className="w-5 h-5 text-white" />,
      className: "bg-red-600 border border-red-500 hover:bg-red-700 text-white shadow-lg shadow-red-600/20",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-45" id="floating-social-dashboard">
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
