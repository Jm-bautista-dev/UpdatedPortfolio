import React, { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import heroImg from '../assets/hero.png';

const SceneCanvas = lazy(() => import('./SceneCanvas'));

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  randomX: number;
}

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const { theme } = useTheme();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
      randomX: Math.random() * 40 - 20
    }));
  }, []);

  const name = "Jhon Michael";
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-bg-main px-6 lg:px-12 py-24 transition-colors duration-500">
      
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full z-0 hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: "var(--hero-glow)",
          filter: "blur(40px)",
        }}
      />

      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Stardust Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, -100, -180],
              x: [0, p.randomX, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-text-muted/20 dark:bg-white/10"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.03] bg-[linear-gradient(var(--border-main)_1px,transparent_1px),linear-gradient(90deg,var(--border-main)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column A (Left Side - Content) */}
          <motion.div
            style={{ y: y1, opacity, scale }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.1 }}
              className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.4em] text-text-muted flex items-center gap-3"
            >
              <div className="w-8 h-px bg-border-main hidden lg:block"></div>
              Creative Vision / Technical Precision
              <div className="w-8 h-px bg-border-main lg:hidden"></div>
            </motion.div>

            {/* Animated Name */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative flex flex-col items-center lg:items-start text-7xl sm:text-[7.5rem] md:text-[9rem] font-bold tracking-tighter leading-none text-text-main select-none pointer-events-none"
            >
              <span className="flex">
                {firstName.split("").map((char, index) => (
                  <motion.span 
                    key={`first-${index}`} 
                    variants={letterVariants}
                    className="inline-block hover:scale-110 transition-transform cursor-pointer"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="flex text-transparent bg-clip-text bg-gradient-to-b from-text-main via-text-main to-zinc-500 dark:from-white dark:via-white dark:to-zinc-600 drop-shadow-[0_0_30px_rgba(0,0,0,0.03)] dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] mt-2">
                {lastName.split("").map((char, index) => (
                  <motion.span 
                    key={`last-${index}`} 
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Luxury Backdrop Text */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -top-10 -left-10 -z-10 text-[10rem] sm:text-[14rem] lg:text-[18rem] font-black text-text-main/[0.015] dark:text-white/[0.008] blur-[1px] select-none pointer-events-none tracking-widest leading-none outline-text hidden lg:block"
            >
              DESIGN
            </motion.div>

            {/* Immersive Subtext */}
            <p className="text-lg sm:text-xl text-text-muted font-light leading-relaxed tracking-wider max-w-xl">
              Elevating digital experiences with <span className="text-text-main font-medium">minimalist elegance</span> and <span className="text-text-main font-medium italic">uncompromising quality</span>.
            </p>
            
            {/* CTA's */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 w-full sm:w-auto">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, backgroundColor: "var(--accent)", color: "var(--accent-inverse)", borderColor: "var(--accent)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-4 rounded-none border border-border-main text-text-main font-bold text-xs tracking-[0.2em] transition-all overflow-hidden uppercase shadow-sm"
              >
                VIEW WORK
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, opacity: 1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-10 py-4 text-text-muted hover:text-text-main font-bold text-xs tracking-[0.2em] transition-all uppercase"
              >
                CONNECT
               <ArrowRight size={14} />
              </motion.a>
            </div>

            {/* Micro-Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-10 pt-6 text-text-muted/60 w-full">
              <a href="#" className="hover:text-text-main hover:-translate-y-0.5 transition-all"><FaGithub size={18} /></a>
              <a href="#" className="hover:text-text-main hover:-translate-y-0.5 transition-all"><FaLinkedin size={18} /></a>
              <a href="#" className="hover:text-text-main hover:-translate-y-0.5 transition-all"><Mail size={18} /></a>
            </div>
          </motion.div>

          {/* Column B (Right Side - 3D SceneCanvas / Mobile Static Fallback) */}
          <div className="lg:col-span-5 h-[320px] lg:h-[550px] relative w-full select-none flex items-center justify-center">
            {/* Mobile/Tablet Fallback Image (when 3D canvas is hidden) */}
            <div className="absolute inset-0 lg:hidden flex items-center justify-center p-4">
              <img 
                src={heroImg} 
                alt="Developer Vector Core" 
                className="w-full h-full object-contain max-h-[280px] opacity-90 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.15)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
              />
            </div>
            {/* Desktop 3D Canvas */}
            <div className="hidden lg:block w-full h-full">
              <Suspense 
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted/60">
                    Initializing 3D Vector Space...
                  </div>
                }
              >
                <SceneCanvas theme={theme} />
              </Suspense>
            </div>
          </div>

        </div>
      </div>

      {/* Perspective Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-main to-transparent flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="px-4 bg-bg-main text-[8px] tracking-[0.5em] text-text-muted uppercase transition-colors duration-500">Est / 2026</div>
      </motion.div>
    </section>
  );
};

export default Hero;
