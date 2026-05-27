import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Layout, Cpu, Database, Activity } from 'lucide-react';

interface FocusItem {
  icon: ReactNode;
  title: string;
  tags: string[];
  desc: string;
  usedIn: string;
}

const focuses: FocusItem[] = [
  {
    icon: <Cpu className="text-cyan-400" size={20} />,
    title: "Frontend Web Development",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    desc: "Building responsive, modern user interfaces and modular components. Engineered dashboard panels, real-time data visualizers, and interactive state managers for projects like the POS System and Portfolio Showcase.",
    usedIn: "POS System, Attendance System, Developer Portfolio"
  },
  {
    icon: <Layout className="text-purple-400" size={20} />,
    title: "UI/UX & Responsive Layouts",
    tags: ["Interface Design", "Figma", "Micro-Animations", "Glassmorphism"],
    desc: "Designing clean visual systems, layout grids, and interactive user flows. Crafting pixel-perfect, accessible browser experiences with subtle transitions, theme integrations, and responsive structures.",
    usedIn: "Portfolio Website, Attendance System Dashboard"
  },
  {
    icon: <Database className="text-blue-400" size={20} />,
    title: "Full-Stack Engineering",
    tags: ["PHP", "MySQL", "Node.js", "REST APIs"],
    desc: "Developing secure backend web services, server routes, and relational database structures. Built core authentication protocols, attendance scanner integrations, and automated PDF reporting engines.",
    usedIn: "Attendance Management System, Local POS Server"
  },
  {
    icon: <Activity className="text-emerald-400" size={20} />,
    title: "Interactive Systems & Integrations",
    tags: ["Three.js", "Firebase", "Web Storage", "Canvas Drawing"],
    desc: "Integrating real-time features and creative web canvas layouts. Experienced in managing local/session storage cache, asynchronous background services, and rendering interactive web graphics.",
    usedIn: "Portfolio WebGL Canvas, Attendance Database Sync"
  }
];

const FocusAreas = () => {
  return (
    <section id="focus-areas" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl z-10 relative">
        
        {/* Section Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">Transitional Node</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tighter uppercase">
            Core <span className="text-text-muted font-normal italic">Focus</span>
          </h2>
          <div className="w-12 h-px bg-cyan-500/50 mx-auto shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        </motion.div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {focuses.map((focus, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-bg-card/45 backdrop-blur-2xl border border-border-subtle/80 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 hover:shadow-[0_15px_30px_rgba(6,182,212,0.08)] flex flex-col justify-between transition-all duration-500"
            >
              {/* Dynamic Aura Backdrop */}
              <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/5 blur-2xl pointer-events-none transition-all duration-500" />
              
              <div>
                {/* Header Icon Row */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-bg-card-hover border border-border-subtle group-hover:border-cyan-500/30 transition-all">
                    {focus.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-text-main uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                    {focus.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-text-muted text-xs leading-relaxed font-light mb-6">
                  {focus.desc}
                </p>

                {/* Used In Project Mapping badge */}
                <div className="mb-6 flex flex-col gap-1">
                  <span className="text-[7.5px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    Applied Projects:
                  </span>
                  <span className="text-[10px] font-medium text-text-main/90 leading-tight">
                    {focus.usedIn}
                  </span>
                </div>
              </div>

              {/* Tag System */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle/50">
                {focus.tags.map((tag, tIndex) => (
                  <span 
                    key={tIndex} 
                    className="text-[8px] font-mono font-bold uppercase tracking-widest text-text-muted bg-bg-card-hover/40 border border-border-subtle/60 px-2.5 py-1.5 rounded-md group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Cybernetic HUD Brackets */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-500/10 group-hover:border-cyan-500/50 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FocusAreas;
