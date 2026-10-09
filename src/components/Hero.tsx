'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWork } from '@/context/WorkContext';
import { 
  Phone, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  PlayCircle,
  Clock,
  ThumbsUp,
  MapPin
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { config, language } = useWork();

  const isHindi = language === 'hi';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 text-white pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-amber-900/40">
      {/* Background Decorative Wood Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                {isHindi 
                  ? '30+ वर्षों का अनुभव | मास्टर कारपेंटर & इंटीरियर' 
                  : '30+ Years Experience | Master Woodcraft & Interior'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-100 leading-[1.15]">
              {isHindi ? (
                <>
                  मजबूत लकड़ी, शुद्ध कारीगरी और <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">आधुनिक डिजाइन</span>
                </>
              ) : (
                <>
                  Custom Wooden Furniture & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">Modern Interiors</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {isHindi 
                ? 'मॉड्यूलर किचन, स्लाइडिंग अलमारी, नक्काशीदार मंदिर, डबल बेड और होम इंटीरियर वुडवर्क। सीधे कारीगर से बनवाएं और बिचौलियों व ठेकेदार का कमीशन बचाएं!' 
                : 'Bespoke modular kitchens, sliding wardrobes, handcrafted wooden temples, beds & luxury home woodcraft. Direct master craftsmanship with honest pricing.'}
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 text-xs sm:text-sm text-stone-200">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isHindi ? '100% पक्की गारंटी' : '100% Guaranteed'}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isHindi ? 'फ्री नाप व एस्टीमेट' : 'Free Measurement'}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-stone-900/60 p-2 rounded-lg border border-stone-800 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isHindi ? 'समय पर डिलीवरी' : 'On-Time Handover'}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  isHindi
                    ? 'नमस्ते घनश्याम शर्मा जी! मुझे फर्नीचर/वुडवर्क के लिए बात करनी है। क्या आप फ्री साइट विजिट या एस्टीमेट दे सकते हैं?'
                    : 'Hello Ghanshyam Sharma! I want to consult for custom furniture & woodwork. Can you provide a free site estimate?'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-emerald-900/40 transition transform active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{isHindi ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}</span>
              </a>

              {/* Direct Call Button */}
              <a
                href={`tel:${config.phone}`}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-base sm:text-lg shadow-lg hover:shadow-amber-900/40 transition transform active:scale-95"
              >
                <Phone className="w-5 h-5" />
                <span>{isHindi ? 'सीधे कॉल करें' : 'Call Now'}</span>
              </a>

              {/* View Feed Button */}
              <Link
                href="/gallery"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-base transition"
              >
                <PlayCircle className="w-5 h-5 text-amber-400" />
                <span>{isHindi ? 'रोज का काम देखें' : 'View Work Feed'}</span>
              </Link>
            </div>

            {/* Service Location line */}
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-stone-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {isHindi ? 'कार्य क्षेत्र:' : 'Service Areas:'}{' '}
                <span className="text-stone-300 font-medium">
                  {isHindi 
                    ? (config.serviceAreasHindi ? config.serviceAreasHindi.join(' • ') : config.serviceAreas.join(' • '))
                    : config.serviceAreas.join(' • ')}
                </span>
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-800/40 bg-stone-900 group">
                <div className="relative h-72 sm:h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
                    alt="Master Woodworking Modular Kitchen"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition duration-700"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                </div>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-amber-950/90 backdrop-blur-md border border-amber-600/40 text-amber-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'लेटेस्ट मॉड्यूलर किचन' : 'Recent Kitchen Work'}</span>
                </div>

                {/* Video Play Badge */}
                <Link 
                  href="/gallery"
                  className="absolute top-4 right-4 bg-stone-900/90 backdrop-blur-md border border-stone-700 text-stone-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-amber-600 hover:text-stone-950 transition"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'वीडियो देखें' : 'Watch Videos'}</span>
                </Link>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-left">
                  <p className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
                    {isHindi ? 'घनश्याम शर्मा - 30 साल की कारीगरी' : 'Ghanshyam Sharma Carpenter'}
                  </p>
                  <h3 className="text-lg font-bold text-white">
                    {isHindi ? 'वाटरप्रूफ मरीन प्लाई + सॉफ्ट-क्लोज' : 'Waterproof Marine Ply & Soft Close Hardware'}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    {isHindi 
                      ? '30 सालों के अनुभव से हम जानते हैं कि कौन सी लकड़ी सालों-साल चलेगी बिना दीमक या सीलन के।' 
                      : 'Built to endure generations without termite, swelling or warping.'}
                  </p>
                </div>
              </div>

              {/* Floating Mini Experience Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-gradient-to-br from-amber-600 to-amber-700 text-stone-950 p-3 sm:p-4 rounded-2xl shadow-2xl border-2 border-amber-300/40 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-950 text-amber-400 rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-inner">
                  30+
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-stone-950">
                    {isHindi ? 'वर्षों का अनुभव' : 'Years Experience'}
                  </div>
                  <div className="text-[10px] sm:text-xs text-stone-900 font-semibold">
                    {isHindi ? '100% पक्का काम' : 'Master Carpenter'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Stats counters for immense trust */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">30+</div>
            <div className="text-xs sm:text-sm text-stone-300 mt-0.5">
              {isHindi ? 'सालों का फील्ड अनुभव' : 'Years Experience'}
            </div>
          </div>
          <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">1,500+</div>
            <div className="text-xs sm:text-sm text-stone-300 mt-0.5">
              {isHindi ? 'संतुष्ट ग्राहक & घर' : 'Projects Completed'}
            </div>
          </div>
          <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs sm:text-sm text-stone-300 mt-0.5">
              {isHindi ? 'शुद्ध लकड़ी & प्लाई' : 'Genuine Materials'}
            </div>
          </div>
          <div className="p-3 bg-stone-900/40 rounded-xl border border-stone-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">0%</div>
            <div className="text-xs sm:text-sm text-stone-300 mt-0.5">
              {isHindi ? 'कमीशन (सीधे कारीगर)' : 'Middleman Fee'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
