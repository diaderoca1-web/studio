
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Settings {
  storeName: string;
  storeEmail: string;
  primaryColor: string;
  winProbability: number;
  rtp: number;
  minWithdrawal: string;
  withdrawalFee: number;
  processingTime: string;
  minDeposit: string;
  firstDepositBonus: number;
  paymentClientId: string;
  paymentSecretKey: string;
  dbServiceAccount: string;
  dbDatabaseUrl: string;
  analyticsApiKey: string;
  maintenanceMode: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
  googleClientId: string;
  googleClientSecret: string;
}

const defaultSettings: Settings = {
  storeName: "RaspaGreen",
  storeEmail: "contato@raspagreen.com",
  primaryColor: "#2ECC71",
  winProbability: 50,
  rtp: 95,
  minWithdrawal: "50.00",
  withdrawalFee: 0,
  processingTime: "24 horas",
  minDeposit: "10.00",
  firstDepositBonus: 100,
  paymentClientId: "ronanbiel_8390418735530490",
  paymentSecretKey: "26d73ac35ddbf9d0a87f7971b91bc28b301d6a5ad1d5b1dfe0fdb329ff6efeac",
  dbServiceAccount: "",
  dbDatabaseUrl: "",
  analyticsApiKey: "",
  maintenanceMode: false,
  supabaseUrl: "",
  supabaseAnonKey: "",
  googleClientId: "",
  googleClientSecret: "",
};


interface SettingsContextType {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<Settings>(() => {
    if (typeof window === 'undefined') {
        return defaultSettings;
    }
    try {
        const item = window.localStorage.getItem('appSettings');
        return item ? JSON.parse(item) : defaultSettings;
    } catch (error) {
        console.error("Error reading settings from localStorage", error);
        return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('appSettings', JSON.stringify(settings));
    } catch (error) {
        console.error("Error saving settings to localStorage", error);
    }
  }, [settings]);

  const setSettings = (newSettings: Settings) => {
    setSettingsState(newSettings);
  };


  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
