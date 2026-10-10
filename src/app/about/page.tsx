'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWork } from '@/context/WorkContext';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { Testimonials } from '@/components/Testimonials';
import { 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  Phone, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

import { initialBusinessConfig } from '@/data/initialData';

export default function AboutPage() {
  const { config, language } = useWork();
  const isHindi = language === 'hi';

  const milestones = config.milestones && config.milestones.length > 0 
    ? config.milestones 
    : (initialBusinessConfig.milestones || []);

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
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{config.experienceYears}+ {isHindi ? 'वर्षों का अनुभव' : 'Years Legacy'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {isHindi 
                  ? `${config.fatherNameHindi || config.fatherName} - मास्टर कारीगर की कहानी` 
                  : `${config.fatherName} — Master Craftsman Story`}
              </h1>
              <p className="text-stone-400 text-sm sm:text-base mt-2 leading-relaxed">
                {isHindi 
                  ? (config.taglineHindi || 'फर्नीचर सिर्फ लकड़ी नहीं, घर का सम्मान होता है। 30 सालों से शुद्ध लकड़ी, सच्ची नीयत और ईमानदारी से काम कर रहे हैं।')
                  : (config.taglineEnglish || 'Woodwork is not just timber; it is an heirloom that lives with your family. 30 years of honest, uncompromised craftsmanship.')}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow transition"
              >
                <Phone className="w-4 h-4" />
                <span>{isHindi ? 'सीधे कॉल करें' : 'Call Directly'}</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  isHindi 
                    ? 'नमस्ते घनश्याम जी! मुझे आपके अनुभव और काम के बारे में बातचीत करनी है।' 
                    : 'Hello Ghanshyam Sharma! I want to consult for a custom woodwork project.'
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

      {/* Story & Biography Section */}
      <section className="py-16 bg-stone-900 border-b border-stone-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-amber-800/50 shadow-2xl bg-stone-950">
                <Image
                  src={config.founderImageUrl || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"}
                  alt={`${config.fatherName} Master Woodworking`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                    {isHindi ? 'मास्टर कारीगर' : 'Master Craftsman'}
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {isHindi ? (config.fatherNameHindi || config.fatherName) : config.fatherName}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    {config.experienceYears}+ {isHindi ? 'वर्षों का अनुभव' : 'Years Experience'} • {config.completedProjects || 1500}+ {isHindi ? 'प्रोजेक्ट्स' : 'Projects Handed Over'}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Hammer className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHindi ? 'हमारा दर्शन' : 'Our Philosophy'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {isHindi 
                  ? (config.storyHeadingHi || 'बिचौलियों और ठेकेदारों को हटाएं, सीधे कारीगर से काम करवाएं')
                  : (config.storyHeadingEn || 'Eliminate Contractor Markups: Work Directly with the Master Craftsman')}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isHindi 
                  ? (config.storyDescHi || 'अक्सर इंटीरियर कंपनियां और बड़े ठेकेदार 30% से 40% तक का भारी कमीशन लेते हैं, जबकि काम अंततः बढ़ई ही करता है। जब आप सीधे घनश्याम शर्मा से काम करवाते हैं, तो आपका पूरा पैसा सिर्फ और सिर्फ असली मरीन प्लाई, शुद्ध सागवान लकड़ी और जर्मन हार्डवेयर में लगता है।')
                  : (config.storyDescEn || 'Interior agencies and contractors charge 30% to 40% extra commissions while delegating execution to local carpenters. By consulting directly with Ghanshyam Sharma, every rupee goes straight into authentic Century marine ply, seasoned teak, and genuine German fittings.')}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <div className="text-2xl font-black text-amber-400">{config.experienceYears}+</div>
                  <div className="text-xs text-stone-300 font-medium mt-0.5">
                    {isHindi ? 'वर्षों का अनुभव' : 'Years Experience'}
                  </div>
                </div>
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <div className="text-2xl font-black text-amber-400">{config.completedProjects || 1500}+</div>
                  <div className="text-xs text-stone-300 font-medium mt-0.5">
                    {isHindi ? 'सफल प्रोजेक्ट्स' : 'Homes Handed Over'}
                  </div>
                </div>
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <div className="text-2xl font-black text-emerald-400">0%</div>
                  <div className="text-xs text-stone-300 font-medium mt-0.5">
                    {isHindi ? 'कमीशन (सीधी बचत)' : 'Middleman Fee'}
                  </div>
                </div>
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <div className="text-2xl font-black text-amber-400">100%</div>
                  <div className="text-xs text-stone-300 font-medium mt-0.5">
                    {isHindi ? 'असली माल की गारंटी' : 'Genuine Materials'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 30 Years Timeline */}
      <section className="py-16 bg-stone-950 border-b border-stone-800">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? '30 वर्षों का सफर' : 'Our 30-Year Journey'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isHindi ? 'परंपरा से लेकर आधुनिक तकनीक तक का सफर' : 'From Traditional Chisels to Modern Modular Mastery'}
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div 
                key={idx}
                className="bg-stone-900 border border-stone-800 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-amber-600/40 transition"
              >
                <div className="w-16 h-16 rounded-xl bg-amber-600 text-stone-950 flex items-center justify-center font-black text-xl shrink-0 shadow">
                  {m.year}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    {isHindi ? m.titleHi : m.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                    {isHindi ? m.descHi : m.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Before After Slider */}
      <BeforeAfterSlider />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

    </div>
  );
}
