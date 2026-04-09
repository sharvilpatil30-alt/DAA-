import { useMemo } from 'react';

export const useDivideConquerAlgorithm = (array) => {
  const { steps, initialTree } = useMemo(() => {
    if (!array || array.length === 0) return { steps: [], initialTree: [] };

    let nodeId = 0;
    const treeNodes = []; // Flat representation of initial tree

    const buildTree = (arr, start, end, level) => {
      const id = nodeId++;
      const node = {
        id,
        start,
        end,
        level,
        subarray: arr.slice(start, end + 1),
        min: null,
        max: null,
        state: 'hidden', // 'hidden', 'active', 'merged'
        left: null,
        right: null
      };

      if (start === end) {
        // Leaf node
      } else if (start === end - 1) {
        node.left = buildTree(arr, start, start, level + 1);
        node.right = buildTree(arr, end, end, level + 1);
      } else {
        const mid = Math.floor((start + end) / 2);
        node.left = buildTree(arr, start, mid, level + 1);
        node.right = buildTree(arr, mid + 1, end, level + 1);
      }
      treeNodes.push(node);
      return node;
    };

    const rootNode = buildTree(array, 0, array.length - 1, 0);
    
    const generatedSteps = [];
    let comparisons = 0;
    
    // We need a helper to deeply clone the tree structure to save snapshotted states.
    // However, saving full tree clones is easier by keeping a map of node states.
    
    const nodeStates = {};
    treeNodes.forEach(n => {
      nodeStates[n.id] = { min: null, max: null, state: 'hidden' };
    });

    const snapshot = (explanation) => {
      generatedSteps.push({
        nodeStates: JSON.parse(JSON.stringify(nodeStates)),
        comparisons,
        explanation,
        rootNode // pass the static tree skeleton
      });
    };

    // Step 1: Initial Array
    nodeStates[rootNode.id].state = 'active';
    snapshot("Started Divide & Conquer. Initial array.");

    const solve = (node) => {
      nodeStates[node.id].state = 'active';

      if (node.start === node.end) {
        nodeStates[node.id].min = array[node.start];
        nodeStates[node.id].max = array[node.start];
        nodeStates[node.id].state = 'merged';
        snapshot(`Leaf node reached. Min = ${array[node.start]}, Max = ${array[node.start]}.`);
        return { min: array[node.start], max: array[node.start] };
      }

      if (node.start === node.end - 1) {
        // Optimization: arrays of size 2 -> 1 comparison
        nodeStates[node.left.id].state = 'active';
        nodeStates[node.right.id].state = 'active';
        snapshot(`Splitting array into base cases of size 2.`);
        
        comparisons++;
        let min, max;
        if (array[node.start] < array[node.end]) {
           min = array[node.start];
           max = array[node.end];
        } else {
           min = array[node.end];
           max = array[node.start];
        }
        
        nodeStates[node.left.id].min = array[node.start];
        nodeStates[node.left.id].max = array[node.start];
        nodeStates[node.left.id].state = 'merged';
        nodeStates[node.right.id].min = array[node.end];
        nodeStates[node.right.id].max = array[node.end];
        nodeStates[node.right.id].state = 'merged';
        
        nodeStates[node.id].min = min;
        nodeStates[node.id].max = max;
        nodeStates[node.id].state = 'merged';
        snapshot(`Compared ${array[node.start]} and ${array[node.end]}. Min: ${min}, Max: ${max}.`);
        return { min, max };
      }

      // Split
      snapshot(`Splitting array into two halves.`);
      const leftRes = solve(node.left);
      const rightRes = solve(node.right);

      // Merge
      comparisons++;
      let newMin = leftRes.min < rightRes.min ? leftRes.min : rightRes.min;
      snapshot(`Merging halves: Compare left Min ${leftRes.min} with right Min ${rightRes.min} -> new Min ${newMin}.`);
      
      comparisons++;
      let newMax = leftRes.max > rightRes.max ? leftRes.max : rightRes.max;
      
      nodeStates[node.id].min = newMin;
      nodeStates[node.id].max = newMax;
      nodeStates[node.id].state = 'merged';
      snapshot(`Merging halves: Compare left Max ${leftRes.max} with right Max ${rightRes.max} -> new Max ${newMax}. Node merged.`);
      
      return { min: newMin, max: newMax };
    };

    solve(rootNode);
    snapshot(`Algorithm complete! Final Result -> Min: ${nodeStates[rootNode.id].min}, Max: ${nodeStates[rootNode.id].max}.`);

    return { steps: generatedSteps, initialTree: rootNode };
  }, [array]);

  return { steps, initialTree };
};
