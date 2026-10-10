'use client';

import React from 'react';
import { useWork } from '@/context/WorkContext';
import { Star, CheckCircle2 } from 'lucide-react';

interface Review {
  nameHi: string;
  nameEn: string;
  locationHi: string;
  locationEn: string;
  projectHi: string;
  projectEn: string;
  reviewHi: string;
  reviewEn: string;
  rating: number;
  dateHi: string;
  dateEn: string;
}

const reviews: Review[] = [
  {
    nameHi: "राजेश शर्मा",
    nameEn: "Rajesh Sharma",
    locationHi: "वसंत विहार",
    locationEn: "Vasant Vihar",
    projectHi: "फुल मॉड्यूलर किचन & 3 वॉर्डरोब",
    projectEn: "Full Modular Kitchen & 3 Wardrobes",
    reviewHi: "घनश्याम जी ने हमारे फ्लैट का पूरा वुडवर्क किया। सेंचुरी मरीन प्लाई और हेफ़ेले चैनल लगाकर बहुत किफायती बजट में काम पूरा कर दिया। 30 साल का अनुभव काम की फिनिशिंग में साफ दिखता है।",
    reviewEn: "Ghanshyam Sharma completed the woodwork for our entire flat. Top quality Century marine ply and Hafele fittings with significant cost savings. Master craftsmanship in every detail.",
    rating: 5,
    dateHi: "15 दिन पहले",
    dateEn: "15 days ago"
  },
  {
    nameHi: "अमित वर्मा",
    nameEn: "Amit Verma",
    locationHi: "सेक्टर 56",
    locationEn: "Sector 56",
    projectHi: "सागवान का नक्काशीदार मंदिर",
    projectEn: "Handcrafted Solid Teak Mandir",
    reviewHi: "मंदिर की नक्काशी और फिनिशिंग देखकर पूरा परिवार गदगद हो गया। दीया रखने की ट्रे और लाइटिंग की फिटिंग बहुत बारीकी से की है। शुद्ध सागवान का ऐसा काम आज के समय में बहुत दुर्लभ है।",
    reviewEn: "The handcrafted teak temple was carved to perfection. The jali woodwork and focus lighting arrangement are divine. Rare master craftsmanship in today's times.",
    rating: 5,
    dateHi: "1 महीना पहले",
    dateEn: "1 month ago"
  },
  {
    nameHi: "पूजा मल्होत्रा",
    nameEn: "Pooja Malhotra",
    locationHi: "सिविल लाइंस",
    locationEn: "Civil Lines",
    projectHi: "हाइड्रोलिक बेड & डाइनिंग टेबल पॉलिश",
    projectEn: "Hydraulic Bed & Vintage Table Polish",
    reviewHi: "हमारा 20 साल पुराना डाइनिंग सेट इटैलियन PU पॉलिश से बिल्कुल नया जैसा चमक उठा। और हाइड्रोलिक बेड इतना स्मूथ है कि एक उंगली से उठ जाता है। बहुत ईमानदार और समय के पाबंद कारीगर हैं।",
    reviewEn: "Restored our 20-year old vintage dining table with Italian PU polish to absolute perfection. The hydraulic bed lifts effortlessly. Highly recommended craftsman!",
    rating: 5,
    dateHi: "2 महीने पहले",
    dateEn: "2 months ago"
  }
];

export const Testimonials: React.FC = () => {
  const { language } = useWork();
  const isHindi = language === 'hi';

  return (
    <section className="py-16 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{isHindi ? 'सच्चे ग्राहकों की राय' : 'Client Testimonials'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {isHindi ? 'हमारे काम की पहचान हमारे ग्राहक हैं' : 'Trusted by Homeowners Across Generations'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-stone-950 p-6 rounded-2xl border border-stone-800 flex flex-col justify-between shadow-lg relative"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-1">5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "{isHindi ? rev.reviewHi : rev.reviewEn}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-900 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{isHindi ? rev.nameHi : rev.nameEn}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {isHindi ? rev.locationHi : rev.locationEn} • {isHindi ? rev.projectHi : rev.projectEn}
                  </div>
                </div>
                <div className="text-[10px] text-stone-500">
                  {isHindi ? rev.dateHi : rev.dateEn}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
