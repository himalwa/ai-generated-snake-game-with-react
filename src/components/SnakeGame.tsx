import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const gameRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      const onSnake = snake.some(segment => segment.x === newFood!.x && segment.y === newFood!.y);
      if (!onSnake) break;
    }
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(prev => !prev);
          if (gameOver) resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver]);

  useEffect(() => {
    const interval = setInterval(moveSnake, Math.max(50, 150 - score / 2));
    return () => clearInterval(interval);
  }, [moveSnake, score]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex justify-between w-full max-w-[400px] font-mono">
        <div className="flex flex-col items-start">
          <span className="text-xs text-neon-pink/70 leading-none tracking-tight">DATA_STREAM::ACC_SCORE</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neon-pink">{score.toString().padStart(3, '0')}</span>
            <span className="text-[11px] text-neon-pink/40">PTS</span>
          </div>
        </div>
        <div className="flex flex-col items-end text-neon-yellow">
          <span className="text-xs opacity-70 leading-none tracking-tight">NODE_RECORD::MAX_VAL</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{highScore.toString().padStart(3, '0')}</span>
            <span className="text-[11px] opacity-40">MAX</span>
          </div>
        </div>
      </div>

      <div 
        ref={gameRef}
        className="relative tech-card"
        style={{ width: '400px', height: '400px' }}
      >
        <div className="noise-overlay" />
        
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-5">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-neon-pink/20" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${i}-${segment.x}-${segment.y}`}
            className={`absolute ${i === 0 ? 'bg-neon-yellow z-10 shadow-[0_0_15px_rgba(234,227,28,0.6)]' : 'bg-neon-yellow/40'}`}
            initial={false}
            animate={{
              x: segment.x * 20,
              y: segment.y * 20,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ 
              width: '18px', 
              height: '18px', 
              margin: '1px',
              borderRadius: i === 0 ? '2px' : '1px'
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          className="absolute bg-neon-pink shadow-[0_0_20px_#FF2E63]"
          animate={{
            x: food.x * 20,
            y: food.y * 20,
            scale: [1, 1.3, 1],
            rotate: [45, 135, 45],
          }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ width: '12px', height: '12px', margin: '4px', transform: 'rotate(45deg)' }}
        />

        {/* Overlays */}
        <AnimatePresence>
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 backdrop-blur-md"
            >
              <h2 className="text-3xl font-bold text-neon-pink mb-8 tracking-tighter uppercase">Memory_Leak::Critical</h2>
              <button 
                onClick={resetGame}
                className="tech-btn btn-pink"
              >
                REINITIALIZE_GRID
              </button>
            </motion.div>
          )}

          {isPaused && !gameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]"
            >
              <button 
                onClick={() => setIsPaused(false)}
                className="group relative p-6 bg-neon-yellow/5 border border-neon-yellow/30 hover:border-neon-yellow/50 transition-all rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-neon-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-neon-yellow border-b-[10px] border-b-transparent ml-1" />
              </button>
              <span className="mt-6 text-neon-yellow/70 text-[11px] font-mono tracking-widest animate-pulse uppercase">Sync_Pending::Press_Space</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 items-center">
        <div className="w-2.5 h-2.5 bg-neon-pink animate-pulse rounded-full" />
        <div className="text-neon-pink/60 font-mono text-[11px] uppercase tracking-widest">
          Nav_Input:[Arrows] • Control_Sig:[Space]
        </div>
      </div>
    </div>
  );
}
