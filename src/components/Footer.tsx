'use client';

import React from 'react';
import Link from 'next/link';
import { useWork } from '@/context/WorkContext';
import { Hammer, Phone, MessageSquare, MapPin, Lock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, language } = useWork();
  const isHindi = language === 'hi';

  const brandDisplayName = isHindi 
    ? (config.nameHindi || config.name)
    : (config.nameEnglish || config.name);

  const areasText = isHindi 
    ? `${config.serviceAreasHindi ? config.serviceAreasHindi.join(' • ') : config.serviceAreas.join(' • ')} एवं आसपास के सभी क्षेत्रों में साइट पर जाकर काम उपलब्ध।`
    : `Available for on-site bespoke woodwork across ${config.serviceAreas.join(' • ')} and surrounding regions.`;

  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800 pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-stone-950 flex items-center justify-center font-bold">
                <Hammer className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base">
                {brandDisplayName}
              </span>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs">
              {isHindi ? config.taglineHindi : config.taglineEnglish}
            </p>

            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs pt-1">
              <Award className="w-4 h-4" />
              <span>{config.experienceYears}+ {isHindi ? 'वर्षों का उत्कृष्ट अनुभव' : 'Years Craftsmanship Excellence'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-stone-200 font-bold text-sm tracking-wide uppercase">
              {isHindi ? 'त्वरित लिंक' : 'Quick Links'}
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition">
                  {isHindi ? 'होम' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition">
                  {isHindi ? 'दैनिक काम & वीडियो' : 'Daily Work & Videos'}
                </Link>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition">
                  {isHindi ? 'हमारी सेवाएं' : 'Services'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition">
                  {isHindi ? 'खर्च का अनुमान' : 'Cost Estimator'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition">
                  {isHindi ? 'फ्री साइट विजिट बुक करें' : 'Book Free Site Visit'}
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-2">
            <h4 className="text-stone-200 font-bold text-sm tracking-wide uppercase">
              {isHindi ? 'कार्य क्षेत्र' : 'Service Areas'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {areasText}
            </p>
            <div className="pt-2 text-stone-300">
              <div className="font-semibold text-white">{isHindi ? 'सीधा फोन नंबर:' : 'Direct Phone:'}</div>
              <a href={`tel:${config.phone}`} className="text-amber-400 font-bold hover:underline">
                {config.phone}
              </a>
            </div>
          </div>

          {/* Admin & Security */}
          <div className="space-y-2">
            <h4 className="text-stone-200 font-bold text-sm tracking-wide uppercase">
              {isHindi ? 'मालिक पोर्टल' : 'Owner Portal'}
            </h4>
            <p className="text-xs text-stone-400">
              {isHindi 
                ? 'अपने मोबाइल फोन से रोज़ के नए काम की फोटो और वीडियो आसानी से अपलोड करें।' 
                : 'Upload today\'s newly completed furniture photos and videos directly from mobile.'}
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-amber-300 hover:text-white hover:bg-stone-800 transition font-bold"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? 'फोटो/वीडियो पोस्ट करें (एडमिन)' : 'Post Work (Admin)'}</span>
            </Link>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-stone-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {brandDisplayName}. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with pride for Ghanshyam Sharma Carpenter (30 Years Experience)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
