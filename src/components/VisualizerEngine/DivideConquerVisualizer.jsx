import React, { useState, useEffect } from 'react';
import { useDivideConquerAlgorithm } from '../../hooks/useDivideConquerAlgorithm';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeNode = ({ node, nodeStates }) => {
  if (!node) return null;
  const stateData = nodeStates[node.id];
  if (!stateData || stateData.state === 'hidden') return null;

  const isActive = stateData.state === 'active';
  const isMerged = stateData.state === 'merged';

  return (
    <div className="flex flex-col items-center mx-2">
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, y: isActive ? -2 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        className={`px-4 py-2.5 z-10 rounded-xl border font-mono text-center shadow-sm
          ${isActive ? 'border-calm-primary bg-calm-primary/10 text-calm-primary shadow-[0_4px_15px_rgba(99,102,241,0.15)]' : 
            isMerged ? 'border-calm-secondary/50 bg-calm-card text-calm-text' : 'border-calm-border bg-calm-bg text-calm-text'}
        `}
      >
        <div className="text-sm font-medium tracking-wider">[{node.subarray.join(', ')}]</div>
        {stateData.min !== null && (
           <div className="text-[10px] pt-1.5 mt-1.5 border-t border-calm-border/60 uppercase tracking-widest text-calm-muted">
             Min <span className="text-calm-min font-bold">{stateData.min}</span> • Max <span className="text-calm-max font-bold">{stateData.max}</span>
           </div>
        )}
      </motion.div>
      
      {(node.left || node.right) && (
        <div className="flex gap-6 mt-6 relative w-full justify-center">
            {/* Solid border connector */}
            <div className="absolute top-[-24px] w-[50%] h-[24px] border-t-[3px] border-l-[3px] border-r-[3px] border-calm-muted rounded-t-lg" style={{ left: '25%' }}></div>
          {node.left && <TreeNode node={node.left} nodeStates={nodeStates} />}
          {node.right && <TreeNode node={node.right} nodeStates={nodeStates} />}
        </div>
      )}
    </div>
  );
};

const DivideConquerVisualizer = ({ array }) => {
  const { steps, initialTree } = useDivideConquerAlgorithm(array);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // Slower for calm effect

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
    <div className="bg-calm-card p-8 rounded-2xl border border-calm-border shadow-drop-card flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
        <h2 className="text-2xl font-medium text-calm-text tracking-wide text-center sm:text-left">Recursive Method</h2>
        <div className="flex bg-calm-bg rounded-lg overflow-hidden border border-calm-border shadow-inner w-full sm:w-auto justify-center">
            <button onClick={() => setSpeed(1400)} className={`flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-sm transition-colors ${speed === 1400 ? 'bg-calm-secondary/10 text-calm-secondary font-medium' : 'text-calm-muted hover:text-calm-text'}`}>Slow</button>
            <button onClick={() => setSpeed(1000)} className={`flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-sm border-l border-r border-calm-border transition-colors ${speed === 1000 ? 'bg-calm-secondary/10 text-calm-secondary font-medium' : 'text-calm-muted hover:text-calm-text'}`}>Smooth</button>
            <button onClick={() => setSpeed(500)} className={`flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-sm transition-colors ${speed === 500 ? 'bg-calm-secondary/10 text-calm-secondary font-medium' : 'text-calm-muted hover:text-calm-text'}`}>Fast</button>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden flex-1 min-h-[300px] flex justify-center py-4 mb-4 items-center">
        {initialTree && currentData?.nodeStates && (
           <TreeNode node={initialTree} nodeStates={currentData.nodeStates} />
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 mt-auto">
          <div className="bg-calm-bg p-4 sm:p-5 rounded-xl border border-calm-border/50 text-center shadow-sm flex flex-col justify-center">
              <p className="text-calm-muted text-[10px] sm:text-xs uppercase tracking-wider mb-2">Final Min</p>
              <p className="text-2xl sm:text-3xl font-mono font-medium text-calm-min">{currentData?.nodeStates?.[initialTree?.id]?.min ?? '-'}</p>
          </div>
          <div className="bg-calm-bg p-4 sm:p-5 rounded-xl border border-calm-border/50 text-center shadow-sm flex flex-col justify-center">
              <p className="text-calm-muted text-[10px] sm:text-xs uppercase tracking-wider mb-2">Final Max</p>
              <p className="text-2xl sm:text-3xl font-mono font-medium text-calm-max">{currentData?.nodeStates?.[initialTree?.id]?.max ?? '-'}</p>
          </div>
          <div className="bg-calm-bg p-4 sm:p-5 rounded-xl border border-calm-secondary/30 text-center shadow-sm flex flex-col justify-center">
              <p className="text-calm-secondary text-[10px] sm:text-xs uppercase tracking-wider mb-2">Comparisons</p>
              <p className="text-2xl sm:text-3xl font-mono font-medium text-calm-text">{currentData.comparisons}</p>
          </div>
          <div className="bg-calm-bg p-4 sm:p-5 rounded-xl border border-calm-border/50 text-center flex flex-col justify-center shadow-sm">
              <p className="text-calm-muted text-[10px] sm:text-xs uppercase tracking-wider mb-2">Time Complexity</p>
              <p className="text-lg sm:text-xl font-mono font-medium text-calm-muted">O(n)</p>
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

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          <button onClick={reset} className="p-3.5 bg-calm-border hover:bg-slate-300 rounded-full text-calm-text transition-all hover:-translate-y-[1px] shadow-sm">
              <RotateCcw size={20} />
          </button>
          <button onClick={togglePlay} className="px-6 sm:px-8 py-3.5 bg-calm-secondary hover:bg-calm-secondary/80 rounded-full text-white font-medium flex items-center gap-2 sm:gap-3 shadow-md hover:-translate-y-[1px] transition-all w-32 sm:w-36 justify-center">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={stepForward} disabled={currentStep >= steps.length - 1} className="p-3.5 bg-calm-border hover:bg-slate-300 disabled:opacity-50 disabled:hover:bg-calm-border disabled:hover:translate-y-0 rounded-full text-calm-text transition-all hover:-translate-y-[1px] shadow-sm">
              <SkipForward size={20} />
          </button>
      </div>
    </div>
  );
};

export default DivideConquerVisualizer;
