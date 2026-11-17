import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Upload, RotateCcw, Heart, Eye, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import { RoseDecor, RosePetal } from './Decorations';
import { triggerHeartBurst } from './FloatingParticles';

export const MemoriesSection = ({ onNavigate }) => {
  // Photos state loaded from config, with localStorage persistence for user uploads
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('our_little_world_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return siteConfig.memories.photos;
      }
    }
    return siteConfig.memories.photos;
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedPhotoForUpload, setSelectedPhotoForUpload] = useState(null);

  // Rotations for natural scrapbook feel
  const rotations = [-2.5, 1.8, -1.5, 2.2, -1.8];

  // Save changes to localStorage
  const updatePhotos = (newPhotos) => {
    setPhotos(newPhotos);
    localStorage.setItem('our_little_world_photos', JSON.stringify(newPhotos));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedPhotoForUpload !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const updated = photos.map((p, idx) =>
          idx === selectedPhotoForUpload ? { ...p, image: dataUrl } : p
        );
        updatePhotos(updated);
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const resetPhotos = () => {
    localStorage.removeItem('our_little_world_photos');
    setPhotos(siteConfig.memories.photos);
  };

  const scrollGallery = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const nextLightbox = () => {
    setActiveLightboxIndex((prev) => (prev + 1) % photos.length);
  };

  const prevLightbox = () => {
    setActiveLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'Escape') setActiveLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  return (
    <section
      id="memories"
      className="relative min-h-screen w-full bg-[#fce7ee] py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Background Scrapbook Texture */}
      <div className="absolute inset-0 paper-pink opacity-70 pointer-events-none" />

      {/* Decorative Corner Roses */}
      <div className="absolute top-8 left-8 pointer-events-none hidden md:block">
        <RoseDecor className="w-24 h-24" rotation={-30} />
      </div>
      <div className="absolute bottom-6 right-8 pointer-events-none hidden md:block">
        <RoseDecor className="w-24 h-24" rotation={20} />
      </div>

      {/* Petals */}
      <div className="absolute top-1/4 right-10 pointer-events-none opacity-80">
        <RosePetal className="w-8 h-8" rotation={-15} />
      </div>
      <div className="absolute bottom-1/3 left-10 pointer-events-none opacity-80">
        <RosePetal className="w-9 h-9" rotation={35} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-center">
        {/* Heading & Subtitle */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-dancing font-bold text-4xl sm:text-6xl text-rose-900 tracking-wide drop-shadow-sm flex items-center justify-center gap-3">
            <span>{siteConfig.memories.heading}</span>
          </h2>
          <p className="font-dancing text-xl sm:text-2xl text-rose-700/90 mt-2">
            {siteConfig.memories.subtitle}
          </p>
          <div className="w-24 h-1 bg-rose-400/50 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Gallery Carousel Container with Navigation Arrows */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollGallery('left')}
            aria-label="Previous photos"
            className="hidden sm:flex absolute -left-2 md:left-2 z-20 w-12 h-12 rounded-full bg-white/90 text-rose-600 hover:text-white hover:bg-rose-500 shadow-xl items-center justify-center transition-all duration-300 hover:scale-110 border border-rose-200"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Polaroid Cards Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto py-8 px-4 w-full scroll-smooth no-scrollbar snap-x snap-mandatory justify-start lg:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {photos.map((item, index) => {
              const rotation = rotations[index % rotations.length];
              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 snap-center group relative cursor-pointer"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                  onClick={() => setActiveLightboxIndex(index)}
                >
                  {/* Clothespin Clip at top */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 clothespin"></div>

                  {/* Polaroid Frame */}
                  <div className="w-60 sm:w-64 bg-white p-3.5 pb-6 rounded-sm shadow-[0_15px_30px_rgba(180,80,100,0.22)] border border-stone-200 group-hover:scale-105 group-hover:shadow-[0_20px_40px_rgba(244,63,104,0.35)] transition-all duration-300">
                    {/* Photo Inner Container */}
                    <div className="relative w-full h-56 sm:h-60 bg-stone-100 overflow-hidden rounded-sm shadow-inner">
                      <img
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Hover Overlay with Action Buttons */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLightboxIndex(index);
                          }}
                          title="View Fullscreen"
                          className="p-2.5 rounded-full bg-white/90 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors shadow-lg"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhotoForUpload(index);
                            fileInputRef.current?.click();
                          }}
                          title="Replace with your own photograph"
                          className="p-2.5 rounded-full bg-white/90 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors shadow-lg"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Handwritten Caption */}
                    <div className="mt-4 text-center">
                      <p className="font-dancing font-bold text-xl sm:text-2xl text-stone-800 tracking-wide">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollGallery('right')}
            aria-label="Next photos"
            className="hidden sm:flex absolute -right-2 md:right-2 z-20 w-12 h-12 rounded-full bg-white/90 text-rose-600 hover:text-white hover:bg-rose-500 shadow-xl items-center justify-center transition-all duration-300 hover:scale-110 border border-rose-200"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* Upload Personalize Hint & Reset Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-stone-600">
          <span className="font-dancing text-lg text-rose-800">
            💡 Click on any photo to view full size or replace with your own photos!
          </span>
          <button
            onClick={resetPhotos}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600 text-xs shadow-sm border border-rose-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Photos</span>
          </button>
        </div>

        {/* Bottom Quote */}
        <div className="mt-8 text-center">
          <p className="font-dancing font-bold text-2xl sm:text-3xl text-rose-900 drop-shadow-sm flex items-center justify-center gap-2">
            <span>{siteConfig.memories.bottomQuote}</span>
          </p>
        </div>

        {/* Section Bottom Next Page Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              triggerHeartBurst();
              if (onNavigate) {
                onNavigate('promise');
              } else {
                document.getElementById('promise')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-700 font-dancing text-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-rose-300"
          >
            <span>Next Page: My Promise 💕</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Lightbox Content Container */}
          <div
            className="relative max-w-4xl w-full bg-white p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-600 transition-colors shadow-md"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full max-h-[65vh] sm:max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-stone-900">
              <img
                src={photos[activeLightboxIndex].image}
                alt={photos[activeLightboxIndex].caption}
                className="max-h-[65vh] sm:max-h-[70vh] w-auto max-w-full object-contain"
              />

              {/* Prev / Next Buttons inside Lightbox */}
              <button
                onClick={prevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption & Controls */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
              <div>
                <h4 className="font-dancing font-bold text-3xl text-rose-800">
                  {photos[activeLightboxIndex].caption}
                </h4>
                <p className="text-xs text-stone-500">
                  Photo {activeLightboxIndex + 1} of {photos.length}
                </p>
              </div>

              {/* Upload Replacement in Lightbox */}
              <button
                onClick={() => {
                  setSelectedPhotoForUpload(activeLightboxIndex);
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm shadow-md transition-all hover:scale-105"
              >
                <Upload className="w-4 h-4" />
                <span>Replace This Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
