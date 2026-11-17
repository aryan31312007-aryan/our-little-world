import React, { useState } from 'react';
import { Check, Heart, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import { RoseDecor, RosePetal, DoodleCrown } from './Decorations';
import { triggerHeartBurst } from './FloatingParticles';

export const PromiseSection = ({ onNavigate }) => {
  const [checkedPromises, setCheckedPromises] = useState([0, 1, 2, 3, 4]);

  const togglePromise = (index) => {
    triggerHeartBurst();
    if (checkedPromises.includes(index)) {
      setCheckedPromises(checkedPromises.filter((i) => i !== index));
    } else {
      setCheckedPromises([...checkedPromises, index]);
    }
  };

  return (
    <section
      id="promise"
      className="relative min-h-screen w-full bg-[#fdebf0] py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Soft Pink Paper Texture */}
      <div className="absolute inset-0 paper-pink opacity-80 pointer-events-none" />

      {/* Decorative Corner Roses */}
      <div className="absolute top-10 left-8 pointer-events-none hidden md:block">
        <RoseDecor className="w-24 h-24" rotation={-15} />
      </div>
      <div className="absolute bottom-8 right-8 pointer-events-none hidden md:block">
        <RoseDecor className="w-28 h-28" rotation={25} />
      </div>

      {/* Floating Petals */}
      <div className="absolute top-1/3 left-6 pointer-events-none opacity-80">
        <RosePetal className="w-8 h-8" rotation={-25} />
      </div>
      <div className="absolute bottom-1/4 right-12 pointer-events-none opacity-80">
        <RosePetal className="w-9 h-9" rotation={35} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT SIDE: Romantic Anime Illustrated Couple Kissing Forehead (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Cute Hand-drawn Crown Doodle Above Boy's Head */}
              <div className="absolute -top-10 left-12 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <DoodleCrown className="w-12 h-12" />
              </div>

              {/* Floating Hearts around the Couple */}
              <div className="absolute -top-4 -right-2 text-rose-500 animate-pulse text-2xl">
                ♡
              </div>
              <div className="absolute top-1/2 -left-6 text-rose-400 animate-float text-3xl">
                ♡
              </div>
              <div className="absolute -bottom-2 right-4 text-pink-500 animate-pulse text-2xl">
                ♡
              </div>

              {/* Illustration Frame with Soft Glowing Border */}
              <div className="relative p-3 bg-white/70 backdrop-blur-sm rounded-3xl shadow-[0_20px_40px_rgba(244,63,104,0.25)] border-2 border-rose-300/80 overflow-hidden transform group-hover:scale-102 transition-transform duration-300">
                <img
                  src={siteConfig.promise.illustrationSrc}
                  alt="Boy tenderly kissing girl forehead"
                  className="w-full max-w-sm h-auto rounded-2xl object-cover mix-blend-multiply"
                />
              </div>

              {/* Tender Caption below illustration */}
              <div className="mt-4 text-center">
                <p className="font-dancing font-bold text-2xl text-rose-800 drop-shadow-sm">
                  Always with you, Darling ♡
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Heading & 5 Promise Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-dancing font-bold text-4xl sm:text-6xl text-rose-900 tracking-wide drop-shadow-sm flex items-center justify-center lg:justify-start gap-3">
                <span>{siteConfig.promise.heading}</span>
              </h2>
              <p className="font-dancing text-2xl sm:text-3xl text-rose-700/90 mt-1">
                {siteConfig.promise.subtitle}
              </p>
              <div className="w-20 h-1 bg-rose-400/50 mt-2 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* 5 Promise Cards */}
            <div className="w-full space-y-3.5 sm:space-y-4">
              {siteConfig.promise.promisesList.map((promiseText, idx) => {
                const isChecked = checkedPromises.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => togglePromise(idx)}
                    className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-sm border ${
                      isChecked
                        ? 'bg-white/95 border-rose-300 shadow-[0_8px_20px_rgba(244,63,104,0.15)] hover:shadow-[0_10px_25px_rgba(244,63,104,0.25)] hover:scale-[1.01]'
                        : 'bg-white/60 border-stone-200 text-stone-500'
                    }`}
                  >
                    {/* Pink Circular Checkmark Icon */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isChecked
                          ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md shadow-rose-400/50 scale-105'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>

                    {/* Promise Text */}
                    <span className="font-poppins text-base sm:text-lg font-medium text-stone-800 text-left">
                      {promiseText}
                    </span>

                    {/* Subtle Heart on Hover */}
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-5 h-5 text-rose-400 fill-rose-300" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Text: "Because you are my everything ♡" with handwritten flourish */}
            <div className="mt-8 text-center lg:text-left w-full">
              <div className="inline-block relative">
                <p className="font-dancing font-bold text-3xl sm:text-4xl text-rose-800 drop-shadow-sm">
                  {siteConfig.promise.bottomTagline}
                </p>
                {/* Curved Underline Flourish with Heart */}
                <svg className="w-full h-6 stroke-rose-500 fill-none mt-1" viewBox="0 0 300 24">
                  <path d="M 5,14 Q 140,24 260,10" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 265,10 C 268,6 274,6 277,10 C 280,14 274,18 271,20 C 268,18 262,14 265,10 Z" fill="#f43f68" stroke="#f43f68" />
                </svg>
              </div>
            </div>

            {/* Section Bottom Next Page Button */}
            <div className="mt-8 text-center lg:text-left w-full">
              <button
                onClick={() => {
                  triggerHeartBurst();
                  if (onNavigate) {
                    onNavigate('justforyou');
                  } else {
                    document.getElementById('justforyou')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-700 font-dancing text-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-rose-300"
              >
                <span>Next Page: Just For You 💌</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
