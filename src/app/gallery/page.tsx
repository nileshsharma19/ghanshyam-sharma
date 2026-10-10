'use client';

import React from 'react';
import Link from 'next/link';
import { useWork } from '@/context/WorkContext';
import { DailyWorkFeed } from '@/components/DailyWorkFeed';
import { Sparkles, ArrowLeft, MessageSquare } from 'lucide-react';

export default function GalleryPage() {
  const { workItems, config, language } = useWork();
  const isHindi = language === 'hi';

  const totalPhotos = workItems.filter(i => i.type === 'photo').length;
  const totalVideos = workItems.filter(i => i.type === 'video').length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800 py-10">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 mb-4 transition font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? 'मुख्य पेज पर वापस जाएं' : 'Back to Home'}</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHindi ? 'दैनिक काम का संग्रह' : 'Complete Daily Work Feed'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                {isHindi ? 'हमारे काम की फोटो व लाइव वीडियो' : 'All Work Photos & Videos'}
              </h1>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                {isHindi 
                  ? `कुल ${workItems.length} प्रोजेक्ट्स उपलब्ध (${totalPhotos} फोटो • ${totalVideos} वीडियो)` 
                  : `Total ${workItems.length} projects (${totalPhotos} photos • ${totalVideos} videos)`}
              </p>
            </div>

            <div>
              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  isHindi 
                    ? 'नमस्ते घनश्याम शर्मा जी! मैंने आपकी गैलरी में काम देखा, मुझे एक प्रोजेक्ट के लिए बातचीत करनी है।' 
                    : 'Hello Ghanshyam Sharma! I browsed your gallery work, I want to discuss a custom woodwork project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isHindi ? 'WhatsApp पर सलाह लें' : 'Consult on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Feed with all filter controls */}
      <DailyWorkFeed showFilters={true} />
    </div>
  );
}
