import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const ComparisonChart = ({ arrayLength }) => {
    // Theoretical comparison count
    const bfCount = 2 * (arrayLength - 1);
    const dcCount = Math.max(0, Math.ceil(1.5 * arrayLength - 2));

    const data = [
        {
            name: `Array Size: ${arrayLength}`,
            'Brute Force': bfCount,
            'Divide & Conquer': dcCount,
        }
    ];

    return (
        <div className="bg-calm-card p-8 rounded-2xl border border-calm-border shadow-drop-card mt-8">
            <h2 className="text-2xl font-medium text-calm-text mb-8 tracking-wide">Efficiency Analysis</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barSize={70}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-calm-border)" vertical={false} />
                            <XAxis dataKey="name" stroke="var(--color-calm-muted)" tick={{fill: 'var(--color-calm-muted)'}} />
                            <YAxis stroke="var(--color-calm-muted)" tick={{fill: 'var(--color-calm-muted)'}} />
                            <Tooltip 
                                cursor={{fill: 'var(--color-calm-border)', opacity: 0.4}}
                                contentStyle={{ backgroundColor: 'var(--color-calm-card)', border: '1px solid var(--color-calm-border)', borderRadius: '12px', color: 'var(--color-calm-text)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px', color: 'var(--color-calm-text)' }} />
                            <Bar dataKey="Brute Force" fill="var(--color-calm-primary)" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="Divide & Conquer" fill="var(--color-calm-secondary)" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-5 justify-center">
                    <div className="bg-calm-bg p-6 rounded-xl border border-calm-border shadow-sm">
                        <h3 className="text-calm-primary font-medium mb-3">Brute Force Math</h3>
                        <p className="text-calm-muted font-mono text-sm leading-relaxed flex flex-col gap-1">
                            <span>Formula: <code className="text-calm-text bg-calm-card px-1.5 py-0.5 rounded">2(n - 1)</code></span>
                            <span>Total Output: <span className="font-semibold text-calm-primary text-lg ml-1">{bfCount}</span></span>
                        </p>
                    </div>
                    <div className="bg-calm-bg p-6 rounded-xl border border-calm-border shadow-sm">
                        <h3 className="text-calm-secondary font-medium mb-3">Divide & Conquer Math</h3>
                        <p className="text-calm-muted font-mono text-sm leading-relaxed flex flex-col gap-1">
                            <span>Formula: <code className="text-calm-text bg-calm-card px-1.5 py-0.5 rounded">3n/2 - 2</code></span>
                            <span>Total Output: <span className="font-semibold text-calm-secondary text-lg ml-1">{dcCount}</span></span>
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="mt-10 p-5 bg-calm-bg/50 border border-calm-border rounded-xl text-center shadow-inner backdrop-blur-sm">
                <p className="text-calm-text/90">
                    Although both approaches share the same <strong>O(n) time complexity</strong>, <span className="text-calm-secondary font-medium">Divide & Conquer</span> is more efficient practically because it reduces the total number of comparisons to approximately <code className="bg-calm-card border border-calm-border/50 px-2 py-0.5 rounded font-mono text-sm text-calm-secondary">3n/2 - 2</code>, significantly outperforming Brute Force's <code className="bg-calm-card border border-calm-border/50 px-2 py-0.5 rounded font-mono text-sm text-calm-primary">2n - 2</code> comparisons and minimizing the constant factor for larger datasets.
                </p>
            </div>
        </div>
    );
};

export default ComparisonChart;
