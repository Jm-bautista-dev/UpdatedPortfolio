import React, { useState, useEffect, useRef, useCallback, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Terminal, AlertTriangle, Trash2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_8o5bdoa';
const EMAILJS_TEMPLATE_ID = 'template_mp0emk8';
const EMAILJS_PUBLIC_KEY = 'ETO9sWWdkSkwuxj_2';

const TERMINAL_BUFFER_SIZE = 14;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS_INIT: Terminal console online.",
    "SYS_ACTIVE: Awaiting secure connection parameters..."
  ]);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const loggedStatesRef = useRef({ name: false, email: false, message: false });
  const lastLoggedNameRef = useRef('');
  const lastLoggedEmailRef = useRef('');

  // Memoized logUpdate to prevent re-creation and potential re-render loop issues
  const logUpdate = useCallback((text: string) => {
    setTerminalLogs((prev) => {
      if (prev[prev.length - 1] === text) return prev;
      return [...prev, text].slice(-TERMINAL_BUFFER_SIZE);
    });
  }, []);

  const clearTerminal = () => {
    setTerminalLogs([
      "SYS_INIT: Terminal console online.",
      "SYS_ACTIVE: Console buffer cleared. Awaiting input..."
    ]);
    loggedStatesRef.current = { name: false, email: false, message: false };
    lastLoggedNameRef.current = '';
    lastLoggedEmailRef.current = '';
  };

  // Staged log helper: adds logs with delays to simulate real system activity
  const stageLog = useCallback((text: string, delayMs: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        logUpdate(text);
        resolve();
      }, delayMs);
    });
  }, [logUpdate]);

  // Debounced input logs to prevent duplicate logs and loops from typing
  useEffect(() => {
    if (!formData.name) {
      loggedStatesRef.current.name = false;
      lastLoggedNameRef.current = '';
      return;
    }

    if (!loggedStatesRef.current.name) {
      logUpdate("SYS_LINK: Initializing identity scan...");
      loggedStatesRef.current.name = true;
    }

    const timer = setTimeout(() => {
      if (formData.name && formData.name !== lastLoggedNameRef.current) {
        logUpdate(`SECURE_KEY: Scanned identity: "${formData.name}"`);
        lastLoggedNameRef.current = formData.name;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.name, logUpdate]);

  useEffect(() => {
    if (!formData.email) {
      loggedStatesRef.current.email = false;
      lastLoggedEmailRef.current = '';
      return;
    }

    if (!loggedStatesRef.current.email) {
      logUpdate("ROUTING: Opening channel interface...");
      loggedStatesRef.current.email = true;
    }

    const timer = setTimeout(() => {
      if (formData.email && formData.email !== lastLoggedEmailRef.current) {
        logUpdate(`ROUTING: Connected secure channel: "${formData.email}"`);
        lastLoggedEmailRef.current = formData.email;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.email, logUpdate]);

  useEffect(() => {
    if (!formData.message) {
      loggedStatesRef.current.message = false;
      return;
    }

    if (!loggedStatesRef.current.message) {
      logUpdate("BUFFER_LOG: Message stream detected. Formatting block parameters...");
      loggedStatesRef.current.message = true;
    }

    const timer = setTimeout(() => {
      if (formData.message) {
        logUpdate("BUFFER_LOG: Payload buffer ready for transmission.");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.message, logUpdate]);

  // Auto-scroll terminal logs inside the container only (no page jump)
  useEffect(() => {
    const container = terminalContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [terminalLogs]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState('submitting');

    // Stage 1: Pre-send terminal logs
    logUpdate("QUEUE_SEND: Encrypting communication envelope...");
    await stageLog("SMTP_HANDSHAKE: Secure connection established", 600);
    await stageLog("MAIL_ROUTER: Encrypting payload...", 800);
    await stageLog("SYS_LINK: Routing packages through local nodes...", 500);

    try {
      // Stage 2: Send via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Stage 3: Success terminal logs
      await stageLog("DELIVERY_NODE: Message accepted", 400);
      await stageLog("STATUS: Delivered successfully ✓", 300);
      logUpdate("ROUTING: Delivered to jm.dev.");
      logUpdate("STATUS: Awaiting instant response... ⚡");

      setFormState('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset form state after 5 seconds
      setTimeout(() => {
        setFormState('idle');
        setTerminalLogs([
          "SYS_INIT: Terminal console online.",
          "SYS_ACTIVE: Awaiting secure connection parameters..."
        ]);
        loggedStatesRef.current = { name: false, email: false, message: false };
        lastLoggedNameRef.current = '';
        lastLoggedEmailRef.current = '';
      }, 5000);

    } catch (error: any) {
      // Stage 3 (Error): Failure terminal logs with precise error messaging
      console.error('EmailJS Error Details:', error);
      const errorMsg = error?.text || error?.message || String(error) || "Transmission failure";
      await stageLog(`ERR_ROUTE: ${errorMsg}`, 300);
      logUpdate("SYS_WARN: Package could not be delivered. Retry recommended.");
      setFormState('error');

      // Reset to idle after 4 seconds so user can retry
      setTimeout(() => {
        setFormState('idle');
      }, 4000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl z-10 relative">

        {/* Section Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-3 block">Inquiries</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tighter uppercase">
            Communication <span className="text-text-muted font-normal italic">Terminal</span>
          </h2>
          <div className="w-12 h-px bg-cyan-500/50 mx-auto shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        </motion.div>

        {/* Terminal Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

          {/* Left Column: Form Panel Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 p-8 md:p-10 bg-bg-card/45 backdrop-blur-xl border border-border-subtle/80 rounded-3xl relative shadow-lg group hover:border-cyan-500/30 transition-all duration-500"
          >
            <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-500/20 group-hover:border-cyan-500/60 transition-colors duration-500" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[9px] uppercase tracking-widest text-text-muted font-bold mb-2">FULL IDENTITY</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter Name"
                    className="w-full bg-transparent border-b border-border-subtle py-2.5 text-text-main text-xs placeholder-text-muted/30 focus:outline-none focus:border-cyan-400 transition-all duration-500 border-x-0 border-t-0 font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[9px] uppercase tracking-widest text-text-muted font-bold mb-2">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter Email"
                    className="w-full bg-transparent border-b border-border-subtle py-2.5 text-text-main text-xs placeholder-text-muted/30 focus:outline-none focus:border-cyan-400 transition-all duration-500 border-x-0 border-t-0 font-mono"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-[9px] uppercase tracking-widest text-text-muted font-bold mb-2">MESSAGE PACKETS</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Format details of your vision here..."
                  className="w-full bg-transparent border-b border-border-subtle py-2.5 text-text-main text-xs placeholder-text-muted/30 focus:outline-none focus:border-cyan-400 transition-all duration-500 border-x-0 border-t-0 resize-none font-mono"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={formState !== 'idle'}
                className={`w-full py-4 rounded-full font-bold text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-700 border shadow-sm
                  ${formState === 'success'
                    ? 'bg-bg-card-hover text-cyan-400 border-cyan-500/50'
                    : formState === 'error'
                      ? 'bg-bg-card-hover text-red-400 border-red-500/50'
                      : formState === 'submitting'
                        ? 'bg-bg-card-hover text-text-muted border-border-subtle cursor-wait'
                        : 'bg-text-main text-bg-main border-text-main hover:bg-cyan-500 hover:text-white hover:border-cyan-500'
                  }`}
                whileHover={{ scale: formState === 'idle' ? 1.01 : 1 }}
                whileTap={{ scale: formState === 'idle' ? 0.99 : 1 }}
              >
                <AnimatePresence mode="wait">
                  {formState === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Transmit Packets <Send size={12} />
                    </motion.div>
                  )}
                  {formState === 'submitting' && (
                    <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Routing Data... <Loader2 size={12} className="animate-spin text-cyan-400" />
                    </motion.div>
                  )}
                  {formState === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Transmitted <CheckCircle2 size={12} className="text-cyan-400" />
                    </motion.div>
                  )}
                  {formState === 'error' && (
                    <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Transmission Failed <AlertTriangle size={12} className="text-red-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Interactive System Response Console */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex flex-col h-[400px] md:h-[440px] rounded-3xl p-6 bg-[#09090b]/90 backdrop-blur-2xl border border-zinc-800/80 shadow-[0_0_30px_rgba(6,182,212,0.06)] relative group overflow-hidden font-mono"
          >
            {/* Edge Guides */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-500/20 group-hover:border-cyan-500/60 transition-colors duration-500" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-cyan-500/20 group-hover:border-cyan-500/60 transition-colors duration-500" />

            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-cyan-400 animate-pulse" />
                <span className="text-[8px] uppercase tracking-widest text-text-muted font-bold">CONSOLE MONITOR</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearTerminal}
                  className="flex items-center gap-1 text-[7px] uppercase tracking-wider text-zinc-500 hover:text-red-400 transition-colors duration-300 cursor-pointer select-none"
                  title="Clear terminal"
                >
                  <Trash2 size={10} />
                  <span>Clear</span>
                </button>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[7px] text-cyan-400 font-bold uppercase tracking-wider pl-1">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Scrollable logs — live buffer mode */}
            <div
              ref={terminalContainerRef}
              className="flex-grow space-y-3 overflow-y-auto text-left scrollbar-hide text-[9px] leading-relaxed"
            >
              {terminalLogs.map((log, index) => {
                // Fade oldest logs for real terminal feel
                const age = terminalLogs.length - index;
                const opacityClass = age > 10 ? 'opacity-30' : age > 7 ? 'opacity-50' : age > 4 ? 'opacity-70' : 'opacity-100';

                return (
                  <div key={`${index}-${log.slice(0, 20)}`} className={`flex gap-2 transition-opacity duration-500 ${opacityClass}`}>
                    <span className="text-cyan-400 font-bold shrink-0">$</span>
                    <span className={
                      log.includes("SUCCESS") || log.includes("Delivered successfully") ? "text-green-400 font-bold" :
                        log.includes("ERR_") || log.includes("SYS_WARN") ? "text-red-400 font-bold" :
                          log.includes("SECURE_KEY") ? "text-purple-400" :
                            log.includes("SMTP_HANDSHAKE") ? "text-yellow-400" :
                              log.includes("MAIL_ROUTER") || log.includes("DELIVERY_NODE") ? "text-emerald-400" :
                                log.includes("ROUTING") ? "text-blue-400" : "text-zinc-300"
                    }>
                      {log}
                    </span>
                  </div>
                );
              })}
              <div className="flex gap-2 items-center pt-1">
                <span className="text-cyan-400 font-bold">$</span>
                <span className="w-1.5 h-3 bg-white animate-pulse" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[7px] text-text-muted/60 tracking-wider">
              <span>BUFFER: {terminalLogs.length}/{TERMINAL_BUFFER_SIZE}</span>
              <span>PACKET_SIZE: 512b</span>
              <span>EST_SPEED: 0.05ms</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
