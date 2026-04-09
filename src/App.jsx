import React, { useState } from 'react';
import InputPanel from './components/InputPanel';
import BruteForceVisualizer from './components/VisualizerEngine/BruteForceVisualizer';
import DivideConquerVisualizer from './components/VisualizerEngine/DivideConquerVisualizer';
import ComparisonChart from './components/Dashboard/ComparisonChart';
import TheorySection from './components/Theory/TheorySection';
import CodeTabs from './components/CodeSection/CodeTabs';
import AlgorithmImplementation from './components/AlgorithmImplementation';
import { Activity } from 'lucide-react';

function App() {
  const [array, setArray] = useState([3, 5, 1, 2, 4]);

  const scrollToVisualizer = () => {
    document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-calm-bg text-calm-text font-sans pb-24">
      {/* Header */}
      <header className="border-b border-calm-border bg-calm-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-calm-primary" size={24} />
            <h1 className="text-xl font-semibold tracking-wide text-calm-text">
              Max-Min Visualizer
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-calm-muted">
             <a href="#visualizers" className="hover:text-calm-primary transition-colors">Visualizers</a>
             <a href="#dashboard" className="hover:text-calm-primary transition-colors">Dashboard</a>
             <a href="#theory" className="hover:text-calm-primary transition-colors">Theory</a>
             <a href="#code" className="hover:text-calm-primary transition-colors">Code</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-16 lg:mt-24">
        {/* Hero */}
        <div className="text-center mb-24 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-calm-card border border-calm-border rounded-full text-calm-muted text-sm font-medium mb-8 shadow-sm">
            Algorithm Analysis Tool
          </div>
          <h2 className="text-5xl md:text-6xl font-semibold mb-6 font-sans tracking-tight leading-tight">
            Brute Force &nbsp;vs&nbsp; <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-calm-primary to-calm-secondary">Divide & Conquer</span>
          </h2>
          <p className="text-lg text-calm-muted mb-12 leading-relaxed">
            A minimal, professional dashboard to analyze standard properties, visualize state complexity, and directly compare execution paths of algorithms.
          </p>
          <div className="flex justify-center gap-5">
             <button onClick={scrollToVisualizer} className="bg-calm-primary text-white hover:bg-indigo-400 px-8 py-3 rounded-xl font-medium transition-all shadow-md hover:-translate-y-0.5">
               Start Visualizing
             </button>
             <a href="#theory" className="bg-calm-card hover:bg-gray-800 border border-calm-border px-8 py-3 rounded-xl font-medium transition-all text-calm-text hover:-translate-y-0.5 shadow-sm">
               Read Theory
             </a>
          </div>
        </div>

        <div id="input-section" className="scroll-mt-32 mb-12">
            <InputPanel array={array} setArray={setArray} />
        </div>

        <div id="visualizers" className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16 scroll-mt-32">
            <BruteForceVisualizer array={array} />
            <DivideConquerVisualizer array={array} />
        </div>

        <div id="dashboard" className="scroll-mt-32 mb-20">
            <ComparisonChart arrayLength={array.length} />
        </div>

        <AlgorithmImplementation />

        <div id="theory" className="mt-24 scroll-mt-32">
            <div className="mb-8 pl-2">
              <h2 className="text-2xl font-semibold text-calm-text mb-2">Theoretical Analysis</h2>
              <p className="text-calm-muted">Understanding structural integrity and practical deployments.</p>
            </div>
            <TheorySection />
        </div>

        <div id="code" className="mt-24 scroll-mt-32">
            <div className="mb-8 pl-2">
              <h2 className="text-2xl font-semibold text-calm-text mb-2">Implementation Setup</h2>
              <p className="text-calm-muted">Core functions mapped to formal specifications.</p>
            </div>
            <CodeTabs />
        </div>
      </main>

      <footer className="mt-32 border-t border-calm-border py-12 text-center text-calm-muted/70">
        <p className="font-medium">Designed by Harshawardhan Patil, Ruturaj Lokhande, Sharvil Patil, Aditya Shiba.</p>
      </footer>
    </div>
  );
}

export default App;
