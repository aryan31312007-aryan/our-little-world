// Central Audio Controller for Our Little World
// Ensures audio plays reliably across all browsers and devices

class AudioController {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.listeners = new Set();
    this.isMutedByUser = false;
  }

  init() {
    if (this.audio) return;
    this.audio = new Audio('/assets/romantic_music.wav');
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.35;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    // Try instant play on initialization
    this.tryPlay();

    // Listen for any user gesture anywhere to unlock audio
    const unlock = () => {
      if (!this.isPlaying && !this.isMutedByUser) {
        this.play();
      }
    };

    ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach((event) => {
      window.addEventListener(event, unlock, { passive: true });
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  tryPlay() {
    if (this.isMutedByUser || !this.audio) return;
    const p = this.audio.play();
    if (p !== undefined) {
      p.then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {
        // Autoplay blocked by browser policy until user clicks/taps
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  play() {
    this.isMutedByUser = false;
    if (this.audio) {
      this.audio.volume = 0.35;
      const p = this.audio.play();
      if (p !== undefined) {
        p.then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch((err) => {
          console.log("Audio play error:", err);
        });
      }
    }
  }

  pause() {
    this.isMutedByUser = true;
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

export const audioController = new AudioController();
