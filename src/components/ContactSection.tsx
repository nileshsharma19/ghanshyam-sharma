'use client';

import React, { useState } from 'react';
import { useWork } from '@/context/WorkContext';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { config, language } = useWork();
  const isHindi = language === 'hi';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    workType: 'kitchen',
    note: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const workTypeOptions: Record<string, { hi: string; en: string }> = {
    kitchen: { hi: 'मॉड्यूलर किचन', en: 'Modular Kitchen' },
    wardrobe: { hi: 'अलमारी & वॉर्डरोब', en: 'Wardrobes & Closets' },
    mandir: { hi: 'नक्काशीदार लकड़ी का मंदिर', en: 'Wooden Mandir / Temple' },
    bed: { hi: 'डबल बेड & स्टोरेज', en: 'Bed & Hydraulic Storage' },
    doors: { hi: 'दरवाजे & चौखट', en: 'Doors & Frames' },
    polish: { hi: 'फर्नीचर मरम्मत व पॉलिश', en: 'Furniture Repair & PU Polish' },
    full: { hi: 'पूरे घर का इंटीरियर वुडवर्क', en: 'Complete Home Wood Interiors' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const selectedLabel = workTypeOptions[formData.workType]?.[isHindi ? 'hi' : 'en'] || formData.workType;

    const message = isHindi
      ? `*नई साइट विजिट व नाप की पूछताछ:*\n\n` +
        `👤 *नाम:* ${formData.name}\n` +
        `📞 *मोबाइल:* ${formData.phone}\n` +
        `📍 *क्षेत्र/लोकेशन:* ${formData.area || 'उल्लेखित नहीं'}\n` +
        `🔨 *काम का प्रकार:* ${selectedLabel}\n` +
        `📝 *विवरण:* ${formData.note || 'कोई विवरण नहीं'}\n\n` +
        `कृपया फ्री साइट नाप और एस्टीमेट के लिए संपर्क करें।`
      : `*New Site Visit & Measurement Inquiry:*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📍 *Location/Area:* ${formData.area || 'Not specified'}\n` +
        `🔨 *Project Type:* ${selectedLabel}\n` +
        `📝 *Notes:* ${formData.note || 'None'}\n\n` +
        `Please contact for free on-site measurement and estimate.`;

    const waUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setIsSubmitted(true);
  };

  const serviceAreasDisplay = isHindi 
    ? (config.serviceAreasHindi ? config.serviceAreasHindi.join(', ') : config.serviceAreas.join(', '))
    : config.serviceAreas.join(', ');

  return (
    <section id="contact" className="py-16 lg:py-24 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHindi ? 'सीधा संपर्क' : 'Direct Contact'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {isHindi ? 'फ्री साइट विजिट और नाप के लिए बात करें' : 'Get Free Site Inspection & Measurement'}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
            {isHindi 
              ? 'हमें फोन करें या नीचे फॉर्म भरें, हम आपके घर आकर बिना किसी शुल्क के पूरा नाप और सही सलाह देंगे।' 
              : 'Call directly or submit your details. Ghanshyam Sharma will inspect your site and provide free consultation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Call Card */}
            <div className="bg-gradient-to-br from-amber-950 to-stone-900 border border-amber-800/60 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-stone-950 flex items-center justify-center font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-amber-300 font-semibold uppercase">
                    {isHindi ? 'सीधा फोन करें' : 'Call Directly'}
                  </div>
                  <a
                    href={`tel:${config.phone}`}
                    className="text-xl sm:text-2xl font-black text-white hover:text-amber-400 transition"
                  >
                    {config.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${config.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isHindi ? 'अभी कॉल मिलाएं' : 'Dial Number Now'}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase">
                    WhatsApp Chat
                  </div>
                  <div className="text-base font-bold text-white">
                    {isHindi ? 'फोटो भेजकर रेट पूछें' : 'Send Photo for Instant Quote'}
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  isHindi
                    ? 'नमस्ते घनश्याम शर्मा जी! मुझे फर्नीचर/वुडवर्क के लिए बात करनी है। क्या आप फ्री साइट विजिट कर सकते हैं?'
                    : 'Hello Ghanshyam Sharma! I would like to schedule a site measurement visit.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isHindi ? 'व्हाट्सएप चैट शुरू करें' : 'Open WhatsApp Chat'}</span>
              </a>
            </div>

            {/* Working Hours & Service Areas */}
            <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{isHindi ? 'काम के घंटे' : 'Working Hours'}</div>
                  <div>
                    {isHindi 
                      ? '8:30 AM - 8:30 PM (सोमवार से रविवार - सातों दिन)' 
                      : '8:30 AM - 8:30 PM (Monday to Sunday - All 7 Days)'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-stone-800">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{isHindi ? 'सर्विस एरिया' : 'Service Areas'}</div>
                  <div>{serviceAreasDisplay}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-1">
              {isHindi ? 'फ्री साइट विजिट व नाप बुक करें' : 'Book Free Site Measurement'}
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              {isHindi 
                ? 'फॉर्म भरें, घनश्याम जी खुद आपको फोन करके साइट विजिट का समय निश्चित करेंगे।' 
                : 'Submit details below. Ghanshyam Sharma will call back to confirm site visit timing.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {isHindi ? 'आपका नाम *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isHindi ? 'जैसे: राहुल शर्मा' : 'e.g. Rahul Sharma'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {isHindi ? 'मोबाइल नंबर *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isHindi ? 'जैसे: 9876543210' : 'e.g. 9876543210'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {isHindi ? 'आपका इलाका / पता' : 'Your City / Locality'}
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder={isHindi ? 'जैसे: सेक्टर 14, मॉडल टाउन' : 'e.g. Sector 14, Model Town'}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {isHindi ? 'किस काम के लिए बात करनी है?' : 'What kind of work is needed?'}
                </label>
                <select
                  value={formData.workType}
                  onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {Object.entries(workTypeOptions).map(([key, label]) => (
                    <option key={key} value={key}>
                      {isHindi ? label.hi : label.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {isHindi ? 'कोई अतिरिक्त विवरण (वैकल्पिक)' : 'Additional Notes (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder={isHindi ? 'जैसे: फ्लैट का साइज, नया फर्नीचर आदि...' : 'e.g. Scope of work, flat dimensions...'}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm sm:text-base shadow-lg transition active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{isHindi ? 'फ्री विजिट बुक करें (WhatsApp)' : 'Submit & Connect on WhatsApp'}</span>
              </button>

              {isSubmitted && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isHindi 
                      ? 'धन्यवाद! आपकी रिक्वेस्ट WhatsApp पर भेज दी गई है।' 
                      : 'Thank you! Your request was opened in WhatsApp.'}
                  </span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
