import React, { useState } from 'react';
import { Heart, X, Sparkles, Star, RotateCcw } from 'lucide-react';
import { siteConfig } from '../data/config';
import { WoodenSignboard } from './Decorations';
import { triggerHeartBurst } from './FloatingParticles';

export const ForeverSection = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleForeverClick = () => {
    triggerHeartBurst();
    // Extra bursts for grand finale
    setTimeout(triggerHeartBurst, 400);
    setTimeout(triggerHeartBurst, 800);
    setModalOpen(true);
  };

  return (
    <section
      id="forever"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 pt-24 pb-12 overflow-hidden select-none bg-[#070919]"
    >
      {/* Background Image Layer (Panel 6) */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-transform duration-1000 scale-100"
        style={{ backgroundImage: `url('/assets/bg_forever.jpg')` }}
      >
        {/* Soft overlay gradient to ensure high readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-purple-950/20 to-slate-950/80 pointer-events-none" />
      </div>

      {/* Shooting Stars Animation */}
      <div className="shooting-star top-16 left-3/4 w-36 pointer-events-none" style={{ animationDelay: '0s' }}></div>
      <div className="shooting-star top-32 left-1/2 w-44 pointer-events-none" style={{ animationDelay: '2.5s' }}></div>
      <div className="shooting-star top-24 left-1/4 w-28 pointer-events-none" style={{ animationDelay: '5s' }}></div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto my-auto flex flex-col items-center justify-center pt-8">
        {/* Giant Glowing Neon Pink Heading */}
        <div className="space-y-1 sm:space-y-2">
          <h2 className="font-dancing font-bold text-5xl sm:text-7xl md:text-8xl text-pink-100 filter drop-shadow-[0_0_15px_rgba(255,45,117,0.9)] tracking-wide">
            {siteConfig.forever.headingLine1}
          </h2>
          <h2 className="font-dancing font-bold text-6xl sm:text-8xl md:text-9xl text-white filter drop-shadow-[0_0_30px_rgba(255,45,117,1)] tracking-wide neon-pink-text">
            {siteConfig.forever.headingLine2}
          </h2>
        </div>

        {/* Supporting Emotional Subtitles */}
        <div className="mt-6 sm:mt-8 space-y-1.5">
          <p className="font-dancing text-2xl sm:text-3xl md:text-4xl text-rose-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {siteConfig.forever.subtitle1}
          </p>
          <p className="font-dancing text-2xl sm:text-3xl md:text-4xl text-rose-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-semibold">
            {siteConfig.forever.subtitle2}
          </p>
        </div>

        {/* Main "Forever Together ♡" Button */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleForeverClick}
            className="group relative inline-flex items-center gap-3.5 px-10 py-4 sm:px-14 sm:py-5 rounded-full font-dancing text-2xl sm:text-3xl text-white font-bold bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 shadow-[0_0_35px_rgba(244,63,104,0.85)] hover:shadow-[0_0_60px_rgba(244,63,104,1)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-pink-200/50"
          >
            <Heart className="w-7 h-7 text-white fill-white group-hover:scale-125 transition-transform" />
            <span>{siteConfig.forever.buttonText}</span>
          </button>

          <button
            onClick={() => {
              triggerHeartBurst();
              if (onNavigate) {
                onNavigate('home');
              } else {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 font-dancing text-xl font-bold backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start from Beginning ♡</span>
          </button>
        </div>
      </div>

      {/* Footer Area: Signboard on Right & "Your Boy, Always ♡" in Center */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
        {/* Left spacing placeholder */}
        <div className="w-24 hidden sm:block"></div>

        {/* Bottom Center Credit */}
        <div className="text-center font-dancing text-xl sm:text-2xl text-rose-300/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {siteConfig.forever.footerText}
        </div>

        {/* Bottom Right Wooden Signboard */}
        <div className="sm:self-end">
          <WoodenSignboard
            title="Our Little World..."
            subtitle="Forever ♡"
          />
        </div>
      </div>

      {/* Final Love Letter Popup Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full paper-cream text-slate-800 p-8 sm:p-10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-rose-300 animate-scaleUp text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-600 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
              <h3 className="font-dancing font-bold text-3xl sm:text-4xl text-rose-900">
                {siteConfig.forever.popup.greeting}
              </h3>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 font-caveat text-xl sm:text-2xl text-stone-800 leading-relaxed tracking-wide">
              {siteConfig.forever.popup.body.map((p, idx) => (
                <p key={idx} className="indent-4">
                  {p}
                </p>
              ))}
            </div>

            {/* Signoff */}
            <div className="mt-8 text-right font-dancing font-bold text-2xl sm:text-3xl text-rose-700 whitespace-pre-line">
              {siteConfig.forever.popup.signoff}
            </div>

            {/* Bottom Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setModalOpen(false)}
                className="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-dancing font-bold text-2xl shadow-lg transition-transform hover:scale-105"
              >
                Always Yours ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
