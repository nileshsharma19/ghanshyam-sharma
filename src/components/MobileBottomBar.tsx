'use client';

import React from 'react';
import Link from 'next/link';
import { useWork } from '@/context/WorkContext';
import { Phone, MessageSquare, Image as ImageIcon, Calculator, ShieldCheck } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { config, language } = useWork();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-lg border-t border-amber-900/40 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 items-center max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${config.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-amber-900/40 text-amber-300 hover:bg-amber-900/60 active:scale-95 transition"
        >
          <div className="relative">
            <Phone className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-[10px] font-bold mt-1 text-amber-200">
            {language === 'hi' ? 'कॉल करें' : 'Call'}
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
            language === 'hi'
              ? 'नमस्ते, मुझे घर के फर्नीचर / कारपेंटर काम के लिए पूछताछ करनी है।'
              : 'Hello, I want to inquire about custom carpentry and furniture work.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-600 text-white font-medium shadow-md active:scale-95 transition"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">WhatsApp</span>
        </a>

        {/* Daily Feed */}
        <Link
          href="/gallery"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-amber-900/40 text-amber-300 hover:bg-amber-900/60 active:scale-95 transition"
        >
          <ImageIcon className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-bold mt-1 text-amber-200">
            {language === 'hi' ? 'रोज का काम' : 'Feed'}
          </span>
        </Link>

        {/* Cost Calculator */}
        <a
          href="#calculator"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-amber-900/40 text-amber-300 hover:bg-amber-900/60 active:scale-95 transition"
        >
          <Calculator className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-bold mt-1 text-amber-200">
            {language === 'hi' ? 'एस्टीमेट' : 'Estimate'}
          </span>
        </a>
      </div>
    </div>
  );
};
