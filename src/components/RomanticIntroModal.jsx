import React, { useState, useEffect } from 'react';
import { Heart, Music, Sparkles } from 'lucide-react';
import { audioController } from '../utils/audioController';
import { triggerHeartBurst } from './FloatingParticles';

export const RomanticIntroModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // If audio is already playing (e.g. browser allowed autoplay or refreshed), dismiss intro
    const unsubscribe = audioController.subscribe((isPlaying) => {
      if (isPlaying) {
        setIsFading(true);
        setTimeout(() => setIsOpen(false), 500);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEnterWithMusic = () => {
    // 1. Play audio immediately
    audioController.play();

    // 2. Heart burst animation
    triggerHeartBurst();

    // 3. Fade out and close modal
    setIsFading(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleEnterWithMusic}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer select-none transition-all duration-700 ${
        isFading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      } bg-slate-950/90 backdrop-blur-xl`}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-slate-950/80 to-rose-950/60 pointer-events-none" />

      {/* Floating Sparkles in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Romantic Card Container */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleEnterWithMusic();
        }}
        className="relative max-w-lg w-full bg-gradient-to-b from-[#24132b]/90 via-[#180f24]/95 to-[#120a1d]/95 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_rgba(244,63,104,0.4)] border border-rose-400/40 text-center animate-scaleUp"
      >
        {/* Glowing Heart Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse filter drop-shadow-[0_0_20px_rgba(244,63,104,0.9)]" />
            <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-2 animate-bounce" />
          </div>
        </div>

        {/* Website Title */}
        <h2 className="font-dancing font-bold text-4xl sm:text-5xl text-white tracking-wide drop-shadow-[0_0_15px_rgba(244,63,104,0.8)]">
          Our Little World ❤️
        </h2>

        {/* Dedicated Message */}
        <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40">
          <p className="font-dancing text-xl text-rose-300 font-semibold">
            Dedicated to Sonam Singh (Darling)
          </p>
        </div>

        <p className="font-caveat text-xl sm:text-2xl text-rose-100/90 mt-4 leading-relaxed">
          "A small world created with all my love, regret, and heartfelt promises..."
        </p>

        {/* Big Glowing "Tap to Enter with Music" Button */}
        <div className="mt-8">
          <button
            onClick={handleEnterWithMusic}
            className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full font-dancing text-2xl sm:text-3xl text-white font-bold bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 shadow-[0_0_35px_rgba(244,63,104,0.85)] hover:shadow-[0_0_50px_rgba(244,63,104,1)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/40"
          >
            <Music className="w-6 h-6 text-white group-hover:scale-125 transition-transform animate-bounce" />
            <span>Tap to Enter with Music 🎵 ♡</span>
          </button>
        </div>

        <p className="font-poppins text-xs text-rose-300/60 mt-4">
          (Click anywhere on the screen to open with romantic music)
        </p>
      </div>
    </div>
  );
};
