import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">Manifesto</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tighter uppercase">
            Identity <span className="text-text-muted font-normal italic">Node</span>
          </h2>
          <div className="w-12 h-px bg-cyan-500/50 mx-auto shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        </motion.div>

        {/* Hologram Card Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(6,182,212,0.15)" }}
          className="relative bg-bg-card/45 backdrop-blur-2xl border border-border-subtle/80 rounded-3xl p-8 md:p-14 shadow-xl transition-all duration-700 overflow-hidden"
        >
          {/* Cybernetic Scanlines */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,6px_100%] opacity-20 dark:opacity-40" />

          {/* Glowing Ambient Core Spotlight */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
            
            {/* Left Column: Hologram Profile Scan */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-[4/5] overflow-hidden bg-bg-card border border-cyan-500/30 rounded-2xl p-1.5 shadow-[0_0_20px_rgba(6,182,212,0.08)] group">
                
                {/* Neon Cyan Scanner Laser bar */}
                <div 
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.9)] z-20"
                  style={{
                    animation: 'scannerLaser 4s linear infinite',
                    backgroundImage: 'linear-gradient(90deg, transparent, #22d3ee, transparent)'
                  }}
                />
                
                {/* Scanner Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />
                
                <div className="w-full h-full bg-bg-card-hover overflow-hidden rounded-xl relative">
                  <img
                    src="/images/turn.jpg"
                    alt="Jhon Michael Profile"
                    className="w-full h-full object-cover grayscale brightness-90 dark:brightness-75 group-hover:brightness-100 group-hover:scale-102 transition-all duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-30 group-hover:opacity-0 transition-opacity duration-700" />
                </div>
              </div>

              {/* Live Technical Readouts */}
              <div className="mt-6 flex flex-col items-center space-y-1 font-mono text-[8px] tracking-[0.25em] text-cyan-400/80 uppercase">
                <span className="animate-pulse">● FEEDING SCAN DATA...</span>
                <span className="text-text-muted/60">SYS_MATCH: 100% OK</span>
              </div>
            </div>

            {/* Right Column: Holographic Details */}
            <div className="md:col-span-7 space-y-8 flex flex-col text-center md:text-left">
              
              {/* Identity Header */}
              <div className="space-y-4">
                <div className="inline-flex mx-auto md:mx-0 items-center gap-3 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full font-mono text-[8px] uppercase tracking-[0.25em] text-cyan-400 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  NODE_ID: JM.DEV
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold text-text-main leading-tight tracking-tight uppercase">
                  Michael <span className="text-text-muted font-light italic">Jhon</span>
                </h3>
              </div>

              {/* Bio block */}
              <p className="text-text-muted leading-relaxed text-base sm:text-lg font-light tracking-wide">
                I specialize in architectural UI design and scalable front-end systems. My philosophy is rooted in the belief that luxury is found in simplicity and that every pixel must serve a purpose, bridging complex data states with minimal design.
              </p>

              {/* Holographic Specification Nodes */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border-subtle/50 font-mono">
                <div className="text-center md:text-left">
                  <h4 className="text-[8px] uppercase tracking-widest text-text-muted mb-2 font-bold">STATUS</h4>
                  <p className="text-xs font-black text-cyan-400 tracking-wider">ONLINE</p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[8px] uppercase tracking-widest text-text-muted mb-2 font-bold">EXHIBITS</h4>
                  <p className="text-xs font-black text-text-main tracking-wider">50+ LIVE</p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-[8px] uppercase tracking-widest text-text-muted mb-2 font-bold">SECTOR</h4>
                  <p className="text-xs font-black text-text-main tracking-wider">UI / FULLSTACK</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scannerLaser {
          0% { top: 0%; opacity: 0.1; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0.1; }
        }
      `}} />
    </section>
  );
};

export default About;
