import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, Award, ArrowRight } from "lucide-react";
import { useAppState } from "../AppContext.js";

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
    <footer className="bg-slate-900 text-slate-300 font-sans border-t-4 border-blue-600">
      {/* Upper newsletter/brand trust slider */}
      <div className="bg-slate-950 py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 rounded-lg text-blue-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">ISO 13485 Certified Medical Distributor</p>
              <p className="text-xs text-slate-400">Guaranteeing compliance standards and flawless critical care setups.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-slate-400 font-medium">Need instant consulting?</span>
            <button
              onClick={() => setCurrentTab("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-lg transition-all shadow-md flex items-center gap-1.5"
            >
              Get Free Quote <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              V
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight block">
                Vel Bio <span className="text-blue-500">Med</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 block -mt-1">
                Medical Excellence
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Vel Bio Med stands parallel with clinical perfection, delivering innovative critical life supports, high frequency diagnostics, and state of the art modular sterilizers across prime hospitals.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://facebook.com" className="p-2 bg-slate-800 hover:bg-blue-600 rounded-lg text-slate-400 hover:text-white transition-all transform hover:-translate-y-1">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" className="p-2 bg-slate-800 hover:bg-pink-600 rounded-lg text-slate-400 hover:text-white transition-all transform hover:-translate-y-1">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" className="p-2 bg-slate-800 hover:bg-blue-700 rounded-lg text-slate-400 hover:text-white transition-all transform hover:-translate-y-1">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" className="p-2 bg-slate-800 hover:bg-blue-400 rounded-lg text-slate-400 hover:text-white transition-all transform hover:-translate-y-1">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" className="p-2 bg-slate-800 hover:bg-red-600 rounded-lg text-slate-400 hover:text-white transition-all transform hover:-translate-y-1">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 border-b border-slate-800 pb-2">
            Company Info
          </h3>
          <ul className="space-y-3 text-xs text-slate-400">
            {["home", "about", "services", "gallery", "products", "contact"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setCurrentTab(tab)}
                  className="hover:text-blue-400 hover:translate-x-1.5 transition-all outline-none text-left flex items-center gap-1"
                >
                  <span className="text-blue-500 font-bold">›</span>
                  <span className="capitalize">
                    {tab === "about" ? "About Us" : tab === "contact" ? "Contact Us" : tab}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Product categories */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 border-b border-slate-800 pb-2">
            Our Offerings
          </h3>
          <ul className="space-y-3 text-xs text-slate-400">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCurrentTab("products")}
                  className="hover:text-blue-400 hover:translate-x-1.5 transition-all text-left flex items-center gap-1"
                >
                  <span className="text-blue-500 font-bold">›</span>
                  <span>{cat}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact info */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 border-b border-slate-800 pb-2">
            Contact Details
          </h3>
          <ul className="space-y-4 text-xs text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{contact.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{contact.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{contact.email}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="bg-slate-950 py-6 border-t border-slate-800 text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Vel Bio Med. All Rights Reserved. Engineered for excellence.</p>
          <div className="flex gap-6">
            <button onClick={() => setCurrentTab("about")} className="hover:text-blue-400">Privacy Policy</button>
            <button onClick={() => setCurrentTab("contact")} className="hover:text-blue-400">Terms & Conditions</button>
            <button onClick={() => setCurrentTab("admin")} className="hover:text-blue-400 font-semibold text-slate-400">Admin Control Log</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
