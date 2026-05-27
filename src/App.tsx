import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ScrollHUD from './components/ScrollHUD';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import FocusAreas from './components/FocusAreas';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import ProjectsShowcase from './components/ProjectsShowcase';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-text-main font-sans selection:bg-cyan-500/30 transition-colors duration-500 relative">
        {/* Global animated cosmic background universe */}
        <div className="site-bg" />

        {/* Floating Scroll Navigation HUD */}
        <ScrollHUD />

        <Navbar />
        
        <main className="relative z-10 space-y-16">
          <Hero />
          
          <div className="section-panel py-6">
            <Services />
          </div>
          <div className="section-divider" />
          
          <div className="section-panel py-6">
            <About />
          </div>
          <div className="section-divider" />

          {/* Bridge Section: Focus Areas */}
          <div className="section-panel py-6">
            <FocusAreas />
          </div>
          <div className="section-divider" />
          
          <div className="section-panel py-6">
            <Certificates />
          </div>
          <div className="section-divider" />
          
          <div className="section-panel py-6">
            <Skills />
          </div>
          <div className="section-divider" />

          {/* Project Showcase Section */}
          <div className="section-panel py-6">
            <ProjectsShowcase />
          </div>
          <div className="section-divider" />
          
          <div className="section-panel py-6">
            <Experience />
          </div>
          <div className="section-divider" />
          
          <div className="section-panel py-6">
            <Contact />
          </div>
        </main>
        
        <div className="section-divider" />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
