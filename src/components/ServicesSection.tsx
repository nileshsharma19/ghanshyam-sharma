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

interface ServiceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  imageUrl: string;
  featuresEn: string[];
  featuresHi: string[];
  materialsEn: string;
  materialsHi: string;
}

const servicesList: ServiceItem[] = [
  {
    id: 'kitchen',
    titleEn: 'Modular Kitchen Design & Installation',
    titleHi: 'मॉड्यूलर किचन डिजाइन और फिटिंग',
    descEn: 'L-shape, U-shape, and parallel modern modular kitchens customized exactly to your space.',
    descHi: 'वाटरप्रूफ मरीन प्लाई, एंटी-स्क्रैच ऐक्रेलिक शटर और सॉफ्ट-क्लोज हाइड्रोलिक फिटिंग्स के साथ टिकाऊ किचन।',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    featuresEn: ['Soft-close hydraulic drawers', 'Water & Termite proof BWP ply', 'Cutlery & bottle pull-outs', 'Pest-sealed skirting'],
    featuresHi: ['सॉफ्ट-क्लोज हाइड्रोलिक ड्रायर्स', 'दीमक और पानी से 100% सुरक्षित', 'कटलरी व बोतल पुल-आउट्स', 'चिमनी और सिंक परफेक्ट फिटिंग'],
    materialsEn: 'Marine BWP Ply, Acrylic, Hettich/Hafele hardware',
    materialsHi: 'सेंचुरी/ग्रीन मरीन प्लाई, हाई ग्लॉस ऐक्रेलिक, हेफ़ेले फिटिंग्स'
  },
  {
    id: 'wardrobe',
    titleEn: 'Sliding & Hinged Wardrobes (Almirah)',
    titleHi: 'स्लाइडिंग और हिंज अलमारी (वॉर्डरोब)',
    descEn: 'Floor-to-ceiling space-saving sliding wardrobes with modern tinted glass and internal organizers.',
    descHi: 'छत तक पूरी ऊंचाई की अलमारी, अंदर छिपी तिजोरी, शू-रैक, और प्रोफाइल लाइट के साथ प्रीमियम लुक।',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    featuresEn: ['Heavy aluminum sliding tracks', 'Concealed LED sensor lights', 'Custom locker & jewelry drawers', 'Mirror & laminate combos'],
    featuresHi: ['स्मूथ 3-ट्रैक स्लाइडिंग चैनल', 'सेंसर वाली अलमारी लाइट', 'लॉकर व ड्रॉअर सुरक्षा लॉक', 'लग्जरी लैमिनेट फिनिश'],
    materialsEn: 'HDHMR / Plywood, Merino/Century laminate, Tinted glass',
    materialsHi: 'एचडीएचएमआर प्लाईवुड, डिजाइनर लैमिनेट, ब्रॉन्ज ग्लास'
  },
  {
    id: 'mandir',
    titleEn: 'Handcrafted Wooden Temples (Mandir)',
    titleHi: 'भव्य नक्काशीदार लकड़ी का मंदिर',
    descEn: 'Custom wooden home temples crafted with traditional vastu principles and sacred jali carvings.',
    descHi: 'शुद्ध सागवान या शीशम की लकड़ी से वास्तु अनुसार तैयार किए जाने वाले सुंदर नक्काशीदार मंदिर।',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    featuresEn: ['Solid Teak / Sheesham wood', 'Pull-out Diya / Prasad tray', 'Bell fittings & warm lighting', 'Vastu compliant dimensions'],
    featuresHi: ['100% असली सागवान या शीशम', 'दीया और प्रसाद के लिए पुल-आउट ट्रे', 'घंटी और फोकस लाइट व्यवस्था', 'वास्तु अनुसार शुभ नाप'],
    materialsEn: 'Pure CP Teak (Sagwan) Wood, Brass accessories',
    materialsHi: 'शुद्ध सागवान की लकड़ी, पीतल की घंटियां और फिटिंग्स'
  },
  {
    id: 'bed',
    titleEn: 'Beds & Hydraulic Storage Solutions',
    titleHi: 'डबल बेड और हाइड्रोलिक स्टोरेज फर्नीचर',
    descEn: 'Heavy solid frame beds engineered never to creak, equipped with easy-lift gas pumps.',
    descHi: 'बिना किसी आवाज के मजबूत डबल बेड, आसानी से उठने वाले हाइड्रोलिक स्टोरेज और कुशन हेडबोर्ड।',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    featuresEn: ['Heavy duty gas spring pumps', 'No squeaking solid internal frame', 'Cushioned fabric headboard', 'Matching side tables'],
    featuresHi: ['जर्मन हाइड्रोलिक गैस लिफ्ट पंप', 'मजबूत शीशम/प्लाई इंटरनल स्ट्रक्चर', 'शानदार कुशन हेडबोर्ड', 'मैचिंग साइड टेबल'],
    materialsEn: 'Commercial/BWP Ply, Solid Wood support, Premium Fabric',
    materialsHi: 'हैवी प्लाईवुड, मजबूत लकड़ी की बीम, वॉशेबल फैब्रिक'
  },
  {
    id: 'doors',
    titleEn: 'Solid Wood Doors, Frames & Chaukhat',
    titleHi: 'मजबूत दरवाजे, खिड़कियां और चौखट',
    descEn: 'Grand entrance doors carved from seasoned timber, engineered against warping and seasonal expansion.',
    descHi: 'घर का मुख्य द्वार जो सालों-साल मजबूती और शान बनाए रखे। सीजन्ड सागवान की चौखट और दरवाजे।',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    featuresEn: ['Zero warping seasoned wood', 'Mortise & tenon joinery', 'Digital lock compatible', 'Sound insulating design'],
    featuresHi: ['दीमक रहित सीजन्ड लकड़ी', 'मजबूत परंपरागत कारीगरी जोड़', 'डिजिटल लॉक और हैंडल फिटिंग', 'आकर्षक नक्काशी विकल्प'],
    materialsEn: 'Burma Teak, Sagwan, Red Meranti, Waterproof Ply',
    materialsHi: 'बर्मा सागवान, रेड मिरांटी, वाटरप्रूफ फ्लश डोर'
  },
  {
    id: 'polish',
    titleEn: 'Furniture Renovation, Repair & Italian PU Polish',
    titleHi: 'फर्नीचर मरम्मत और इटैलियन PU पॉलिश',
    descEn: 'Transform your cherished old furniture into brand new luxury finish with high-grade polish.',
    descHi: 'पुराने फर्नीचर को फेंकें नहीं! इटैलियन PU पॉलिश, मेलामाइन या डीको से एकदम नया चमकदार लुक दें।',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    featuresEn: ['Scratch-resistant PU finish', 'Color staining & grain enhancement', 'Loose joint tightening', 'Door realignment & lock repairs'],
    featuresHi: ['स्क्रैच-प्रूफ PU पॉलिश', 'असली लकड़ी के दाने (Grains) निखारना', 'ढीले जोड़ों की पक्की रिपेयर', 'चैनल व कब्जों का नया रिप्लेसमेंट'],
    materialsEn: 'Italian PU, Sirca, Asian Paints Woodtech, Melamine',
    materialsHi: 'इटैलियन सिरका PU, एशियन पेंट्स वुडटेक, मेलामाइन'
  }
];

export const ServicesSection: React.FC = () => {
  const { config, language } = useWork();
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
          {servicesList.map((service) => (
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
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
