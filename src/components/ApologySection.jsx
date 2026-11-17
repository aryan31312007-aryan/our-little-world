import React, { useState } from 'react';
import { Heart, ArrowDown, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import { RoseDecor, RosePetal } from './Decorations';
import { triggerHeartBurst } from './FloatingParticles';

export const ApologySection = ({ onNavigate }) => {
  const [showToast, setShowToast] = useState(false);

  const handlePromiseClick = () => {
    triggerHeartBurst();
    setShowToast(true);

    setTimeout(() => {
      if (onNavigate) {
        onNavigate('promise');
      } else {
        const el = document.getElementById('promise');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);

    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  const handleNextSection = () => {
    triggerHeartBurst();
    if (onNavigate) {
      onNavigate('memories');
    } else {
      const el = document.getElementById('memories');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="apology"
      className="relative min-h-screen w-full bg-[#fde9ee] py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Soft Romantic Scrapbook Background Texture */}
      <div className="absolute inset-0 paper-pink opacity-80 pointer-events-none" />

      {/* Scattered Decorative Roses and Petals */}
      <div className="absolute top-6 left-6 pointer-events-none hidden md:block">
        <RoseDecor className="w-24 h-24" rotation={-20} />
      </div>
      <div className="absolute top-10 right-8 pointer-events-none hidden md:block">
        <RoseDecor className="w-28 h-28" rotation={35} />
      </div>
      <div className="absolute bottom-8 left-12 pointer-events-none hidden lg:block">
        <RoseDecor className="w-20 h-20" rotation={10} />
      </div>
      <div className="absolute bottom-10 right-10 pointer-events-none hidden md:block">
        <RoseDecor className="w-24 h-24" rotation={-45} />
      </div>

      {/* Scattered Rose Petals */}
      <div className="absolute top-1/4 left-1/12 pointer-events-none opacity-80">
        <RosePetal className="w-8 h-8" rotation={25} />
      </div>
      <div className="absolute top-1/3 right-1/12 pointer-events-none opacity-70">
        <RosePetal className="w-7 h-7" rotation={-35} />
      </div>
      <div className="absolute bottom-1/4 right-1/6 pointer-events-none opacity-80">
        <RosePetal className="w-8 h-8" rotation={45} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-dancing font-bold text-4xl sm:text-6xl text-rose-800 tracking-wide drop-shadow-sm flex items-center justify-center gap-3">
            <span>{siteConfig.apology.heading}</span>
          </h2>
          <div className="w-24 h-1 bg-rose-400/50 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Two-Column Scrapbook Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          {/* LEFT SIDE: Handwritten Letter on Cream Textured Paper (7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative paper-cream text-slate-800 p-8 sm:p-10 md:p-12 rounded-xl shadow-[0_20px_45px_-10px_rgba(180,80,100,0.25)] border border-[#ebd8c1] max-w-xl w-full transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Washi Tape at Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape rotate-1 rounded-sm shadow-sm pointer-events-none"></div>

              {/* Little Stamp/Heart Accent in top corner */}
              <div className="absolute top-6 right-6 text-rose-300 pointer-events-none">
                <Heart className="w-6 h-6 fill-rose-100" />
              </div>

              {/* Letter Greeting */}
              <h3 className="font-dancing font-bold text-3xl sm:text-4xl text-rose-900 mb-6">
                {siteConfig.apology.letterGreeting}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-caveat text-xl sm:text-2xl text-stone-800 leading-relaxed tracking-wide">
                {siteConfig.apology.letterParagraphs.map((para, index) => (
                  <p key={index} className="indent-4">
                    {para}
                  </p>
                ))}
              </div>

              {/* Letter Signoff */}
              <div className="mt-8 text-right font-dancing font-bold text-2xl sm:text-3xl text-rose-700">
                {siteConfig.apology.letterSignoff}
              </div>

              {/* Corner Rose on the letter */}
              <div className="absolute -bottom-5 -left-5 pointer-events-none">
                <RoseDecor className="w-14 h-14" rotation={-15} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Large Pink Handwritten Note & Promise Button (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8">
            {/* Pink Sticky Note */}
            <div className="relative bg-[#ffd3de] text-slate-900 p-8 sm:p-10 rounded-2xl shadow-[0_15px_35px_rgba(244,63,104,0.25)] border border-rose-300/80 max-w-md w-full text-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Push Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-rose-600 rounded-full border-2 border-white shadow-md"></div>

              <h4 className="font-dancing font-bold text-4xl sm:text-5xl text-rose-900 mb-4 leading-tight">
                {siteConfig.apology.stickyNoteHeading}
              </h4>

              {/* Hand-drawn Underline Heart Doodle */}
              <div className="flex justify-center items-center my-4">
                <svg className="w-40 h-8 stroke-rose-600 fill-none" viewBox="0 0 160 32">
                  <path
                    d="M 5,20 Q 50,5 75,18 T 155,16"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 75,12 C 72,5 64,6 64,13 C 64,20 75,26 75,26 C 75,26 86,20 86,13 C 86,6 78,5 75,12 Z"
                    fill="#e11d48"
                    stroke="#be123c"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <p className="font-caveat text-xl sm:text-2xl text-stone-700 mt-2">
                Every beat of my heart belongs to you...
              </p>
            </div>

            {/* Glowing "I Promise... ♡" Button */}
            <div className="w-full flex justify-center">
              <button
                onClick={handlePromiseClick}
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-dancing text-2xl sm:text-3xl text-white font-bold bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 shadow-[0_0_25px_rgba(244,63,104,0.6)] hover:shadow-[0_0_40px_rgba(244,63,104,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/40"
              >
                <Heart className="w-6 h-6 text-white fill-white group-hover:scale-125 transition-transform" />
                <span>{siteConfig.apology.promiseButtonText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Bottom Next Page Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleNextSection}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-700 font-dancing text-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-rose-300"
          >
            <span>Next Page: Our Memories 📸</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Emotional Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-11/12 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border-2 border-rose-400 text-center animate-bounce">
          <div className="flex items-center justify-center gap-2 text-rose-600 font-dancing font-bold text-xl mb-1">
            <Heart className="w-5 h-5 fill-rose-500" />
            <span>My Heartfelt Promise</span>
          </div>
          <p className="font-caveat text-xl text-stone-700">
            {siteConfig.apology.promiseAlertMessage}
          </p>
        </div>
      )}
    </section>
  );
};
