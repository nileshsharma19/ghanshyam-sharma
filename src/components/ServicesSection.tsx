'use client';

import React from 'react';
import Image from 'next/image';
import { useWork } from '@/context/WorkContext';
import { 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Hammer
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, config, language } = useWork();
  const isHindi = language === 'hi';

  return (
    <section id="services" className="py-16 lg:py-24 bg-stone-900 text-stone-100">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold mb-3">
            <Hammer className="w-4 h-4 text-amber-400" />
            <span>{isHindi ? 'हमारी मुख्य सेवाएं' : 'Craftsmanship Services'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isHindi ? 'घर के हर कोने के लिए संपूर्ण वुडवर्क समाधान' : 'Master Carpentry for Every Corner of Your Home'}
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            {isHindi 
              ? '30 साल के अनुभव के साथ हम सिर्फ बनाते नहीं, बल्कि ऐसा फर्नीचर तैयार करते हैं जो पीढ़ियों तक चले।' 
              : 'Built with 30 years of seasoned wisdom, premium raw materials, and precision installation.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 shadow-lg hover:shadow-2xl hover:border-amber-600/40 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-900">
                <Image
                  src={service.imageUrl}
                  alt={service.titleEn}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-lg sm:text-xl drop-shadow-sm leading-snug text-white">
                    {isHindi ? service.titleHi : service.titleEn}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {isHindi ? service.descHi : service.descEn}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 space-y-1.5 border-t border-stone-800/80 pt-3">
                    {(isHindi ? service.featuresHi : service.featuresEn).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Materials highlight */}
                  <div className="mt-3 text-[11px] bg-amber-950/40 p-2.5 rounded-lg border border-amber-900/50 text-amber-300">
                    <span className="font-bold text-amber-200">{isHindi ? 'मटेरियल: ' : 'Material: '}</span>
                    {isHindi ? service.materialsHi : service.materialsEn}
                  </div>
                </div>

                {/* WhatsApp Enquiry button */}
                <a
                  href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                    isHindi 
                      ? `नमस्ते, मुझे "${service.titleHi}" के काम के बारे में रेट और समय जानना है।` 
                      : `Hello, I want to inquire about "${service.titleEn}" service.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-950/70 hover:bg-emerald-600 text-amber-200 hover:text-white border border-amber-800/60 hover:border-emerald-500 text-xs sm:text-sm font-bold transition duration-200 shadow-sm group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                  <span>{isHindi ? 'रेट पूछें (WhatsApp)' : 'Get Quote on WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner - Free Measurement */}
        <div className="mt-12 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl p-6 sm:p-8 text-amber-50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-amber-700">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isHindi ? 'क्या आपको अपने घर का नाप दिलवाना है?' : 'Need Free Site Visit & Measurement?'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200">
              {isHindi 
                ? 'हम आपके घर आकर जगह देखेंगे, सही सलाह देंगे और बिना किसी शुल्क के पूरा बजट बताएंगे।' 
                : 'We will inspect your space, discuss design requirements, and provide a transparent estimate.'}
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <a
              href={`tel:${config.phone.replace(/\s+/g, '')}`}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow transition"
            >
              {isHindi ? 'फ्री विजिट बुक करें' : 'Book Free Visit'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
