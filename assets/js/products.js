/*
  بيانات المنتجات
  - id: كود فريد للمنتج
  - category: men | women | kids
  - type: sneakers | casual | classic | boots | sandals
  - image: (اختياري) مسار صورة حقيقية مثل 'assets/img/products/rm-001.jpg'
           لو فاضي، الموقع بيرسم شكل حذاء بلون المنتج تلقائيًا
  - oldPrice: (اختياري) السعر قبل الخصم
  - badge: (اختياري) 'جديد' أو 'خصم' أو 'الأكثر مبيعًا'
  - featured: يظهر في الصفحة الرئيسية
*/
const PRODUCTS = [
  {
    id: 'rm-001', name: 'رانر برو', category: 'men', type: 'sneakers',
    price: 1850, oldPrice: 2200, badge: 'خصم', featured: true,
    colors: [
      { name: 'أسود', hex: '#1f2937', accent: '#f97316' },
      { name: 'كحلي', hex: '#1e3a5f', accent: '#ffffff' },
      { name: 'رمادي', hex: '#9ca3af', accent: '#111827' },
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    description: 'حذاء جري خفيف بنعل مرن بيمتص الصدمات، وخامة شبكية بتسمح بمرور الهوا عشان رجلك تفضل مرتاحة طول اليوم.',
    features: ['نعل EVA خفيف', 'خامة شبكية Mesh', 'مقاوم للانزلاق', 'وزن 280 جرام تقريبًا'],
  },
  {
    id: 'rm-002', name: 'ستريت كلاود', category: 'men', type: 'casual',
    price: 1450, badge: 'جديد', featured: true,
    colors: [
      { name: 'أبيض', hex: '#f5f5f4', accent: '#111827' },
      { name: 'بيج', hex: '#d6c7a8', accent: '#5b4636' },
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    description: 'سنيكرز كاجوال بتصميم بسيط يمشي مع أي لبس، من الجينز للبنطلون القماش.',
    features: ['جلد صناعي عالي الجودة', 'بطانة قطن', 'نعل مطاط'],
  },
  {
    id: 'rm-003', name: 'أكسفورد إليت', category: 'men', type: 'classic',
    price: 2400, featured: true, badge: 'الأكثر مبيعًا',
    colors: [
      { name: 'بني', hex: '#7c4a2d', accent: '#3b2416' },
      { name: 'أسود', hex: '#1c1917', accent: '#000000' },
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    description: 'حذاء كلاسيك جلد طبيعي مناسب للشغل والمناسبات، بخياطة يدوية ونعل مريح.',
    features: ['جلد طبيعي 100%', 'خياطة يدوية', 'فرش طبي'],
  },
  {
    id: 'rm-004', name: 'ترايل بوت', category: 'men', type: 'boots',
    price: 2750, oldPrice: 3100, badge: 'خصم',
    colors: [
      { name: 'عسلي', hex: '#a16207', accent: '#422006' },
      { name: 'زيتي', hex: '#4d5b3a', accent: '#1a2010' },
    ],
    sizes: [41, 42, 43, 44, 45],
    description: 'بوت متين للخروجات والشتا، مقاوم للمية بنعل قوي بيثبت على أي أرض.',
    features: ['مقاوم للمياه', 'نعل مطاط محفور', 'بطانة دافية'],
  },
  {
    id: 'rm-005', name: 'إير فلو', category: 'women', type: 'sneakers',
    price: 1750, badge: 'جديد', featured: true,
    colors: [
      { name: 'وردي', hex: '#f4a6b7', accent: '#ffffff' },
      { name: 'لافندر', hex: '#b9a6e0', accent: '#ffffff' },
      { name: 'أبيض', hex: '#f5f5f4', accent: '#ec4899' },
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    description: 'حذاء رياضي حريمي خفيف جدًا بألوان هادية، مثالي للجيم والمشي اليومي.',
    features: ['نعل Air Cushion', 'خامة Knit مرنة', 'سهل اللبس والقلع'],
  },
  {
    id: 'rm-006', name: 'سوفت لوفر', category: 'women', type: 'casual',
    price: 1300, oldPrice: 1550, badge: 'خصم', featured: true,
    colors: [
      { name: 'كاميل', hex: '#c19a6b', accent: '#6b4f2e' },
      { name: 'أسود', hex: '#27272a', accent: '#a1a1aa' },
    ],
    sizes: [36, 37, 38, 39, 40],
    description: 'لوفر ناعم ومريح للخروج والشغل، بخامة شمواه ونعل خفيف.',
    features: ['خامة شمواه', 'فرش ميموري فوم', 'نعل خفيف'],
  },
  {
    id: 'rm-007', name: 'سمر ستراب', category: 'women', type: 'sandals',
    price: 950,
    colors: [
      { name: 'ذهبي', hex: '#d4a94f', accent: '#8a6a2a' },
      { name: 'أبيض', hex: '#f5f5f4', accent: '#a8a29e' },
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    description: 'صندل صيفي أنيق بأحزمة رفيعة ونعل مريح للمشاوير الطويلة.',
    features: ['أحزمة قابلة للضبط', 'نعل طبي', 'خفيف جدًا'],
  },
  {
    id: 'rm-008', name: 'تشيلسي بوت', category: 'women', type: 'boots',
    price: 2200, badge: 'الأكثر مبيعًا',
    colors: [
      { name: 'أسود', hex: '#1c1917', accent: '#57534e' },
      { name: 'بني', hex: '#8b5a3c', accent: '#4a2e1d' },
    ],
    sizes: [36, 37, 38, 39, 40],
    description: 'بوت تشيلسي بجنب أستك سهل اللبس، يمشي مع الجيبة والبنطلون.',
    features: ['جلد طبيعي', 'جنب أستك مرن', 'كعب 3 سم'],
  },
  {
    id: 'rm-009', name: 'كيدز جامب', category: 'kids', type: 'sneakers',
    price: 850, badge: 'جديد', featured: true,
    colors: [
      { name: 'أزرق', hex: '#3b82f6', accent: '#facc15' },
      { name: 'أحمر', hex: '#ef4444', accent: '#ffffff' },
      { name: 'أخضر', hex: '#22c55e', accent: '#ffffff' },
    ],
    sizes: [28, 29, 30, 31, 32, 33, 34, 35],
    description: 'كوتشي أطفال ملون بقفل لاصق سهل، خفيف ومتين يستحمل لعب اليوم كله.',
    features: ['قفل لاصق سهل', 'نعل مضاد للانزلاق', 'قابل للغسيل'],
  },
  {
    id: 'rm-010', name: 'ميني سكول', category: 'kids', type: 'classic',
    price: 750,
    colors: [
      { name: 'أسود', hex: '#1c1917', accent: '#000000' },
      { name: 'كحلي', hex: '#1e3a5f', accent: '#0f1f33' },
    ],
    sizes: [28, 29, 30, 31, 32, 33, 34, 35],
    description: 'حذاء مدرسة مريح ومتين بجلد سهل التنظيف.',
    features: ['جلد سهل التنظيف', 'فرش مريح', 'نعل متين'],
  },
  {
    id: 'rm-011', name: 'بيتش فن', category: 'kids', type: 'sandals',
    price: 450, oldPrice: 550, badge: 'خصم',
    colors: [
      { name: 'سماوي', hex: '#38bdf8', accent: '#0369a1' },
      { name: 'برتقالي', hex: '#fb923c', accent: '#9a3412' },
    ],
    sizes: [26, 27, 28, 29, 30, 31, 32],
    description: 'صندل أطفال للبحر والصيف، خفيف ومقاوم للمية.',
    features: ['مقاوم للمياه', 'سريع النشفان', 'خفيف'],
  },
  {
    id: 'rm-012', name: 'ديلي ووك', category: 'men', type: 'sandals',
    price: 1100,
    colors: [
      { name: 'بني', hex: '#6b4226', accent: '#3b2416' },
      { name: 'أسود', hex: '#1c1917', accent: '#44403c' },
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    description: 'صندل رجالي جلد مريح للخروجات الصيفية والمصيف.',
    features: ['جلد طبيعي', 'نعل طبي', 'أحزمة قابلة للضبط'],
  },
];
