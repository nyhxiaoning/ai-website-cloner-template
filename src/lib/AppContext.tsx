"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Province, City } from "@/types";

interface AppContextValue {
  selectedProvince: Province | null;
  selectedCity: City | null;
  setSelectedProvince: (province: Province | null) => void;
  setSelectedCity: (city: City | null) => void;
  resetSelection: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const resetSelection = useCallback(() => {
    setSelectedProvince(null);
    setSelectedCity(null);
  }, []);

  return (
    <AppContext.Provider
      value={{ selectedProvince, selectedCity, setSelectedProvince, setSelectedCity, resetSelection }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}