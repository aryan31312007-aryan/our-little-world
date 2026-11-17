import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

// Trigger romantic heart confetti explosion
export const triggerHeartBurst = () => {
  // Center heart burst
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a', '#ffccd5'],
    shapes: ['circle'],
    scalar: 1.2,
  });

  // Second delayed burst with wide spread
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff0054', '#ff5400', '#ffbd00', '#f72585'],
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff0054', '#ff5400', '#ffbd00', '#f72585'],
    });
  }, 200);
};

export const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate static particle metadata to avoid re-renders
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8 + Math.random() * 4).toFixed(1)}%`,
      size: Math.floor(Math.random() * 14) + 12,
      duration: (Math.random() * 6 + 8).toFixed(1),
      delay: (Math.random() * 8).toFixed(1),
      isPetal: i % 3 === 0,
      opacity: (Math.random() * 0.4 + 0.35).toFixed(2),
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 text-rose-400 select-none"
          style={{
            left: p.left,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `heartFloat ${p.duration}s ease-in infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.isPetal ? (
            <svg
              viewBox="0 0 30 30"
              width={p.size}
              height={p.size}
              className="fill-rose-400/80 drop-shadow-sm"
            >
              <path d="M15 2 C22 8, 28 18, 22 26 C16 30, 8 28, 5 22 C2 14, 8 6, 15 2 Z" />
            </svg>
          ) : (
            '♡'
          )}
        </div>
      ))}
    </div>
  );
};
