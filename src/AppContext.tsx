import React, { createContext, useContext, useState, useEffect } from "react";
import { DatabaseState, Inquiry, Product } from "./types.js";

interface AppContextType {
  state: DatabaseState | null;
  isLoading: boolean;
  error: string | null;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  inquiryMachineName: string | null;
  setInquiryMachineName: (name: string | null) => void;
  refreshState: () => Promise<void>;
  submitInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "attended">) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DatabaseState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("home");
  const [inquiryMachineName, setInquiryMachineName] = useState<string | null>(null);

  const refreshState = async () => {
    try {
      const res = await fetch("/api/state");
      if (!res.ok) {
        throw new Error("Failed to load application data from backend.");
      }
      const data = await res.json();
      setState(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while communicating with the server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshState();
  }, []);

  const submitInquiry = async (inquiry: Omit<Inquiry, "id" | "date" | "attended">) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry)
      });
      if (res.ok) {
        await refreshState();
        return true;
      }
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    }
    return false;
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
        refreshState,
        submitInquiry
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
