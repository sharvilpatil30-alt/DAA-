import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

const pseudocodeStr = `function maxmin(arr, low, high):
    if low == high:
        return (arr[low], arr[low])

    if high == low + 1:
        return (min(arr[low], arr[high]), max(arr[low], arr[high]))

    mid = (low + high) / 2

    left = maxmin(arr, low, mid)
    right = maxmin(arr, mid + 1, high)

    return (
        min(left.min, right.min),
        max(left.max, right.max)
    )`;

const cStr = `#include <stdio.h>

struct Pair {
    int min;
    int max;
};

struct Pair maxmin(int arr[], int low, int high) {
    struct Pair result, left, right;
    int mid;

    if (low == high) {
        result.min = result.max = arr[low];
        return result;
    }

    if (high == low + 1) {
        if (arr[low] < arr[high]) {
            result.min = arr[low];
            result.max = arr[high];
        } else {
            result.min = arr[high];
            result.max = arr[low];
        }
        return result;
    }

    mid = (low + high) / 2;
    left = maxmin(arr, low, mid);
    right = maxmin(arr, mid + 1, high);

    result.min = (left.min < right.min) ? left.min : right.min;
    result.max = (left.max > right.max) ? left.max : right.max;

    return result;
}

int main() {
    int arr[] = {3, 5, 1, 8, 2, 9};
    int n = 6;

    struct Pair res = maxmin(arr, 0, n - 1);

    printf("Minimum element: %d\n", res.min);
    printf("Maximum element: %d\n", res.max);

    return 0;
}`;

const cppStr = `#include <iostream>
using namespace std;

struct Pair {
    int min;
    int max;
};

Pair maxmin(int arr[], int low, int high) {
    Pair result, left, right;
    int mid;

    if (low == high) {
        result.min = result.max = arr[low];
        return result;
    }

    if (high == low + 1) {
        if (arr[low] < arr[high]) {
            result.min = arr[low];
            result.max = arr[high];
        } else {
            result.min = arr[high];
            result.max = arr[low];
        }
        return result;
    }

    mid = (low + high) / 2;
    left = maxmin(arr, low, mid);
    right = maxmin(arr, mid + 1, high);

    result.min = min(left.min, right.min);
    result.max = max(left.max, right.max);

    return result;
}

int main() {
    int arr[] = {3, 5, 1, 8, 2, 9};
    int n = 6;

    Pair res = maxmin(arr, 0, n - 1);

    cout << "Minimum element: " << res.min << endl;
    cout << "Maximum element: " << res.max << endl;

    return 0;
}`;

const AlgorithmImplementation = () => {
    const [activeTab, setActiveTab] = useState('c');
    const [copied, setCopied] = useState(false);

    const codes = {
        c: { code: cStr, language: 'c' },
        cpp: { code: cppStr, language: 'cpp' },
        pseudocode: { code: pseudocodeStr, language: 'python' }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(codes[activeTab].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id="algorithm-implementation" className="scroll-mt-32 mb-20 w-full">
            <div className="mb-8 pl-2 border-l-4 border-calm-primary">
                <h2 className="text-3xl font-semibold text-calm-text ml-4 mb-2">Algorithm & Implementation</h2>
                <p className="text-calm-muted text-lg ml-4">Detailed breakdown of the Divide and Conquer strategy for the Max-Min approach.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Part 1: Algorithm Explanation */}
                <div className="flex flex-col space-y-6">
                    <div className="bg-calm-card rounded-2xl border border-calm-border shadow-drop-card p-8 h-full transition-all hover:border-calm-border/80">
                        <h3 className="text-xl font-medium text-calm-secondary mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-calm-secondary/10 flex items-center justify-center text-calm-secondary text-sm font-bold shadow-sm">1</div>
                            Step-by-Step Logic
                        </h3>
                        <ol className="space-y-4 text-calm-text mb-10 relative border-l-2 border-calm-border/60 ml-4 pl-6">
                            <li className="relative group">
                                <span className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-calm-primary/50 border-2 border-calm-bg group-hover:bg-calm-primary transition-colors"></span>
                                <span className="text-calm-text/90 group-hover:text-calm-text transition-colors">Divide the array into two halves</span>
                            </li>
                            <li className="relative group">
                                <span className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-calm-primary/50 border-2 border-calm-bg group-hover:bg-calm-secondary transition-colors"></span>
                                <span className="text-calm-text/90 group-hover:text-calm-text transition-colors">Recursively find min and max of left half</span>
                            </li>
                            <li className="relative group">
                                <span className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-calm-primary/50 border-2 border-calm-bg group-hover:bg-calm-min transition-colors"></span>
                                <span className="text-calm-text/90 group-hover:text-calm-text transition-colors">Recursively find min and max of right half</span>
                            </li>
                            <li className="relative group">
                                <span className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-calm-primary/50 border-2 border-calm-bg group-hover:bg-calm-max transition-colors"></span>
                                <span className="text-calm-text/90 group-hover:text-calm-text transition-colors">Compare results to get final min and max</span>
                            </li>
                        </ol>

                        <h3 className="text-xl font-medium text-calm-min mb-5 flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-calm-min/10 flex items-center justify-center text-calm-min text-sm font-bold shadow-sm">2</div>
                             Complexity Analysis
                        </h3>
                        <div className="bg-calm-bg/60 rounded-xl p-6 border border-calm-border/60 space-y-5 hover:bg-calm-bg/80 transition-colors">
                            <div className="flex justify-between items-center border-b border-calm-border/50 pb-4">
                                <span className="text-calm-muted font-medium flex items-center gap-2">Time Complexity</span>
                                <span className="text-calm-text font-mono font-semibold px-4 py-1.5 bg-calm-card rounded-md border border-calm-border shadow-sm text-calm-primary">O(n)</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-calm-muted font-medium flex items-center gap-2">Number of comparisons</span>
                                <span className="text-calm-text font-mono font-semibold px-4 py-1.5 bg-calm-card rounded-md border border-calm-border shadow-sm text-calm-secondary">≈ 3n/2 − 2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part 2: Code Tabs */}
                <div className="flex flex-col bg-calm-card rounded-2xl border border-calm-border shadow-drop-card overflow-hidden">
                    <div className="flex border-b border-calm-border bg-calm-bg/50 justify-between items-center pr-4">
                        <div className="flex overflow-x-auto">
                            <button 
                                onClick={() => setActiveTab('c')}
                                className={`px-6 py-4 font-medium text-sm tracking-wide transition-all whitespace-nowrap ${activeTab === 'c' ? 'text-calm-secondary border-b-2 border-calm-secondary bg-calm-bg' : 'text-calm-muted hover:text-calm-text hover:bg-calm-bg/50'}`}
                            >
                                C Code
                            </button>
                            <button 
                                onClick={() => setActiveTab('cpp')}
                                className={`px-6 py-4 font-medium text-sm tracking-wide transition-all whitespace-nowrap ${activeTab === 'cpp' ? 'text-calm-min border-b-2 border-calm-min bg-calm-bg' : 'text-calm-muted hover:text-calm-text hover:bg-calm-bg/50'}`}
                            >
                                C++ Code
                            </button>
                            <button 
                                onClick={() => setActiveTab('pseudocode')}
                                className={`px-6 py-4 font-medium text-sm tracking-wide transition-all whitespace-nowrap ${activeTab === 'pseudocode' ? 'text-calm-primary border-b-2 border-calm-primary bg-calm-bg' : 'text-calm-muted hover:text-calm-text hover:bg-calm-bg/50'}`}
                            >   
                                Pseudocode
                            </button>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-lg bg-calm-bg border border-calm-border text-calm-muted hover:text-calm-text hover:bg-calm-bg/80 transition-all flex items-center justify-center group relative shadow-sm"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={18} className="text-calm-min" /> : <Copy size={18} className="group-hover:scale-110 transition-transform" />}
                        </button>
                    </div>
                    <div className="p-4 bg-calm-bg/20 flex-grow relative overflow-hidden h-[480px]">
                        <div className="absolute inset-0 overflow-y-auto">
                            <SyntaxHighlighter 
                                language={codes[activeTab].language} 
                                style={prism} 
                                showLineNumbers={true}
                                customStyle={{ 
                                    background: 'transparent', 
                                    margin: 0, 
                                    padding: '1rem',
                                    fontSize: '0.9rem',
                                    height: '100%'
                                }}
                                lineNumberStyle={{
                                    minWidth: '2.5em',
                                    paddingRight: '1em',
                                    color: '#4b5563',
                                    textAlign: 'right',
                                    borderRight: '1px solid #1f2937',
                                    marginRight: '1em'
                                }}
                            >
                                {codes[activeTab].code}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmImplementation;
