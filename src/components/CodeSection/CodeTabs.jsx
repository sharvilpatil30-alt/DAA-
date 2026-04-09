import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeTabs = () => {
    const [activeTab, setActiveTab] = useState('pseudocode');

    const codes = {
        pseudocode: `Algorithm MaxMin(i, j, max, min)
// a[i..j] is a global array
// max & min will be populated
{
    if (i == j) {
        max = a[i]; min = a[i];
    } else if (i == j - 1) {
        if (a[i] < a[j]) {
            max = a[j]; min = a[i];
        } else {
            max = a[i]; min = a[j];
        }
    } else {
        mid = (i + j) / 2;
        MaxMin(i, mid, max1, min1);
        MaxMin(mid+1, j, max2, min2);
        
        if (max1 > max2) max = max1; else max = max2;
        if (min1 < min2) min = min1; else min = min2;
    }
}`,
        c: `void MaxMin(int i, int j, int *max, int *min) {
    int max1, min1, mid;
    if (i == j) {
        *max = *min = a[i];
    } else if (i == j - 1) {
        if (a[i] < a[j]) {
            *max = a[j]; *min = a[i];
        } else {
            *max = a[i]; *min = a[j];
        }
    } else {
        mid = (i + j) / 2;
        MaxMin(i, mid, max, min);
        MaxMin(mid + 1, j, &max1, &min1);
        
        if (*max < max1) *max = max1;
        if (*min > min1) *min = min1;
    }
}`,
        cpp: `auto MaxMin(const vector<int>& arr, int low, int high) -> pair<int, int> {
    if (low == high) return {arr[low], arr[low]};
    
    if (high == low + 1) {
        if (arr[low] > arr[high]) return {arr[low], arr[high]};
        else return {arr[high], arr[low]};
    }
    
    int mid = (low + high) / 2;
    auto [leftMax, leftMin] = MaxMin(arr, low, mid);
    auto [rightMax, rightMin] = MaxMin(arr, mid + 1, high);
    
    return {
        max(leftMax, rightMax),
        min(leftMin, rightMin)
    };
}`
    };

    return (
        <div className="bg-calm-card rounded-2xl border border-calm-border shadow-drop-card overflow-hidden">
            <div className="flex border-b border-calm-border bg-calm-bg/50">
                <button 
                    onClick={() => setActiveTab('pseudocode')}
                    className={`px-8 py-4 font-medium text-sm tracking-wide transition-all ${activeTab === 'pseudocode' ? 'text-calm-primary border-b-2 border-calm-primary bg-calm-bg' : 'text-calm-muted hover:text-calm-text hover:bg-calm-bg/50'}`}
                >   
                    Pseudocode
                </button>
                <button 
                    onClick={() => setActiveTab('c')}
                    className={`px-8 py-4 font-medium text-sm tracking-wide transition-all ${activeTab === 'c' ? 'text-calm-secondary border-b-2 border-calm-secondary bg-calm-bg' : 'text-calm-muted hover:text-calm-text hover:bg-calm-bg/50'}`}
                >
                    C
                </button>
                <button 
                    onClick={() => setActiveTab('cpp')}
                    className={`px-8 py-4 font-medium text-sm tracking-wide transition-all ${activeTab === 'cpp' ? 'text-calm-min border-b-2 border-calm-min bg-calm-bg' : 'text-calm-muted hover:text-calm-text hover:bg-calm-bg/50'}`}
                >
                    C++
                </button>
            </div>
            <div className="p-6 bg-calm-bg/30">
                <SyntaxHighlighter language={activeTab === 'c' ? 'c' : activeTab === 'cpp' ? 'cpp' : 'javascript'} style={atomDark} customStyle={{ background: 'transparent', margin: 0, padding: '1rem', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
                    {codes[activeTab]}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeTabs;
