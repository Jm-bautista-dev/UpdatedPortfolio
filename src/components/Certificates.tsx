import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, X, Loader2, Building, Eye, Search, Filter } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  pdfUrl: string;
}

const certificates: CertificateItem[] = [
  {
    id: 1,
    title: "AWS Services Overview for IT Professionals",
    issuer: "Amazon Web Services (Coursera)",
    date: "Dec 5, 2025",
    pdfUrl: "/certificates/AWS Services Overview for IT Professionals.pdf",
  },
  {
    id: 2,
    title: "Getting Started with Data Analytics on AWS",
    issuer: "Amazon Web Services (Coursera)",
    date: "Nov 19, 2025",
    pdfUrl: "/certificates/Getting Started with Data Analytics on AWS.pdf",
  },
  {
    id: 3,
    title: "CCS Summit Bridging the Digital Divide",
    issuer: "Laguna University",
    date: "Apr 14, 2025",
    pdfUrl: "/certificates/Bridging the  Digital Divide.pdf",
  },
  {
    id: 4,
    title: "Hack Proof Mastering Cyber Security Essentials",
    issuer: "Laguna University",
    date: "Apr 14, 2025",
    pdfUrl: "/certificates/Hack Proof Mastering Cyber Security Essentials.pdf",
  },
  {
    id: 5,
    title: "Introduction to DevOps",
    issuer: "Laguna University",
    date: "Jun 4, 2025",
    pdfUrl: "/certificates/Introduction to DevOps.pdf",
  },
  {
    id: 6,
    title: "New Trends and Technologies, New Platforms used in the Industry",
    issuer: "Laguna University",
    date: "Jun 4, 2025",
    pdfUrl: "/certificates/OneCCS Connected Minds.pdf",
  },
  {
    id: 7,
    title: "Hands-on with AWS for IT Professionals",
    issuer: "Amazon Web Services (Coursera)",
    date: "Jun 4, 2025",
    pdfUrl: "/certificates/Hands-on with AWS for IT Professionals.pdf",
  }
];

const certificateTagsMap: Record<number, string[]> = {
  1: ["AWS", "Cloud Services", "IT Infrastructure"],
  2: ["AWS", "Data Analytics", "Cloud Analytics"],
  3: ["Technology Summit", "Networking", "Industry Insights"],
  4: ["Cyber Security", "Ethical Hacking", "System Security"],
  5: ["DevOps Fundamentals", "CI/CD Pipeline", "System Automation"],
  6: ["Emerging Tech", "New Platforms", "IT Trends"],
  7: ["AWS Hands-on", "Cloud Architecture", "Practical Lab"]
};

const certificateCategoryMap: Record<number, string> = {
  1: "Cloud",
  2: "Cloud",
  3: "Academic",
  4: "Security",
  5: "DevOps",
  6: "Academic",
  7: "Cloud"
};

const getCategoryForCertificate = (cert: CertificateItem): string => {
  return certificateCategoryMap[cert.id] || "Academic";
};

const getTagsForCertificate = (cert: CertificateItem) => {
  if (certificateTagsMap[cert.id]) {
    return certificateTagsMap[cert.id];
  }
  const title = cert.title.toLowerCase();
  const tags: string[] = [];
  if (title.includes("aws")) tags.push("AWS", "Cloud");
  if (title.includes("devops")) tags.push("DevOps", "CI/CD");
  if (title.includes("security") || title.includes("proof")) tags.push("Security", "Cybersecurity");
  if (title.includes("data") || title.includes("analytics")) tags.push("Data Science", "Analytics");
  if (tags.length === 0) {
    tags.push("Certification", "Verified");
  }
  return tags;
};

// Hook to load PDF.js dynamically (called only inside detail lightbox)
const usePDFJS = () => {
  const [pdfjs, setPdfjs] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if ((window as any).pdfjsLib) {
      setPdfjs((window as any).pdfjsLib);
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.async = true;
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        setPdfjs(pdfjsLib);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    script.onerror = () => {
      setError(true);
      setLoading(false);
    };
    document.body.appendChild(script);
  }, []);

  return { pdfjs, loading, error };
};

interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
  pdfjs: any;
  pdfjsLoading: boolean;
  pdfjsError: boolean;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ pdfUrl, title, pdfjs, pdfjsLoading, pdfjsError }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    let active = true;
    if (pdfjsLoading || pdfjsError || !pdfjs) {
      if (pdfjsError) {
        setRenderError(true);
        setLoading(false);
      }
      return;
    }

    const renderPDF = async () => {
      try {
        setLoading(true);
        setRenderError(false);
        const encodedUrl = encodeURI(pdfUrl);
        const loadingTask = pdfjs.getDocument(encodedUrl);
        const pdf = await loadingTask.promise;
        if (!active) return;

        const page = await pdf.getPage(1);
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
        if (active) {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error rendering PDF preview:', err);
        if (active) {
          setRenderError(true);
          setLoading(false);
        }
      }
    };

    renderPDF();

    return () => {
      active = false;
    };
  }, [pdfUrl, pdfjs, pdfjsLoading, pdfjsError]);

  if (loading || pdfjsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-bg-card-hover/40 animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-500/50" />
      </div>
    );
  }

  if (renderError || pdfjsError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-bg-card-hover to-bg-card text-center">
        <Award className="w-8 h-8 text-cyan-500 mb-2" />
        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Verification Document</span>
        <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-[200px]">{title}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center bg-bg-main">
      <canvas ref={canvasRef} className="w-full h-auto object-cover max-h-full" />
    </div>
  );
};

// On-demand PDF Renderer wrapper inside modal
const PDFRenderer: React.FC<{ pdfUrl: string; title: string }> = ({ pdfUrl, title }) => {
  const { pdfjs, loading: pdfjsLoading, error: pdfjsError } = usePDFJS();
  return (
    <PDFPreview 
      pdfUrl={pdfUrl} 
      title={title} 
      pdfjs={pdfjs} 
      pdfjsLoading={pdfjsLoading} 
      pdfjsError={pdfjsError} 
    />
  );
};

// Lightweight design card placeholder for lazy-loaded main & gallery grids
const CertificateCardPlaceholder: React.FC<{ title: string; issuer: string; date: string }> = ({ title, issuer, date }) => {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-bg-card-hover/90 to-bg-card/45 border-b border-border-subtle/50 overflow-hidden select-none">
      {/* Cybernetic details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d403_1px,transparent_1px),linear-gradient(to_bottom,#06b6d403_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-card/60 via-transparent to-transparent pointer-events-none" />
      
      {/* Mini tech frames */}
      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-cyan-500/10 pointer-events-none" />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-cyan-500/10 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-cyan-500/10 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-cyan-500/10 pointer-events-none" />
      
      <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-cyan-500/5 blur-xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400/90 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Award className="w-6 h-6 animate-[pulse_3s_infinite]" />
        </div>
        
        <span className="text-[7.5px] font-mono font-bold text-cyan-500/90 uppercase tracking-[0.25em] mb-1.5">Verified Credential</span>
        <p className="text-[11px] font-bold text-text-main/90 max-w-[210px] line-clamp-2 uppercase tracking-wide px-2 leading-relaxed font-sans">{title}</p>
        <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider mt-1">{issuer}</span>
      </div>
    </div>
  );
};

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMerging, setIsMerging] = useState(false);

  const openModal = (cert: CertificateItem) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    if (!isGalleryOpen) {
      document.body.style.overflow = 'auto';
    }
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleDownloadAll = async () => {
    if (isMerging) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const cert of certificates) {
        const response = await fetch(encodeURI(cert.pdfUrl));
        if (!response.ok) throw new Error(`Failed to fetch ${cert.pdfUrl}`);
        const pdfBytes = await response.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'All_Certificates.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge certificates. Please check your connection or individual certificates.');
    } finally {
      setIsMerging(false);
    }
  };

  // Home section pagination: display first 6 certificates
  const homeCertificates = certificates.slice(0, 6);

  // Gallery categorization filtering & search filter
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === "All") return matchesSearch;
    const certCategory = getCategoryForCertificate(cert);
    return matchesSearch && certCategory === activeCategory;
  });

  const categories = ["All", "Cloud", "DevOps", "Security", "Academic"];

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Soft backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">Accolades</span>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main tracking-tighter uppercase">
              Honors & <span className="text-text-muted font-normal italic">Verification</span>
            </h2>
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1.5 rounded-full font-bold select-none">
              {certificates.length} Credentials Verified
            </span>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-px bg-cyan-500/30 mx-auto shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>

            <button
              onClick={openGallery}
              className="group relative flex items-center gap-3 px-8 py-3.5 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-500 border border-border-subtle/80 bg-text-main text-bg-main hover:bg-cyan-500 hover:text-white hover:border-cyan-500 shadow-md cursor-pointer"
            >
              <span>Explore Credentials Catalog</span>
            </button>
          </div>
        </motion.div>

        {/* Homepage Limited Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="animated-border-wrapper-sm group"
            >
              <div className="h-full flex flex-col bg-bg-card/45 backdrop-blur-xl border border-border-subtle/80 rounded-[23px] overflow-hidden shadow-lg hover:shadow-cyan-500/5 transition-all duration-500">
                {/* Lightweight Preview Placeholder */}
                <div 
                  className="h-48 relative overflow-hidden border-b border-border-subtle/80 cursor-pointer"
                  onClick={() => openModal(cert)}
                >
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <CertificateCardPlaceholder 
                      title={cert.title} 
                      issuer={cert.issuer} 
                      date={cert.date} 
                    />
                  </div>
                  
                  {/* Action overlay on hover */}
                  <div className="absolute inset-0 bg-[#030712]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="px-5 py-2.5 rounded-full bg-cyan-500 text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      <Eye size={12} />
                      <span>View Credential</span>
                    </div>
                  </div>

                  {/* Date badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-[#030712]/80 backdrop-blur-md px-3 py-1 border border-cyan-500/20 rounded-full">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-text-muted text-[9px] font-semibold uppercase tracking-wider mb-2 font-mono">
                      <Building className="w-3.5 h-3.5 text-cyan-500/70" />
                      <span>{cert.issuer}</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-text-main group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 uppercase tracking-tight mb-4 leading-snug">
                      {cert.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {getTagsForCertificate(cert).map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-[9px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 bg-bg-card-hover border border-border-subtle/85 text-text-muted rounded-md group-hover:border-cyan-500/20 group-hover:text-cyan-400/80 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-subtle/50">
                    <a
                      href={encodeURI(cert.pdfUrl)}
                      download
                      className="flex items-center justify-center gap-1.5 text-[8.5px] font-extrabold uppercase tracking-widest bg-text-main text-bg-main rounded-xl py-3 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Save</span>
                      <Download size={11} />
                    </a>
                    <button
                      onClick={() => openModal(cert)}
                      className="flex items-center justify-center gap-1.5 text-[8.5px] font-extrabold uppercase tracking-widest bg-bg-card-hover text-text-main rounded-xl py-3 hover:border-cyan-500 hover:text-cyan-400 border border-border-subtle transition-all duration-300"
                    >
                      <span>Verify</span>
                      <Award size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA Footer (if pagination hides items) */}
        {certificates.length > 6 && (
          <div className="text-center mt-16">
            <button
              onClick={openGallery}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-[9.5px] font-bold uppercase tracking-[0.25em] rounded-full border border-border-subtle hover:border-cyan-500 bg-bg-card/45 backdrop-blur-md text-text-main hover:text-cyan-400 transition-all duration-500 cursor-pointer shadow-md"
            >
              <span>Show All Certificates ({certificates.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* Full-Screen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-[#030712]/95 backdrop-blur-2xl px-6 py-12 md:py-24"
          >
            <div className="container mx-auto max-w-6xl">
              {/* Header section with catalog tools */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border-subtle pb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-text-main uppercase tracking-tight">Credentials Catalog</h3>
                    <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full font-bold select-none">
                      {certificates.length} Total
                    </span>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">Browse and search verified program certifications</p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleDownloadAll}
                    disabled={isMerging}
                    className={`
                      flex items-center gap-2 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest rounded-full border border-border-subtle/85 transition-all duration-500
                      ${isMerging ? 'bg-bg-card-hover cursor-wait text-text-muted' : 'bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.2)]'}
                    `}
                  >
                    {isMerging ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Download size={12} />
                    )}
                    <span>{isMerging ? "Merging..." : "Download Archive"}</span>
                  </button>

                  <button
                    onClick={closeGallery}
                    className="p-3 rounded-full border border-border-subtle hover:border-cyan-500 bg-bg-card/50 text-text-muted hover:text-cyan-400 transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 order-2 md:order-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        activeCategory === cat 
                          ? 'bg-cyan-500 text-white border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                          : 'bg-bg-card border-border-subtle text-text-muted hover:text-text-main hover:border-border-main'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80 order-1 md:order-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by title or issuer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-bg-card/55 border border-border-subtle hover:border-border-main focus:border-cyan-500/50 rounded-2xl text-xs text-text-main placeholder-text-muted outline-none transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-cyan-400"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Catalog Grid */}
              {filteredCertificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="animated-border-wrapper-sm group"
                    >
                      <div className="h-full flex flex-col bg-bg-card/45 backdrop-blur-xl border border-border-subtle/80 rounded-[23px] overflow-hidden shadow-lg hover:shadow-cyan-500/5 transition-all duration-500">
                        {/* Placeholder */}
                        <div 
                          className="h-48 relative overflow-hidden border-b border-border-subtle/80 cursor-pointer"
                          onClick={() => openModal(cert)}
                        >
                          <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                            <CertificateCardPlaceholder 
                              title={cert.title} 
                              issuer={cert.issuer} 
                              date={cert.date} 
                            />
                          </div>
                          
                          <div className="absolute inset-0 bg-[#030712]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="px-5 py-2.5 rounded-full bg-cyan-500 text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                              <Eye size={12} />
                              <span>View Certificate</span>
                            </div>
                          </div>

                          <div className="absolute top-3 right-3 z-10">
                            <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-[#030712]/80 backdrop-blur-md px-3 py-1 border border-cyan-500/20 rounded-full">
                              {cert.date}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-text-muted text-[9px] font-semibold uppercase tracking-wider mb-2 font-mono">
                              <Building className="w-3.5 h-3.5 text-cyan-500/70" />
                              <span>{cert.issuer}</span>
                            </div>

                            <h3 className="text-sm font-extrabold text-text-main group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 uppercase tracking-tight mb-4 leading-snug">
                              {cert.title}
                            </h3>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                              {getTagsForCertificate(cert).map((tag, i) => (
                                <span 
                                  key={i} 
                                  className="text-[9px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 bg-bg-card-hover border border-border-subtle/85 text-text-muted rounded-md group-hover:border-cyan-500/20 group-hover:text-cyan-400/80 transition-colors duration-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-subtle/50">
                            <a
                              href={encodeURI(cert.pdfUrl)}
                              download
                              className="flex items-center justify-center gap-1.5 text-[8.5px] font-extrabold uppercase tracking-widest bg-text-main text-bg-main rounded-xl py-3 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Save</span>
                              <Download size={11} />
                            </a>
                            <button
                              onClick={() => openModal(cert)}
                              className="flex items-center justify-center gap-1.5 text-[8.5px] font-extrabold uppercase tracking-widest bg-bg-card-hover text-text-main rounded-xl py-3 hover:border-cyan-500 hover:text-cyan-400 border border-border-subtle transition-all duration-300"
                            >
                              <span>Verify</span>
                              <Award size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-bg-card/20 rounded-3xl border border-border-subtle border-dashed p-8">
                  <Award className="w-12 h-12 text-text-muted mb-4 stroke-1" />
                  <h4 className="text-sm font-bold text-text-main uppercase tracking-wider">No matching credentials</h4>
                  <p className="text-xs text-text-muted mt-1.5">Try searching different keywords or changing filter categories.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Lightbox Modal (lazy loads PDF.js on demand) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#030712]/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-bg-card border border-border-subtle/80 w-full max-w-4xl h-[85vh] flex flex-col relative shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-3xl overflow-hidden text-text-main"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 md:p-8 border-b border-border-subtle bg-bg-card/90 backdrop-blur-md">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-text-main tracking-tight uppercase leading-snug">{selectedCert.title}</h3>
                  <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted mt-2 font-mono">SYS://{selectedCert.issuer} &bull; {selectedCert.date}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <a
                    href={encodeURI(selectedCert.pdfUrl)}
                    download
                    className="hidden sm:flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest bg-text-main text-bg-main hover:bg-cyan-500 hover:text-white px-6 py-2.5 rounded-full transition-all shadow-sm"
                  >
                    Save PDF <Download size={12} />
                  </a>
                  <button
                    onClick={closeModal}
                    className="p-2 text-text-muted hover:text-cyan-400 hover:bg-bg-card-hover rounded-full transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Container */}
              <div className="flex-grow bg-bg-card-hover w-full flex flex-col relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-4">
                  {/* Desktop layout: split canvas preview & full interactive iframe */}
                  <div className="w-full h-full hidden md:grid grid-cols-5 gap-4">
                    {/* Left Canvas Preview (Lazy loaded rendering) */}
                    <div className="col-span-2 rounded-2xl overflow-hidden bg-bg-card border border-border-subtle/80 flex items-center justify-center">
                      <PDFRenderer pdfUrl={selectedCert.pdfUrl} title={selectedCert.title} />
                    </div>

                    {/* Right Interactive Native Iframe */}
                    <div className="col-span-3 rounded-2xl overflow-hidden bg-white border border-border-subtle/80 shadow-inner">
                      <iframe
                        src={`${encodeURI(selectedCert.pdfUrl)}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        className="w-full h-full border-none"
                        title={selectedCert.title}
                      />
                    </div>
                  </div>
                  
                  {/* Mobile layout: Download button + visual placeholder details */}
                  <div className="w-full max-w-md p-8 rounded-2xl bg-bg-card border border-border-subtle flex flex-col items-center text-center md:hidden">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      <Award className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-extrabold text-text-main mb-2 uppercase tracking-wide leading-snug">{selectedCert.title}</h4>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-text-muted mb-6 font-mono">{selectedCert.issuer}</p>
                    <a
                      href={encodeURI(selectedCert.pdfUrl)}
                      download
                      className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-cyan-500 text-white rounded-full py-3.5 hover:bg-cyan-600 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      <span>Download PDF Certificate</span>
                      <Download size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
