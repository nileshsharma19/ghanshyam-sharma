'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWork } from '@/context/WorkContext';
import { WorkItem, ServiceItem, MilestoneItem, categoryLabels } from '@/data/initialData';
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
  Languages,
  Wrench,
  Edit3,
  Plus,
  X,
  Award,
  PhoneCall,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Mail
} from 'lucide-react';

export default function AdminPage() {
  const { 
    workItems, 
    services,
    config, 
    addWorkItem, 
    updateWorkItem,
    deleteWorkItem, 
    addService,
    updateService,
    deleteService,
    resetServices,
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
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'services' | 'legacy' | 'contact' | 'settings'>('create');

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

  React.useEffect(() => {
    setSettingsForm({
      phone: config.phone,
      whatsapp: config.whatsapp,
      name: config.name,
      nameHindi: config.nameHindi || config.name,
      adminPin: config.adminPin,
      location: config.location,
    });
  }, [config]);

  // Services Management State
  const initialServiceForm = {
    titleEn: '',
    titleHi: '',
    descEn: '',
    descHi: '',
    imageUrl: '',
    materialsEn: '',
    materialsHi: '',
    featuresEn: '',
    featuresHi: '',
  };
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormSuccess, setServiceFormSuccess] = useState(false);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);

  const handleStartNewService = () => {
    setEditingServiceId(null);
    setServiceForm(initialServiceForm);
    setServiceFormSuccess(false);
    setIsServiceFormOpen(true);
  };

  const handleStartEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({
      titleEn: service.titleEn || '',
      titleHi: service.titleHi || '',
      descEn: service.descEn || '',
      descHi: service.descHi || '',
      imageUrl: service.imageUrl || '',
      materialsEn: service.materialsEn || '',
      materialsHi: service.materialsHi || '',
      featuresEn: (service.featuresEn || []).join('\n'),
      featuresHi: (service.featuresHi || []).join('\n'),
    });
    setServiceFormSuccess(false);
    setIsServiceFormOpen(true);
  };

  const handleServiceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setServiceForm(prev => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.titleEn.trim() && !serviceForm.titleHi.trim()) {
      alert(isHindi ? 'कृपया सेवा का नाम दर्ज करें।' : 'Please enter service title.');
      return;
    }

    const featuresEn = serviceForm.featuresEn
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const featuresHi = serviceForm.featuresHi
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload: Omit<ServiceItem, 'id'> = {
      titleEn: serviceForm.titleEn.trim() || serviceForm.titleHi.trim(),
      titleHi: serviceForm.titleHi.trim() || serviceForm.titleEn.trim(),
      descEn: serviceForm.descEn.trim() || serviceForm.descHi.trim(),
      descHi: serviceForm.descHi.trim() || serviceForm.descEn.trim(),
      imageUrl: serviceForm.imageUrl.trim() || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=75',
      materialsEn: serviceForm.materialsEn.trim() || 'High grade wood & fittings',
      materialsHi: serviceForm.materialsHi.trim() || 'उच्च गुणवत्ता लकड़ी व फिटिंग्स',
      featuresEn: featuresEn.length > 0 ? featuresEn : ['Custom design & installation', 'Premium seasoned timber'],
      featuresHi: featuresHi.length > 0 ? featuresHi : ['कस्टम डिजाइन और फिटिंग', 'प्रीमियम क्वालिटी लकड़ी']
    };

    if (editingServiceId) {
      updateService(editingServiceId, payload);
    } else {
      addService(payload);
    }

    setServiceFormSuccess(true);
    setIsServiceFormOpen(false);
    setEditingServiceId(null);
    setServiceForm(initialServiceForm);
  };

  // Work Items (Daily Work) Edit State
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [isWorkEditOpen, setIsWorkEditOpen] = useState(false);
  const [workEditSuccess, setWorkEditSuccess] = useState(false);
  const [editWorkForm, setEditWorkForm] = useState({
    title: '',
    titleHindi: '',
    category: 'kitchen' as WorkItem['category'],
    type: 'photo' as 'photo' | 'video',
    mediaUrl: '',
    thumbnailUrl: '',
    description: '',
    descriptionHindi: '',
    woodType: '',
    woodTypeHindi: '',
    location: '',
    videoDuration: '',
    isBeforeAfter: false,
    beforeUrl: '',
    afterUrl: '',
  });

  const handleStartEditWork = (item: WorkItem) => {
    setEditingWorkId(item.id);
    setEditWorkForm({
      title: item.titleEn || item.title || '',
      titleHindi: item.titleHindi || item.title || '',
      category: item.category,
      type: item.type,
      mediaUrl: item.mediaUrl || '',
      thumbnailUrl: item.thumbnailUrl || '',
      description: item.descriptionEn || item.description || '',
      descriptionHindi: item.descriptionHindi || item.description || '',
      woodType: item.woodTypeEn || item.woodType || '',
      woodTypeHindi: item.woodTypeHindi || item.woodType || '',
      location: item.locationEn || item.location || '',
      videoDuration: item.videoDuration || '',
      isBeforeAfter: !!item.beforeAfter,
      beforeUrl: item.beforeAfter?.beforeUrl || '',
      afterUrl: item.beforeAfter?.afterUrl || '',
    });
    setWorkEditSuccess(false);
    setIsWorkEditOpen(true);
  };

  const handleEditWorkFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'media' | 'thumbnail' | 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setEditWorkForm(prev => {
        if (target === 'media') return { ...prev, mediaUrl: result };
        if (target === 'thumbnail') return { ...prev, thumbnailUrl: result };
        if (target === 'before') return { ...prev, beforeUrl: result };
        if (target === 'after') return { ...prev, afterUrl: result };
        return prev;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEditWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkId) return;

    if (!editWorkForm.title && !editWorkForm.titleHindi) {
      alert(isHindi ? 'कृपया काम का शीर्षक दर्ज करें।' : 'Please enter project title.');
      return;
    }

    const updatedData: Partial<WorkItem> = {
      title: editWorkForm.title || editWorkForm.titleHindi,
      titleEn: editWorkForm.title || editWorkForm.titleHindi,
      titleHindi: editWorkForm.titleHindi || editWorkForm.title,
      category: editWorkForm.category,
      type: editWorkForm.type,
      mediaUrl: editWorkForm.mediaUrl || editWorkForm.afterUrl,
      thumbnailUrl: editWorkForm.thumbnailUrl || (editWorkForm.type === 'photo' ? editWorkForm.mediaUrl : undefined),
      description: editWorkForm.description || editWorkForm.descriptionHindi,
      descriptionEn: editWorkForm.description || editWorkForm.descriptionHindi,
      descriptionHindi: editWorkForm.descriptionHindi || editWorkForm.description,
      woodType: editWorkForm.woodType || editWorkForm.woodTypeHindi,
      woodTypeEn: editWorkForm.woodType || editWorkForm.woodTypeHindi,
      woodTypeHindi: editWorkForm.woodTypeHindi || editWorkForm.woodType,
      location: editWorkForm.location,
      videoDuration: editWorkForm.type === 'video' ? (editWorkForm.videoDuration || '0:30') : undefined,
      beforeAfter: editWorkForm.isBeforeAfter && editWorkForm.beforeUrl && editWorkForm.afterUrl ? {
        beforeUrl: editWorkForm.beforeUrl,
        afterUrl: editWorkForm.afterUrl,
        description: editWorkForm.description || (isHindi ? 'फर्नीचर मरम्मत व पॉलिश' : 'Furniture restoration and polish'),
        descriptionEn: editWorkForm.description || 'Furniture restoration and polish',
        descriptionHindi: editWorkForm.descriptionHindi || 'फर्नीचर मरम्मत व पॉलिश'
      } : undefined
    };

    updateWorkItem(editingWorkId, updatedData);
    setWorkEditSuccess(true);
    setIsWorkEditOpen(false);
    setEditingWorkId(null);
  };

  // Legacy (30 Yrs) State
  const [legacyForm, setLegacyForm] = useState({
    experienceYears: config.experienceYears || 30,
    completedProjects: config.completedProjects || 1500,
    fatherName: config.fatherName || 'Ghanshyam Sharma',
    fatherNameHindi: config.fatherNameHindi || 'घनश्याम शर्मा',
    taglineEnglish: config.taglineEnglish || '',
    taglineHindi: config.taglineHindi || '',
    founderImageUrl: config.founderImageUrl || '',
    storyHeadingEn: config.storyHeadingEn || '',
    storyHeadingHi: config.storyHeadingHi || '',
    storyDescEn: config.storyDescEn || '',
    storyDescHi: config.storyDescHi || '',
    milestones: config.milestones || [] as MilestoneItem[]
  });
  const [legacySaved, setLegacySaved] = useState(false);

  // Sync legacyForm with config
  React.useEffect(() => {
    setLegacyForm({
      experienceYears: config.experienceYears || 30,
      completedProjects: config.completedProjects || 1500,
      fatherName: config.fatherName || 'Ghanshyam Sharma',
      fatherNameHindi: config.fatherNameHindi || 'घनश्याम शर्मा',
      taglineEnglish: config.taglineEnglish || '',
      taglineHindi: config.taglineHindi || '',
      founderImageUrl: config.founderImageUrl || '',
      storyHeadingEn: config.storyHeadingEn || '',
      storyHeadingHi: config.storyHeadingHi || '',
      storyDescEn: config.storyDescEn || '',
      storyDescHi: config.storyDescHi || '',
      milestones: config.milestones || []
    });
  }, [config]);

  const handleFounderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLegacyForm(prev => ({ ...prev, founderImageUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveLegacy = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig({
      experienceYears: Number(legacyForm.experienceYears) || 30,
      completedProjects: Number(legacyForm.completedProjects) || 1500,
      fatherName: legacyForm.fatherName,
      fatherNameHindi: legacyForm.fatherNameHindi,
      taglineEnglish: legacyForm.taglineEnglish,
      taglineHindi: legacyForm.taglineHindi,
      founderImageUrl: legacyForm.founderImageUrl,
      storyHeadingEn: legacyForm.storyHeadingEn,
      storyHeadingHi: legacyForm.storyHeadingHi,
      storyDescEn: legacyForm.storyDescEn,
      storyDescHi: legacyForm.storyDescHi,
      milestones: legacyForm.milestones
    });
    setLegacySaved(true);
    setTimeout(() => setLegacySaved(false), 4000);
  };

  const handleAddMilestone = () => {
    const newM: MilestoneItem = {
      id: `m-${Date.now()}`,
      year: 'Year',
      titleEn: 'Milestone Title',
      titleHi: 'मील का पत्थर',
      descEn: 'Achievement description...',
      descHi: 'सफलता का विवरण...'
    };
    setLegacyForm(prev => ({
      ...prev,
      milestones: [...prev.milestones, newM]
    }));
  };

  const handleUpdateMilestone = (id: string, updated: Partial<MilestoneItem>) => {
    setLegacyForm(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => m.id === id ? { ...m, ...updated } : m)
    }));
  };

  const handleDeleteMilestone = (id: string) => {
    setLegacyForm(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }));
  };

  // Contact Tab State
  const [contactForm, setContactForm] = useState({
    phone: config.phone || '+91 84688 09565',
    whatsapp: config.whatsapp || '918468809565',
    email: config.email || 'contact@ghanshyamcarpenter.com',
    location: config.location || 'Main Market, Sector 12, City Center',
    locationHindi: config.locationHindi || 'मुख्य मार्केट, सेक्टर 12, सिटी सेंटर',
    workingHours: config.workingHours || '8:00 AM - 8:30 PM (Monday - Sunday)',
    workingHoursHindi: config.workingHoursHindi || 'सुबह 8:00 से रात 8:30 तक (सातों दिन खुला)',
    serviceAreas: (config.serviceAreas || []).join(', '),
    serviceAreasHindi: (config.serviceAreasHindi || []).join(', ')
  });
  const [contactSaved, setContactSaved] = useState(false);

  React.useEffect(() => {
    setContactForm({
      phone: config.phone || '+91 84688 09565',
      whatsapp: config.whatsapp || '918468809565',
      email: config.email || 'contact@ghanshyamcarpenter.com',
      location: config.location || 'Main Market, Sector 12, City Center',
      locationHindi: config.locationHindi || 'मुख्य मार्केट, सेक्टर 12, सिटी सेंटर',
      workingHours: config.workingHours || '8:00 AM - 8:30 PM (Monday - Sunday)',
      workingHoursHindi: config.workingHoursHindi || 'सुबह 8:00 से रात 8:30 तक (सातों दिन खुला)',
      serviceAreas: (config.serviceAreas || []).join(', '),
      serviceAreasHindi: (config.serviceAreasHindi || []).join(', ')
    });
  }, [config]);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceAreasArray = contactForm.serviceAreas
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const serviceAreasHindiArray = contactForm.serviceAreasHindi
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    updateBusinessConfig({
      phone: contactForm.phone,
      whatsapp: contactForm.whatsapp,
      email: contactForm.email,
      location: contactForm.location,
      locationHindi: contactForm.locationHindi,
      workingHours: contactForm.workingHours,
      workingHoursHindi: contactForm.workingHoursHindi,
      serviceAreas: serviceAreasArray.length > 0 ? serviceAreasArray : config.serviceAreas,
      serviceAreasHindi: serviceAreasHindiArray.length > 0 ? serviceAreasHindiArray : config.serviceAreasHindi,
    });
    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 4000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === config.adminPin) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(isHindi ? 'गलत पिन! कृपया सही पिन दर्ज करें।' : 'Incorrect PIN! Please enter the correct PIN.');
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
                ? 'सुरक्षित एडमिन पोर्टल खोलने के लिए अपना पिन दर्ज करें।' 
                : 'Enter your security PIN to access the admin portal.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={16}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN"
                className="w-full text-center tracking-widest text-2xl font-mono py-3.5 bg-stone-950 border border-stone-700 rounded-2xl text-white focus:outline-none focus:border-amber-500 placeholder:text-stone-600 placeholder:text-base placeholder:tracking-normal"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-stone-900 p-1.5 rounded-2xl border border-stone-800 mb-6">
          <button
            onClick={() => {
              setActiveTab('create');
              setIsWorkEditOpen(false);
            }}
            className={`py-2.5 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">{isHindi ? '+ नया पोस्ट' : '+ New Post'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2.5 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'manage'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span className="truncate">{isHindi ? `दैनिक काम (${workItems.length})` : `Daily Work (${workItems.length})`}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('services');
              setIsServiceFormOpen(false);
              setEditingServiceId(null);
            }}
            className={`py-2.5 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'services'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Wrench className="w-4 h-4 shrink-0" />
            <span className="truncate">{isHindi ? `सेवाएं (${services.length})` : `Services (${services.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('legacy')}
            className={`py-2.5 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'legacy'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span className="truncate">{isHindi ? '30 Yrs अनुभव' : '30 Yrs Legacy'}</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`py-2.5 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'contact'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span className="truncate">{isHindi ? 'संपर्क' : 'Contact'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span className="truncate">{isHindi ? 'सेटिंग्स' : 'Settings'}</span>
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
                          {isHindi ? 'गैलरी / फाइल्स से फोटो या वीडियो चुनें:' : 'Select from Photo / Video Gallery:'}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept={postType === 'video' ? 'video/*' : 'image/*'}
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

        {/* TAB 2: MANAGE & EDIT DAILY WORK POSTS */}
        {activeTab === 'manage' && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-400" />
                  <span>{isHindi ? 'दैनिक काम मैनेज & एडिट करें' : 'Manage & Edit Daily Work'}</span>
                </h2>
                <p className="text-xs text-stone-400">
                  {isHindi ? `कुल ${workItems.length} पोस्ट लाइव हैं। किसी भी पोस्ट को एडिट या डिलीट करें।` : `Total ${workItems.length} items live. Edit or remove any project.`}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('create')}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1 transition shadow"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{isHindi ? '+ नया' : '+ New'}</span>
              </button>
            </div>

            {workEditSuccess && (
              <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-xl text-emerald-200 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isHindi ? 'पोस्ट सफलतापूर्वक अपडेट हो गया!' : 'Work post updated successfully!'}</span>
                </div>
                <button onClick={() => setWorkEditSuccess(false)} className="text-stone-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* EDIT WORK ITEM FORM */}
            {isWorkEditOpen && editingWorkId && (
              <div className="bg-stone-950 border border-amber-600/50 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h3 className="font-bold text-sm sm:text-base text-amber-300 flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    <span>{isHindi ? 'पोस्ट एडिट करें (Edit Project Post)' : 'Edit Project Post'}</span>
                  </h3>
                  <button
                    onClick={() => { setIsWorkEditOpen(false); setEditingWorkId(null); }}
                    className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveEditWork} className="space-y-4">
                  {/* Post Type & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'प्रकार (Media Type)' : 'Media Type'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setEditWorkForm({ ...editWorkForm, type: 'photo' })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                            editWorkForm.type === 'photo'
                              ? 'bg-amber-600 text-stone-950 border-amber-500 shadow'
                              : 'bg-stone-900 text-stone-400 border-stone-800'
                          }`}
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'फोटो' : 'Photo'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditWorkForm({ ...editWorkForm, type: 'video' })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                            editWorkForm.type === 'video'
                              ? 'bg-amber-600 text-stone-950 border-amber-500 shadow'
                              : 'bg-stone-900 text-stone-400 border-stone-800'
                          }`}
                        >
                          <VideoIcon className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'वीडियो' : 'Video'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'कैटेगरी' : 'Category'}
                      </label>
                      <select
                        value={editWorkForm.category}
                        onChange={(e) => setEditWorkForm({ ...editWorkForm, category: e.target.value as WorkItem['category'] })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="kitchen">🍳 Modular Kitchen (किचन)</option>
                        <option value="wardrobe">🚪 Wardrobes & Closets (अलमारी)</option>
                        <option value="mandir">🛕 Wooden Temples (मंदिर)</option>
                        <option value="bed">🛏️ Beds & Storage (बेड)</option>
                        <option value="doors">🪵 Doors & Frames (दरवाजे)</option>
                        <option value="interior">📺 TV Units & Interiors (इंटीरियर)</option>
                        <option value="polish">✨ Polish & Repair (पॉलिश)</option>
                      </select>
                    </div>
                  </div>

                  {/* Title En & Hi */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'शीर्षक (English) *' : 'Title (English) *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={editWorkForm.title}
                        onChange={(e) => setEditWorkForm({ ...editWorkForm, title: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'शीर्षक (हिंदी)' : 'Title (Hindi)'}
                      </label>
                      <input
                        type="text"
                        value={editWorkForm.titleHindi}
                        onChange={(e) => setEditWorkForm({ ...editWorkForm, titleHindi: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Media Upload / URL */}
                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-3">
                    <label className="block text-xs font-semibold text-amber-300">
                      {isHindi ? 'फोटो / वीडियो बदलें (गैलरी से चुनें या URL डालें)' : 'Update Media (Gallery Upload or direct URL)'}
                    </label>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-stone-300">
                          {isHindi ? 'गैलरी से चुनें:' : 'Select from Device Gallery:'}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept={editWorkForm.type === 'video' ? 'video/*' : 'image/*'}
                        onChange={(e) => handleEditWorkFileUpload(e, 'media')}
                        className="text-xs text-stone-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-600 file:text-stone-950 file:font-bold file:cursor-pointer"
                      />
                    </div>

                    <div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or direct media URL"
                        value={editWorkForm.mediaUrl}
                        onChange={(e) => setEditWorkForm({ ...editWorkForm, mediaUrl: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {editWorkForm.mediaUrl && (
                      <div className="flex items-center gap-3 pt-1">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-stone-700 shrink-0">
                          {editWorkForm.type === 'video' ? (
                            <div className="w-full h-full bg-stone-800 flex items-center justify-center text-amber-400">
                              <VideoIcon className="w-6 h-6" />
                            </div>
                          ) : (
                            <Image src={editWorkForm.mediaUrl} alt="Preview" fill className="object-cover" />
                          )}
                        </div>
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isHindi ? 'मीडिया तैयार है' : 'Media ready'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Materials & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'सामग्री / लकड़ी (English)' : 'Wood / Materials (English)'}
                      </label>
                      <input
                        type="text"
                        value={editWorkForm.woodType}
                        onChange={(e) => setEditWorkForm({ ...editWorkForm, woodType: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'लोकेशन / इलाका' : 'Site Location'}
                      </label>
                      <input
                        type="text"
                        value={editWorkForm.location}
                        onChange={(e) => setEditWorkForm({ ...editWorkForm, location: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isHindi ? 'विवरण' : 'Project Details / Notes'}
                    </label>
                    <textarea
                      rows={2}
                      value={editWorkForm.description}
                      onChange={(e) => setEditWorkForm({ ...editWorkForm, description: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow transition"
                    >
                      {isHindi ? 'अपडेट सेव करें' : 'Save Updates'}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIsWorkEditOpen(false); setEditingWorkId(null); }}
                      className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs sm:text-sm font-semibold transition"
                    >
                      {isHindi ? 'रद्द करें' : 'Cancel'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of items */}
            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
              {workItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 hover:border-stone-700 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
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

                  {/* Actions: Edit and Delete */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleStartEditWork(item)}
                      className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-stone-300 border border-stone-800 hover:border-amber-600 text-xs font-semibold flex items-center gap-1.5 transition"
                      title={isHindi ? "एडिट करें" : "Edit"}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isHindi ? "एडिट" : "Edit"}</span>
                    </button>

                    <button
                      type="button"
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
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-amber-400" />
                    <span>{isHindi ? 'सेवाएं मैनेज करें (Services)' : 'Manage Services'}</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isHindi 
                      ? `कुल ${services.length} सेवाएं उपलब्ध हैं। यहां बदलाव करने पर होमपेज और Services पेज दोनों तुरंत अपडेट होंगे।`
                      : `Total ${services.length} services active. Updates reflect instantly on both Homepage and /services page.`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {!isServiceFormOpen && (
                    <button
                      onClick={handleStartNewService}
                      className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isHindi ? '+ नई सेवा जोड़ें' : '+ Add New Service'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (confirm(isHindi ? 'क्या आप सभी सेवाओं को डिफ़ॉल्ट रूप में रीसेट करना चाहते हैं?' : 'Reset all services to factory defaults?')) {
                        resetServices();
                      }
                    }}
                    className="px-2.5 py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-1 transition"
                    title={isHindi ? 'डिफ़ॉल्ट सेवाएं रीसेट करें' : 'Reset Services'}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isHindi ? 'रीसेट' : 'Reset'}</span>
                  </button>
                </div>
              </div>

              {serviceFormSuccess && (
                <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-xl text-emerald-200 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isHindi ? 'सेवा सफलतापूर्वक सेव हो गई!' : 'Service saved successfully!'}</span>
                  </div>
                  <button onClick={() => setServiceFormSuccess(false)} className="text-stone-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Add / Edit Service Form */}
              {isServiceFormOpen && (
                <div className="bg-stone-950 border border-amber-600/40 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <h3 className="font-bold text-sm sm:text-base text-amber-300 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      <span>
                        {editingServiceId 
                          ? (isHindi ? 'सेवा संपादित करें (Edit Service)' : 'Edit Service') 
                          : (isHindi ? 'नई सेवा जोड़ें (Add New Service)' : 'Add New Service')}
                      </span>
                    </h3>
                    <button
                      onClick={() => { setIsServiceFormOpen(false); setEditingServiceId(null); }}
                      className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4">
                    {/* Title En & Hi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'सेवा का नाम (English) *' : 'Service Title (English) *'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Modular Kitchen Design"
                          value={serviceForm.titleEn}
                          onChange={(e) => setServiceForm({ ...serviceForm, titleEn: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'सेवा का नाम (हिंदी)' : 'Service Title (Hindi)'}
                        </label>
                        <input
                          type="text"
                          placeholder="जैसे: मॉड्यूलर किचन डिजाइन"
                          value={serviceForm.titleHi}
                          onChange={(e) => setServiceForm({ ...serviceForm, titleHi: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Description En & Hi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'विवरण (English)' : 'Description (English)'}
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Short description of the service..."
                          value={serviceForm.descEn}
                          onChange={(e) => setServiceForm({ ...serviceForm, descEn: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'विवरण (हिंदी)' : 'Description (Hindi)'}
                        </label>
                        <textarea
                          rows={3}
                          placeholder="सेवा का संक्षिप्त विवरण..."
                          value={serviceForm.descHi}
                          onChange={(e) => setServiceForm({ ...serviceForm, descHi: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Image upload / URL */}
                    <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-3">
                      <label className="block text-xs font-semibold text-amber-300">
                        {isHindi ? 'सेवा की फोटो (गैलरी से चुनें या वेब लिंक डालें)' : 'Service Photo (Select from Gallery or paste URL)'}
                      </label>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-amber-400" />
                          <span className="text-xs text-stone-300">
                            {isHindi ? 'गैलरी से फोटो चुनें:' : 'Upload from Device Gallery:'}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleServiceImageUpload}
                          className="text-xs text-stone-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-600 file:text-stone-950 file:font-bold file:cursor-pointer"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] text-stone-400 block mb-1">
                          {isHindi ? 'या सीधे फोटो URL डालें:' : 'Or paste direct image URL:'}
                        </span>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={serviceForm.imageUrl}
                          onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {serviceForm.imageUrl && (
                        <div className="flex items-center gap-3 pt-1">
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-stone-700 shrink-0">
                            <Image src={serviceForm.imageUrl} alt="Service Preview" fill className="object-cover" />
                          </div>
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isHindi ? 'फोटो प्रीव्यू तैयार है' : 'Photo ready'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Materials Used */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'उपयोग होने वाली सामग्री (English)' : 'Materials Used (English)'}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Marine BWP Ply, Acrylic, Hettich fittings"
                          value={serviceForm.materialsEn}
                          onChange={(e) => setServiceForm({ ...serviceForm, materialsEn: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'उपयोग होने वाली सामग्री (हिंदी)' : 'Materials Used (हिंदी)'}
                        </label>
                        <input
                          type="text"
                          placeholder="जैसे: मरीन प्लाई, हाई ग्लॉस लैमिनेट"
                          value={serviceForm.materialsHi}
                          onChange={(e) => setServiceForm({ ...serviceForm, materialsHi: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Bullet Features (1 per line) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'मुख्य विशेषताएं (English - प्रति पंक्ति 1)' : 'Key Features (English - 1 per line)'}
                        </label>
                        <textarea
                          rows={4}
                          placeholder={"Soft-close hydraulic drawers\nWater & Termite proof BWP ply\nCustom layout"}
                          value={serviceForm.featuresEn}
                          onChange={(e) => setServiceForm({ ...serviceForm, featuresEn: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          {isHindi ? 'मुख्य विशेषताएं (हिंदी - प्रति पंक्ति 1)' : 'Key Features (Hindi - 1 per line)'}
                        </label>
                        <textarea
                          rows={4}
                          placeholder={"सॉफ्ट-क्लोज हाइड्रोलिक ड्रायर्स\nदीमक और पानी से 100% सुरक्षित\nकस्टम फिटिंग"}
                          value={serviceForm.featuresHi}
                          onChange={(e) => setServiceForm({ ...serviceForm, featuresHi: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow transition"
                      >
                        {editingServiceId 
                          ? (isHindi ? 'बदलाव सेव करें' : 'Save Changes') 
                          : (isHindi ? 'नई सेवा सेव करें' : 'Create Service')}
                      </button>

                      <button
                        type="button"
                        onClick={() => { setIsServiceFormOpen(false); setEditingServiceId(null); }}
                        className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs sm:text-sm font-semibold transition"
                      >
                        {isHindi ? 'रद्द करें' : 'Cancel'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Services List */}
              <div className="space-y-3">
                {services.map((item) => (
                  <div
                    key={item.id}
                    className="bg-stone-950 border border-stone-800 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-stone-700 transition"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                        <Image
                          src={item.imageUrl}
                          alt={item.titleEn}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-stone-200">
                          {isHindi ? item.titleHi : item.titleEn}
                        </h4>
                        <p className="text-[11px] text-amber-400 font-medium truncate mt-0.5">
                          {isHindi ? (item.materialsHi || item.materialsEn) : item.materialsEn}
                        </p>
                        <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                          {isHindi ? item.descHi : item.descEn}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-stone-500">
                            {item.featuresEn?.length || 0} {isHindi ? 'फीचर्स' : 'bullet points'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEditService(item)}
                        className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-stone-300 border border-stone-800 hover:border-amber-600 text-xs font-semibold flex items-center gap-1.5 transition"
                        title={isHindi ? 'एडिट करें' : 'Edit Service'}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'एडिट' : 'Edit'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(isHindi ? `क्या आप "${item.titleHi || item.titleEn}" को डिलीट करना चाहते हैं?` : `Are you sure you want to delete "${item.titleEn}"?`)) {
                            deleteService(item.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white border border-red-900/40 transition"
                        title={isHindi ? 'डिलीट करें' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: 30 YRS LEGACY & STORY MANAGEMENT */}
        {activeTab === 'legacy' && (
          <div className="space-y-6">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-8 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>{isHindi ? '30 साल का अनुभव और कहानी (Legacy)' : '30 Yrs Legacy & Craftsman Story'}</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isHindi 
                      ? 'मास्टर कारीगर की प्रोफाइल, कहानी, दर्शन, आंकड़े और माइलस्टोन्स मैनेज करें। यहां बदलाव करने पर "30 Yrs Legacy" पेज तुरंत अपडेट होगा।'
                      : 'Customize master craftsman bio, philosophy, stats, and 30-year milestones shown on /about and homepage.'}
                  </p>
                </div>
              </div>

              {legacySaved && (
                <div className="p-3.5 bg-emerald-950 border border-emerald-600 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isHindi ? 'विरासत और कहानी की जानकारी सफलतापूर्वक सेव हो गई!' : 'Legacy details and milestones saved successfully!'}</span>
                </div>
              )}

              <form onSubmit={handleSaveLegacy} className="space-y-6">
                
                {/* 1. Track Record Metrics */}
                <div className="bg-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 space-y-4">
                  <h3 className="font-bold text-xs uppercase text-amber-400 tracking-wider">
                    1. {isHindi ? 'अनुभव व आंकड़े (Key Stats)' : 'Key Metrics & Stats'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'अनुभव (वर्ष)' : 'Years of Experience'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="80"
                        value={legacyForm.experienceYears}
                        onChange={(e) => setLegacyForm({ ...legacyForm, experienceYears: Number(e.target.value) })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'सफल प्रोजेक्ट्स संख्या (Homes Handed Over)' : 'Completed Projects / Homes'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={legacyForm.completedProjects}
                        onChange={(e) => setLegacyForm({ ...legacyForm, completedProjects: Number(e.target.value) })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Craftsman Bio & Photo */}
                <div className="bg-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 space-y-4">
                  <h3 className="font-bold text-xs uppercase text-amber-400 tracking-wider">
                    2. {isHindi ? 'कारीगर की प्रोफाइल & फोटो' : 'Craftsman Profile & Portrait'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'मास्टर कारीगर का नाम (English)' : 'Master Craftsman Name (English)'}
                      </label>
                      <input
                        type="text"
                        value={legacyForm.fatherName}
                        onChange={(e) => setLegacyForm({ ...legacyForm, fatherName: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'मास्टर कारीगर का नाम (हिंदी)' : 'Master Craftsman Name (Hindi)'}
                      </label>
                      <input
                        type="text"
                        value={legacyForm.fatherNameHindi}
                        onChange={(e) => setLegacyForm({ ...legacyForm, fatherNameHindi: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-3">
                    <label className="block text-xs font-semibold text-amber-300">
                      {isHindi ? 'कारीगर की फोटो (गैलरी से चुनें या URL डालें)' : 'Craftsman Portrait (Gallery Upload or URL)'}
                    </label>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-stone-300">
                          {isHindi ? 'गैलरी से फोटो चुनें:' : 'Upload from Device Gallery:'}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFounderPhotoUpload}
                        className="text-xs text-stone-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-600 file:text-stone-950 file:font-bold file:cursor-pointer"
                      />
                    </div>

                    <div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={legacyForm.founderImageUrl}
                        onChange={(e) => setLegacyForm({ ...legacyForm, founderImageUrl: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>

                    {legacyForm.founderImageUrl && (
                      <div className="flex items-center gap-3 pt-1">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-stone-700 shrink-0">
                          <Image src={legacyForm.founderImageUrl} alt="Founder Preview" fill className="object-cover" />
                        </div>
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isHindi ? 'फोटो लोड हो गई है' : 'Photo ready'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tagline / Motto */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'टैगलाइन / मोटो (English)' : 'Tagline / Motto (English)'}
                      </label>
                      <input
                        type="text"
                        value={legacyForm.taglineEnglish}
                        onChange={(e) => setLegacyForm({ ...legacyForm, taglineEnglish: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'टैगलाइन / मोटो (हिंदी)' : 'Tagline / Motto (Hindi)'}
                      </label>
                      <input
                        type="text"
                        value={legacyForm.taglineHindi}
                        onChange={(e) => setLegacyForm({ ...legacyForm, taglineHindi: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Story & Philosophy */}
                <div className="bg-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 space-y-4">
                  <h3 className="font-bold text-xs uppercase text-amber-400 tracking-wider">
                    3. {isHindi ? 'कहानी एवं दर्शन (Philosophy)' : 'Our Philosophy & Story'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'दर्शन हेडिंग (English)' : 'Philosophy Heading (English)'}
                      </label>
                      <input
                        type="text"
                        value={legacyForm.storyHeadingEn}
                        onChange={(e) => setLegacyForm({ ...legacyForm, storyHeadingEn: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'दर्शन हेडिंग (हिंदी)' : 'Philosophy Heading (Hindi)'}
                      </label>
                      <input
                        type="text"
                        value={legacyForm.storyHeadingHi}
                        onChange={(e) => setLegacyForm({ ...legacyForm, storyHeadingHi: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'विस्तृत दर्शन विवरण (English)' : 'Philosophy Description (English)'}
                      </label>
                      <textarea
                        rows={3}
                        value={legacyForm.storyDescEn}
                        onChange={(e) => setLegacyForm({ ...legacyForm, storyDescEn: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {isHindi ? 'विस्तृत दर्शन विवरण (हिंदी)' : 'Philosophy Description (Hindi)'}
                      </label>
                      <textarea
                        rows={3}
                        value={legacyForm.storyDescHi}
                        onChange={(e) => setLegacyForm({ ...legacyForm, storyDescHi: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Milestones List */}
                <div className="bg-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs uppercase text-amber-400 tracking-wider">
                      4. {isHindi ? 'सफर के पड़ाव (30-Year Milestones)' : '30-Year Milestones Journey'}
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddMilestone}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isHindi ? '+ नया पड़ाव' : '+ Add Milestone'}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {legacyForm.milestones.map((m, idx) => (
                      <div key={m.id || idx} className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-400">#{idx + 1}</span>
                            <input
                              type="text"
                              value={m.year}
                              onChange={(e) => handleUpdateMilestone(m.id, { year: e.target.value })}
                              placeholder="Year (e.g. 1994)"
                              className="w-28 bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono font-bold"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteMilestone(m.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white transition"
                            title="Delete Milestone"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={m.titleEn}
                            onChange={(e) => handleUpdateMilestone(m.id, { titleEn: e.target.value })}
                            placeholder="Title (English)"
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={m.titleHi}
                            onChange={(e) => handleUpdateMilestone(m.id, { titleHi: e.target.value })}
                            placeholder="Title (Hindi)"
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <textarea
                            rows={2}
                            value={m.descEn}
                            onChange={(e) => handleUpdateMilestone(m.id, { descEn: e.target.value })}
                            placeholder="Description (English)"
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-white resize-none"
                          />
                          <textarea
                            rows={2}
                            value={m.descHi}
                            onChange={(e) => handleUpdateMilestone(m.id, { descHi: e.target.value })}
                            placeholder="Description (Hindi)"
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-white resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>{isHindi ? 'विरासत बदलाव सेव करें' : 'Save Legacy Changes'}</span>
                </button>
              </form>

            </div>
          </div>
        )}

        {/* TAB 5: CONTACT & WORKING HOURS MANAGEMENT */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-8 shadow-xl space-y-6">
              
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-amber-400" />
                  <span>{isHindi ? 'संपर्क एवं कार्य समय (Contact & Timings)' : 'Contact Details & Timings'}</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  {isHindi 
                    ? 'कॉलिंग फोन, व्हाट्सएप, ईमेल, कार्यशाला का पता, समय और सर्विस एरिया बदलें।' 
                    : 'Manage calling phone, WhatsApp number, email, workshop address, working hours, and service areas.'}
                </p>
              </div>

              {contactSaved && (
                <div className="p-3.5 bg-emerald-950 border border-emerald-600 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isHindi ? 'संपर्क विवरण सफलतापूर्वक सेव हो गया!' : 'Contact details updated successfully!'}</span>
                </div>
              )}

              <form onSubmit={handleSaveContact} className="space-y-5">
                
                {/* Calling & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHindi ? 'कॉलिंग फोन नंबर' : 'Calling Phone Number'}</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isHindi ? 'WhatsApp नंबर (देश कोड के साथ)' : 'WhatsApp Number (with country code)'}</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.whatsapp}
                      onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isHindi ? 'ईमेल पता' : 'Email Address'}</span>
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                  />
                </div>

                {/* Workshop / Office Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHindi ? 'वर्कशॉप / दुकान का पता (English)' : 'Workshop / Site Address (English)'}</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.location}
                      onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHindi ? 'वर्कशॉप / दुकान का पता (हिंदी)' : 'Workshop / Site Address (हिंदी)'}</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.locationHindi}
                      onChange={(e) => setContactForm({ ...contactForm, locationHindi: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Working Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHindi ? 'कार्य समय / टाइमिंग (English)' : 'Working Hours (English)'}</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.workingHours}
                      onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                      placeholder="e.g. 8:00 AM - 8:30 PM (Monday - Sunday)"
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHindi ? 'कार्य समय / टाइमिंग (हिंदी)' : 'Working Hours (Hindi)'}</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.workingHoursHindi}
                      onChange={(e) => setContactForm({ ...contactForm, workingHoursHindi: e.target.value })}
                      placeholder="जैसे: सुबह 8:00 से रात 8:30 तक (सातों दिन खुला)"
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Service Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isHindi ? 'सर्विस एरिया (English - कॉमा से अलग करें)' : 'Service Areas (English - comma separated)'}
                    </label>
                    <input
                      type="text"
                      value={contactForm.serviceAreas}
                      onChange={(e) => setContactForm({ ...contactForm, serviceAreas: e.target.value })}
                      placeholder="City Center, West Zone, South Zone, NCR"
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {isHindi ? 'सर्विस एरिया (हिंदी - कॉमा से अलग करें)' : 'Service Areas (Hindi - comma separated)'}
                    </label>
                    <input
                      type="text"
                      value={contactForm.serviceAreasHindi}
                      onChange={(e) => setContactForm({ ...contactForm, serviceAreasHindi: e.target.value })}
                      placeholder="सिटी सेंटर, वेस्ट ज़ोन, साउथ ज़ोन, एनसीआर"
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isHindi ? 'संपर्क विवरण सेव करें' : 'Save Contact Details'}</span>
                </button>
              </form>

            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & BACKUP */}
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
