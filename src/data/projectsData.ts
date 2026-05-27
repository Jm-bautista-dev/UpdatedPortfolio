export interface ProjectLanguage {
  name: string;
  percent: number;
  color: string;
}

export interface ProjectStats {
  commits: number;
  stars: number;
  languages: ProjectLanguage[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  tech: string[];
  features: string[];
  images: string[];
  videoUrl?: string;
  status: 'completed' | 'in-progress';
  isFeatured: boolean;
  github: string;
  live?: string;
  year: string;
  category: string;
  stats?: ProjectStats;
}

export const projects: Project[] = [
  {
    id: 'attendance-management',
    title: 'Attendance Management System',
    subtitle: 'QR-powered contactless attendance tracking',
    description:
      'A contactless attendance solution leveraging unique QR codes to eliminate manual logging errors and reduce administrative time by 80% via automated reporting.',
    details:
      'Built to address the inefficiencies of traditional paper-based attendance systems. Each user is assigned a unique, encrypted QR code that registers their presence instantly upon scan. The system generates automated daily and monthly PDF reports, handles leave requests through an approval workflow, and provides administrators a real-time dashboard to monitor attendance patterns and flag anomalies.',
    tech: ['React', 'PHP', 'MySQL', 'QR Library', 'Bootstrap'],
    features: [
      'Unique encrypted QR code generation per user',
      'Automated daily & monthly PDF report generation',
      'Leave request submission & multi-level approval workflow',
      'Real-time administrator dashboard with anomaly flagging',
      'Student/employee tracking portal with history view',
      'Role-based access control (Admin, Staff, Student)',
    ],
    images: [
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400',
    ],
    status: 'completed',
    isFeatured: true,
    github: 'https://github.com/yourusername/attendance-management-system',
    year: '2024',
    category: 'Web App',
    stats: {
      commits: 148,
      stars: 12,
      languages: [
        { name: 'PHP', percent: 45, color: '#6C7EB7' },
        { name: 'React', percent: 30, color: '#61DAFB' },
        { name: 'MySQL', percent: 15, color: '#F29111' },
        { name: 'CSS', percent: 10, color: '#264de4' },
      ],
    },
  },
  {
    id: 'pos-system',
    title: 'POS System',
    subtitle: 'Advanced point-of-sale & inventory ecosystem',
    description:
      'A full-featured point-of-sale system designed to eliminate retail inventory discrepancies and streamline sales tracking with multi-branch stock reconciliation.',
    details:
      'Engineered to solve the chaos of manual retail operations. The system provides real-time inventory tracking across multiple branches, predictive reorder alerts, instant receipt generation, and a comprehensive analytics dashboard for sales performance. Built on a clean-code modular architecture, it supports simultaneous transactions with ACID-compliant database integrity. The React frontend delivers a smooth cashier experience while the PHP/MySQL backend handles business logic and reporting.',
    tech: ['React', 'PHP', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    features: [
      'Multi-branch real-time inventory synchronization',
      'Predictive stock reorder alerts & buffer management',
      'Instant receipt generation (thermal & PDF)',
      'Sales analytics dashboard with trend visualization',
      'Barcode scanning & product catalog management',
      'Role-based cashier, manager & admin accounts',
    ],
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400',
    ],
    status: 'completed',
    isFeatured: true,
    github: 'https://github.com/yourusername/pos-system',
    year: '2024',
    category: 'Web App',
    stats: {
      commits: 203,
      stars: 18,
      languages: [
        { name: 'PHP', percent: 40, color: '#6C7EB7' },
        { name: 'React', percent: 35, color: '#61DAFB' },
        { name: 'MySQL', percent: 15, color: '#F29111' },
        { name: 'CSS', percent: 10, color: '#38BDF8' },
      ],
    },
  },
  {
    id: 'hotel-management',
    title: 'Hotel Management System',
    subtitle: 'End-to-end hospitality operations platform',
    description:
      'A comprehensive hotel management platform handling room reservations, guest check-in/check-out, housekeeping coordination, and billing in one unified interface.',
    details:
      'Designed for small to mid-size hotels, this system centralizes front-desk operations. Staff can manage room availability in real-time, process reservations, generate guest invoices, and coordinate housekeeping tasks. The system features a visual room-status map, automated billing calculation with itemized charges, and a reporting module for occupancy and revenue analytics.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'jQuery'],
    features: [
      'Real-time room availability map & status tracking',
      'Guest reservation & check-in/check-out processing',
      'Automated billing with itemized charges & discounts',
      'Housekeeping task coordination dashboard',
      'Occupancy rate & revenue analytics reports',
      'Multi-room type & pricing tier management',
    ],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1400',
    ],
    status: 'completed',
    isFeatured: false,
    github: 'https://github.com/yourusername/hotel-management-system',
    year: '2023',
    category: 'Web App',
    stats: {
      commits: 95,
      stars: 7,
      languages: [
        { name: 'PHP', percent: 55, color: '#6C7EB7' },
        { name: 'JavaScript', percent: 20, color: '#F7DF1E' },
        { name: 'MySQL', percent: 15, color: '#F29111' },
        { name: 'CSS', percent: 10, color: '#264de4' },
      ],
    },
  },
  {
    id: 'game-store-capstone',
    title: 'Game Store',
    subtitle: 'Full-stack e-commerce capstone project',
    description:
      'A feature-complete game store e-commerce platform with real-time inventory, user authentication, a shopping cart, and order management — built as a capstone project.',
    details:
      'This capstone project showcases full-stack development proficiency. Users can browse a curated game catalog, filter by genre and platform, manage wishlists, and complete purchases through a streamlined checkout flow. Firebase handles authentication and real-time database synchronization, while TypeScript ensures type safety across the entire React frontend. The project demonstrates modern software engineering practices including component-driven architecture and responsive UI design.',
    tech: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Zustand'],
    features: [
      'Game catalog with genre, platform & price filtering',
      'Firebase real-time database for live inventory sync',
      'User authentication (email, Google OAuth)',
      'Shopping cart with persistent state management',
      'Wishlist system with cross-device sync',
      'Order history & purchase confirmation flow',
    ],
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1400',
    ],
    status: 'completed',
    isFeatured: false,
    github: 'https://github.com/yourusername/game-store-capstone',
    year: '2024',
    category: 'Capstone',
    stats: {
      commits: 167,
      stars: 21,
      languages: [
        { name: 'TypeScript', percent: 50, color: '#3178C6' },
        { name: 'React', percent: 30, color: '#61DAFB' },
        { name: 'Firebase', percent: 10, color: '#FFCA28' },
        { name: 'CSS', percent: 10, color: '#38BDF8' },
      ],
    },
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'Cinematic 3D developer portfolio',
    description:
      'This very portfolio — a cinematic, 3D-enhanced developer showcase built with React, Three.js, and Framer Motion, featuring a cosmic dark aesthetic and smooth micro-animations.',
    details:
      'A passion project and living canvas for experimenting with cutting-edge web technologies. The site features a Three.js-powered 3D starfield scene, scroll-aware section reveals via Framer Motion, a theme toggle with smooth CSS variable transitions, and a floating navigation HUD. Every detail — from the glassmorphism cards to the animated gradient borders — was crafted to push the boundaries of what a developer portfolio can feel like.',
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Three.js 3D starfield & particle scene canvas',
      'Framer Motion scroll-aware reveal animations',
      'Dark/light theme toggle with CSS variable system',
      'Floating navigation HUD with scroll progress',
      'Glassmorphism card system with animated borders',
      'Fully responsive from 375px to 4K',
    ],
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1400',
    ],
    status: 'in-progress',
    isFeatured: false,
    github: 'https://github.com/yourusername/portfolio',
    live: 'https://yourportfolio.vercel.app',
    year: '2025',
    category: 'Portfolio',
    stats: {
      commits: 89,
      stars: 34,
      languages: [
        { name: 'TypeScript', percent: 60, color: '#3178C6' },
        { name: 'Three.js', percent: 15, color: '#049EF4' },
        { name: 'CSS', percent: 15, color: '#38BDF8' },
        { name: 'HTML', percent: 10, color: '#E34C26' },
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.isFeatured);
export const gridProjects = projects.filter((p) => !p.isFeatured);

export const allTechTags = Array.from(
  new Set(projects.flatMap((p) => p.tech))
).sort();
