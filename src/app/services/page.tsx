'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWork } from '@/context/WorkContext';
import { ServicesSection } from '@/components/ServicesSection';
import { 
  Wrench, 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Sparkles,
  ShieldCheck,
  Layers,
  Award
} from 'lucide-react';

export default function ServicesPage() {
  const { config, language } = useWork();
  const isHindi = language === 'hi';

  const materialsGuide = [
    {
      titleHi: 'सेंचुरी / ग्रीन क्लब मरीन BWP प्लाई',
      titleEn: 'Century / Green Club Marine BWP Ply',
      descHi: '72 घंटे उबलते पानी में भी खराब न होने वाली 100% वाटरप्रूफ प्लाई। मॉड्यूलर किचन और सिंक एरिया के लिए सर्वश्रेष्ठ।',
      descEn: '100% boiling-water-proof (BWP) marine grade plywood. Unmatched durability against moisture and termites for kitchens.'
    },
    {
      titleHi: 'शुद्ध सीजन्ड बर्मा व सीपी सागवान (Teak)',
      titleEn: '100% Seasoned Burma & CP Teak Wood',
      descHi: 'राजसी मजबूती, नेचुरल ऑयल्स और खूबसूरत दाने। मुख्य दरवाजों, चौखट और नक्काशीदार मंदिरों के लिए पीढ़ियों की गारंटी।',
      descEn: 'Heirloom solid hardwood rich in natural oils. Resistant to decay, warping, and seasonal shifts. Ideal for grand doors & mandirs.'
    },
    {
      titleHi: 'हेफ़ेले & हेटिच ओरिजिनल सॉफ्ट-क्लोज फिटिंग्स',
      titleEn: 'Original Hafele & Hettich German Fittings',
      descHi: 'बिना आवाज वाले स्मूथ हाइड्रोलिक कब्जे, टैंडम बॉक्स और पैंट्री यूनिट्स। 10+ साल की स्मूथ परफॉर्मेंस।',
      descEn: 'Whisper-quiet soft-close hydraulic drawer runners, hinges, and lift-ups engineered for heavy daily usage.'
    },
    {
      titleHi: 'इटैलियन PU & मेलामाइन पॉलिश फिनिश',
      titleEn: 'Italian PU & Melamine High Durability Polish',
      descHi: 'एंटी-स्क्रैच, वाटरप्रूफ और अल्ट्रा लग्जरी ग्लॉस या सैटिन फिनिश जो लकड़ी के असली दानों को हमेशा नया रखती है।',
      descEn: 'Scratch-resistant, non-yellowing protective coat enhancing natural wood grain with satin or mirror gloss luster.'
    }
  ];

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
            <span>{isHindi ? 'मुख्य पेज पर वापस जाएं' : 'Back to Home'}</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHindi ? 'हमारी सभी सेवाएं' : 'Comprehensive Woodcraft Services'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {isHindi ? 'घर के हर कोने के लिए मास्टर कारीगरी' : 'Bespoke Carpentry & Custom Interiors'}
              </h1>
              <p className="text-stone-400 text-sm sm:text-base mt-2 leading-relaxed">
                {isHindi 
                  ? '30 सालों के अनुभव के साथ मॉड्यूलर किचन, स्लाइडिंग अलमारी, सागवान मंदिर, हाइड्रोलिक बेड और इटैलियन PU पॉलिश का पक्का काम।' 
                  : 'Engineered with 30 years of hands-on mastery. Direct craftsman quality with honest pricing and branded materials.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow transition"
              >
                <Phone className="w-4 h-4" />
                <span>{isHindi ? 'कॉल करें' : 'Call Now'}</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  isHindi 
                    ? 'नमस्ते घनश्याम शर्मा जी! मुझे अपनी साइट के लिए कारपेंटर सेवाओं के बारे में जानकारी चाहिए।' 
                    : 'Hello Ghanshyam Sharma! I want to consult regarding your carpentry & woodwork services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Grid */}
      <ServicesSection />

      {/* Materials & Quality Standard Guide */}
      <section className="py-16 bg-stone-900 border-b border-stone-800">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? 'मटेरियल व फिटिंग्स' : 'Materials & Hardware Standards'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isHindi ? 'हम केवल असली और ब्रांडेड सामग्री का उपयोग करते हैं' : 'Only 100% Authentic Timber & Branded Hardware'}
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              {isHindi 
                ? 'सामान में कोई मिलावट या डुप्लीकेट माल नहीं। जो लकड़ी तय होगी, वही आपकी आंखों के सामने लगेगी।' 
                : 'No cheap substitutes or counterfeit fittings. Transparent material sourcing from authorized dealers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materialsGuide.map((mat, idx) => (
              <div 
                key={idx}
                className="bg-stone-950 p-6 rounded-2xl border border-stone-800 shadow-md hover:border-amber-600/40 transition"
              >
                <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3>{isHindi ? mat.titleHi : mat.titleEn}</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-7">
                  {isHindi ? mat.descHi : mat.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Action CTA Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white">
                {isHindi ? 'क्या आप अपने घर का नाप करवाना चाहते हैं?' : 'Need Free On-Site Measurement?'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                {isHindi 
                  ? 'घनश्याम जी स्वयं आपकी साइट पर आकर जगह देखेंगे और बिना किसी शुल्क के सही एस्टीमेट देंगे।' 
                  : 'Ghanshyam Sharma will inspect your space and provide transparent budget advice with zero fees.'}
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-lg transition whitespace-nowrap"
            >
              {isHindi ? 'फ्री विजिट बुक करें' : 'Book Free Site Visit'}
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
