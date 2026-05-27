import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SKILL_LIMIT = 6;

interface SkillItem {
  name: string;
  level: 'Core' | 'Advanced' | 'Familiar';
}

interface CategoryItem {
  title: string;
  projectContext: string;
  skills: SkillItem[];
}

const techStack: CategoryItem[] = [
  {
    title: "Frontend Development",
    projectContext: "Used in: POS System, Attendance System, Portfolio",
    skills: [
      { name: "React", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
      { name: "HTML", level: "Core" },
      { name: "CSS", level: "Core" },
      { name: "Bootstrap", level: "Advanced" }
    ]
  },
  {
    title: "Backend Development",
    projectContext: "Used in: Attendance Scanner, Local Server APIs",
    skills: [
      { name: "PHP", level: "Core" },
      { name: "Node.js", level: "Advanced" },
      { name: "Flask", level: "Advanced" },
      { name: "REST APIs", level: "Core" },
      { name: "Python", level: "Familiar" },
      { name: "Laravel", level: "Familiar" }
    ]
  },
  {
    title: "Database Systems",
    projectContext: "Used in: DB Schema Design, Report Generation",
    skills: [
      { name: "MySQL", level: "Core" },
      { name: "SQLite", level: "Advanced" },
      { name: "Database Design", level: "Core" },
      { name: "Firebase", level: "Familiar" },
      { name: "MongoDB", level: "Familiar" }
    ]
  },
  {
    title: "UI/UX Engineering",
    projectContext: "Used in: Portfolio Theme, Dashboard Panels",
    skills: [
      { name: "Responsive UI", level: "Core" },
      { name: "Figma Design", level: "Advanced" },
      { name: "UX Patterns", level: "Advanced" },
      { name: "Three.js WebGL", level: "Familiar" },
      { name: "Motion Design", level: "Familiar" }
    ]
  },
  {
    title: "Tools & Workflow",
    projectContext: "Used in: Version Control, Deployment Pipelines",
    skills: [
      { name: "Git", level: "Core" },
      { name: "VS Code", level: "Core" },
      { name: "XAMPP", level: "Advanced" },
      { name: "Firebase Tools", level: "Familiar" },
      { name: "Webflow", level: "Familiar" },
      { name: "Wix", level: "Familiar" }
    ]
  }
];

const skillContainerVariants = {
  collapsed: { opacity: 1 },
  expanded: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    }
  }
};

const skillItemVariants = {
  collapsed: { opacity: 1, y: 0, scale: 1 },
  expanded: {
    opacity: [0, 1],
    y: [12, 0],
    scale: [0.95, 1],
    transition: { duration: 0.4, ease: "easeOut" as any }
  }
};

const TechStackCard = ({ category, index }: { category: CategoryItem; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalSkills = category.skills.length;
  const hasMore = totalSkills > SKILL_LIMIT;
  const hiddenCount = totalSkills - SKILL_LIMIT;
  
  const visibleSkills = isExpanded 
    ? category.skills 
    : category.skills.slice(0, SKILL_LIMIT);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="p-8 bg-bg-card/45 backdrop-blur-2xl border border-border-subtle/80 rounded-3xl relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col h-[450px]"
    >
      {/* Glowing Aura Backdrop */}
      <div className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/5 blur-3xl pointer-events-none transition-all duration-700" />
      <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 blur-3xl pointer-events-none transition-all duration-700" />

      {/* Card Header with Project Context */}
      <motion.div layout="position" className="relative mb-6">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-text-main pb-2">
          {category.title}
        </h3>
        
        {/* Project Context Label */}
        <div className="text-[8px] font-mono text-cyan-400/90 uppercase tracking-[0.18em] mb-3 leading-tight select-none">
          {category.projectContext}
        </div>
        
        <div className="w-full h-px bg-border-subtle group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-transparent transition-all duration-500" />
      </motion.div>

      {/* Clustered Skills Grid */}
      <div className="relative flex-grow overflow-hidden">
        <motion.div
          layout
          initial={false}
          className={`h-full overflow-y-auto pr-2 scrollbar-hide ${isExpanded ? 'pb-4' : ''}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <motion.div
            layout
            variants={skillContainerVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            className="flex flex-wrap gap-2.5 pt-1"
          >
            {visibleSkills.map((skill, i) => {
              // Custom colors based on proficiency levels
              let levelBadgeStyle = "bg-bg-card-hover/45 text-text-muted border-border-subtle/80";
              let hoverAnimationEffects = {
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.15)",
                color: "#f4f4f5"
              };

              if (skill.level === "Core") {
                levelBadgeStyle = "bg-cyan-500/5 text-cyan-400 border-cyan-500/35 font-bold shadow-[0_0_8px_rgba(6,182,212,0.05)]";
                hoverAnimationEffects = {
                  scale: 1.05, 
                  borderColor: "rgba(6, 182, 212, 0.6)",
                  color: "#22d3ee",
                  boxShadow: "0 0 10px rgba(6, 182, 212, 0.25)"
                } as any;
              } else if (skill.level === "Advanced") {
                levelBadgeStyle = "bg-bg-card-hover/70 text-text-main border-border-main/70";
                hoverAnimationEffects = {
                  scale: 1.05,
                  borderColor: "rgba(255, 255, 255, 0.35)",
                  color: "#ffffff",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.05)"
                } as any;
              } else {
                levelBadgeStyle = "bg-bg-card-hover/20 text-text-muted/65 border-border-subtle/30 border-dashed";
                hoverAnimationEffects = {
                  scale: 1.03,
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "#a1a1aa",
                  boxShadow: "none"
                } as any;
              }

              return (
                <motion.span
                  layout
                  key={skill.name}
                  variants={i >= SKILL_LIMIT ? skillItemVariants : {}}
                  whileHover={hoverAnimationEffects}
                  className={`text-[9px] uppercase tracking-widest px-4 py-2 border rounded-full transition-all duration-300 pointer-events-auto select-none ${levelBadgeStyle}`}
                >
                  {skill.name}
                </motion.span>
              );
            })}
          </motion.div>
        </motion.div>

        {!isExpanded && hasMore && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-bg-card/90 via-bg-card/30 to-transparent pointer-events-none z-10" />
        )}
      </div>

      {/* Controller Toggle Button */}
      <div className="mt-auto">
        {hasMore && (
          <motion.button
            layout="position"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-cyan-400 transition-all duration-300 w-full pt-5 border-t border-border-subtle/50 group/btn"
          >
            <span>{isExpanded ? "Lock Node" : `+${hiddenCount} Expand`}</span>
            {isExpanded ? (
              <ChevronUp size={12} className="group-hover/btn:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown size={12} className="group-hover/btn:translate-y-0.5 transition-transform" />
            )}
          </motion.button>
        )}
      </div>

      {/* HUD Accents */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-500/20 group-hover:border-cyan-500/80 transition-colors duration-500" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-cyan-500/20 group-hover:border-cyan-500/80 transition-colors duration-500" />
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="tech-stack" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl z-10 relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">SYSTEM SPECS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tighter uppercase">
            Skill <span className="text-text-muted font-normal italic">Reactor</span>
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-cyan-500/50 mx-auto shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            
            {/* Visual Legend explaining proficiency levels */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-[8px] font-mono uppercase tracking-widest text-text-muted">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]"></span>
                <span className="text-text-main font-bold">Core Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                <span>Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full border border-dashed border-text-muted/60"></span>
                <span>Familiar</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {techStack.map((category, index) => (
            <TechStackCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
