import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_TRACKS, Track } from '../constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log('Autoplay blocked or error', e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <div className="w-full max-w-[400px] tech-card p-6">
      <div className="noise-overlay" />
      
      <div className="flex flex-col gap-6 relative z-10">
        {/* Track Info */}
        <div className="flex items-center gap-4">
          <motion.div 
            key={track.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-16 h-16 border border-neon-yellow/30 flex-shrink-0 overflow-hidden group"
          >
            <img 
              src={track.cover} 
              alt={track.title} 
              className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'grayscale-0 scale-105 opacity-100' : 'grayscale opacity-40'}`} 
            />
            
            {/* Embedded Cover Visualizer */}
            <div className="absolute inset-0 flex items-center justify-center gap-[2px] px-2 bg-black/20">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-neon-yellow/60 shadow-[0_0_8px_#EAE31C]"
                  animate={{
                    height: isPlaying ? [2, 12, 4, 16, 2] : 2,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + Math.random() * 0.5,
                    delay: i * 0.08,
                  }}
                />
              ))}
            </div>

            {/* Mobile Scanline Effect */}
            {isPlaying && (
              <motion.div 
                className="absolute top-0 left-0 w-full h-[2px] bg-neon-pink/80 shadow-[0_0_15px_#FF2E63] z-10"
                animate={{ top: ['-5%', '105%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            )}
          </motion.div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-white font-bold text-sm truncate tracking-tight uppercase">{track.title}</h3>
            <p className="text-neon-yellow/70 font-mono text-[11px] truncate uppercase tracking-widest mt-1">SOURCE::{track.artist.replace(/\s/g, '_')}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
             <div className="w-4 h-[1px] bg-neon-pink" />
             <div className="w-2 h-[1px] bg-neon-pink/40" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-1.5 bg-neon-yellow/5 border border-neon-yellow/10 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-neon-yellow/80"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            />
            <input 
              type="range" 
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              value={progress}
              onChange={handleProgressChange}
            />
          </div>
          <div className="flex justify-between text-xs font-mono text-neon-yellow/60 tracking-widest">
            <span>{Math.floor((audioRef.current?.currentTime || 0) / 60).toString().padStart(2, '0')}:{(Math.floor((audioRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}</span>
            <span>{Math.floor(track.duration / 60).toString().padStart(2, '0')}:{(track.duration % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-2">
          <button 
            onClick={handlePrev}
            className="text-neon-pink/40 hover:text-neon-pink transition-colors"
            aria-label="Prev Track"
          >
            <SkipBack size={18} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="tech-btn btn-pink min-w-[140px]"
          >
            {isPlaying ? "[ HALT_PULSE ]" : "[ SEQ_START ]"}
          </button>

          <button 
            onClick={handleNext}
            className="text-neon-pink/40 hover:text-neon-pink transition-colors"
            aria-label="Next Track"
          >
            <SkipForward size={18} />
          </button>
        </div>

        {/* Binary Stream Visualizer */}
        <div className="flex items-end justify-between h-4 px-1 gap-px opacity-40 font-mono text-[10px] pointer-events-none overflow-hidden text-neon-yellow">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: isPlaying ? [0.2, 1, 0.2] : 0.2,
                y: isPlaying ? [0, -2, 0] : 0
              }}
              transition={{
                repeat: Infinity,
                duration: 0.1 + Math.random() * 0.1,
                delay: i * 0.05
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}X{Math.random() > 0.5 ? '0' : '1'}
            </motion.div>
          ))}
          <div className="ml-auto text-[10px] tracking-widest italic">FREQ_SYNC_OK</div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={track.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
}
