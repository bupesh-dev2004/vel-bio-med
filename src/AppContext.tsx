import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DatabaseState, Inquiry, Product, ContactInfo, GalleryItem, Service } from "./types.js";
import dbData from "../db.json";
import { submitPublicInquiry, PublicInquiryPayload } from "./lib/api.js";

interface AppContextType {
  state: DatabaseState;
  isLoading: boolean;
  error: string | null;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  inquiryMachineName: string | null;
  setInquiryMachineName: (name: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshState: () => Promise<void>;
  submitInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "attended">) => Promise<{ success: boolean; message: string }>;

  // Administrative Actions (Static In-Memory)
  toggleInquiryAttended: (id: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  createProduct: (product: Omit<Product, "id">) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  createCategory: (category: string) => Promise<void>;
  deleteCategory: (category: string) => Promise<void>;
  updateContactInfo: (contact: ContactInfo) => Promise<void>;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  createService: (service: Omit<Service, "id">) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const tabToPath: Record<string, string> = {
  home: "/",
  about: "/about",
  products: "/products",
  gallery: "/gallery",
  contact: "/contact",
};

const pathToTab: Record<string, string> = {
  "/": "home",
  "/home": "home",
  "/about": "about",
  "/products": "products",
  "/gallery": "gallery",
  "/contact": "contact",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState<DatabaseState>(dbData as DatabaseState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inquiryMachineName, setInquiryMachineName] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const currentTab = pathToTab[location.pathname] || "home";

  const setCurrentTab = (tab: string) => {
    const targetPath = tabToPath[tab] || (tab.startsWith("/") ? tab : `/${tab}`);
    navigate(targetPath);
  };

  const refreshState = async () => {
    // Pure static implementation, nothing to refresh
  };

  const submitInquiry = async (inquiry: Omit<Inquiry, "id" | "date" | "attended">) => {
    try {
      const payload: PublicInquiryPayload = {
        contact_person: inquiry.name,
        mobile_number: inquiry.mobile,
        email: inquiry.email,
        device: inquiry.product || null,
        message: inquiry.feedback || null,
      };
      const res = await submitPublicInquiry(payload);
      if (res && res.success) {
        const newInquiry: Inquiry = {
          ...inquiry,
          id: res.data?.id || "inq-" + Date.now(),
          date: res.data?.created_at || new Date().toISOString(),
          attended: false
        };
        setState(prev => ({
          ...prev,
          inquiries: [...prev.inquiries, newInquiry]
        }));
        return { success: true, message: res.message || "Inquiry submitted successfully." };
      }
      return { success: false, message: res.message || "Failed to submit inquiry." };
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Failed to submit inquiry. Please try again.";
      return { success: false, message: errMsg };
    }
  };

  const toggleInquiryAttended = async (id: string) => {
    setState(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(inq =>
        inq.id === id ? { ...inq, attended: !inq.attended } : inq
      )
    }));
  };

  const deleteInquiry = async (id: string) => {
    setState(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(inq => inq.id !== id)
    }));
  };

  const createProduct = async (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: "prod-" + Date.now()
    };
    setState(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const deleteProduct = async (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const createCategory = async (category: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.includes(category) ? prev.categories : [...prev.categories, category]
    }));
  };

  const deleteCategory = async (category: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const updateContactInfo = async (contact: ContactInfo) => {
    setState(prev => ({
      ...prev,
      contactInfo: contact
    }));
  };

  const addGalleryItem = async (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: "gal-" + Date.now()
    };
    setState(prev => ({
      ...prev,
      gallery: [...prev.gallery, newItem]
    }));
  };

  const deleteGalleryItem = async (id: string) => {
    setState(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  const createService = async (service: Omit<Service, "id">) => {
    const newService: Service = {
      ...service,
      id: "srv-" + Date.now()
    };
    setState(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const deleteService = async (id: string) => {
    setState(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        isLoading,
        error,
        currentTab,
        setCurrentTab,
        inquiryMachineName,
        setInquiryMachineName,
        selectedCategory,
        setSelectedCategory: (cat) => {
          setSelectedCategory(cat);
        },
        searchQuery,
        setSearchQuery,
        refreshState,
        submitInquiry,
        toggleInquiryAttended,
        deleteInquiry,
        createProduct,
        deleteProduct,
        createCategory,
        deleteCategory,
        updateContactInfo,
        addGalleryItem,
        deleteGalleryItem,
        createService,
        deleteService
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}
