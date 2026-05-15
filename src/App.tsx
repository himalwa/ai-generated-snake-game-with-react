import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen text-neon-yellow flex flex-col items-center justify-start p-8 relative font-sans">
      <div className="noise-overlay opacity-5" />
      
      {/* Structural Framing */}
      <div className="fixed inset-4 border border-neon-pink/10 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-neon-pink/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-neon-pink/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-neon-pink/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-neon-pink/40" />
      </div>

      <header className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16 z-10 border-b border-neon-pink/10 pb-8">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-3 h-10 bg-neon-pink" />
            <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-yellow uppercase">Neural_Pulse</h1>
          </div>
          <div className="font-mono text-xs tracking-[0.2em] text-neon-yellow/60 uppercase">
            System_Manifest::v2.4.0 • Node_Active:[402]
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-8 font-mono"
        >
          <div className="text-right">
            <div className="text-[11px] text-neon-yellow/70 uppercase tracking-tight">Connection_Status</div>
            <div className="text-neon-yellow text-sm font-bold leading-none mt-1">ENCRYPTED_P2P</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-neon-pink/70 uppercase tracking-tight">Terminal_Env</div>
            <div className="text-neon-pink text-sm font-bold leading-none mt-1">STABLE_BETA</div>
          </div>
        </motion.div>
      </header>

      <main className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-16 z-10 w-full max-w-7xl">
        {/* Game Segment */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-between w-full mb-4 px-2">
            <span className="font-mono text-xs text-neon-yellow/60 uppercase tracking-widest italic">Simulation_Grid::01</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-neon-yellow/40 rounded-full" />
              <div className="w-1.5 h-1.5 bg-neon-yellow/40 rounded-full" />
              <div className="w-1.5 h-1.5 bg-neon-yellow rounded-full animate-pulse" />
            </div>
          </div>
          <SnakeGame />
        </motion.section>

        {/* Audio Segment */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center w-full max-w-[400px]"
        >
          <div className="flex items-center justify-between w-full mb-4 px-2">
            <span className="font-mono text-xs text-neon-pink/60 uppercase tracking-widest italic">Audio_Processor::02</span>
            <span className="font-mono text-[10px] text-neon-pink/40 uppercase tracking-tighter self-end mb-0.5">Frequency_Sync_v2.1</span>
          </div>
          
          <MusicPlayer />
          
          <div className="mt-12 grid grid-cols-2 gap-4 w-full">
            <div className="p-4 bg-black/40 border border-neon-pink/20 flex flex-col gap-1 hover:border-neon-pink/40 transition-colors cursor-default">
              <span className="font-mono text-[11px] text-neon-pink/60 uppercase tracking-tight">Memory_Alloc</span>
              <span className="text-white text-sm font-bold font-mono">1.24 GB / 8.00 GB</span>
            </div>
            <div className="p-4 bg-black/40 border border-neon-pink/20 flex flex-col gap-1 hover:border-neon-pink/40 transition-colors cursor-default">
              <span className="font-mono text-[11px] text-neon-pink/60 uppercase tracking-tight">Current_Uptime</span>
              <span className="text-white text-sm font-bold font-mono">00:42:15:04</span>
            </div>
          </div>
          
          <div className="mt-8 italic font-mono text-[11px] text-neon-pink/40 uppercase tracking-wide text-center leading-relaxed max-w-[320px]">
            Standard operating procedure requires active sensory engagement during neural sequence transmission.
          </div>
        </motion.section>
      </main>

      <footer className="mt-auto py-12 w-full max-w-7xl border-t border-neon-pink/10 flex justify-between items-center z-10 opacity-60 font-mono text-xs uppercase tracking-widest">
        <span>SYS_LOG::ID_5521</span>
        <span className="animate-pulse">Active_Node_Pulse</span>
      </footer>
    </div>
  );
}
