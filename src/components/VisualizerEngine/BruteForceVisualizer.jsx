import React, { useState, useEffect } from 'react';
import { useBruteForceAlgorithm } from '../../hooks/useBruteForceAlgorithm';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const BruteForceVisualizer = ({ array }) => {
  const steps = useBruteForceAlgorithm(array);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800); // ms per step, slowed down for calm effect

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [array]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, speed, steps.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const stepForward = () => {
      setIsPlaying(false);
      if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };
  const reset = () => {
      setIsPlaying(false);
      setCurrentStep(0);
  };

  if(!steps || steps.length === 0) return null;

  const currentData = steps[currentStep];

  return (
    <div className="bg-calm-card p-8 rounded-2xl border border-calm-border shadow-drop-card">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium text-calm-text tracking-wide">Iterative Method</h2>
        <div className="flex bg-calm-bg rounded-lg overflow-hidden border border-calm-border shadow-inner">
            <button onClick={() => setSpeed(1200)} className={`px-4 py-1.5 text-sm transition-colors ${speed === 1200 ? 'bg-calm-primary/20 text-calm-primary font-medium' : 'text-calm-muted hover:text-calm-text'}`}>Slow</button>
            <button onClick={() => setSpeed(800)} className={`px-4 py-1.5 text-sm border-l border-r border-calm-border transition-colors ${speed === 800 ? 'bg-calm-primary/20 text-calm-primary font-medium' : 'text-calm-muted hover:text-calm-text'}`}>Smooth</button>
            <button onClick={() => setSpeed(300)} className={`px-4 py-1.5 text-sm transition-colors ${speed === 300 ? 'bg-calm-primary/20 text-calm-primary font-medium' : 'text-calm-muted hover:text-calm-text'}`}>Fast</button>
        </div>
      </div>

      <div className="flex justify-center mb-12 h-24 items-center">
        <div className="flex gap-4 flex-wrap justify-center">
          {array.map((num, idx) => {
            const isActive = currentData.activeIndices.includes(idx);
            return (
              <motion.div 
                key={idx}
                animate={{
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? -4 : 0,
                    borderColor: isActive ? '#6366f1' : '#1f2937',
                    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : '#0b1220'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`w-14 h-14 flex items-center justify-center rounded-xl border font-mono text-xl text-calm-text shadow-sm`}
              >
                {num}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-calm-bg p-5 rounded-xl border border-calm-border/50 text-center shadow-sm">
              <p className="text-calm-muted text-xs uppercase tracking-wider mb-2">Current Min</p>
              <p className="text-3xl font-mono font-medium text-calm-min">{currentData.min ?? '-'}</p>
          </div>
          <div className="bg-calm-bg p-5 rounded-xl border border-calm-border/50 text-center shadow-sm">
              <p className="text-calm-muted text-xs uppercase tracking-wider mb-2">Current Max</p>
              <p className="text-3xl font-mono font-medium text-calm-max">{currentData.max ?? '-'}</p>
          </div>
          <div className="bg-calm-bg p-5 rounded-xl border border-calm-primary/30 text-center shadow-sm">
              <p className="text-calm-primary text-xs uppercase tracking-wider mb-2">Comparisons</p>
              <p className="text-3xl font-mono font-medium text-calm-text">{currentData.comparisons}</p>
          </div>
      </div>

      <div className="bg-calm-bg/50 p-5 rounded-xl border border-calm-border mb-8 font-mono text-sm text-center min-h-[72px] flex items-center justify-center text-calm-muted shadow-inner backdrop-blur-sm">
          <motion.span 
              key={currentData.explanation}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
          >
              {currentData.explanation}
          </motion.span>
      </div>

      <div className="flex justify-center gap-5">
          <button onClick={reset} className="p-3.5 bg-calm-border hover:bg-gray-700 rounded-full text-calm-text transition-all hover:-translate-y-[1px] shadow-sm" title="Reset">
              <RotateCcw size={20} />
          </button>
          <button onClick={togglePlay} className="px-8 py-3.5 bg-calm-primary hover:bg-indigo-400 rounded-full text-white font-medium flex items-center gap-3 shadow-md hover:-translate-y-[1px] transition-all w-36 justify-center">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={stepForward} disabled={currentStep >= steps.length - 1} className="p-3.5 bg-calm-border hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-calm-border disabled:hover:translate-y-0 rounded-full text-calm-text transition-all hover:-translate-y-[1px] shadow-sm" title="Step Forward">
              <SkipForward size={20} />
          </button>
      </div>
    </div>
  );
};

export default BruteForceVisualizer;
