import React from 'react';
import { CheckCircle2, XCircle, LayoutGrid, ChevronRight } from 'lucide-react';

const TheorySection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-calm-card p-8 rounded-2xl border border-calm-border shadow-drop-card transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] group cursor-default">
                <h3 className="text-xl font-medium text-calm-min mb-6 flex items-center gap-3">
                    <CheckCircle2 strokeWidth={2} /> Advantages
                </h3>
                <ul className="space-y-4 text-calm-muted">
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-min/70 shrink-0 mt-0.5 group-hover:text-calm-min transition-colors" size={18}/> <span>Reduces total number of comparisons, ensuring faster execution for large constraints.</span></li>
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-min/70 shrink-0 mt-0.5 group-hover:text-calm-min transition-colors" size={18}/> <span>Highly structured logarithmic approach providing rigorous bounds.</span></li>
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-min/70 shrink-0 mt-0.5 group-hover:text-calm-min transition-colors" size={18}/> <span>Naturally supports multithreading and parallel distributed processing architectures.</span></li>
                </ul>
            </div>
            
            <div className="bg-calm-card p-8 rounded-2xl border border-calm-border shadow-drop-card transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] group cursor-default">
                <h3 className="text-xl font-medium text-calm-max mb-6 flex items-center gap-3">
                    <XCircle strokeWidth={2} /> Disadvantages
                </h3>
                <ul className="space-y-4 text-calm-muted">
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-max/70 shrink-0 mt-0.5 group-hover:text-calm-max transition-colors" size={18}/> <span>Extensive recursive call stack overhead scales with branching logic.</span></li>
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-max/70 shrink-0 mt-0.5 group-hover:text-calm-max transition-colors" size={18}/> <span>Necessitates larger stack memory allocation during execution.</span></li>
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-max/70 shrink-0 mt-0.5 group-hover:text-calm-max transition-colors" size={18}/> <span>Less performant on extremely small primitive arrays compared to linear scanning.</span></li>
                </ul>
            </div>

            <div className="bg-calm-card p-8 rounded-2xl border border-calm-border shadow-drop-card transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] group cursor-default">
                <h3 className="text-xl font-medium text-calm-secondary mb-6 flex items-center gap-3">
                    <LayoutGrid strokeWidth={2} /> Applications
                </h3>
                <ul className="space-y-4 text-calm-muted">
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-secondary/70 shrink-0 mt-0.5 group-hover:text-calm-secondary transition-colors" size={18}/> <span>Big Data analytics indexing and sub-range analysis.</span></li>
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-secondary/70 shrink-0 mt-0.5 group-hover:text-calm-secondary transition-colors" size={18}/> <span>Deep Learning dataset normalization and tensor bounds.</span></li>
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-secondary/70 shrink-0 mt-0.5 group-hover:text-calm-secondary transition-colors" size={18}/> <span>Computational geometry and spatial graphic processing.</span></li>
                    <li className="flex items-start gap-3"><ChevronRight className="text-calm-secondary/70 shrink-0 mt-0.5 group-hover:text-calm-secondary transition-colors" size={18}/> <span>Algorithmic trading and financial stream parsing.</span></li>
                </ul>
            </div>
        </div>
    );
};

export default TheorySection;
