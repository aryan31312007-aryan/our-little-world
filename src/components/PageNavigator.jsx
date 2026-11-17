import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Pause, ArrowRight, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { triggerHeartBurst } from './FloatingParticles';

export const SECTIONS = [
  { id: 'home', title: 'Home', badge: '1/6' },
  { id: 'apology', title: 'My Apology', badge: '2/6' },
  { id: 'memories', title: 'Memories', badge: '3/6' },
  { id: 'promise', title: 'My Promise', badge: '4/6' },
  { id: 'justforyou', title: 'Just For You', badge: '5/6' },
  { id: 'forever', title: 'Forever', badge: '6/6' },
];

export const PageNavigator = ({ activeSection, onNavigate }) => {
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeSection)
  );
  const nextSection = SECTIONS[(currentIndex + 1) % SECTIONS.length];
  const prevSection = SECTIONS[(currentIndex - 1 + SECTIONS.length) % SECTIONS.length];

  const goToNext = () => {
    triggerHeartBurst();
    const nextIdx = (currentIndex + 1) % SECTIONS.length;
    onNavigate(SECTIONS[nextIdx].id);
  };

  const goToPrev = () => {
    const prevIdx = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length;
    onNavigate(SECTIONS[prevIdx].id);
  };

  // Keyboard navigation: PageDown / DownArrow / Space for next page
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is in an input or modal
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Auto-Tour logic: advances every 8 seconds when active
  useEffect(() => {
    if (!isAutoTour) {
      setProgress(0);
      return;
    }

    const duration = 8000;
    const intervalTime = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += intervalTime;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        goToNext();
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isAutoTour, currentIndex]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none max-w-fit w-auto px-2">
      {/* Floating Romantic Navigation Pill */}
      <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-rose-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(244,63,104,0.35)]">
        {/* Progress Bar for Auto-Tour */}
        {isAutoTour && (
          <div
            className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        )}

        {/* Previous Page Button (visible from page 2 onwards) */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrev}
            title={`Previous: ${prevSection.title}`}
            aria-label="Previous Page"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-rose-200/80 hover:text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronUp className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>
        )}

        {/* Page Badge & Title */}
        <div className="flex items-center gap-1.5 px-2 py-1 text-xs sm:text-sm font-medium text-rose-100 border-x border-white/10">
          <span className="font-dancing text-base sm:text-lg text-rose-400 font-bold">
            {SECTIONS[currentIndex].title}
          </span>
          <span className="text-[11px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-full">
            {SECTIONS[currentIndex].badge}
          </span>
        </div>

        {/* MAIN "NEXT PAGE" BUTTON: Automatically Scrolls to Next Page on Click */}
        <button
          onClick={goToNext}
          title={`Click to scroll to next page: ${nextSection.title}`}
          aria-label={`Next Page: ${nextSection.title}`}
          className="group relative flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-dancing text-base sm:text-xl font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-[0_0_20px_rgba(244,63,104,0.7)] hover:shadow-[0_0_30px_rgba(244,63,104,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30"
        >
          <span>
            {currentIndex === SECTIONS.length - 1 ? 'Start Again ♡' : `Next: ${nextSection.title}`}
          </span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform animate-bounce" />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
        </button>

        {/* Auto-Tour Toggle Button */}
        <button
          onClick={() => {
            setIsAutoTour(!isAutoTour);
            if (!isAutoTour) triggerHeartBurst();
          }}
          title={isAutoTour ? "Pause automatic scrolling" : "Start automatic story tour (auto-scrolls every 8 seconds)"}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
            isAutoTour
              ? 'bg-rose-500 text-white shadow-lg animate-pulse'
              : 'text-rose-200/80 hover:text-white hover:bg-white/10'
          }`}
        >
          {isAutoTour ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-dancing text-xs">Auto: ON</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-dancing text-xs">Auto Tour</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
