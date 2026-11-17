import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { siteConfig } from '../data/config';
import { MusicPlayer } from './MusicPlayer';

export const Navbar = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const sections = ['home', 'apology', 'memories', 'promise', 'justforyou', 'forever'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/85 backdrop-blur-md shadow-lg shadow-black/20 py-2.5 border-b border-rose-500/20'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_8px_rgba(244,63,104,0.8)]" />
              <div className="absolute inset-0 bg-rose-500 rounded-full blur-md opacity-40 animate-ping"></div>
            </div>
            <span className="font-dancing font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-rose-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {siteConfig.websiteTitle}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {siteConfig.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-rose-500/80 shadow-[0_0_15px_rgba(244,63,104,0.6)] backdrop-blur-sm'
                      : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-300 rounded-full animate-ping"></span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Controls: Music Toggle + Heart Icon + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <MusicPlayer />

            {/* Glowing Heart Icon on Desktop Right */}
            <div className="hidden lg:flex items-center pl-1">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400/40 hover:fill-rose-500 hover:scale-110 transition-all duration-300 cursor-pointer filter drop-shadow-[0_0_10px_rgba(244,63,104,0.6)]" />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="lg:hidden p-2 rounded-lg text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-center gap-2 pb-4 border-b border-rose-500/20 text-rose-300 font-dancing text-xl">
              <span>Dedicated with all my love</span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            {siteConfig.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-5 py-3 rounded-xl text-lg font-medium transition-all ${
                    isActive
                      ? 'bg-rose-500/30 text-white border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,104,0.3)]'
                      : 'text-rose-100 hover:bg-white/5'
                  }`}
                >
                  <span className="font-dancing text-2xl">{link.label}</span>
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-rose-400 fill-rose-400 scale-125' : 'text-stone-500'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="text-center pt-6 border-t border-rose-500/20 text-rose-300/80 font-dancing text-lg">
            "A small world, filled with you ❤️"
          </div>
        </div>
      )}
    </>
  );
};
