'use client';

import React, { useState } from 'react';
import { useWork } from '@/context/WorkContext';
import { Calculator, MessageSquare, Check, Info } from 'lucide-react';

export const CostCalculator: React.FC = () => {
  const { config, language } = useWork();
  const isHindi = language === 'hi';

  const [projectType, setProjectType] = useState<'kitchen' | 'wardrobe' | 'bed' | 'mandir' | 'full'>('kitchen');
  const [materialGrade, setMaterialGrade] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [sizeOption, setSizeOption] = useState<number>(10);

  const getCalculation = () => {
    let ratePerUnit = 1200;
    let label = isHindi ? 'रनिंग फीट' : 'Running Feet';
    let minDays = 7;
    let maxDays = 12;

    switch (projectType) {
      case 'kitchen':
        label = isHindi ? 'किचन साइज (रनिंग फीट)' : 'Kitchen Length (Running Feet)';
        ratePerUnit = materialGrade === 'standard' ? 1400 : materialGrade === 'premium' ? 1900 : 2600;
        minDays = 8;
        maxDays = 15;
        break;
      case 'wardrobe':
        label = isHindi ? 'अलमारी चौड़ाई (फीट)' : 'Wardrobe Width (Feet)';
        ratePerUnit = materialGrade === 'standard' ? 1300 : materialGrade === 'premium' ? 1750 : 2400;
        minDays = 6;
        maxDays = 12;
        break;
      case 'bed':
        label = isHindi ? 'बेड्स की संख्या' : 'Number of Beds';
        ratePerUnit = materialGrade === 'standard' ? 18000 : materialGrade === 'premium' ? 26000 : 38000;
        minDays = 4;
        maxDays = 8;
        break;
      case 'mandir':
        label = isHindi ? 'मंदिर की चौड़ाई (फीट)' : 'Mandir Width (Feet)';
        ratePerUnit = materialGrade === 'standard' ? 6000 : materialGrade === 'premium' ? 12000 : 22000;
        minDays = 5;
        maxDays = 10;
        break;
      case 'full':
        label = isHindi ? 'कमरों की संख्या' : 'Number of Rooms';
        ratePerUnit = materialGrade === 'standard' ? 65000 : materialGrade === 'premium' ? 115000 : 185000;
        minDays = 20;
        maxDays = 35;
        break;
    }

    const estimatedTotal = ratePerUnit * sizeOption;
    const minRange = Math.round(estimatedTotal * 0.9);
    const maxRange = Math.round(estimatedTotal * 1.15);

    return { minRange, maxRange, minDays, maxDays, label };
  };

  const { minRange, maxRange, minDays, maxDays, label } = getCalculation();

  const getProjectName = () => {
    switch (projectType) {
      case 'kitchen': return isHindi ? 'मॉड्यूलर किचन' : 'Modular Kitchen';
      case 'wardrobe': return isHindi ? 'अलमारी & वॉर्डरोब' : 'Wardrobes & Closets';
      case 'bed': return isHindi ? 'हाइड्रोलिक बेड & स्टोरेज' : 'Hydraulic Bed & Storage';
      case 'mandir': return isHindi ? 'लकड़ी का नक्काशीदार मंदिर' : 'Handcrafted Wooden Temple';
      case 'full': return isHindi ? 'पूरे घर का इंटीरियर वुडवर्क' : 'Complete Home Woodwork';
    }
  };

  const getMaterialName = () => {
    switch (materialGrade) {
      case 'standard': return isHindi ? 'स्टैंडर्ड प्लाई + लैमिनेट' : 'Standard Commercial Ply + Laminate';
      case 'premium': return isHindi ? 'मरीन BWP प्लाई + ऐक्रेलिक / हेफ़ेले' : 'BWP Marine Ply + Acrylic & Soft-Close';
      case 'luxury': return isHindi ? '100% शुद्ध सागवान / इटैलियन PU' : '100% Solid Teak Wood / Italian PU';
    }
  };

  return (
    <section id="calculator" className="py-16 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHindi ? 'ऑनलाइन खर्च अनुमान' : 'Instant Cost Calculator'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {isHindi ? 'अपने काम का अनुमानित बजट जानें' : 'Calculate Your Furniture Budget'}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
            {isHindi 
              ? 'काम का प्रकार और सामग्री चुनें, तुरंत अंदाज़ा पाएं। पक्का नाप हम आपके घर आकर फ्री में करेंगे।' 
              : 'Select your project and material preference to get an instant cost and timeline estimate.'}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Input Controls */}
            <div className="space-y-6">
              
              {/* Step 1: Project Type */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  1. {isHindi ? 'काम का प्रकार चुनें' : 'Select Project Type'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'kitchen', labelHi: '🍳 किचन', labelEn: 'Kitchen' },
                    { id: 'wardrobe', labelHi: '🚪 अलमारी', labelEn: 'Wardrobe' },
                    { id: 'bed', labelHi: '🛏️ बेड', labelEn: 'Bed' },
                    { id: 'mandir', labelHi: '🛕 मंदिर', labelEn: 'Temple' },
                    { id: 'full', labelHi: '🏠 पूरा घर', labelEn: 'Full Home' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setProjectType(item.id as any);
                        if (item.id === 'bed') setSizeOption(1);
                        else if (item.id === 'full') setSizeOption(2);
                        else setSizeOption(10);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left flex items-center justify-between ${
                        projectType === item.id
                          ? 'bg-amber-600 text-stone-950 border-amber-500 shadow'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <span>{isHindi ? item.labelHi : item.labelEn}</span>
                      {projectType === item.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Material Grade */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  2. {isHindi ? 'मटेरियल ग्रेड चुनें' : 'Select Material Grade'}
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'standard',
                      titleHi: 'स्टैंडर्ड (कमर्शियल प्लाई + लैमिनेट)',
                      titleEn: 'Standard (Commercial Ply + Laminate)',
                      descHi: 'किफायती और मजबूत बजट विकल्प',
                      descEn: 'Cost effective durable option'
                    },
                    {
                      id: 'premium',
                      titleHi: 'प्रीमियम (वाटरप्रूफ मरीन BWP प्लाई + ऐक्रेलिक)',
                      titleEn: 'Premium (Waterproof BWP Marine + Acrylic)',
                      descHi: 'सबसे लोकप्रिय, पानी व सीलन से सुरक्षित (10 साल+)',
                      descEn: 'Most popular, termite & moisture proof'
                    },
                    {
                      id: 'luxury',
                      titleHi: 'लग्जरी (100% शुद्ध सागवान / इटैलियन PU पॉलिश)',
                      titleEn: 'Luxury (Pure Teak / Sagwan + Italian PU)',
                      descHi: 'सर्वोच्च लाइफटाइम क्वालिटी और राजसी चमक',
                      descEn: 'Lifetime heirloom solid wood'
                    }
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setMaterialGrade(mat.id as any)}
                      className={`w-full p-3 rounded-xl text-left border transition flex items-start justify-between ${
                        materialGrade === mat.id
                          ? 'bg-amber-950/70 border-amber-500/80 text-amber-100'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-stone-200">
                          {isHindi ? mat.titleHi : mat.titleEn}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          {isHindi ? mat.descHi : mat.descEn}
                        </div>
                      </div>
                      {materialGrade === mat.id && (
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 ml-2 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Size Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    3. {label}
                  </label>
                  <span className="text-sm font-extrabold text-white bg-stone-950 px-2.5 py-0.5 rounded border border-stone-800">
                    {sizeOption} {projectType === 'bed' ? (isHindi ? 'बेड' : 'Beds') : projectType === 'full' ? (isHindi ? 'कमरे' : 'Rooms') : (isHindi ? 'फीट' : 'Ft.')}
                  </span>
                </div>
                <input
                  type="range"
                  min={projectType === 'bed' ? 1 : projectType === 'full' ? 1 : 6}
                  max={projectType === 'bed' ? 4 : projectType === 'full' ? 5 : 35}
                  value={sizeOption}
                  onChange={(e) => setSizeOption(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

            </div>

            {/* Result Preview Box */}
            <div className="flex flex-col justify-between bg-stone-950 border border-stone-800 rounded-2xl p-6 text-center">
              
              <div className="space-y-4">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  {isHindi ? 'अनुमानित बजट' : 'Estimated Price Range'}
                </div>

                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">
                  ₹{minRange.toLocaleString('en-IN')} - ₹{maxRange.toLocaleString('en-IN')}*
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs">
                  <span>⏳ {isHindi ? 'अनुमानित समय:' : 'Estimated Timeline:'}</span>
                  <strong className="text-amber-400">{minDays} - {maxDays} {isHindi ? 'दिन' : 'Days'}</strong>
                </div>

                {/* Summary Details */}
                <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800 text-left text-xs space-y-1.5 text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-400">{isHindi ? 'प्रोजेक्ट:' : 'Project:'}</span>
                    <span className="font-semibold">{getProjectName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">{isHindi ? 'सामग्री:' : 'Material:'}</span>
                    <span className="font-semibold text-right">{getMaterialName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">{isHindi ? 'नाप/साइज:' : 'Size:'}</span>
                    <span className="font-semibold">{sizeOption} {projectType === 'bed' ? (isHindi ? 'बेड' : 'Units') : projectType === 'full' ? (isHindi ? 'कमरे' : 'Rooms') : (isHindi ? 'फीट' : 'Ft.')}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-stone-400 text-left">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {isHindi 
                      ? '*यह एक प्रारंभिक अनुमान है। वास्तविक खर्च साइट की नाप और फिटिंग्स पर निर्भर करता है।' 
                      : '*Tentative estimate based on standard specs. Final quotation provided after free on-site measurement.'}
                  </span>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="mt-6 pt-4 border-t border-stone-800">
                <a
                  href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                    isHindi
                      ? `नमस्ते घनश्याम शर्मा जी! मैंने आपकी वेबसाइट पर बजट का अनुमान लगाया है:\n- प्रोजेक्ट: ${getProjectName()}\n- सामग्री: ${getMaterialName()}\n- साइज: ${sizeOption}\n- अनुमानित बजट: ₹${minRange.toLocaleString('en-IN')} - ₹${maxRange.toLocaleString('en-IN')}\n\nकृपया फ्री साइट विजिट और पक्के नाप के लिए समय बताएं।`
                      : `Hello Ghanshyam Sharma! I calculated a project estimate on your website:\n- Project: ${getProjectName()}\n- Material: ${getMaterialName()}\n- Scope: ${sizeOption}\n- Estimated Budget: ₹${minRange.toLocaleString('en-IN')} - ₹${maxRange.toLocaleString('en-IN')}\n\nPlease schedule a free on-site measurement and exact quotation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg transition active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{isHindi ? 'यह एस्टीमेट WhatsApp पर भेजें' : 'Send Estimate on WhatsApp'}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
