import { Phone, MessageSquare } from "lucide-react";
import { useAppState } from "../AppContext.js";

export default function WhatsAppButton() {
  const { state } = useAppState();
  const whatsappNumber = state?.contactInfo?.whatsappNumber || "919629515551";
  const text = encodeURIComponent("Hello Vel Bio Med! Please provide me more information about your medical machinery and hospital equipment solutions.");
  const url = `https://wa.me/${whatsappNumber}?text=${text}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      id="whatsapp-floating-btn"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group max-w-14 hover:max-w-xs overflow-hidden"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 flex-shrink-0 animate-pulse" />
      <span className="text-sm font-semibold pr-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        WhatsApp Chat
      </span>
    </a>
  );
}
