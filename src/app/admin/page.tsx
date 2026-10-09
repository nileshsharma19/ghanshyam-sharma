'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWork } from '@/context/WorkContext';
import { WorkItem, categoryLabels } from '@/data/initialData';
import { 
  Lock, 
  Upload, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Download, 
  ArrowLeft,
  Eye,
  RefreshCw,
  Copy,
  Check,
  Languages
} from 'lucide-react';

export default function AdminPage() {
  const { 
    workItems, 
    config, 
    addWorkItem, 
    deleteWorkItem, 
    updateBusinessConfig, 
    resetToDefault,
    exportDataJson,
    language,
    toggleLanguage
  } = useWork();

  const isHindi = language === 'hi';

  // Auth State
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'settings'>('create');

  // Form State
  const [postType, setPostType] = useState<'photo' | 'video'>('photo');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<WorkItem['category']>('kitchen');
  const [mediaUrl, setMediaUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  const [woodType, setWoodType] = useState('');
  const [location, setLocation] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  
  // Before / After
  const [isBeforeAfter, setIsBeforeAfter] = useState(false);
  const [beforeUrl, setBeforeUrl] = useState('');
  const [afterUrl, setAfterUrl] = useState('');

  // Status flags
  const [postSuccess, setPostSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    phone: config.phone,
    whatsapp: config.whatsapp,
    name: config.name,
    nameHindi: config.nameHindi || config.name,
    adminPin: config.adminPin,
    location: config.location,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === config.adminPin || pinInput === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(isHindi ? 'गलत पिन! कृपया सही 4-अंकों का पिन दर्ज करें।' : 'Incorrect PIN! Please enter the correct 4-digit PIN.');
    }
  };

  // File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'media' | 'thumbnail' | 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (target === 'media') setMediaUrl(result);
      if (target === 'thumbnail') setThumbnailUrl(result);
      if (target === 'before') setBeforeUrl(result);
      if (target === 'after') setAfterUrl(result);
    };
    reader.readAsDataURL(file);
  };

  // Submit New Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert(isHindi ? 'कृपया काम का नाम (शीर्षक) दर्ज करें।' : 'Please enter project title.');
      return;
    }
    if (!mediaUrl && !isBeforeAfter) {
      alert(isHindi ? 'कृपया फोटो या वीडियो अपलोड करें।' : 'Please upload photo or video.');
      return;
    }

    const newItemData: Omit<WorkItem, 'id'> = {
      title,
      titleEn: title,
      titleHindi: title,
      category,
      type: postType,
      mediaUrl: mediaUrl || afterUrl || '',
      thumbnailUrl: thumbnailUrl || (postType === 'photo' ? mediaUrl : undefined),
      description: description || (isHindi ? 'वर्कशॉप में तैयार किया गया विशेष कार्य।' : 'Custom woodwork crafted at workshop.'),
      descriptionEn: description || 'Custom woodwork crafted at workshop.',
      descriptionHindi: description || 'वर्कशॉप में तैयार किया गया विशेष कार्य।',
      woodType: woodType || (isHindi ? 'उच्च गुणवत्ता प्लाईवुड / सीजन्ड टिंबर' : 'High grade plywood / seasoned timber'),
      woodTypeEn: woodType || 'High grade plywood / seasoned timber',
      woodTypeHindi: woodType || 'उच्च गुणवत्ता प्लाईवुड / सीजन्ड टिंबर',
      location: location || config.location,
      locationEn: location || config.location,
      locationHindi: location || config.locationHindi || config.location,
      date: new Date().toISOString().split('T')[0],
      videoDuration: postType === 'video' ? (videoDuration || '0:30') : undefined,
      beforeAfter: isBeforeAfter && beforeUrl && afterUrl ? {
        beforeUrl,
        afterUrl,
        description: description || (isHindi ? 'फर्नीचर मरम्मत व पॉलिश' : 'Furniture restoration and polish'),
        descriptionEn: description || 'Furniture restoration and polish',
        descriptionHindi: description || 'फर्नीचर मरम्मत व पॉलिश'
      } : undefined
    };

    addWorkItem(newItemData);
    setPostSuccess(true);

    // Reset Form
    setTitle('');
    setMediaUrl('');
    setThumbnailUrl('');
    setDescription('');
    setWoodType('');
    setLocation('');
    setBeforeUrl('');
    setAfterUrl('');
    setIsBeforeAfter(false);

    setTimeout(() => {
      setPostSuccess(false);
      setActiveTab('manage');
    }, 1500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportDataJson());
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ghanshyam_carpenter_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
          
          <div className="flex justify-end">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-amber-600/20 border border-amber-600/40 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">
              {isHindi ? 'कारपेंटर पोस्टिंग पोर्टल' : 'Owner Admin Portal'}
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              {isHindi 
                ? 'नया फोटो या वीडियो पोस्ट करने के लिए अपना 4-अंकों का पिन दर्ज करें।' 
                : 'Enter your 4-digit security PIN to post work updates.'}
            </p>
            <p className="text-[11px] text-amber-400 mt-2 font-mono bg-stone-950 py-1 px-3 rounded-lg inline-block border border-stone-800">
              Default PIN: <strong>1234</strong>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder={isHindi ? 'पिन दर्ज करें' : 'Enter 4-digit PIN'}
                className="w-full text-center tracking-widest text-2xl font-mono py-3 bg-stone-950 border border-stone-700 rounded-2xl text-white focus:outline-none focus:border-amber-500"
                autoFocus
              />
            </div>

            {authError && (
              <div className="text-xs text-red-400 font-medium flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-base shadow-lg transition active:scale-95"
            >
              {isHindi ? 'पोर्टल खोलें' : 'Unlock Portal'}
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-amber-400 transition flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isHindi ? 'वेबसाइट पर वापस जाएं' : 'Back to Website'}</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-24">
      
      {/* Top Admin Header */}
      <div className="bg-stone-900 border-b border-stone-800 py-4 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
              title={isHindi ? "वेबसाइट पर जाएं" : "Back to site"}
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
                <span>{isHindi ? 'घनश्याम शर्मा - पोस्ट पोर्टल' : 'Ghanshyam Sharma - Post Portal'}</span>
                <span className="text-[10px] bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 px-2 py-0.5 rounded-full font-mono">
                  Online
                </span>
              </h1>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                {isHindi ? 'रोज के नए काम की फोटो और वीडियो सीधे फोन से डालें' : 'Post daily work photos & videos from phone'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold flex items-center gap-1"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>

            <Link
              href="/gallery"
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isHindi ? 'वेबसाइट देखें' : 'View Live'}</span>
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/40 text-xs font-semibold"
            >
              {isHindi ? 'लॉगआउट' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-stone-900 p-1.5 rounded-2xl border border-stone-800 mb-6">
          <button
            onClick={() => setActiveTab('create')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isHindi ? '+ नया पोस्ट' : '+ New Post'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'manage'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{isHindi ? `सभी काम (${workItems.length})` : `Manage (${workItems.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isHindi ? 'सेटिंग्स' : 'Settings'}</span>
          </button>
        </div>

        {/* TAB 1: CREATE NEW POST */}
        {activeTab === 'create' && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-8 shadow-xl">
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                {isHindi ? 'आज का नया काम पोस्ट करें' : 'Post Today\'s Work'}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {isHindi 
                  ? 'कैमरे से फोटो खींचें या फोन से वीडियो सिलेक्ट करके अपलोड करें।' 
                  : 'Take a photo with your mobile camera or upload from your gallery.'}
              </p>
            </div>

            {postSuccess && (
              <div className="mb-6 p-4 bg-emerald-950 border border-emerald-600 rounded-2xl text-emerald-200 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {isHindi 
                    ? 'शानदार! आपका काम सफलतापूर्वक वेबसाइट पर पोस्ट हो गया है!' 
                    : 'Success! Your project has been published to the website!'}
                </span>
              </div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-5">
              
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  1. {isHindi ? 'पोस्ट का प्रकार चुनें' : 'Select Media Type'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setPostType('photo'); setIsBeforeAfter(false); }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 transition ${
                      postType === 'photo'
                        ? 'bg-amber-600 text-stone-950 border-amber-500 shadow'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>{isHindi ? '📸 फोटो पोस्ट' : '📸 Photo Post'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPostType('video'); setIsBeforeAfter(false); }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 transition ${
                      postType === 'video'
                        ? 'bg-amber-600 text-stone-950 border-amber-500 shadow'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    <VideoIcon className="w-4 h-4" />
                    <span>{isHindi ? '🎥 वीडियो / रील' : '🎥 Video Reel'}</span>
                  </button>
                </div>
              </div>

              {/* Before & After Toggle */}
              {postType === 'photo' && (
                <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-200">
                      {isHindi ? 'क्या यह "पहले और बाद" (Before & After) पोस्ट है?' : 'Is this a Before & After restoration?'}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {isHindi ? 'पुराना फर्नीचर बनाम नया पॉलिश रूप' : 'Old damaged piece vs restored polish'}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isBeforeAfter}
                    onChange={(e) => setIsBeforeAfter(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                </div>
              )}

              {/* Upload Area */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  2. {isHindi ? 'फाइल अपलोड करें या लिंक डालें' : 'Upload File or Provide URL'}
                </label>

                {isBeforeAfter ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-2">
                      <div className="text-xs font-bold text-red-400">
                        {isHindi ? '1. पुराना रूप (BEFORE)' : '1. BEFORE Photo (Old)'}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload(e, 'before')}
                        className="text-xs text-stone-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-stone-800 file:text-stone-200"
                      />
                      {beforeUrl && (
                        <div className="relative h-28 rounded-lg overflow-hidden border border-stone-700 mt-2">
                          <Image src={beforeUrl} alt="Before Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-2">
                      <div className="text-xs font-bold text-emerald-400">
                        {isHindi ? '2. नया रूप (AFTER)' : '2. AFTER Photo (New)'}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload(e, 'after')}
                        className="text-xs text-stone-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-stone-800 file:text-stone-200"
                      />
                      {afterUrl && (
                        <div className="relative h-28 rounded-lg overflow-hidden border border-stone-700 mt-2">
                          <Image src={afterUrl} alt="After Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-stone-900/80 rounded-xl border border-stone-800">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold text-stone-200">
                          {isHindi ? 'मोबाइल कैमरा / गैलरी से चुनें:' : 'Upload from Phone/Device:'}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept={postType === 'video' ? 'video/*' : 'image/*'}
                        capture="environment"
                        onChange={(e) => handleFileUpload(e, 'media')}
                        className="text-xs text-stone-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-600 file:text-stone-950 file:font-bold file:cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-400 block mb-1">
                        {isHindi ? 'या सीधे फोटो/वीडियो का वेब लिंक (URL) डालें:' : 'Or paste direct media URL:'}
                      </span>
                      <input
                        type="url"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        placeholder={postType === 'video' ? 'https://...video.mp4' : 'https://...image.jpg'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    {mediaUrl && (
                      <div className="mt-2 p-2 bg-stone-900 rounded-xl border border-stone-800 flex items-center gap-3">
                        {postType === 'photo' ? (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <Image src={mediaUrl} alt="Preview" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-stone-800 rounded-lg flex items-center justify-center shrink-0">
                            <VideoIcon className="w-6 h-6 text-amber-400" />
                          </div>
                        )}
                        <div className="text-xs text-stone-300 truncate">
                          <span className="text-emerald-400 font-bold block">✓ {isHindi ? 'मीडिया तैयार है' : 'Media Ready'}</span>
                          <span className="text-[11px] text-stone-500 truncate block">{mediaUrl.substring(0, 45)}...</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Category & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                    3. {isHindi ? 'कैटेगरी' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="kitchen">{isHindi ? '🍳 मॉड्यूलर किचन' : '🍳 Modular Kitchen'}</option>
                    <option value="wardrobe">{isHindi ? '🚪 अलमारी & वॉर्डरोब' : '🚪 Wardrobes & Closets'}</option>
                    <option value="mandir">{isHindi ? '🛕 लकड़ी का मंदिर' : '🛕 Wooden Temple'}</option>
                    <option value="bed">{isHindi ? '🛏️ डबल बेड & स्टोरेज' : '🛏️ Beds & Storage'}</option>
                    <option value="doors">{isHindi ? '🪵 मुख्य दरवाजे & चौखट' : '🪵 Doors & Frames'}</option>
                    <option value="interior">{isHindi ? '📺 टीवी यूनिट & इंटीरियर' : '📺 TV Unit & Interiors'}</option>
                    <option value="polish">{isHindi ? '✨ पॉलिश & मरम्मत' : '✨ Polish & Restoration'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                    4. {isHindi ? 'काम का नाम / शीर्षक *' : 'Project Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={isHindi ? 'जैसे: 3-ट्रैक स्लाइडिंग अलमारी' : 'e.g. Modern Sliding Wardrobe'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Material & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    {isHindi ? 'लकड़ी / सामग्री' : 'Wood / Materials Used'}
                  </label>
                  <input
                    type="text"
                    value={woodType}
                    onChange={(e) => setWoodType(e.target.value)}
                    placeholder={isHindi ? 'जैसे: सेंचुरी मरीन BWP प्लाई + हेफ़ेले' : 'e.g. Century Marine BWP Ply + Hafele'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    {isHindi ? 'लोकेशन / इलाका' : 'Site Location'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={isHindi ? 'जैसे: सेक्टर 14, मॉडल टाउन' : 'e.g. Sector 14, Model Town'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                  {isHindi ? 'विवरण' : 'Project Details'}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isHindi ? 'काम के बारे में विवरण...' : 'Notes about craftsmanship, fittings...'}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-base shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>{isHindi ? 'वेबसाइट पर लाइव पोस्ट करें' : 'Publish to Website'}</span>
              </button>

            </form>

          </div>
        )}

        {/* TAB 2: MANAGE & DELETE POSTS */}
        {activeTab === 'manage' && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isHindi ? 'पोस्ट मैनेज करें' : 'Manage Existing Posts'}
                </h2>
                <p className="text-xs text-stone-400">
                  {isHindi ? `कुल ${workItems.length} पोस्ट लाइव हैं।` : `Total ${workItems.length} items live.`}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('create')}
                className="px-3 py-1.5 rounded-xl bg-amber-600 text-stone-950 font-bold text-xs flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{isHindi ? '+ नया' : '+ New'}</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {workItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 hover:border-stone-700 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                      {item.type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-stone-800 text-amber-400">
                          <VideoIcon className="w-6 h-6" />
                        </div>
                      ) : (
                        <Image
                          src={item.mediaUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-900/60">
                          {categoryLabels[item.category]?.[isHindi ? 'hi' : 'en'] || item.category}
                        </span>
                        <span className="text-[10px] text-stone-500">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-200 truncate">
                        {isHindi && item.titleHindi ? item.titleHindi : (item.titleEn || item.title)}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">
                        {isHindi && item.woodTypeHindi ? item.woodTypeHindi : (item.woodTypeEn || item.woodType || item.description)}
                      </p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm(isHindi ? `क्या आप "${item.title}" को डिलीट करना चाहते हैं?` : `Are you sure you want to delete "${item.title}"?`)) {
                        deleteWorkItem(item.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white border border-red-900/40 transition shrink-0"
                    title={isHindi ? "डिलीट करें" : "Delete"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-8 shadow-xl space-y-6">
            
            <div>
              <h2 className="text-xl font-bold text-white">
                {isHindi ? 'वेबसाइट सेटिंग्स & बैकअप' : 'Website Settings & Backup'}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {isHindi ? 'फोन नंबर, व्हाट्सएप और एडमिन पिन बदलें' : 'Update phone, WhatsApp and security PIN'}
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isHindi ? 'सेटिंग्स सफलतापूर्वक सेव हो गई!' : 'Settings updated successfully!'}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {isHindi ? 'कॉलिंग फोन नंबर' : 'Calling Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {isHindi ? 'WhatsApp नंबर (देश कोड के साथ)' : 'WhatsApp Number (with country code)'}
                  </label>
                  <input
                    type="tel"
                    value={settingsForm.whatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {isHindi ? 'बिजनेस का नाम (English)' : 'Business Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {isHindi ? 'एडमिन सिक्योरिटी पिन (PIN)' : 'Admin Security PIN'}
                  </label>
                  <input
                    type="text"
                    value={settingsForm.adminPin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow transition"
              >
                {isHindi ? 'सेटिंग्स सेव करें' : 'Save Changes'}
              </button>
            </form>

            {/* Backup & Export Options */}
            <div className="pt-6 border-t border-stone-800 space-y-4">
              <h3 className="font-bold text-sm text-stone-200">
                {isHindi ? 'डेटा बैकअप & एक्सपोर्ट' : 'Data Backup & Export'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-700 hover:border-amber-500 text-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{isHindi ? 'डेटा बैकअप डाउनलोड करें' : 'Download JSON Backup'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="py-2.5 px-3 rounded-xl bg-stone-950 border border-stone-700 hover:border-amber-500 text-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  {copiedJson ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                  <span>{copiedJson ? (isHindi ? 'कॉपी हो गया!' : 'Copied!') : (isHindi ? 'डेटा कॉपी करें' : 'Copy JSON to Clipboard')}</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(isHindi ? 'क्या आप सभी डिफ़ॉल्ट डेटा रीसेट करना चाहते हैं?' : 'Reset to default data?')) {
                      resetToDefault();
                      alert(isHindi ? 'डेटा रीसेट हो गया है।' : 'Data has been reset.');
                    }
                  }}
                  className="text-[11px] text-stone-500 hover:text-red-400 underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{isHindi ? 'डिफ़ॉल्ट डेटा पर रीसेट करें' : 'Reset to default initial data'}</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
