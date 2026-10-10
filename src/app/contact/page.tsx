'use client';

import React from 'react';
import Link from 'next/link';
import { useWork } from '@/context/WorkContext';
import { ContactSection } from '@/components/ContactSection';
import { 
  PhoneCall, 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';

export default function ContactPage() {
  const { config, language } = useWork();
  const isHindi = language === 'hi';

  const brandDisplayName = isHindi 
    ? (config.nameHindi || config.name)
    : (config.nameEnglish || config.name);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 mb-4 transition font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? 'होम पेज पर वापस जाएं' : 'Back to Home'}</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isHindi ? 'सीधा संपर्क और फ्री नाप' : 'Direct Contact & Free Measurement'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {isHindi ? (
                <>
                  <span className="text-amber-400">{brandDisplayName}</span> से संपर्क करें
                </>
              ) : (
                <>
                  Contact <span className="text-amber-400">{brandDisplayName}</span>
                </>
              )}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? '30 वर्षों के अनुभवी मास्टर कारपेंटर से सीधे बात करें। कोई बिचौलिया या ठेकेदार कमीशन नहीं। फ्री साइट विजिट, लेजर नाप और पारदर्शी कोटेशन के लिए अभी कॉल या व्हाट्सएप करें।'
                : 'Connect directly with a master carpenter with 30+ years of experience. No contractors or middleman commissions. Call or WhatsApp now for free site visits, laser measurements, and transparent quotation.'}
            </p>
          </div>

          {/* Quick Direct Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {/* Phone Card */}
            <a
              href={`tel:${config.phone.replace(/\s+/g, '')}`}
              className="p-5 rounded-2xl bg-stone-900/90 border border-amber-900/40 hover:border-amber-500/60 transition group flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium">
                    {isHindi ? 'सीधा फोन कॉल' : 'Direct Phone Call'}
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-amber-300 transition">
                    {config.phone}
                  </div>
                </div>
              </div>
              <span className="text-xs text-amber-400 font-semibold inline-flex items-center gap-1">
                {isHindi ? 'अभी कॉल करें →' : 'Call Now →'}
              </span>
            </a>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                isHindi 
                  ? 'नमस्ते घनश्याम शर्मा जी, मुझे फ्री साइट नाप और कारपेंटर वर्क के लिए बात करनी है।' 
                  : 'Hello Ghanshyam Sharma, I want to discuss a custom carpentry project and book a free site visit.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-stone-900/90 border border-emerald-900/40 hover:border-emerald-500/60 transition group flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium">
                    {isHindi ? 'व्हाट्सएप चैट' : 'WhatsApp Chat'}
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                    +91 {config.whatsapp.startsWith('91') ? config.whatsapp.slice(2) : config.whatsapp}
                  </div>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1">
                {isHindi ? 'व्हाट्सएप पर मैसेज भेजें →' : 'Send WhatsApp Message →'}
              </span>
            </a>

            {/* Timing Card */}
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium">
                    {isHindi ? 'कार्य समय' : 'Working Hours'}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {isHindi ? 'सुबह 8:00 से रात 8:30 तक' : '8:00 AM - 8:30 PM'}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-stone-400">
                {isHindi ? 'सोमवार से रविवार (सातों दिन उपलब्ध)' : 'Open All 7 Days a Week'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Booking Form Section */}
      <div className="py-8">
        <ContactSection />
      </div>

      {/* Service Guarantees */}
      <div className="container mx-auto px-4 pb-20">
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            {isHindi ? 'हमारे वादे और गारंटी' : 'Our Guarantees & Promise'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm">
                  {isHindi ? '100% फ्री साइट विजिट' : '100% Free Site Visit'}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isHindi 
                    ? 'साइट पर आकर सही नाप लेना और सही सलाह देना एकदम मुफ्त है।' 
                    : 'Laser on-site measurements and custom design consultation are completely free.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm">
                  {isHindi ? 'पारदर्शी कोटेशन' : 'Transparent Quotation'}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isHindi 
                    ? 'कोई छिपा हुआ चार्ज नहीं। लेबर और मटेरियल का स्पष्ट बिल दिया जाता है।' 
                    : 'Clear itemized quotes with no hidden charges. Choose labor-only or turnkey.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm">
                  {isHindi ? 'समय पर डिलीवरी' : 'On-Time Completion'}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isHindi 
                    ? '30 सालों के अनुभव से हर काम तय समय सीमा के भीतर पूरा होता है।' 
                    : 'Committed handover deadlines backed by 30 years of disciplined project planning.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
