import React, { createContext, useContext, useState, useEffect } from "react";
import { DatabaseState, Inquiry, Product, ContactInfo, GalleryItem, Service } from "./types.js";
import dbData from "../db.json";

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
  submitInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "attended">) => Promise<boolean>;

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

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DatabaseState>(dbData as DatabaseState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("home");
  const [inquiryMachineName, setInquiryMachineName] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshState = async () => {
    // Pure static implementation, nothing to refresh
  };

  const submitInquiry = async (inquiry: Omit<Inquiry, "id" | "date" | "attended">) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: "inq-" + Date.now(),
      date: new Date().toISOString(),
      attended: false
    };
    setState(prev => ({
      ...prev,
      inquiries: [...prev.inquiries, newInquiry]
    }));
    return true;
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
        setCurrentTab: (tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
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
