import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingParticles } from './components/FloatingParticles';
import { PageNavigator } from './components/PageNavigator';
import { RomanticIntroModal } from './components/RomanticIntroModal';
import { HomeSection } from './components/HomeSection';
import { ApologySection } from './components/ApologySection';
import { MemoriesSection } from './components/MemoriesSection';
import { PromiseSection } from './components/PromiseSection';
import { JustForYouSection } from './components/JustForYouSection';
import { ForeverSection } from './components/ForeverSection';
import { ChevronUp } from 'lucide-react';
import { audioController } from './utils/audioController';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    audioController.init();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0c1e] text-slate-800 font-poppins selection:bg-rose-500 selection:text-white">
      {/* Romantic Intro Invitation Overlay for Guaranteed Autoplay */}
      <RomanticIntroModal />

      {/* Fixed Romantic Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Ambient Floating Hearts & Petals */}
      <FloatingParticles />

      {/* Main Sections */}
      <main className="w-full">
        {/* Section 1: Home ❤️ */}
        <HomeSection onNavigate={scrollToSection} />

        {/* Section 2: My Apology 💗 */}
        <ApologySection onNavigate={scrollToSection} />

        {/* Section 3: Our Memories 📸 */}
        <MemoriesSection onNavigate={scrollToSection} />

        {/* Section 4: My Promise 💕 */}
        <PromiseSection onNavigate={scrollToSection} />

        {/* Section 5: Just For You 💌 */}
        <JustForYouSection onNavigate={scrollToSection} />

        {/* Section 6: Forever ❤️ */}
        <ForeverSection onNavigate={scrollToSection} />
      </main>

      {/* Persistent Floating Page Navigator with "Next Page →" and "Auto Tour ▶" */}
      <PageNavigator
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Floating Scroll to Top Heart Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Back to Top ♡"
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white shadow-xl hover:shadow-rose-500/50 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/30 backdrop-blur-md group hidden sm:block"
      >
        <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
