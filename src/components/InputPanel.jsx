import React, { useState } from 'react';
import { generateRandomArray } from '../utils/arrayUtils';
import { RefreshCw, Play } from 'lucide-react';

const InputPanel = ({ array, setArray }) => {
  const [inputValue, setInputValue] = useState(array.join(', '));

  const handleApply = () => {
    const newArr = inputValue.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    if (newArr.length > 0) {
      setArray(newArr);
      setInputValue(newArr.join(', '));
    }
  };

  const handleRandom = () => {
    const newArr = generateRandomArray(Array.isArray(array) ? array.length : 8);
    setArray(newArr);
    setInputValue(newArr.join(', '));
  };

  return (
    <div className="bg-calm-card p-8 rounded-2xl border border-calm-border shadow-drop-card">
      <h2 className="text-xl font-medium mb-6 text-calm-text tracking-wide">Configure Dataset</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-calm-bg border border-calm-border rounded-xl px-5 py-3 font-mono text-calm-text focus:outline-none focus:border-calm-primary/60 transition-colors shadow-inner"
          placeholder="e.g. 3, 5, 1, 2, 4"
        />
        <button 
          onClick={handleApply}
          className="bg-calm-border hover:bg-gray-700 text-calm-text px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium hover:-translate-y-[1px] shadow-sm"
        >
          <Play size={18} /> Apply Custom
        </button>
        <button 
          onClick={handleRandom}
          className="bg-calm-primary/10 hover:bg-calm-primary/20 text-calm-primary px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium hover:-translate-y-[1px]"
        >
          <RefreshCw size={18} /> Generate Random
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-2">
        {array.map((num, idx) => (
          <div key={idx} className="w-14 h-14 flex items-center justify-center bg-calm-bg border border-calm-border rounded-xl font-mono text-lg text-calm-text shadow-sm transition-all hover:-translate-y-1 hover:border-calm-primary/50">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputPanel;
