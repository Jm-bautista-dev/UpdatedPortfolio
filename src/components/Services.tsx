import React from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, Code2, Rocket, PaintBucket } from 'lucide-react';

interface CapabilityItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
  experience: string;
}

const capabilities: CapabilityItem[] = [
  {
    icon: <MonitorSmartphone size={22} />,
    title: "Frontend Engineering",
    desc: "Crafting highly performant, responsive web interfaces with smooth micro-interactions. Engineered the layout systems and 60fps animations for dynamic interactive dashboards and custom portfolios.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    experience: "Applied in 4+ projects"
  },
  {
    icon: <Code2 size={22} />,
    title: "Full-Stack Development",
    desc: "Architecting robust end-to-end applications with secure API pipelines and relational databases. Developed the QR attendance system and transaction simulators with secure authentication.",
    tags: ["Node.js", "PHP", "MySQL", "Firebase", "REST APIs"],
    experience: "Deployed in 3+ systems"
  },
  {
    icon: <Rocket size={22} />,
    title: "Backend & Cloud Systems",
    desc: "Designing scalable database structures and serverless cloud architectures. Experienced in building automated PDF report engines, secure file delivery, and cloud deployment pipelines.",
    tags: ["AWS Services", "DevOps", "CI/CD Pipelines", "Docker", "Database Tuning"],
    experience: "Used across all cloud projects"
  },
  {
    icon: <PaintBucket size={22} />,
    title: "UI/UX & Interactive Design",
    desc: "Bridging the gap between code and design to build luxurious digital spaces. Creating visual identity guidelines, Figma wireframes, and immersive 3D scene integrations using Three.js and Canvas.",
    tags: ["Figma", "UI Design System", "Three.js", "WebGL", "Motion Design"],
    experience: "Core styling standard"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  }
};

const Services = () => {
  return (
    <section id="services" className="relative z-20 pb-24 px-6 lg:px-12 -mt-16 lg:-mt-24">
      <div className="container mx-auto max-w-5xl">
        {/* Header Title describing Core Capabilities */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tighter uppercase">
            Core <span className="text-text-muted font-normal italic">Capabilities</span>
          </h2>
          <div className="w-12 h-px bg-cyan-500/30 mx-auto mt-4 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {capabilities.map((capability, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.4 }
              }}
              className="bg-bg-card/45 backdrop-blur-2xl p-8 rounded-3xl border border-border-subtle/80 relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-[0_15px_30px_rgba(6,182,212,0.1)] flex flex-col justify-between transition-all duration-500 min-h-[380px]"
            >
              {/* Subtle Inner Glow */}
              <div className="absolute top-[-30px] right-[-30px] w-20 h-20 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/5 blur-2xl pointer-events-none transition-all duration-500" />
              
              <div>
                <div className="w-10 h-10 mb-6 rounded-full bg-bg-card-hover border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-500 relative z-10">
                  {capability.icon}
                </div>
                
                <h3 className="text-base font-extrabold text-text-main mb-3 tracking-tight relative z-10 uppercase group-hover:text-cyan-400 transition-colors">
                  {capability.title}
                </h3>
                
                <p className="text-text-muted text-xs leading-relaxed relative z-10 font-light group-hover:text-text-main/90 transition-colors duration-500 mb-6">
                  {capability.desc}
                </p>
              </div>

              {/* Tags and Experience Context */}
              <div className="relative z-10 pt-4 border-t border-border-subtle/50 mt-auto">
                <span className="text-[8px] font-mono font-bold text-cyan-400/90 uppercase tracking-widest block mb-3">
                  {capability.experience}
                </span>
                
                <div className="flex flex-wrap gap-1.5">
                  {capability.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="text-[8.5px] font-mono px-2 py-0.5 bg-bg-card-hover border border-border-subtle text-text-muted rounded-md group-hover:text-text-main group-hover:border-cyan-500/20 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Cybernetic brackets */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-500/10 group-hover:border-cyan-500/50 transition-colors duration-500" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-cyan-500/10 group-hover:border-cyan-500/50 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
