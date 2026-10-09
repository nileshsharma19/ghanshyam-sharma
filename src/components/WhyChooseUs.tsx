'use client';

import React from 'react';
import { useWork } from '@/context/WorkContext';
import { ShieldCheck, Award, ThumbsUp, Sparkles, Clock, Hammer, DollarSign, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { language } = useWork();
  const isHindi = language === 'hi';

  const reasons = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      titleHi: '30 वर्षों का जमीनी अनुभव',
      titleEn: '30+ Years of Ground Mastery',
      descHi: '1994 से लकड़ी का काम। हमें पता है कौन सी लकड़ी में गांठ है, कौन सा फेविकोल और प्लाई सालों-साल टिकेगा।',
      descEn: 'Decades of real hands-on craftsmanship ensuring timber seasoning and structural integrity.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      titleHi: '0% बिचौलिया कमीशन (बचत 30%)',
      titleEn: 'Direct Craftsman — Zero Commission',
      descHi: 'इंटीरियर कंपनियों और ठेकेदारों की तरह 30-40% एक्स्ट्रा मार्जिन नहीं। सीधा काम, सीधा हिसाब।',
      descEn: 'Cut out contractor and middleman margins. Pay only for genuine material and master labor.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      titleHi: 'सामान में 100% ईमानदारी',
      titleEn: '100% Genuine Branded Hardware',
      descHi: 'सेंचुरी/ग्रीनप्लाई प्लाईवुड और हेफ़ेले/हेटिच ओरिजिनल फिटिंग्स। कोई नकली या सस्ता माल नहीं।',
      descEn: 'Authentic BWP Marine ply and branded German hinges with no fake replacements.'
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      titleHi: 'समय पर डिलीवरी का पक्का वादा',
      titleEn: 'Committed On-Time Delivery',
      descHi: 'जो तारीख तय की जाएगी, उसी पर काम पूरा होगा ताकि आपके घर की प्लानिंग खराब न हो।',
      descEn: 'Strict project timelines so your moving-in plans are never delayed.'
    },
    {
      icon: <Hammer className="w-6 h-6 text-purple-500" />,
      titleHi: 'आधुनिक मशीनें + हाथ की नक्काशी',
      titleEn: 'Modern Tools & Hand Carving',
      descHi: 'लेज़र कटिंग, एज-बाइंडिंग से लेकर हाथ की पारंपरिक नक्काशी तक हर प्रकार की कारीगरी में माहिर।',
      descEn: 'Perfect blend of modern edge-banding machinery and traditional chisel artistry.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-500" />,
      titleHi: 'काम के बाद भी सर्विस सपोर्ट',
      titleEn: 'Post-Handover Warranty Support',
      descHi: 'काम खत्म होने के बाद भी कभी हिंज ढीला हो या शटर में दिक्कत, एक फोन पर तुरंत हाजिर।',
      descEn: 'Reliable service backing for hinge alignments or minor adjustments whenever needed.'
    }
  ];

  return (
    <section className="py-16 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>{isHindi ? 'हमारा संकल्प' : 'Why Choose Ghanshyam Sharma'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-950">
            {isHindi ? 'हजारों परिवारों ने हम पर भरोसा क्यों किया?' : 'Why Homeowners Trust Our 30-Year Legacy'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            {isHindi 
              ? 'फर्नीचर बार-बार नहीं बनता, इसलिए ऐसा कारीगर चुनें जिसके पास तजुर्बा और पक्की नीयत हो।' 
              : 'Furniture is a lifetime investment. Choose veteran expertise over hollow promises.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center mb-4">
                {r.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg text-stone-950">
                {isHindi ? r.titleHi : r.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {isHindi ? r.descHi : r.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
