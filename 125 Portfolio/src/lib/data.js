// ─── Projects ────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'tra',
    name: 'TRA Freight Network',
    tagline: 'Logistics Intelligence Platform',
    description:
      'Full-stack freight-logistics platform connecting truck owners & transporters across India. Real-time route optimization, live load tracking, driver-facing mobile UI. Delivered as a paid freelance project.',
    url: 'https://tra-connect.vercel.app/',
    github: 'https://github.com/sanjayrockerz',
    revenue: '₹10,000',
    revenueLabel: 'Paid Freelance',
    status: 'production',
    statusLabel: 'Live Production',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Vercel'],
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    accentColor: '#f97316',
    icon: '🚛',
    domain: 'fullstack',
    highlight: true,
  },
  {
    id: 'kyc',
    name: 'Secure KYC Verify',
    tagline: 'Identity Verification System',
    description:
      'End-to-end KYC verification system with document upload, liveness detection mock, and admin review dashboard. Built for rapid fintech integration.',
    url: 'https://kyc-verification-bice.vercel.app/',
    github: 'https://github.com/sanjayrockerz',
    revenue: null,
    revenueLabel: null,
    status: 'live',
    statusLabel: 'Live Demo',
    tags: ['React', 'Express', 'Multer', 'JWT', 'Tailwind', 'Vercel'],
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentColor: '#10b981',
    icon: '🔐',
    domain: 'fullstack',
    highlight: false,
  },
  {
    id: 'sih',
    name: 'Smart Cattle Breed AI',
    tagline: 'Computer Vision · MobileNetV2',
    description:
      'AI-powered cattle breed recognition system—college-level SIH 2024 selection. Fine-tuned MobileNetV2 on a custom dataset classifies 20+ Indian cattle breeds from a single photo. Streamlit frontend for field use.',
    url: 'https://sih-cattle-breed-recognition-cbvppszgig7bcov7exnjmq.streamlit.app/',
    github: 'https://github.com/sanjayrockerz',
    revenue: null,
    revenueLabel: null,
    status: 'sih',
    statusLabel: 'College SIH Pick',
    tags: ['Python', 'TensorFlow', 'MobileNetV2', 'Streamlit', 'OpenCV'],
    gradient: 'from-violet-600 via-purple-500 to-indigo-500',
    accentColor: '#8b5cf6',
    icon: '🤖',
    domain: 'aiml',
    highlight: false,
  },
  {
    id: 'transliterate',
    name: 'Read Bharat',
    tagline: 'NLP · Hindi Transliteration',
    description:
      'Real-time Hindi ↔ Roman transliteration web app using a custom rule-based engine + ML post-processing. Supports 10+ Indian languages. Built to improve digital literacy access in rural India.',
    url: 'https://transliterate-project.vercel.app/',
    github: 'https://github.com/sanjayrockerz',
    revenue: null,
    revenueLabel: null,
    status: 'progress',
    statusLabel: 'In Progress',
    tags: ['React', 'Python', 'FastAPI', 'NLP', 'Vercel'],
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    accentColor: '#f43f5e',
    icon: '📖',
    domain: 'aiml',
    highlight: false,
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS = {
  frontend: {
    label: 'Frontend',
    icon: '🎨',
    color: '#06b6d4',
    items: [
      { name: 'React',         level: 90, icon: '⚛️' },
      { name: 'JavaScript',    level: 88, icon: '🟨' },
      { name: 'HTML5 / CSS3',  level: 95, icon: '🌐' },
      { name: 'Tailwind CSS',  level: 87, icon: '💨' },
      { name: 'Next.js',       level: 70, icon: '▲' },
    ],
  },
  backend: {
    label: 'Backend',
    icon: '⚙️',
    color: '#10b981',
    items: [
      { name: 'Node.js',    level: 85, icon: '🟩' },
      { name: 'Express.js', level: 83, icon: '🚂' },
      { name: 'Python',     level: 85, icon: '🐍' },
      { name: 'FastAPI',    level: 72, icon: '⚡' },
      { name: 'MongoDB',    level: 78, icon: '🍃' },
    ],
  },
  aiml: {
    label: 'AI / ML',
    icon: '🤖',
    color: '#8b5cf6',
    items: [
      { name: 'TensorFlow',    level: 75, icon: '🧠' },
      { name: 'Scikit-learn',  level: 72, icon: '📈' },
      { name: 'Pandas/NumPy',  level: 80, icon: '🐼' },
      { name: 'Streamlit',     level: 82, icon: '📊' },
      { name: 'Computer Vision', level: 68, icon: '👁️' },
    ],
  },
  tools: {
    label: 'Tools & Cloud',
    icon: '🔧',
    color: '#f97316',
    items: [
      { name: 'Git / GitHub', level: 90, icon: '🐙' },
      { name: 'Vercel',       level: 88, icon: '▲' },
      { name: 'Docker',       level: 65, icon: '🐳' },
      { name: 'Postman',      level: 85, icon: '📬' },
      { name: 'Figma',        level: 72, icon: '🎨' },
    ],
  },
}

// ─── 3D Canvas nodes (Full-Stack cyan · AI/ML purple · Tools orange) ──────────
export const TECH_NODES = [
  // Full Stack
  { label: 'React',      group: 'fs',    hex: 0x06b6d4 },
  { label: 'Node.js',    group: 'fs',    hex: 0x06b6d4 },
  { label: 'Express',    group: 'fs',    hex: 0x10b981 },
  { label: 'MongoDB',    group: 'fs',    hex: 0x10b981 },
  { label: 'Tailwind',   group: 'fs',    hex: 0x06b6d4 },
  { label: 'Next.js',    group: 'fs',    hex: 0x0ea5e9 },
  // AI / ML
  { label: 'Python',     group: 'ai',    hex: 0x8b5cf6 },
  { label: 'TensorFlow', group: 'ai',    hex: 0x7c3aed },
  { label: 'Streamlit',  group: 'ai',    hex: 0xa78bfa },
  { label: 'Scikit',     group: 'ai',    hex: 0x8b5cf6 },
  { label: 'OpenCV',     group: 'ai',    hex: 0x6d28d9 },
  { label: 'Pandas',     group: 'ai',    hex: 0x9333ea },
  // Tools
  { label: 'Git',        group: 'tools', hex: 0xf97316 },
  { label: 'Vercel',     group: 'tools', hex: 0xf59e0b },
  { label: 'FastAPI',    group: 'tools', hex: 0xfb923c },
]

// ─── Cycling hero roles ───────────────────────────────────────────────────────
export const HERO_ROLES = [
  'Full-Stack Engineer',
  'ML Research Enthusiast',
  'React Developer',
  'AI App Builder',
  'Data Science Student',
  'Open to Internships',
]

// ─── Terminal Commands ────────────────────────────────────────────────────────
export const TERMINAL_SEQUENCE = [
  { delay: 300,  cmd: 'whoami', output: [
    'Moti Sanjay M — Full-Stack + AI/ML Engineer',
  ]},
  { delay: 1200, cmd: 'cat about.txt', output: [
    'B.E. CSE @ RMK Engineering College (2024–2028)',
    'B.S. Data Science @ IIT Madras (ongoing)',
    'Chennai, Tamil Nadu 🇮🇳',
  ]},
  { delay: 2800, cmd: 'ls domains/', output: [
    'fullstack/    →  React · Node · MongoDB · Express',
    'ai_ml/        →  TensorFlow · Streamlit · OpenCV',
  ]},
  { delay: 4600, cmd: 'cat achievements.json', output: [
    '{',
    '  "leetcode":  "230+ problems solved",',
    '  "revenue":   "₹10,000 paid freelance (TRA)",',
    '  "sih":       "Internal SIH selection @ RMK",',
    '  "iit":       "B.S. Data Science — ongoing"',
    '}',
  ]},
  { delay: 6800, cmd: 'echo "Available for internships!"', output: [
    '✅  Available for internships & freelance!',
  ]},
]

// ─── Social ───────────────────────────────────────────────────────────────────
export const SOCIAL = {
  github:   'https://github.com/sanjayrockerz',
  linkedin: 'https://www.linkedin.com/in/moti-sanjay-m-096010330/',
  leetcode: 'https://leetcode.com/u/sanjay304/',
  email:    'motisanjay04@gmail.com',
}

// ─── Achievements strip ───────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { label: '230+',  sub: 'LeetCode Solves',    icon: '💡', color: '#f59e0b' },
  { label: '₹10k',  sub: 'Paid Freelance',     icon: '💰', color: '#10b981' },
  { label: 'IIT',   sub: 'B.S. Data Science',  icon: '🎓', color: '#f97316' },
  { label: 'SIH',   sub: 'College Selection',  icon: '🤖', color: '#8b5cf6' },
  { label: '4+',    sub: 'Live Deployments',   icon: '🚀', color: '#06b6d4' },
]
