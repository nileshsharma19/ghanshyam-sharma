'use client';

import React from 'react';
import Link from 'next/link';
import { useWork } from '@/context/WorkContext';
import { Hammer, Lock, Award, CheckCircle2 } from 'lucide-react';

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
                <Link href="/services" className="hover:text-amber-400 transition">
                  {isHindi ? 'हमारी सेवाएं' : 'Services'}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition">
                  {isHindi ? 'दैनिक काम & वीडियो' : 'Daily Work & Videos'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition">
                  {isHindi ? '30 वर्षों का अनुभव' : '30 Yrs Craftsmanship'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition">
                  {isHindi ? 'फ्री साइट विजिट बुक करें' : 'Contact & Book Site Visit'}
                </Link>
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
              <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="text-amber-400 font-bold hover:underline">
                {config.phone}
              </a>
            </div>
          </div>

          {/* Quality Assurance & Craftsmanship Guarantee */}
          <div className="space-y-2">
            <h4 className="text-stone-200 font-bold text-sm tracking-wide uppercase">
              {isHindi ? 'गुणवत्ता व गारंटी' : 'Quality & Guarantee'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{isHindi ? '30 वर्षों का पक्का और विश्वसनीय अनुभव' : '30+ Years of Verified Experience'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{isHindi ? 'असली मरीन BWP प्लाई व सागवान लकड़ी' : 'Authentic BWP Marine Ply & Teak Wood'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{isHindi ? 'हेफ़ेले & हेटिच ओरिजिनल जर्मन फिटिंग्स' : 'Original Hafele & Hettich Hardware'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{isHindi ? 'सीधे कारीगर से काम - 0% कमीशन' : 'Direct Craftsman — Zero Middleman Cost'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-stone-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {brandDisplayName}. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with pride for Ghanshyam Sharma Carpenter (30 Years Experience)</span>
            {/* Discreet owner portal lock: invisible to casual visitors, clickable by owner */}
            <Link 
              href="/admin" 
              className="text-stone-700 hover:text-amber-500 transition ml-2 p-1" 
              title="Owner Login"
              aria-label="Owner Login"
            >
              <Lock className="w-2.5 h-2.5 inline opacity-30 hover:opacity-100" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
