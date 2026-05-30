import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  extraItem?: string;
}

export default function Breadcrumbs({ currentTab, onNavigate, extraItem }: BreadcrumbsProps) {
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "home":
        return "Home";
      case "about":
        return "About Us";
      case "services":
        return "Services & Support";
      case "gallery":
        return "Media Gallery";
      case "products":
        return "Products Catalog";
      case "contact":
        return "Contact & Inquiries";

      default:
        return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };

  return (
    <nav className="bg-slate-50 border-y border-slate-100 py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs font-medium text-slate-500">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center hover:text-blue-600 transition-colors duration-200"
        >
          <Home className="w-3.5 h-3.5 mr-1" />
          Home
        </button>

        {currentTab !== "home" && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <button
              onClick={() => onNavigate(currentTab)}
              className={`hover:text-blue-600 transition-colors duration-200 ${!extraItem ? "text-blue-600 font-semibold" : ""}`}
            >
              {getTabLabel(currentTab)}
            </button>
          </>
        )}

        {extraItem && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-blue-600 font-semibold truncate max-w-[200px] sm:max-w-xs">{extraItem}</span>
          </>
        )}
      </div>
    </nav>
  );
}
