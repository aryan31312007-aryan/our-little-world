import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import { FairyLights, RoseDecor } from './Decorations';
import { triggerHeartBurst } from './FloatingParticles';

export const HomeSection = ({ onNavigate }) => {
  const handleEnter = () => {
    triggerHeartBurst();
    const audio = document.querySelector('audio');
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
    if (onNavigate) {
      onNavigate('apology');
    } else {
      const el = document.getElementById('apology');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 pt-24 pb-12 overflow-hidden select-none"
    >
      {/* Background Image Layer with Atmospheric Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
        style={{ backgroundImage: `url('/assets/bg_home.jpg')` }}
      >
        {/* Soft dark vignette to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-950/25 to-black/70 pointer-events-none" />
      </div>

      {/* Fairy Lights on the left */}
      <FairyLights />

      {/* Corner Roses */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:block">
        <RoseDecor className="w-20 h-20 filter drop-shadow-xl" rotation={-15} />
      </div>
      <div className="absolute bottom-4 right-4 z-10 hidden sm:block">
        <RoseDecor className="w-20 h-20 filter drop-shadow-xl" rotation={25} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-3xl mx-auto my-auto flex flex-col items-center justify-center pt-8 sm:pt-14">
        {/* Main Heading */}
        <h1 className="font-dancing font-bold text-5xl sm:text-7xl md:text-8xl text-white tracking-wide filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] neon-subtle animate-fadeIn">
          {siteConfig.home.heading}
        </h1>

        {/* Tagline */}
        <p className="font-dancing text-xl sm:text-2xl md:text-3xl text-rose-200 mt-2 sm:mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          {siteConfig.home.tagline}
        </p>

        {/* Pink Paper Style Card */}
        <div className="mt-8 sm:mt-10 px-8 py-5 sm:px-12 sm:py-6 bg-gradient-to-r from-rose-200/95 via-pink-100/95 to-rose-200/95 text-slate-800 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_30px_rgba(244,63,104,0.3)] border border-rose-300/60 transform -rotate-1 hover:rotate-0 transition-transform duration-300 backdrop-blur-sm max-w-md w-full">
          <div className="font-dancing text-stone-600 text-lg sm:text-xl">
            {siteConfig.home.cardIntro}
          </div>
          <div className="font-dancing font-bold text-3xl sm:text-4xl md:text-5xl text-rose-600 mt-1 drop-shadow-sm flex items-center justify-center gap-2">
            <span>{siteConfig.home.cardRecipient}</span>
          </div>
        </div>

        {/* Below Card Subtext */}
        <p className="font-dancing text-lg sm:text-2xl text-rose-100/90 mt-5 max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          "{siteConfig.home.cardSubtext}"
        </p>

        {/* Enter Our World Button */}
        <div className="mt-8 sm:mt-10">
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-dancing text-xl sm:text-2xl text-white font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-[0_0_30px_rgba(244,63,104,0.7)] hover:shadow-[0_0_50px_rgba(244,63,104,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-rose-300/40"
          >
            <span>{siteConfig.home.buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
          </button>
        </div>
      </div>

      {/* Bottom Right Handwritten Text */}
      <div className="relative z-20 w-full flex justify-between items-end max-w-7xl mx-auto px-4 mt-6">
        <div className="text-left font-dancing text-rose-300/60 text-sm hidden sm:block">
          ♡ Our Little World
        </div>
        <div className="font-dancing font-bold text-2xl sm:text-3xl text-rose-200 drop-shadow-[0_0_12px_rgba(244,63,104,0.9)] hover:text-white transition-colors cursor-default">
          {siteConfig.home.cornerHandwriting}
        </div>
      </div>
    </section>
  );
};
