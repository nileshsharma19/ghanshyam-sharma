'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWork } from '@/context/WorkContext';
import { WorkItem, categoryLabels } from '@/data/initialData';
import { 
  Play, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Calendar, 
  MapPin, 
  Tag, 
  MessageSquare, 
  X, 
  PlusCircle, 
  Sparkles,
} from 'lucide-react';

interface DailyWorkFeedProps {
  limit?: number;
  showFilters?: boolean;
}

export const DailyWorkFeed: React.FC<DailyWorkFeedProps> = ({ 
  limit, 
  showFilters = true 
}) => {
  const { workItems, config, language } = useWork();
  const isHindi = language === 'hi';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeMediaType, setActiveMediaType] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);

  // Restore category and media filter from URL on mount
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category') || params.get('cat');
        const media = params.get('media') || params.get('type');
        if (cat) {
          setActiveCategory(cat);
        }
        if (media && ['all', 'photo', 'video'].includes(media)) {
          setActiveMediaType(media as any);
        }
      }
    } catch (e) {}
  }, []);

  const handleCategorySelect = (catKey: string) => {
    setActiveCategory(catKey);
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (catKey === 'all') {
          url.searchParams.delete('category');
          url.searchParams.delete('cat');
        } else {
          url.searchParams.set('category', catKey);
        }
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    } catch (e) {}
  };

  const handleMediaTypeSelect = (type: 'all' | 'photo' | 'video') => {
    setActiveMediaType(type);
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (type === 'all') {
          url.searchParams.delete('media');
          url.searchParams.delete('type');
        } else {
          url.searchParams.set('media', type);
        }
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    } catch (e) {}
  };

  // Filter items
  const filteredItems = workItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesType = activeMediaType === 'all' || item.type === activeMediaType;
    return matchesCategory && matchesType;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const getItemTitle = (item: WorkItem) => {
    return isHindi ? (item.titleHindi || item.title) : (item.titleEn || item.title);
  };

  const getItemDesc = (item: WorkItem) => {
    return isHindi ? (item.descriptionHindi || item.description) : (item.descriptionEn || item.description);
  };

  const getItemWood = (item: WorkItem) => {
    return isHindi ? (item.woodTypeHindi || item.woodType) : (item.woodTypeEn || item.woodType);
  };

  const getItemLocation = (item: WorkItem) => {
    return isHindi ? (item.locationHindi || item.location) : (item.locationEn || item.location);
  };

  return (
    <section id="feed" className="py-14 lg:py-20 bg-stone-950 text-stone-100">
      <div className="container mx-auto px-4">
        
        {/* Header with Title and "Post Work" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? 'दैनिक काम की अपडेट्स (फोटो & वीडियो)' : 'Daily Work Showcase (Photos & Videos)'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              {isHindi ? 'साइट और वर्कशॉप से ताज़ा काम' : 'Recent Work from Site & Workshop'}
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              {isHindi 
                ? 'हमारे द्वारा हाल ही में तैयार किए गए असली प्रोजेक्ट्स, फिनिशिंग और लाइव वीडियो देखें।' 
                : 'Browse our latest bespoke creations, authentic on-site photos and live workshop clips.'}
            </p>
          </div>

          {/* View All link for Homepage */}
          {limit && workItems.length > limit && (
            <div className="flex items-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition"
              >
                <span>{isHindi ? `सभी देखें (${workItems.length})` : `View All (${workItems.length})`}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Filters Bar */}
        {showFilters && (
          <div className="space-y-3 mb-8">
            {/* Media Type Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMediaTypeSelect('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMediaType === 'all'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span>{isHindi ? 'सभी (फोटो & वीडियो)' : 'All Media'}</span>
              </button>

              <button
                onClick={() => handleMediaTypeSelect('photo')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMediaType === 'photo'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{isHindi ? '📸 केवल फोटो' : '📸 Photos Only'}</span>
              </button>

              <button
                onClick={() => handleMediaTypeSelect('video')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMediaType === 'video'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <VideoIcon className="w-3.5 h-3.5" />
                <span>{isHindi ? '🎥 केवल वीडियो' : '🎥 Videos Only'}</span>
              </button>
            </div>

            {/* Category Chips with Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              {Object.entries(categoryLabels).map(([catKey, label]) => {
                const isActive = activeCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => handleCategorySelect(catKey)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full border transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-stone-100 text-stone-950 border-white font-bold shadow'
                        : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <span>{label.icon}</span>
                    <span>{isHindi ? label.hi : label.en}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {displayItems.length === 0 && (
          <div className="text-center py-16 bg-stone-950 rounded-2xl border border-stone-800 p-8">
            <ImageIcon className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-300">
              {isHindi ? 'इस कैटेगरी में अभी कोई काम उपलब्ध नहीं है।' : 'No projects found in this category.'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {isHindi ? 'कृपया अन्य श्रेणी का चयन करें या सभी काम देखें।' : 'Please select another category or view all projects.'}
            </p>
          </div>
        )}

        {/* Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayItems.map((item) => {
            const titleText = getItemTitle(item);
            const descText = getItemDesc(item);
            const woodText = getItemWood(item);
            const locText = getItemLocation(item);

            return (
              <div
                key={item.id}
                className="bg-stone-950 rounded-2xl overflow-hidden border border-stone-800/90 shadow-lg hover:border-amber-600/50 transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Media Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full">
                      {item.thumbnailUrl ? (
                        <Image
                          src={item.thumbnailUrl}
                          alt={titleText}
                          fill
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                        />
                      ) : (
                        <video
                          src={item.mediaUrl}
                          className="w-full h-full object-cover"
                          preload="none"
                          muted
                          playsInline
                        />
                      )}

                      <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>

                      {item.videoDuration && (
                        <div className="absolute bottom-3 right-3 bg-stone-950/80 px-2 py-0.5 rounded text-[11px] font-mono text-stone-200">
                          {item.videoDuration}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.mediaUrl}
                        alt={titleText}
                        fill
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-stone-900/90 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-stone-700/60 flex items-center gap-1">
                      {item.type === 'video' ? <VideoIcon className="w-3 h-3 text-amber-400" /> : <ImageIcon className="w-3 h-3 text-amber-400" />}
                      <span>{categoryLabels[item.category]?.[isHindi ? 'hi' : 'en'] || item.category}</span>
                    </span>

                    {item.beforeAfter && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold">
                        {isHindi ? 'पहले और बाद का रूप' : 'Before & After'}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-sm text-stone-300 text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-100 text-sm sm:text-base group-hover:text-amber-400 transition-colors line-clamp-2">
                      {titleText}
                    </h3>

                    <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                      {descText}
                    </p>

                    {woodText && (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-300/90 bg-amber-950/40 p-1.5 rounded-lg border border-amber-900/40">
                        <Tag className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{woodText}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                    {locText && (
                      <span className="text-[11px] text-stone-400 flex items-center gap-1 truncate max-w-[50%]">
                        <MapPin className="w-3 h-3 text-stone-500 shrink-0" />
                        <span className="truncate">{locText}</span>
                      </span>
                    )}

                    <a
                      href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                        isHindi
                          ? `नमस्ते घनश्याम जी! मुझे आपके इस काम (${titleText}) जैसा काम करवाना है। क्या जानकारी मिल सकती है?`
                          : `Hello Ghanshyam Sharma! I am interested in this design: "${titleText}". Could you please share quotation and details?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-600/40 text-xs font-bold transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'यह डिजाइन चाहिए' : 'Enquire Design'}</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {limit && workItems.length > limit && (
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-lg transition"
            >
              <span>{isHindi ? `सभी ${workItems.length} फोटो और वीडियो देखें` : `View All ${workItems.length} Photos & Videos`}</span>
            </Link>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-950">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                  {categoryLabels[selectedItem.category]?.[isHindi ? 'hi' : 'en'] || selectedItem.category}
                </span>
                <span className="text-xs text-stone-400">{selectedItem.date}</span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Content */}
            <div className="relative bg-black flex items-center justify-center min-h-[250px] max-h-[60vh]">
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.mediaUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[60vh] object-contain"
                />
              ) : selectedItem.beforeAfter ? (
                <div className="grid grid-cols-2 gap-2 p-2 w-full">
                  <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-stone-800">
                    <Image
                      src={selectedItem.beforeAfter.beforeUrl}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      {isHindi ? 'पुराना रूप (BEFORE)' : 'BEFORE (Old)'}
                    </div>
                  </div>
                  <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-amber-600">
                    <Image
                      src={selectedItem.beforeAfter.afterUrl}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      {isHindi ? 'नया रूप (AFTER)' : 'AFTER (New)'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-72 sm:h-96">
                  <Image
                    src={selectedItem.mediaUrl}
                    alt={getItemTitle(selectedItem)}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Modal Description & Actions */}
            <div className="p-4 sm:p-5 space-y-3 bg-stone-900 overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {getItemTitle(selectedItem)}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {getItemDesc(selectedItem)}
              </p>

              {getItemWood(selectedItem) && (
                <div className="text-xs text-amber-300 bg-amber-950/50 p-2 rounded-lg border border-amber-900/50">
                  <span className="font-bold">{isHindi ? 'उपयोग की गई सामग्री / लकड़ी: ' : 'Wood & Material Used: '}</span>
                  {getItemWood(selectedItem)}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                    isHindi
                      ? `नमस्ते घनश्याम जी, मुझे आपके इस काम (${getItemTitle(selectedItem)}) के बारे में बातचीत करनी है और इसका एस्टीमेट जानना है।`
                      : `Hello Ghanshyam Sharma, I want to consult for this design: "${getItemTitle(selectedItem)}". Please share an estimate.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isHindi ? 'यह डिजाइन WhatsApp पर पूछें' : 'Enquire on WhatsApp'}</span>
                </a>

                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow transition"
                >
                  <span>{isHindi ? 'कॉल करें' : 'Call Now'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
