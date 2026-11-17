import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioController } from '../utils/audioController';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(audioController.isPlaying);

  useEffect(() => {
    audioController.init();
    const unsubscribe = audioController.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    audioController.toggle();
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? "Mute romantic music" : "Play romantic music"}
        title={isPlaying ? "Music Playing (Click to mute)" : "Music Paused (Click to play)"}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg ${
          isPlaying
            ? 'bg-rose-500/90 text-white shadow-rose-500/40 ring-2 ring-rose-300/50 scale-105'
            : 'bg-white/20 hover:bg-white/30 text-rose-100 hover:text-white backdrop-blur-md border border-white/20'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse text-white" />
            <span className="hidden md:inline font-dancing text-sm">Playing Melody ♡</span>
            {/* Animated equalizer bars */}
            <span className="flex items-end gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDuration: '0.6s' }}></span>
              <span className="w-0.5 h-3 bg-white rounded-full animate-bounce" style={{ animationDuration: '0.9s' }}></span>
              <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDuration: '0.7s' }}></span>
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-rose-300 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline font-dancing text-sm">Music Muted</span>
          </>
        )}
      </button>
    </div>
  );
};
