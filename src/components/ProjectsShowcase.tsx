import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
} from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  GitCommit,
  Star,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import {
  projects,
  featuredProjects,
  gridProjects,
  allTechTags,
  type Project,
} from '../data/projectsData';

// ─── Floating Background Orbs ──────────────────────────────────────────────
const FloatingOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
      }}
      animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
        bottom: '5%',
        right: '-15%',
      }}
      animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
        top: '40%',
        left: '45%',
      }}
      animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.05, 0.95, 1] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
    />
  </div>
);

// ─── Tech Filter Bar ───────────────────────────────────────────────────────
interface TechFilterProps {
  activeFilter: string;
  onFilterChange: (tech: string) => void;
}
const TechFilter = ({ activeFilter, onFilterChange }: TechFilterProps) => {
  const filters = ['All', ...allTechTags];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-2 mb-16"
    >
      {filters.map((tech) => {
        const isActive = activeFilter === tech;
        return (
          <button
            key={tech}
            id={`filter-${tech.toLowerCase().replace(/\s/g, '-')}`}
            onClick={() => onFilterChange(tech)}
            className={`relative px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all duration-300 ${
              isActive
                ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                : 'bg-bg-card/40 border-border-subtle text-text-muted hover:border-cyan-500/30 hover:text-text-main'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filterActivePill"
                className="absolute inset-0 rounded-full bg-cyan-500/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tech}</span>
          </button>
        );
      })}
    </motion.div>
  );
};

// ─── Image Carousel ────────────────────────────────────────────────────────
interface ImageCarouselProps {
  images: string[];
  title: string;
  autoPlay?: boolean;
}
const ImageCarousel = ({ images, title, autoPlay = true }: ImageCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      setCurrent((idx + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!autoPlay || hovered || images.length <= 1) return;
    timerRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, hovered, current, goTo, images.length]);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-inherit group/carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} screenshot ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Arrows — show on hover if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(current - 1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-cyan-500/40 hover:border-cyan-400/40 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(current + 1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-cyan-500/40 hover:border-cyan-400/40 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={14} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-4 h-1.5 bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Status Badge ──────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Project['status'] }) => (
  <div
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[8px] font-bold uppercase tracking-[0.2em] ${
      status === 'completed'
        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
    }`}
  >
    {status === 'completed' ? (
      <CheckCircle2 size={9} className="shrink-0" />
    ) : (
      <Clock size={9} className="shrink-0 animate-pulse" />
    )}
    {status === 'completed' ? 'Completed' : 'In Progress'}
  </div>
);

// ─── Language Bar ──────────────────────────────────────────────────────────
const LanguageBar = ({ languages }: { languages: Project['stats']['languages'] }) => (
  <div className="space-y-2">
    <div className="w-full h-2 rounded-full overflow-hidden flex gap-px">
      {languages.map((lang) => (
        <div
          key={lang.name}
          style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
          className="h-full transition-all duration-500"
        />
      ))}
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {languages.map((lang) => (
        <div key={lang.name} className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: lang.color }}
          />
          <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest">
            {lang.name} <span className="text-text-main/70">{lang.percent}%</span>
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Project Modal (Case Study Lightbox) ──────────────────────────────────
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-card/95 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.15)] text-text-main scrollbar-hide z-10"
          >
            {/* Close button */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-bg-card-hover/80 border border-border-subtle hover:border-cyan-400/50 hover:text-cyan-400 flex items-center justify-center text-text-main transition-all duration-200"
              aria-label="Close case study"
            >
              <X size={15} />
            </button>

            {/* Image carousel at top */}
            <div className="w-full h-64 md:h-80 relative rounded-t-3xl overflow-hidden">
              <ImageCarousel images={project.images} title={project.title} autoPlay={false} />
            </div>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={project.status} />
                  <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-text-muted bg-bg-card-hover px-3 py-1 rounded-full border border-border-subtle">
                    {project.category} · {project.year}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-400 font-bold block">
                  Case Study
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tighter uppercase">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-light italic">
                  "{project.subtitle}"
                </p>
                <p className="text-text-main/80 text-sm leading-relaxed font-light">
                  {project.details}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                {/* Features list */}
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-main mb-4 flex items-center gap-2">
                    <Layers size={11} className="text-cyan-400" />
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[10px] uppercase tracking-wider text-text-muted leading-relaxed"
                      >
                        <div className="w-3 h-px bg-cyan-400 mt-[7px] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack + stats */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-main mb-4">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[8px] font-bold px-3 py-1.5 bg-bg-card-hover border border-border-subtle rounded-full uppercase tracking-widest text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.stats && (
                    <div>
                      <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-main mb-4">
                        Repository Stats
                      </h4>
                      <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-text-muted">
                          <GitCommit size={11} className="text-cyan-400" />
                          <span className="text-text-main font-bold">{project.stats.commits}</span>{' '}
                          commits
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-text-muted">
                          <Star size={11} className="text-amber-400" />
                          <span className="text-text-main font-bold">{project.stats.stars}</span>{' '}
                          stars
                        </div>
                      </div>
                      <LanguageBar languages={project.stats.languages} />
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-border-subtle/50">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle bg-bg-card-hover text-text-muted hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)] transition-all duration-300 text-[9px] font-bold uppercase tracking-[0.25em]"
                >
                  <FaGithub size={13} />
                  Repository
                </a>
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.4)] transition-all duration-300 text-[9px] font-bold uppercase tracking-[0.25em]"
                  >
                    Live Demo <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="flex items-center px-5 py-2.5 rounded-full border border-dashed border-border-subtle text-text-muted/50 text-[8px] font-bold uppercase tracking-[0.2em] cursor-default">
                    Live demo unavailable · private backend
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── Featured Project Card ─────────────────────────────────────────────────
interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  onCaseStudy: () => void;
}
const FeaturedProjectCard = ({ project, index, onCaseStudy }: FeaturedProjectCardProps) => {
  const imageOnLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="animated-border-wrapper group mb-8"
    >
      <div className="bg-bg-card/50 backdrop-blur-2xl rounded-3xl overflow-hidden relative">
        {/* Cybernetic grid backdrop */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.02) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[440px] ${
            imageOnLeft ? '' : 'lg:grid-flow-col-dense'
          }`}
        >
          {/* Image side */}
          <div
            className={`relative h-72 lg:h-auto overflow-hidden ${
              imageOnLeft ? 'lg:order-1 rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl' : 'lg:order-2 rounded-t-3xl lg:rounded-t-none lg:rounded-r-3xl'
            }`}
          >
            <ImageCarousel images={project.images} title={project.title} />
            {/* Category chip */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[7px] font-bold uppercase tracking-[0.25em] bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full">
                {project.category} · {project.year}
              </span>
            </div>
          </div>

          {/* Details side */}
          <div
            className={`flex flex-col justify-center p-8 md:p-12 lg:p-14 ${
              imageOnLeft ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <StatusBadge status={project.status} />
                <h3 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tighter uppercase leading-tight">
                  {project.title}
                </h3>
                <p className="text-text-muted text-[11px] leading-relaxed font-light italic">
                  {project.subtitle}
                </p>
                <p className="text-text-main/75 text-[11px] leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    className="text-[7px] font-bold px-2.5 py-1 bg-bg-card-hover border border-border-subtle rounded-full uppercase tracking-widest text-text-muted hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200 cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* Repo stats mini */}
              {project.stats && (
                <div className="flex gap-5 py-3 border-t border-b border-border-subtle/50">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-text-muted">
                    <GitCommit size={10} className="text-cyan-400" />
                    <span className="text-text-main font-bold">{project.stats.commits}</span> commits
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-text-muted">
                    <Star size={10} className="text-amber-400" />
                    <span className="text-text-main font-bold">{project.stats.stars}</span> stars
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  id={`github-btn-${project.id}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle bg-bg-card-hover text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)] transition-all duration-300 text-[8px] font-bold uppercase tracking-[0.2em]"
                >
                  <FaGithub size={12} /> GitHub
                </a>

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    id={`live-btn-${project.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-main text-bg-main hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300 text-[8px] font-bold uppercase tracking-[0.2em]"
                  >
                    Live Demo <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <span className="flex items-center px-5 py-2.5 rounded-full border border-dashed border-border-subtle text-text-muted/40 text-[7px] font-bold uppercase tracking-[0.15em] cursor-default">
                    Demo unavailable
                  </span>
                )}

                <button
                  id={`case-study-btn-${project.id}`}
                  onClick={onCaseStudy}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle text-text-muted hover:bg-bg-card-hover hover:text-text-main hover:border-border-main transition-all duration-300 text-[8px] font-bold uppercase tracking-[0.2em]"
                >
                  <BookOpen size={12} /> Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Grid Project Card ─────────────────────────────────────────────────────
interface GridCardProps {
  project: Project;
  index: number;
  onCaseStudy: () => void;
}
const ProjectGridCard = ({ project, index, onCaseStudy }: GridCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xRot = -((y - rect.height / 2) / rect.height) * 12;
    const yRot = ((x - rect.width / 2) / rect.width) * 12;
    setTiltStyle({ transform: `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg)` });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'all 0.5s ease',
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group animated-border-wrapper-sm h-full"
    >
      <div className="bg-bg-card/45 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col h-full relative">
        {/* Corner accents */}
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/20 group-hover:border-cyan-500/70 transition-colors duration-500 z-10" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/20 group-hover:border-cyan-500/70 transition-colors duration-500 z-10" />

        {/* Image */}
        <div className="h-52 relative overflow-hidden">
          <ImageCarousel images={[project.images[0]]} title={project.title} autoPlay={false} />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#030712]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center z-10">
            <button
              id={`grid-case-study-${project.id}`}
              onClick={onCaseStudy}
              className="flex flex-col items-center gap-2 group/btn"
            >
              <div className="w-12 h-12 rounded-full border border-cyan-500/40 flex items-center justify-center bg-cyan-500/20 group-hover/btn:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <BookOpen size={16} className="text-white" />
              </div>
              <span className="text-[8px] uppercase tracking-[0.3em] font-mono text-cyan-400 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                Case Study
              </span>
            </button>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div className="space-y-3 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              <span className="text-[7px] text-text-muted uppercase tracking-widest">
                {project.year}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-text-main tracking-tighter uppercase group-hover:text-cyan-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-text-muted text-[10px] leading-relaxed font-light line-clamp-3">
              {project.description}
            </p>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.slice(0, 4).map((t, i) => (
                <span
                  key={i}
                  className="text-[7px] font-bold text-cyan-400/80 uppercase tracking-widest font-mono"
                >
                  {t}{i < Math.min(project.tech.length - 1, 3) ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4 border-t border-border-subtle/50">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              id={`grid-github-${project.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full border border-border-subtle bg-bg-card-hover text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200 text-[7px] font-bold uppercase tracking-widest"
            >
              <FaGithub size={10} /> GitHub
            </a>
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                id={`grid-live-${project.id}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-text-main text-bg-main hover:bg-cyan-500 hover:text-white transition-all duration-200 text-[7px] font-bold uppercase tracking-widest"
              >
                Live <ArrowUpRight size={9} />
              </a>
            ) : (
              <button
                onClick={onCaseStudy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-text-main text-bg-main hover:bg-cyan-500 hover:text-white transition-all duration-200 text-[7px] font-bold uppercase tracking-widest"
              >
                <BookOpen size={10} /> Study
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── GitHub Stats Card (Aggregate) ────────────────────────────────────────
const GitHubStatsCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const totalCommits = projects.reduce((sum, p) => sum + (p.stats?.commits ?? 0), 0);
  const totalStars = projects.reduce((sum, p) => sum + (p.stats?.stars ?? 0), 0);
  const totalTechs = allTechTags.length;

  const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      if (!isInView) return;
      const duration = 1600;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setValue(target);
          clearInterval(timer);
        } else {
          setValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, [isInView, target]);
    return <>{value.toLocaleString()}{suffix}</>;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9 }}
      className="mt-16 bg-bg-card/40 backdrop-blur-xl border border-border-subtle/80 rounded-3xl p-8 md:p-12 relative overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10">
        <div className="text-center mb-10">
          <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-400 font-bold">
            Development Summary
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tighter uppercase mt-2">
            Code at a Glance
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Projects', value: projects.length, suffix: '' },
            { label: 'Commits', value: totalCommits, suffix: '+' },
            { label: 'Technologies', value: totalTechs, suffix: '' },
            { label: 'Stars', value: totalStars, suffix: '' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 bg-bg-card-hover/50 rounded-2xl border border-border-subtle/60"
            >
              <div className="text-2xl md:text-3xl font-black text-text-main font-mono mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[8px] uppercase tracking-[0.25em] text-text-muted font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Language distribution across all projects */}
        <div>
          <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted mb-4 text-center">
            Primary Language Distribution
          </h4>
          <div className="w-full h-3 rounded-full overflow-hidden flex gap-px mb-3">
            {[
              { name: 'PHP', percent: 28, color: '#6C7EB7' },
              { name: 'TypeScript', percent: 25, color: '#3178C6' },
              { name: 'React/JSX', percent: 24, color: '#61DAFB' },
              { name: 'MySQL', percent: 12, color: '#F29111' },
              { name: 'CSS', percent: 7, color: '#38BDF8' },
              { name: 'Other', percent: 4, color: '#6B7280' },
            ].map((lang) => (
              <motion.div
                key={lang.name}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${lang.percent}%` } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                style={{ backgroundColor: lang.color }}
                className="h-full"
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              { name: 'PHP', percent: 28, color: '#6C7EB7' },
              { name: 'TypeScript', percent: 25, color: '#3178C6' },
              { name: 'React/JSX', percent: 24, color: '#61DAFB' },
              { name: 'MySQL', percent: 12, color: '#F29111' },
              { name: 'CSS', percent: 7, color: '#38BDF8' },
              { name: 'Other', percent: 4, color: '#6B7280' },
            ].map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest">
                  {lang.name}{' '}
                  <span className="text-text-main/70">{lang.percent}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main ProjectsShowcase Section ────────────────────────────────────────
const ProjectsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredFeatured = activeFilter === 'All'
    ? featuredProjects
    : featuredProjects.filter((p) => p.tech.includes(activeFilter));

  const filteredGrid = activeFilter === 'All'
    ? gridProjects
    : gridProjects.filter((p) => p.tech.includes(activeFilter));

  const anyVisible = filteredFeatured.length > 0 || filteredGrid.length > 0;

  return (
    <section id="projects" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <FloatingOrbs />

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">
            Built & Shipped
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-text-main mb-6 tracking-tighter uppercase">
            Project{' '}
            <span className="text-text-muted font-normal italic">Showcase</span>
          </h2>
          <p className="text-text-muted text-sm font-light max-w-lg mx-auto leading-relaxed">
            A curated collection of full-stack systems, capstone projects, and tools — each built to solve real problems.
          </p>
          <div className="w-12 h-px bg-cyan-500/50 mx-auto mt-6 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </motion.div>

        {/* Tech Filter */}
        <TechFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Featured Projects */}
        <AnimatePresence mode="wait">
          {filteredFeatured.length > 0 && (
            <motion.div
              key="featured-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-cyan-400">
                  Featured Projects
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
              </motion.div>

              {filteredFeatured.map((project, i) => (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onCaseStudy={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid Projects */}
        <AnimatePresence mode="wait">
          {filteredGrid.length > 0 && (
            <motion.div
              key="grid-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-text-muted">
                  More Projects
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-border-subtle to-transparent" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrid.map((project, i) => (
                  <ProjectGridCard
                    key={project.id}
                    project={project}
                    index={i}
                    onCaseStudy={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!anyVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 text-text-muted"
          >
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold">
              No projects match "{activeFilter}"
            </p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 text-[9px] text-cyan-400 underline underline-offset-4 hover:text-cyan-300 transition-colors uppercase tracking-widest font-bold"
            >
              Clear Filter
            </button>
          </motion.div>
        )}

        {/* GitHub Stats Card */}
        <GitHubStatsCard />
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsShowcase;
