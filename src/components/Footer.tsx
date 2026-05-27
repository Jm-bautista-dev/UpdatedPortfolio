import React, { useState, FormEvent } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';
import { ArrowRight, Check } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-bg-main border-t border-border-subtle pt-24 pb-12 px-6 lg:px-12 relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-10">
            <a href="#home" className="text-2xl font-poppins font-bold text-text-main tracking-[0.4em] inline-block uppercase transition-colors duration-500">
              JM<span className="text-cyan-500">.</span>
            </a>
            <p className="max-w-sm text-text-muted leading-relaxed font-light tracking-wide italic text-xs">
              "Luxury is the ease of a t-shirt in a very expensive dress." — Design and engineering unified.
            </p>
            <div className="flex gap-8 text-text-muted/60">
              <a href="#" className="hover:text-text-main hover:-translate-y-1 transition-all"><FaGithub size={20} /></a>
              <a href="#" className="hover:text-text-main hover:-translate-y-1 transition-all"><FaLinkedin size={20} /></a>
              <a href="#" className="hover:text-text-main hover:-translate-y-1 transition-all"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-text-main hover:-translate-y-1 transition-all"><FaDribbble size={20} /></a>
            </div>
          </div>

          {/* Links Col */}
          <div className="space-y-10">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-main opacity-50">Navigation</h4>
            <ul className="space-y-6">
              <li><a href="#about" className="text-text-muted hover:text-text-main transition-colors text-[10px] font-light uppercase tracking-widest">Existence</a></li>
              <li><a href="#projects" className="text-text-muted hover:text-text-main transition-colors text-[10px] font-light uppercase tracking-widest">Exhibits</a></li>
              <li><a href="#certificates" className="text-text-muted hover:text-text-main transition-colors text-[10px] font-light uppercase tracking-widest">Accolades</a></li>
              <li><a href="#contact" className="text-text-muted hover:text-text-main transition-colors text-[10px] font-light uppercase tracking-widest">Dialogue</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-10">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-main opacity-50">Newsletter</h4>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-border-main py-4 text-text-main placeholder-text-muted/30 focus:outline-none focus:border-text-main transition-all text-[10px] uppercase tracking-widest"
              />
              <button 
                onClick={handleSubscribe}
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
              >
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.4em] text-text-muted/80 font-bold">
            &copy; {new Date().getFullYear()} Jhon Michael &mdash; ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-12 text-[9px] uppercase tracking-[0.4em] text-text-muted/80 font-bold">
            <a href="#" className="hover:text-text-main transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-main transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
