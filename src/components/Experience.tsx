import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  desc: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Freelance Senior Developer",
    company: "Self-Employed",
    period: "2018 - Present",
    desc: "Designed and developed scalable web applications for international clients. Specialized in creating custom e-commerce platforms, SaaS dashboards, and workflow automation tools.",
  },
  {
    role: "Lead Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2014 - 2018",
    desc: "Led a team of 5 developers to build and maintain enterprise-level management systems. Restructured frontend architecture to improve load times by 40%.",
  },
  {
    role: "Web Developer",
    company: "Digital Creations",
    period: "2011 - 2014",
    desc: "Developed responsive websites and web apps. Collaborated closely with UI/UX designers to implement pixel-perfect user interfaces.",
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl z-10 relative">
        
        {/* Section Title Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">Professional History</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tighter uppercase">
            Timeline <span className="text-text-muted font-normal italic">Stream</span>
          </h2>
          <div className="w-12 h-px bg-cyan-500/50 mx-auto shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        </motion.div>

        {/* Floating Space Timeline Guide */}
        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-400 before:via-blue-500 before:to-transparent dark:before:shadow-[0_0_8px_rgba(6,182,212,0.4)]">
          
          {experiences.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline Hologram Dot Ring */}
              <div className="w-10 h-10 rounded-full border border-cyan-500/20 bg-bg-card/85 flex items-center justify-center absolute left-0 md:left-1/2 -ml-5 md:-ml-5 z-10 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all duration-500">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              </div>

              {/* Holographic Log Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] ml-14 md:ml-0 p-8 md:p-10 bg-bg-card/45 backdrop-blur-xl border border-border-subtle/80 rounded-3xl relative overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.1)] transition-all duration-500"
              >
                {/* Embedded dynamic sweep spotlight background */}
                <div className="absolute top-[-40px] right-[-40px] w-24 h-24 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/5 blur-xl pointer-events-none transition-all duration-500" />

                <div className="flex flex-col mb-6">
                  <h3 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight uppercase group-hover:text-cyan-400 transition-colors">{item.role}</h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mt-3 gap-2 border-b border-border-subtle/50 pb-4">
                    <span className="text-[9px] uppercase tracking-widest text-cyan-400/90 font-bold font-mono">SYS://{item.company}</span>
                    <span className="text-[8px] uppercase tracking-widest text-text-muted font-bold font-mono">TIME::{item.period}</span>
                  </div>
                </div>
                
                <p className="text-text-muted leading-relaxed text-xs sm:text-sm font-light group-hover:text-text-main/90 transition-colors duration-500">
                  {item.desc}
                </p>
                
                {/* Cybernetic bracket outlines */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-500/10 group-hover:border-cyan-500/50 transition-colors duration-500" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-cyan-500/10 group-hover:border-cyan-500/50 transition-colors duration-500" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
