export interface WorkItem {
  id: string;
  title: string;
  titleHindi?: string;
  titleEn?: string;
  category: 'kitchen' | 'wardrobe' | 'mandir' | 'bed' | 'doors' | 'polish' | 'interior';
  type: 'photo' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  description: string;
  descriptionHindi?: string;
  descriptionEn?: string;
  woodType?: string;
  woodTypeHindi?: string;
  woodTypeEn?: string;
  date: string;
  location?: string;
  locationHindi?: string;
  locationEn?: string;
  isFeatured?: boolean;
  videoDuration?: string;
  beforeAfter?: {
    beforeUrl: string;
    afterUrl: string;
    description: string;
    descriptionHindi?: string;
    descriptionEn?: string;
  };
}

export interface BusinessConfig {
  name: string;
  nameHindi: string;
  nameEnglish: string;
  fatherName: string;
  fatherNameHindi: string;
  experienceYears: number;
  phone: string;
  whatsapp: string;
  email?: string;
  location: string;
  locationHindi: string;
  serviceAreas: string[];
  serviceAreasHindi: string[];
  taglineHindi: string;
  taglineEnglish: string;
  adminPin: string;
}

export const initialBusinessConfig: BusinessConfig = {
  name: "Ghanshyam Sharma Carpenter",
  nameHindi: "घनश्याम शर्मा कारपेंटर",
  nameEnglish: "Ghanshyam Sharma Carpenter",
  fatherName: "Ghanshyam Sharma",
  fatherNameHindi: "घनश्याम शर्मा",
  experienceYears: 30,
  phone: "+919876543210",
  whatsapp: "919876543210",
  email: "contact@ghanshyamcarpenter.com",
  location: "Main Market, Sector 12, City Center",
  locationHindi: "मुख्य मार्केट, सेक्टर 12, सिटी सेंटर",
  serviceAreas: ["City Center", "West Zone", "South Zone", "NCR & Nearby Areas"],
  serviceAreasHindi: ["सिटी सेंटर", "वेस्ट ज़ोन", "साउथ ज़ोन", "एनसीआर एवं नजदीकी क्षेत्र"],
  taglineHindi: "30 वर्षों का अटूट अनुभव, शुद्ध लकड़ी और आधुनिक फिनिशिंग का भरोसा",
  taglineEnglish: "30+ Years of Ground Mastery — Custom Wooden Furniture & Modern Modular Interiors",
  adminPin: "1234",
};

export const initialWorkItems: WorkItem[] = [
  {
    id: "work-1",
    title: "Luxury Acrylic Finish Modular Kitchen with Soft-Close Fittings",
    titleEn: "Luxury Acrylic Finish Modular Kitchen with Soft-Close Fittings",
    titleHindi: "मॉड्यूलर किचन - वाटरप्रूफ मरीन प्लाई और हाइड्रोलिक सॉफ्ट-क्लोज",
    category: "kitchen",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    description: "Complete modular kitchen installed with Century Club Marine Ply, Hafele hydraulic hinges, anti-scratch acrylic shutters, and quartz top.",
    descriptionEn: "Complete modular kitchen installed with Century Club Marine Ply, Hafele hydraulic hinges, anti-scratch acrylic shutters, and quartz top.",
    descriptionHindi: "सेंचुरी क्लब मरीन प्लाई, हेफ़ेले हाइड्रोलिक हिंज, एंटी-स्क्रैच ऐक्रेलिक शटर और क्वार्ट्ज टॉप के साथ निर्मित संपूर्ण मॉड्यूलर किचन।",
    woodType: "Waterproof Marine Ply + High Gloss Acrylic",
    woodTypeEn: "Waterproof Marine Ply + High Gloss Acrylic",
    woodTypeHindi: "वाटरप्रूफ मरीन प्लाई + हाई ग्लॉस ऐक्रेलिक",
    date: "2026-10-05",
    location: "Green Park Residence",
    locationEn: "Green Park Residence",
    locationHindi: "ग्रीन पार्क रेजिडेंस",
    isFeatured: true
  },
  {
    id: "work-2",
    title: "Handcrafted Teak Wood Mandir with Intricate Jali Carving",
    titleEn: "Handcrafted Teak Wood Mandir with Intricate Jali Carving",
    titleHindi: "सागवान लकड़ी का भव्य नक्काशीदार मंदिर",
    category: "mandir",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Pure CP Teak (Sagwan) wood carved mandir with pull-out diya tray, bells arrangement, brass hardware and warm focus lighting.",
    descriptionEn: "Pure CP Teak (Sagwan) wood carved mandir with pull-out diya tray, bells arrangement, brass hardware and warm focus lighting.",
    descriptionHindi: "शुद्ध सागवान की लकड़ी से नक्काशीदार मंदिर, दीया ट्रे, पीतल की घंटियां और फोकस लाइटिंग के साथ।",
    woodType: "100% Pure Teak (Sagwan) Wood",
    woodTypeEn: "100% Pure Teak (Sagwan) Wood",
    woodTypeHindi: "100% शुद्ध सागवान की लकड़ी",
    date: "2026-10-01",
    location: "Civil Lines",
    locationEn: "Civil Lines",
    locationHindi: "सिविल लाइंस",
    isFeatured: true
  },
  {
    id: "work-3",
    title: "Full Height Sliding Wardrobe with Bronze Mirror Accent",
    titleEn: "Full Height Sliding Wardrobe with Bronze Mirror Accent",
    titleHindi: "मास्टर बेडरूम स्लाइडिंग अलमारी (स्लीक ब्रॉन्ज ग्लास)",
    category: "wardrobe",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    description: "Floor-to-ceiling 3-track heavy aluminum sliding wardrobe with concealed LED sensor lighting and built-in vanity organizer.",
    descriptionEn: "Floor-to-ceiling 3-track heavy aluminum sliding wardrobe with concealed LED sensor lighting and built-in vanity organizer.",
    descriptionHindi: "छत तक पूरी ऊंचाई की 3-ट्रैक एल्युमिनियम स्लाइडिंग अलमारी, सेंसर लाइट और वैनिटी ड्रॉअर के साथ।",
    woodType: "Greenply BWP + Merino Textured Laminate",
    woodTypeEn: "Greenply BWP + Merino Textured Laminate",
    woodTypeHindi: "ग्रीनप्लाई BWP प्लाई + मेरिनो लैमिनेट",
    date: "2026-09-28",
    location: "Vasant Kunj",
    locationEn: "Vasant Kunj",
    locationHindi: "वसंत कुंज",
    isFeatured: true
  },
  {
    id: "work-4",
    title: "Master King Size Hydraulic Storage Bed with Fluted Headboard",
    titleEn: "Master King Size Hydraulic Storage Bed with Fluted Headboard",
    titleHindi: "किंग साइज हाइड्रोलिक स्टोरेज बेड (फ्लूटेड हेडबोर्ड)",
    category: "bed",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    description: "Custom built king bed with German hydraulic pumps for effortless lifting, heavy solid wood internal ribbing, and cushioned fabric panel.",
    descriptionEn: "Custom built king bed with German hydraulic pumps for effortless lifting, heavy solid wood internal ribbing, and cushioned fabric panel.",
    descriptionHindi: "आसानी से उठने वाले जर्मन हाइड्रोलिक पंप, मजबूत शीशम फ्रेम और कुशन हेडबोर्ड के साथ किंग साइज बेड।",
    woodType: "Solid Sheesham Internal Frame + BWP Ply",
    woodTypeEn: "Solid Sheesham Internal Frame + BWP Ply",
    woodTypeHindi: "मजबूत शीशम लकड़ी + BWP वाटरप्रूफ प्लाई",
    date: "2026-09-20",
    location: "Model Town",
    locationEn: "Model Town",
    locationHindi: "मॉडल टाउन",
    isFeatured: true
  },
  {
    id: "work-5",
    title: "Solid Teak Main Door Carving & Fitting Process",
    titleEn: "Solid Teak Main Door Carving & Fitting Process",
    titleHindi: "मुख्य दरवाजा (Main Door) नक्काशी और फिटिंग",
    category: "doors",
    type: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-carpenter-measuring-and-cutting-a-piece-of-wood-41617-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    description: "30 years of chisel mastery: watch how we shape pure 2-inch solid Teak wood for a grand villa entrance door with smart digital lock.",
    descriptionEn: "30 years of chisel mastery: watch how we shape pure 2-inch solid Teak wood for a grand villa entrance door with smart digital lock.",
    descriptionHindi: "30 साल का अनुभव: देखें कैसे हम 2-इंच शुद्ध सागवान की लकड़ी को भव्य प्रवेश द्वार का रूप देते हैं।",
    woodType: "Grade-1 Burma Teak",
    woodTypeEn: "Grade-1 Burma Teak",
    woodTypeHindi: "ग्रेड-1 बर्मा सागवान",
    date: "2026-09-15",
    location: "Workshop Site",
    locationEn: "Workshop Site",
    locationHindi: "वर्कशॉप साइट",
    videoDuration: "0:45",
    isFeatured: true
  },
  {
    id: "work-6",
    title: "Vintage Dining Table Restored with Italian PU Polish",
    titleEn: "Vintage Dining Table Restored with Italian PU Polish",
    titleHindi: "25 साल पुराने डाइनिंग टेबल का PU पॉलिश रेनोवेशन",
    category: "polish",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    description: "Complete restoration of vintage sheesham wood dining set with grain filling, stain correction, and ultra durable satin PU coat.",
    descriptionEn: "Complete restoration of vintage sheesham wood dining set with grain filling, stain correction, and ultra durable satin PU coat.",
    descriptionHindi: "पुराने शीशम डाइनिंग सेट की खरोंचें हटाकर इटैलियन PU पॉलिश से वाटरप्रूफ और चमकदार नया रूप।",
    woodType: "Vintage Sheesham Wood Restored",
    woodTypeEn: "Vintage Sheesham Wood Restored",
    woodTypeHindi: "पुराना शीशम फर्नीचर नया बनाया गया",
    date: "2026-09-10",
    location: "Defense Colony",
    locationEn: "Defense Colony",
    locationHindi: "डिफेंस कॉलोनी",
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
      afterUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
      description: "Restored from scratchy matte fading to rich warm Italian PU luster with waterproof finish.",
      descriptionEn: "Restored from scratchy matte fading to rich warm Italian PU luster with waterproof finish.",
      descriptionHindi: "खरोंचों वाले पुराने रंग से बदलकर इटैलियन PU की वाटरप्रूफ शाही चमक।"
    },
    isFeatured: true
  },
  {
    id: "work-7",
    title: "Floating TV Entertainment Unit with Louver Panels",
    titleEn: "Floating TV Entertainment Unit with Louver Panels",
    titleHindi: "वॉल हैंगिंग टीवी यूनिट - वुडन लूपर्स और प्रोफाइल लाइट",
    category: "interior",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1200&q=80",
    description: "Sleek floating console with concealed wire channels, charcoal louvers, and push-to-open drawer hardware.",
    descriptionEn: "Sleek floating console with concealed wire channels, charcoal louvers, and push-to-open drawer hardware.",
    descriptionHindi: "छिपे हुए वायर चैनल, चारकोल लूपर्स और पुश-टू-ओपन ड्रायर्स के साथ वॉल हैंगिंग टीवी यूनिट।",
    woodType: "Charcoal Charcoal Panel + Walnut Veneer",
    woodTypeEn: "Charcoal Charcoal Panel + Walnut Veneer",
    woodTypeHindi: "चारकोल लूपर्स + वॉलनट विनियर",
    date: "2026-09-02",
    location: "Sushant Lok",
    locationEn: "Sushant Lok",
    locationHindi: "सुशांत लोक",
    isFeatured: false
  },
  {
    id: "work-8",
    title: "Precision Edge-Banding & Modular Drawer Assembly",
    titleEn: "Precision Edge-Banding & Modular Drawer Assembly",
    titleHindi: "मॉड्यूलर किचन ड्रायर्स और एज-बाइंडिंग काम",
    category: "kitchen",
    type: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-carpenter-working-with-wood-in-his-workshop-41618-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80",
    description: "Every millimeter matters. See our detailed inspection before dispatching modular drawers to client site.",
    descriptionEn: "Every millimeter matters. See our detailed inspection before dispatching modular drawers to client site.",
    descriptionHindi: "परफेक्ट फिनिशिंग: साइट पर लगाने से पहले हर दराज और चैनल की सूक्ष्म जांच।",
    woodType: "HDHMR & Marine Ply",
    woodTypeEn: "HDHMR & Marine Ply",
    woodTypeHindi: "HDHMR बोर्ड & वाटरप्रूफ मरीन प्लाई",
    date: "2026-08-25",
    location: "Workshop Floor",
    locationEn: "Workshop Floor",
    locationHindi: "वर्कशॉप फ्लोर",
    videoDuration: "0:38",
    isFeatured: false
  }
];

export const categoryLabels: Record<string, { en: string; hi: string; icon: string }> = {
  all: { en: "All Works", hi: "सभी काम", icon: "✨" },
  kitchen: { en: "Modular Kitchen", hi: "मॉड्यूलर किचन", icon: "🍳" },
  wardrobe: { en: "Wardrobes & Closets", hi: "अलमारी & वॉर्डरोब", icon: "🚪" },
  mandir: { en: "Wooden Temples", hi: "लकड़ी का मंदिर", icon: "🛕" },
  bed: { en: "Beds & Storage", hi: "बेड & स्टोरेज", icon: "🛏️" },
  doors: { en: "Doors & Frames", hi: "दरवाजे & चौखट", icon: "🪵" },
  interior: { en: "TV Units & Interiors", hi: "टीवी यूनिट & इंटीरियर", icon: "📺" },
  polish: { en: "Polish & Restoration", hi: "पॉलिश & मरम्मत", icon: "✨" },
};
