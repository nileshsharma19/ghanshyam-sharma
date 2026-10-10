'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkItem, BusinessConfig, ServiceItem, initialWorkItems, initialBusinessConfig, initialServicesList } from '@/data/initialData';
import { idbGet, idbSet, idbRemove } from '@/lib/storage';

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

const STORAGE_KEY_ITEMS = 'ghanshyam_work_items_v4';
const STORAGE_KEY_SERVICES = 'ghanshyam_services_v2';
const STORAGE_KEY_CONFIG = 'ghanshyam_config_v5';
const STORAGE_KEY_LANG = 'ghanshyam_lang_pref';
const STORAGE_KEY_THEME = 'ghanshyam_theme_pref';

export const WorkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(initialWorkItems);
  const [services, setServices] = useState<ServiceItem[]>(initialServicesList);
  const [config, setConfig] = useState<BusinessConfig>(initialBusinessConfig);
  const [language, setLanguageState] = useState<'hi' | 'en'>('hi');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state with server API
  const syncToServer = async (payload: {
    workItems?: WorkItem[];
    services?: ServiceItem[];
    config?: Partial<BusinessConfig>;
  }) => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Server sync error (saved locally):', err);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        // 1. Instant local cache restore (IndexedDB with localStorage fallback)
        const cachedItems = (await idbGet<WorkItem[]>(STORAGE_KEY_ITEMS)) ||
          JSON.parse(localStorage.getItem('ghanshyam_work_items_v3') || 'null');
        if (Array.isArray(cachedItems) && cachedItems.length > 0) {
          setWorkItems(cachedItems);
        }

        const cachedServices = (await idbGet<ServiceItem[]>(STORAGE_KEY_SERVICES)) ||
          JSON.parse(localStorage.getItem('ghanshyam_services_v1') || 'null');
        if (Array.isArray(cachedServices) && cachedServices.length > 0) {
          setServices(cachedServices);
        }

        const cachedConfig = (await idbGet<BusinessConfig>(STORAGE_KEY_CONFIG)) ||
          JSON.parse(localStorage.getItem('ghanshyam_config_v4') || localStorage.getItem('ghanshyam_config_v3') || 'null');
        if (cachedConfig) {
          if (!cachedConfig.phone || cachedConfig.phone.includes('9876543210')) {
            cachedConfig.phone = initialBusinessConfig.phone;
          }
          if (!cachedConfig.whatsapp || cachedConfig.whatsapp.includes('9876543210')) {
            cachedConfig.whatsapp = initialBusinessConfig.whatsapp;
          }
          if (!cachedConfig.adminPin || cachedConfig.adminPin === '1234') {
            cachedConfig.adminPin = initialBusinessConfig.adminPin;
          }
          setConfig(prev => ({
            ...prev,
            ...cachedConfig,
            milestones: cachedConfig.milestones && cachedConfig.milestones.length > 0
              ? cachedConfig.milestones
              : initialBusinessConfig.milestones,
          }));
        }

        // 2. Fetch latest permanent data from the Server API
        const res = await fetch('/api/content', { cache: 'no-store' });
        if (res.ok) {
          const serverData = await res.json();
          if (Array.isArray(serverData.workItems) && serverData.workItems.length > 0) {
            setWorkItems(serverData.workItems);
            idbSet(STORAGE_KEY_ITEMS, serverData.workItems);
          }
          if (Array.isArray(serverData.services) && serverData.services.length > 0) {
            setServices(serverData.services);
            idbSet(STORAGE_KEY_SERVICES, serverData.services);
          }
          if (serverData.config) {
            setConfig(prev => ({ ...prev, ...serverData.config }));
            idbSet(STORAGE_KEY_CONFIG, serverData.config);
          }
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
          setThemeState('dark');
          applyThemeToDOM('dark');
        }
      } catch (err) {
        console.warn("Storage load warning:", err);
      } finally {
        setIsLoaded(true);
      }
    };

    loadInitial();
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
    idbSet(STORAGE_KEY_ITEMS, items);
    syncToServer({ workItems: items });
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
    idbSet(STORAGE_KEY_CONFIG, updated);
    syncToServer({ config: updated });
  };

  const saveServices = (serviceItems: ServiceItem[]) => {
    setServices(serviceItems);
    idbSet(STORAGE_KEY_SERVICES, serviceItems);
    syncToServer({ services: serviceItems });
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
    setWorkItems(initialWorkItems);
    setServices(initialServicesList);
    setConfig(initialBusinessConfig);
    idbSet(STORAGE_KEY_ITEMS, initialWorkItems);
    idbSet(STORAGE_KEY_SERVICES, initialServicesList);
    idbSet(STORAGE_KEY_CONFIG, initialBusinessConfig);
    syncToServer({
      workItems: initialWorkItems,
      services: initialServicesList,
      config: initialBusinessConfig,
    });
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
