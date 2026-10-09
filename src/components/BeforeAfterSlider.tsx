'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useWork } from '@/context/WorkContext';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const { language } = useWork();
  const isHindi = language === 'hi';
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-16 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHindi ? 'फर्नीचर रेनोवेशन & पॉलिश' : 'Restoration & Italian PU Polish'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isHindi ? 'बिफोर & आफ्टर: पुराने फर्नीचर को नया जीवन' : 'Before & After: Pure Craftsmanship Transformation'}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            {isHindi 
              ? 'स्लाइडर को दाएं-बाएं हिलाकर देखें कि कैसे हम पुराने फर्नीचर को इटैलियन PU फिनिश से नया रूप देते हैं।' 
              : 'Slide back and forth to see how 30 years of polish & woodwork expertise transforms worn furniture.'}
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700 aspect-[16/9] sm:aspect-[21/9] max-h-[460px] select-none">
          
          {/* AFTER Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
              alt="After Restoration"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-emerald-600/90 text-white font-extrabold text-xs sm:text-sm px-3 py-1 rounded-lg backdrop-blur-md shadow">
              {isHindi ? 'नया रूप (AFTER)' : 'AFTER (Restored Luxury)'}
            </div>
          </div>

          {/* BEFORE Image */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-full h-full min-w-[300px]" style={{ width: '100%', minWidth: '100%' }}>
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80"
                  alt="Before Restoration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-red-600/90 text-white font-extrabold text-xs sm:text-sm px-3 py-1 rounded-lg backdrop-blur-md shadow">
              {isHindi ? 'पुराना रूप (BEFORE)' : 'BEFORE (Worn & Scratched)'}
            </div>
          </div>

          {/* Divider Bar */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg border-2 border-white">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            aria-label="Before and after slider"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </div>

        <div className="text-center mt-3 text-xs text-stone-400 flex items-center justify-center gap-1.5">
          <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
          <span>{isHindi ? 'फोटो पर उंगली फिराकर अंतर देखें' : 'Drag the slider across the image to see difference'}</span>
        </div>

      </div>
    </section>
  );
};
