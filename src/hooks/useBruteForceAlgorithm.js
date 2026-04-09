import { useMemo } from 'react';

export const useBruteForceAlgorithm = (array) => {
  const steps = useMemo(() => {
    if (!array || array.length === 0) return [];
    
    const generatedSteps = [];
    let comparisons = 0;
    
    let currentMin = array[0];
    let currentMax = array[0];
    
    generatedSteps.push({
      activeIndices: [0],
      min: currentMin,
      max: currentMax,
      comparisons,
      explanation: `Initialized Min and Max to first element: ${array[0]}`,
    });
    
    for (let i = 1; i < array.length; i++) {
        const val = array[i];
        
        comparisons++;
        generatedSteps.push({
            activeIndices: [i],
            min: currentMin,
            max: currentMax,
            comparisons,
            explanation: `Comparing ${val} with current Max ${currentMax}...`,
        });
        
        if (val > currentMax) {
            currentMax = val;
            generatedSteps.push({
                activeIndices: [i],
                min: currentMin,
                max: currentMax,
                comparisons,
                explanation: `${val} > previous Max. Updated Max to ${currentMax}.`,
            });
        }
        
        comparisons++;
        generatedSteps.push({
            activeIndices: [i],
            min: currentMin,
            max: currentMax,
            comparisons,
            explanation: `Comparing ${val} with current Min ${currentMin}...`,
        });
        
        if (val < currentMin) {
            currentMin = val;
            generatedSteps.push({
                activeIndices: [i],
                min: currentMin,
                max: currentMax,
                comparisons,
                explanation: `${val} < previous Min. Updated Min to ${currentMin}.`,
            });
        }
    }
    
    generatedSteps.push({
      activeIndices: [],
      min: currentMin,
      max: currentMax,
      comparisons,
      explanation: `Algorithm complete! Final Min: ${currentMin}, final Max: ${currentMax}.`,
    });
    
    return generatedSteps;
  }, [array]);

  return steps;
};
