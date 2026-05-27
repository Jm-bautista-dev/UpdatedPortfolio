import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SectionItem {
  id: string;
  label: string;
}

const ScrollHUD = () => {
  const [activeSection, setActiveSection] = useState('#home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections: SectionItem[] = [
    { id: '#home', label: 'Home' },
    { id: '#services', label: 'Expertise' },
    { id: '#about', label: 'About' },
    { id: '#focus-areas', label: 'Focus' },
    { id: '#certificates', label: 'Awards' },
    { id: '#tech-stack', label: 'Reactor' },
    { id: '#projects', label: 'Showcase' },
    { id: '#experience', label: 'Timeline' },
    { id: '#contact', label: 'Terminal' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.querySelector(section.id) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[99] hidden xl:flex flex-col items-center gap-6">
      
      {/* Scroll Progress Tube */}
      <div className="relative w-[3px] h-48 bg-border-subtle/40 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-cyan-400 dark:bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Dot Indicators */}
      <div className="flex flex-col gap-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a 
              key={section.id} 
              href={section.id}
              className="group relative flex items-center justify-end"
              aria-label={`Scroll to ${section.label}`}
            >
              {/* Tooltip text */}
              <span className="absolute right-8 text-[8px] font-mono tracking-widest text-text-muted uppercase opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none select-none bg-bg-card/90 border border-border-subtle/80 px-2 py-1 rounded-md backdrop-blur-md">
                {section.label}
              </span>

              {/* Glowing active ring/dot indicator */}
              <div className="w-5 h-5 flex items-center justify-center">
                <motion.div 
                  className={`rounded-full transition-all duration-500 ${
                    isActive 
                      ? 'w-2 h-2 bg-cyan-400 dark:bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]' 
                      : 'w-1.5 h-1.5 bg-text-muted/40 hover:bg-cyan-400/60'
                  }`}
                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 2, ease: "easeInOut" }}
                />
                
                {/* Active selection ring */}
                {isActive && (
                  <motion.div 
                    layoutId="hudActiveRing"
                    className="absolute w-4 h-4 rounded-full border border-cyan-400/50 dark:border-cyan-500/40 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollHUD;
