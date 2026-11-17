import React from 'react';

// Glowing Fairy Lights garland for the Home section
export const FairyLights = () => {
  const bulbs = [
    { top: '10%', left: '8px', color: '#ffbe0b', delay: '0s' },
    { top: '24%', left: '22px', color: '#fb5607', delay: '0.6s' },
    { top: '38%', left: '12px', color: '#ffbe0b', delay: '1.2s' },
    { top: '52%', left: '26px', color: '#ff006e', delay: '0.4s' },
    { top: '66%', left: '14px', color: '#ffbe0b', delay: '1.8s' },
    { top: '80%', left: '24px', color: '#ffbe0b', delay: '0.9s' },
  ];

  return (
    <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10 hidden sm:block">
      {/* Hanging Wire */}
      <svg className="w-full h-full stroke-stone-600/40 fill-none" viewBox="0 0 50 800" preserveAspectRatio="none">
        <path d="M 15,0 Q 30,100 15,200 T 25,400 T 15,600 T 25,800" strokeWidth="1.5" />
      </svg>
      {/* Bulbs */}
      {bulbs.map((b, i) => (
        <div
          key={i}
          className="absolute w-4 h-5 rounded-full animate-pulse"
          style={{
            top: b.top,
            left: b.left,
            backgroundColor: b.color,
            boxShadow: `0 0 12px ${b.color}, 0 0 24px ${b.color}`,
            animationDelay: b.delay,
            animationDuration: '2.5s',
          }}
        >
          <div className="w-1.5 h-1 bg-stone-700 mx-auto -mt-1 rounded-t-sm" />
        </div>
      ))}
    </div>
  );
};

// Decorative Red Rose SVG
export const RoseDecor = ({ className = "w-16 h-16", rotation = 0 }) => (
  <svg
    viewBox="0 0 100 100"
    className={`inline-block drop-shadow-md transition-transform duration-300 ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Leaves */}
    <path d="M25 65 C10 60, 5 75, 20 80 C30 82, 35 70, 25 65 Z" fill="#2d6a4f" opacity="0.9" />
    <path d="M75 65 C90 60, 95 75, 80 80 C70 82, 65 70, 75 65 Z" fill="#2d6a4f" opacity="0.9" />
    <path d="M20 72 L35 70" stroke="#1b4332" strokeWidth="1.5" />
    <path d="M80 72 L65 70" stroke="#1b4332" strokeWidth="1.5" />

    {/* Outer Petals */}
    <ellipse cx="50" cy="50" rx="38" ry="34" fill="#a4161a" />
    <path d="M15 50 C15 30, 40 18, 50 18 C60 18, 85 30, 85 50 C85 70, 60 82, 50 82 C40 82, 15 70, 15 50 Z" fill="#ba181b" />
    <path d="M22 45 C24 32, 42 22, 50 22 C58 22, 76 32, 78 45 C80 60, 58 74, 50 74 C42 74, 20 60, 22 45 Z" fill="#e5383b" />
    
    {/* Inner Petals swirl */}
    <path d="M30 46 C32 36, 45 30, 52 30 C60 30, 70 38, 68 48 C66 58, 48 64, 42 60 C36 56, 40 48, 50 48 C56 48, 60 52, 58 56" 
      stroke="#660708" strokeWidth="3" fill="#e5383b" strokeLinecap="round" />
    <path d="M44 42 C46 38, 54 38, 56 42 C58 46, 52 50, 48 48 Z" fill="#660708" />
    {/* Soft highlight */}
    <circle cx="46" cy="38" r="3" fill="#ff758f" opacity="0.6" />
  </svg>
);

// Floating Single Rose Petal SVG
export const RosePetal = ({ className = "w-6 h-6", rotation = 15 }) => (
  <svg
    viewBox="0 0 50 50"
    className={`inline-block drop-shadow-sm pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
    fill="none"
  >
    <path
      d="M25 5 C35 15, 45 30, 35 42 C25 50, 15 45, 10 35 C5 22, 15 10, 25 5 Z"
      fill="#e63946"
      opacity="0.85"
    />
    <path
      d="M23 12 C28 20, 30 30, 26 38"
      stroke="#9d0208"
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

// Cute Hand-drawn Heart SVG
export const DoodleHeart = ({ className = "w-6 h-6 text-rose-500" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// Cute Hand-drawn Crown SVG for Promise Section
export const DoodleCrown = ({ className = "w-10 h-10 text-amber-400" }) => (
  <svg viewBox="0 0 50 40" fill="currentColor" className={className}>
    <path d="M5 32 L10 12 L20 22 L25 5 L30 22 L40 12 L45 32 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="3" fill="#f59e0b" />
    <circle cx="25" cy="4" r="3.5" fill="#f59e0b" />
    <circle cx="40" cy="10" r="3" fill="#f59e0b" />
  </svg>
);

// Wooden Signboard for Forever Section
export const WoodenSignboard = ({ title = "Our Little World...", subtitle = "Forever ♡" }) => (
  <div className="relative inline-flex flex-col items-center select-none filter drop-shadow-xl group hover:scale-105 transition-transform duration-300">
    {/* Wooden Sign Plank */}
    <div className="relative px-6 py-4 bg-gradient-to-b from-[#8d5b36] via-[#6f4222] to-[#543015] border-2 border-[#3d1f08] rounded-md shadow-2xl text-center">
      {/* Wood grain highlight lines */}
      <div className="absolute inset-x-2 top-1.5 h-0.5 bg-[#ab7547] opacity-40 rounded"></div>
      <div className="absolute inset-x-3 bottom-1.5 h-0.5 bg-[#3d1f08] opacity-60 rounded"></div>
      {/* Screws / Nails */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#241306] border border-[#a27448] shadow-inner"></div>
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#241306] border border-[#a27448] shadow-inner"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#241306] border border-[#a27448] shadow-inner"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#241306] border border-[#a27448] shadow-inner"></div>

      <div className="font-dancing font-bold text-amber-100 text-lg sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
        {title}
      </div>
      <div className="font-dancing font-bold text-rose-300 text-xl sm:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-0.5">
        {subtitle}
      </div>
    </div>
    {/* Wooden Post */}
    <div className="w-4 h-12 bg-gradient-to-r from-[#5a3417] via-[#7d4822] to-[#4e2c13] border-x border-b border-[#301807] shadow-lg"></div>
  </div>
);
