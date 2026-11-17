import React, { useState } from 'react';
import { Heart, X, Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import { RoseDecor, RosePetal } from './Decorations';
import { triggerHeartBurst } from './FloatingParticles';

export const JustForYouSection = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleLoveClick = () => {
    triggerHeartBurst();
    setModalOpen(true);
  };

  return (
    <section
      id="justforyou"
      className="relative min-h-screen w-full bg-[#fdebf1] py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Pink Romantic Scrapbook Paper Texture */}
      <div className="absolute inset-0 paper-pink opacity-80 pointer-events-none" />

      {/* Decorative Corner Roses */}
      <div className="absolute top-8 left-8 pointer-events-none hidden md:block">
        <RoseDecor className="w-24 h-24" rotation={-25} />
      </div>
      <div className="absolute bottom-6 right-8 pointer-events-none hidden md:block">
        <RoseDecor className="w-26 h-26" rotation={30} />
      </div>

      {/* Floating Petals */}
      <div className="absolute top-1/4 right-1/12 pointer-events-none opacity-80">
        <RosePetal className="w-8 h-8" rotation={20} />
      </div>
      <div className="absolute bottom-1/3 left-1/12 pointer-events-none opacity-80">
        <RosePetal className="w-9 h-9" rotation={-40} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* Heading & Subtitle */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-dancing font-bold text-4xl sm:text-6xl text-rose-900 tracking-wide drop-shadow-sm flex items-center justify-center gap-3">
            <span>{siteConfig.justForYou.heading}</span>
          </h2>
          <p className="font-dancing text-xl sm:text-2xl text-rose-700/90 mt-1">
            {siteConfig.justForYou.subtitle}
          </p>
          <div className="w-24 h-1 bg-rose-400/50 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Layout Grid: Left Note, Center Bouquet, Right List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
          {/* LEFT SIDE: Large Pink Handwritten Note (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative bg-[#ffd5e2] text-slate-800 p-8 sm:p-10 rounded-2xl shadow-[0_15px_35px_rgba(244,63,104,0.22)] border border-rose-300 max-w-md w-full transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Tape at top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-1 rounded-sm shadow-sm"></div>

              <div className="space-y-5 font-caveat text-2xl sm:text-3xl text-rose-950 font-medium tracking-wide">
                {siteConfig.justForYou.noteMessages.map((msg, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <span>{msg}</span>
                  </p>
                ))}
              </div>

              {/* Little cute corner heart */}
              <div className="absolute bottom-4 right-4 text-rose-400 text-3xl font-dancing">
                ♡
              </div>
            </div>
          </div>

          {/* CENTER: Bouquet of Red Roses with Tag (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center">
            <div className="relative group cursor-pointer" onClick={handleLoveClick}>
              {/* Glow Behind Bouquet */}
              <div className="absolute inset-0 bg-rose-400/20 rounded-full blur-2xl group-hover:bg-rose-400/40 transition-colors"></div>

              {/* Bouquet Image */}
              <img
                src={siteConfig.justForYou.bouquetImage}
                alt="Romantic Bouquet of Red Roses"
                className="w-48 sm:w-56 h-auto object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
              />

              {/* Hanging Tag: "For You ♡" */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#fdfbf7] text-rose-900 border border-stone-300 rounded shadow-md font-dancing font-bold text-lg sm:text-xl whitespace-nowrap transform -rotate-3 group-hover:rotate-0 transition-transform">
                <span className="relative">
                  {/* Tag String hole */}
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 inline-block mr-1"></span>
                  {siteConfig.justForYou.bouquetTag}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: "Things I love about you" Card + Button (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center space-y-6">
            {/* Pink Card */}
            <div className="relative bg-[#ffe1ea] p-6 sm:p-8 rounded-2xl shadow-[0_15px_35px_rgba(244,63,104,0.2)] border border-rose-300/80 max-w-sm w-full transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <h3 className="font-dancing font-bold text-2xl sm:text-3xl text-rose-900 mb-4 border-b border-rose-300/60 pb-2">
                {siteConfig.justForYou.thingsILoveTitle}
              </h3>

              <div className="space-y-3 font-caveat text-xl sm:text-2xl text-stone-800">
                {siteConfig.justForYou.thingsILove.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="text-rose-500 font-bold text-lg">♡</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glowing "I Love You Forever ❤️" Button */}
            <button
              onClick={handleLoveClick}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-dancing text-2xl sm:text-3xl text-white font-bold bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 shadow-[0_0_25px_rgba(244,63,104,0.6)] hover:shadow-[0_0_40px_rgba(244,63,104,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/40"
            >
              <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform" />
              <span>{siteConfig.justForYou.buttonText}</span>
            </button>
          </div>
        </div>

        {/* Section Bottom Next Page Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              triggerHeartBurst();
              if (onNavigate) {
                onNavigate('forever');
              } else {
                document.getElementById('forever')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-700 font-dancing text-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-rose-300"
          >
            <span>Next Page: Forever ❤️</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Romantic Popup Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-gradient-to-b from-[#fff2f5] to-[#ffe3eb] p-8 rounded-3xl shadow-2xl border-2 border-rose-400 text-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-rose-200/80 hover:bg-rose-300 text-rose-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Heart Icon header */}
            <div className="flex justify-center mb-3">
              <div className="relative">
                <Heart className="w-14 h-14 text-rose-500 fill-rose-500 animate-pulse" />
                <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1" />
              </div>
            </div>

            <h3 className="font-dancing font-bold text-3xl sm:text-4xl text-rose-900 mb-3">
              Always & Forever ♡
            </h3>

            <p className="font-caveat text-2xl text-stone-800 leading-relaxed">
              "{siteConfig.justForYou.popupMessage}"
            </p>

            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 px-8 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-dancing font-bold text-xl shadow-md transition-all hover:scale-105"
            >
              With All My Heart 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
