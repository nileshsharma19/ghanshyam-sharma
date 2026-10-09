'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWork } from '@/context/WorkContext';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Languages, 
  Lock,
  Hammer,
  Image as ImageIcon,
  Calculator,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, language, toggleLanguage } = useWork();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHindi = language === 'hi';

  const navLinks = [
    { href: '/', labelEn: 'Home', labelHi: 'होम' },
    { href: '/gallery', labelEn: 'Daily Work & Videos', labelHi: 'दैनिक काम & वीडियो', icon: <ImageIcon className="w-4 h-4 mr-1 text-amber-600" /> },
    { href: '#services', labelEn: 'Services', labelHi: 'हमारी सेवाएं' },
    { href: '#calculator', labelEn: 'Cost Estimator', labelHi: 'खर्च का अनुमान', icon: <Calculator className="w-4 h-4 mr-1 text-amber-600" /> },
    { href: '#contact', labelEn: 'Contact', labelHi: 'संपर्क करें' },
  ];

  const brandDisplayName = isHindi 
    ? (config.nameHindi || config.name)
    : (config.nameEnglish || config.name);

  return (
    <header className="sticky top-0 z-40 bg-amber-950/95 backdrop-blur-md text-amber-50 border-b border-amber-900/60 shadow-md">
      {/* Top micro announcement bar */}
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

          <div className="flex items-center gap-3">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/60 text-xs font-bold transition shadow-sm"
              title={isHindi ? "Switch to English" : "हिंदी में देखें"}
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Admin Link button */}
            <Link
              href="/admin"
              className="flex items-center gap-1 text-amber-300/80 hover:text-amber-100 text-xs px-2 py-0.5 rounded hover:bg-amber-900/50 transition"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">{isHindi ? 'एडमिन' : 'Admin'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
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

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-amber-200/90 hover:text-amber-400 font-medium text-sm transition-colors flex items-center"
            >
              {link.icon}
              {isHindi ? link.labelHi : link.labelEn}
            </Link>
          ))}
        </nav>

        {/* Direct Call & WhatsApp Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`tel:${config.phone}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-700/50 text-sm font-semibold transition shadow-sm"
          >
            <Phone className="w-4 h-4 text-amber-400" />
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition shadow-md hover:shadow-emerald-900/30"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${config.phone}`}
            className="p-2 rounded-lg bg-amber-900 text-amber-300 border border-amber-700/50"
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
        <div className="md:hidden bg-amber-950 border-t border-amber-900 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-amber-200 hover:bg-amber-900/70 font-medium text-base flex items-center"
              >
                {link.icon}
                <span className="ml-1">{isHindi ? link.labelHi : link.labelEn}</span>
              </Link>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-amber-300 hover:bg-amber-900/70 font-medium text-base flex items-center border border-amber-800/60"
            >
              <Lock className="w-4 h-4 mr-2 text-amber-400" />
              <span>{isHindi ? 'फ़ोटो/वीडियो पोस्ट करें (एडमिन)' : 'Post Work (Admin)'}</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-amber-900/80 grid grid-cols-2 gap-2">
            <a
              href={`tel:${config.phone}`}
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
