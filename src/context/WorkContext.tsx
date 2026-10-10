'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkItem, BusinessConfig, ServiceItem, initialWorkItems, initialBusinessConfig, initialServicesList } from '@/data/initialData';

interface WorkContextType {
  workItems: WorkItem[];
  services: ServiceItem[];
  config: BusinessConfig;
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
  toggleLanguage: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  addWorkItem: (item: Omit<WorkItem, 'id'>) => WorkItem;
  updateWorkItem: (id: string, updated: Partial<WorkItem>) => void;
  deleteWorkItem: (id: string) => void;
  updateBusinessConfig: (newConfig: Partial<BusinessConfig>) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => ServiceItem;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  resetServices: () => void;
  resetToDefault: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

const STORAGE_KEY_ITEMS = 'ghanshyam_work_items_v3';
const STORAGE_KEY_SERVICES = 'ghanshyam_services_v1';
const STORAGE_KEY_CONFIG = 'ghanshyam_config_v4';
const STORAGE_KEY_LANG = 'ghanshyam_lang_pref';
const STORAGE_KEY_THEME = 'ghanshyam_theme_pref';

export const WorkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(initialWorkItems);
  const [services, setServices] = useState<ServiceItem[]>(initialServicesList);
  const [config, setConfig] = useState<BusinessConfig>(initialBusinessConfig);
  const [language, setLanguageState] = useState<'hi' | 'en'>('hi');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWorkItems(parsed);
        }
      }

      const savedServices = localStorage.getItem(STORAGE_KEY_SERVICES);
      if (savedServices) {
        const parsed = JSON.parse(savedServices);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServices(parsed);
        }
      }

      const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG) || localStorage.getItem('ghanshyam_config_v3');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        // If legacy dummy number is present, replace with 8468809565
        if (!parsedConfig.phone || parsedConfig.phone.includes('9876543210')) {
          parsedConfig.phone = initialBusinessConfig.phone;
        }
        if (!parsedConfig.whatsapp || parsedConfig.whatsapp.includes('9876543210')) {
          parsedConfig.whatsapp = initialBusinessConfig.whatsapp;
        }
        if (!parsedConfig.adminPin || parsedConfig.adminPin === '1234') {
          parsedConfig.adminPin = initialBusinessConfig.adminPin;
        }
        setConfig({
          ...initialBusinessConfig,
          ...parsedConfig,
          milestones: parsedConfig.milestones && parsedConfig.milestones.length > 0 
            ? parsedConfig.milestones 
            : initialBusinessConfig.milestones,
        });
      }

      const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as 'hi' | 'en';
      if (savedLang === 'hi' || savedLang === 'en') {
        setLanguageState(savedLang);
      }

      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as 'dark' | 'light';
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
        applyThemeToDOM(savedTheme);
      } else {
        // Default to dark luxury aesthetic
        setThemeState('dark');
        applyThemeToDOM('dark');
      }
    } catch (err) {
      console.warn("Storage load warning:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const applyThemeToDOM = (t: 'dark' | 'light') => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(t);
      root.setAttribute('data-theme', t);

      let meta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'color-scheme';
        document.head.appendChild(meta);
      }
      meta.content = t;
    }
  };

  const setTheme = (t: 'dark' | 'light') => {
    setThemeState(t);
    applyThemeToDOM(t);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, t);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const setLanguage = (lang: 'hi' | 'en') => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLanguage = () => {
    const next = language === 'hi' ? 'en' : 'hi';
    setLanguage(next);
  };

  const saveItems = (items: WorkItem[]) => {
    setWorkItems(items);
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  };

  const addWorkItem = (itemData: Omit<WorkItem, 'id'>): WorkItem => {
    const newItem: WorkItem = {
      ...itemData,
      id: `work-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: itemData.date || new Date().toISOString().split('T')[0],
    };
    const updated = [newItem, ...workItems];
    saveItems(updated);
    return newItem;
  };

  const deleteWorkItem = (id: string) => {
    const updated = workItems.filter(item => item.id !== id);
    saveItems(updated);
  };

  const updateWorkItem = (id: string, updated: Partial<WorkItem>) => {
    const updatedList = workItems.map(item => item.id === id ? { ...item, ...updated } : item);
    saveItems(updatedList);
  };

  const updateBusinessConfig = (newConfig: Partial<BusinessConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const saveServices = (serviceItems: ServiceItem[]) => {
    setServices(serviceItems);
    try {
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(serviceItems));
    } catch (e) {
      console.error("Local storage error for services:", e);
    }
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>): ServiceItem => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `service-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    const updated = [...services, newService];
    saveServices(updated);
    return newService;
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    const updatedList = services.map(s => s.id === id ? { ...s, ...updated } : s);
    saveServices(updatedList);
  };

  const deleteService = (id: string) => {
    const updatedList = services.filter(s => s.id !== id);
    saveServices(updatedList);
  };

  const resetServices = () => {
    saveServices(initialServicesList);
  };

  const resetToDefault = () => {
    saveItems(initialWorkItems);
    saveServices(initialServicesList);
    setConfig(initialBusinessConfig);
    try {
      localStorage.removeItem(STORAGE_KEY_ITEMS);
      localStorage.removeItem(STORAGE_KEY_SERVICES);
      localStorage.removeItem(STORAGE_KEY_CONFIG);
    } catch (e) {
      console.error(e);
    }
  };

  const exportDataJson = (): string => {
    return JSON.stringify({ items: workItems, services, config }, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.items && Array.isArray(data.items)) {
        saveItems(data.items);
      }
      if (data.services && Array.isArray(data.services)) {
        saveServices(data.services);
      }
      if (data.config) {
        updateBusinessConfig(data.config);
      }
      return true;
    } catch (err) {
      console.error("Import error:", err);
      return false;
    }
  };

  return (
    <WorkContext.Provider
      value={{
        workItems,
        services,
        config,
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        addWorkItem,
        updateWorkItem,
        deleteWorkItem,
        updateBusinessConfig,
        addService,
        updateService,
        deleteService,
        resetServices,
        resetToDefault,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};

export const useWork = () => {
  const context = useContext(WorkContext);
  if (!context) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
};
