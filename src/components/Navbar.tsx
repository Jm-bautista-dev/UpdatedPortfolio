import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface LinkItem {
  name: string;
  href: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'tech-stack', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: LinkItem[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-500">
      <nav 
        className={`w-full max-w-5xl transition-all duration-500 flex items-center justify-between border ${
          isScrolled 
            ? 'mt-4 px-6 py-2 rounded-full bg-bg-card/75 backdrop-blur-xl border-border-subtle shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_40px_rgba(6,182,212,0.15)]' 
            : 'mt-6 px-8 py-3.5 rounded-2xl bg-bg-card/30 backdrop-blur-md border-border-subtle/40'
        }`}
      >
        <a 
          href="#home" 
          onClick={() => setActiveLink('#home')}
          className="text-lg font-bold tracking-[0.25em] text-text-main flex items-center transition-colors duration-500"
        >
          JM<span className="text-cyan-500 font-black">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <div className="flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setActiveLink(link.href)}
                className={`relative py-1 px-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                  activeLink === link.href 
                    ? 'text-text-main font-extrabold' 
                    : 'text-text-muted hover:text-text-main/80'
                }`}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-[-4px] left-2 right-2 h-[2px] bg-cyan-400 dark:bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-border-subtle/50 pl-6">
            {/* Elegant Sun/Moon Icon theme switch */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full border border-border-subtle hover:bg-bg-card-hover transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -15, opacity: 0, rotate: -40 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 15, opacity: 0, rotate: 40 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {theme === 'dark' ? <Sun size={13} className="text-cyan-400" /> : <Moon size={13} className="text-zinc-600" />}
                </motion.div>
              </AnimatePresence>
            </button>

            <a 
              href="#contact" 
              className="px-6 py-2.5 rounded-full bg-text-main text-bg-main text-[9px] font-extrabold uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all duration-500 shadow-sm"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Mobile View Toggle & Theme Options */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full border border-border-subtle hover:bg-bg-card-hover transition-all duration-300 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={14} className="text-cyan-400" /> : <Moon size={14} className="text-zinc-600" />}
          </button>
          
          <button 
            className="text-text-main hover:text-text-muted transition-colors p-1" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-[85px] left-4 right-4 bg-bg-card/95 backdrop-blur-2xl flex flex-col items-center py-8 px-6 space-y-6 border border-border-subtle rounded-2xl shadow-xl z-[90]"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsOpen(false);
                }}
                className={`text-xs font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                  activeLink === link.href ? 'text-cyan-400' : 'text-text-muted hover:text-text-main'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 bg-text-main text-bg-main rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all duration-300 w-full text-center"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
