'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWork } from '@/context/WorkContext';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Languages, 
  Hammer,
  Home,
  Wrench,
  Image as ImageIcon,
  Award,
  PhoneCall,
  Sun,
  Moon,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, language, toggleLanguage, theme, toggleTheme } = useWork();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const pathname = usePathname();
  const isHindi = language === 'hi';

  // Secret keyboard shortcut (Ctrl + Shift + A) to open Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Secret gesture: 3 quick taps on the Hammer Logo routes to /admin
  const handleSecretLogoTap = (e: React.MouseEvent) => {
    const nextCount = logoClicks + 1;
    if (nextCount >= 3) {
      e.preventDefault();
      setLogoClicks(0);
      window.location.href = '/admin';
    } else {
      setLogoClicks(nextCount);
      setTimeout(() => setLogoClicks(0), 1200);
    }
  };

  const navLinks = [
    { 
      href: '/', 
      labelEn: 'Home', 
      labelHi: 'होम', 
      icon: Home 
    },
    { 
      href: '/services', 
      labelEn: 'Services', 
      labelHi: 'सेवाएं', 
      icon: Wrench 
    },
    { 
      href: '/gallery', 
      labelEn: 'Daily Work', 
      labelHi: 'रोज का काम', 
      icon: ImageIcon 
    },
    { 
      href: '/about', 
      labelEn: '30 Yrs Legacy', 
      labelHi: '30 साल का अनुभव', 
      icon: Award 
    },
    { 
      href: '/contact', 
      labelEn: 'Contact', 
      labelHi: 'संपर्क', 
      icon: PhoneCall 
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const brandDisplayName = isHindi 
    ? (config.nameHindi || config.name)
    : (config.nameEnglish || config.name);

  return (
    <header className="sticky top-0 z-40 bg-amber-950/95 backdrop-blur-md text-amber-50 border-b border-amber-900/60 shadow-md">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-100 px-4 py-1.5 text-xs sm:text-sm font-medium flex justify-between items-center border-b border-amber-700/40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500 text-amber-950">
              {config.experienceYears}+ {isHindi ? 'वर्षों का अनुभव' : 'Years Experience'}
            </span>
            <span className="truncate">
              {isHindi 
                ? '⭐ 30 वर्षों का अटूट विश्वास | फ्री नाप व सलाह' 
                : '⭐ 30+ Years of Master Carpentry | Free Site Measurement'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark Mode & White Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/60 text-xs font-bold transition shadow-sm"
              title={theme === 'dark' ? (isHindi ? "व्हाइट मोड में बदलें" : "Switch to White Mode") : (isHindi ? "डार्क मोड में बदलें" : "Switch to Dark Mode")}
              aria-label="Toggle dark and white mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'व्हाइट' : 'White'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'डार्क' : 'Dark'}</span>
                </>
              )}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/60 text-xs font-bold transition shadow-sm"
              title={isHindi ? "Switch to English" : "हिंदी में देखें"}
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? 'EN' : 'हिं'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name (Triple tap on logo secretly opens /admin for owner) */}
        <Link 
          href="/" 
          onClick={handleSecretLogoTap}
          className="flex items-center gap-2.5 group cursor-pointer select-none shrink-0"
          title={brandDisplayName}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-amber-950 rounded-[10px] flex items-center justify-center">
              <Hammer className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 transform -rotate-12 group-hover:rotate-0 transition-transform" />
            </div>
          </div>
          <div>
            <div className="font-bold text-base sm:text-lg leading-tight tracking-tight text-amber-100 flex items-center gap-1.5">
              <span>{brandDisplayName}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-amber-300/80 font-medium tracking-wide">
              {isHindi ? 'मास्टर वुडवर्किंग & इंटीरियर' : 'Master Carpenter & Custom Interiors'}
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links with Icons */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-900/80 text-amber-300 font-semibold border border-amber-600/60 shadow-sm'
                    : 'text-amber-200/90 hover:text-white hover:bg-amber-900/40 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-amber-300' : 'text-amber-400'}`} />
                <span>{isHindi ? link.labelHi : link.labelEn}</span>
              </Link>
            );
          })}
        </nav>

        {/* Direct Call & WhatsApp Buttons */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <a
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-700/50 text-xs sm:text-sm font-semibold transition shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{config.phone}</span>
          </a>

          <a
            href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
              isHindi 
                ? 'नमस्ते घनश्याम शर्मा जी, मुझे लकड़ी के काम / फर्नीचर के बारे में बात करनी है।' 
                : 'Hello Ghanshyam Sharma, I want to discuss a custom carpentry and furniture project.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition shadow-md hover:shadow-emerald-900/30"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="p-2 rounded-lg bg-amber-900 text-amber-300 border border-amber-700/50 sm:hidden"
            aria-label={isHindi ? "कॉल करें" : "Call"}
          >
            <Phone className="w-5 h-5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-amber-900/80 text-amber-200 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-amber-950 border-t border-amber-900 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl font-medium text-base flex items-center gap-3 transition-colors ${
                    active
                      ? 'bg-amber-900/90 text-amber-300 font-bold border border-amber-700/60 shadow-sm'
                      : 'text-amber-200 hover:bg-amber-900/60 hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? 'bg-amber-800 text-amber-300' : 'bg-amber-900/50 text-amber-400 border border-amber-800/60'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{isHindi ? link.labelHi : link.labelEn}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Theme Toggle Button */}
          <div className="pt-2 pb-1 border-t border-amber-900/60 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-amber-300">
              {isHindi ? 'थीम मोड (Color Theme):' : 'Color Mode:'}
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-900/80 hover:bg-amber-900 text-amber-200 border border-amber-600/50 text-xs font-bold transition shadow-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'व्हाइट मोड चुनें' : 'Switch to White'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'डार्क मोड चुनें' : 'Switch to Dark'}</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-amber-900/80 grid grid-cols-2 gap-2">
            <a
              href={`tel:${config.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-900 text-amber-100 font-bold text-sm shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'कॉल करें' : 'Call Now'}</span>
            </a>
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                isHindi 
                  ? 'नमस्ते घनश्याम शर्मा जी, मुझे कारपेंटर वर्क के लिए बात करनी है।' 
                  : 'Hello Ghanshyam Sharma, I want to discuss a custom carpentry project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
