import React, { useState } from 'react';
import { YouTubeMetadata } from '../types';
import XMarkIcon from './icons/XMarkIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface YouTubeKitPreviewProps {
  metadata: YouTubeMetadata;
  onClose: () => void;
}

const YouTubeKitPreview: React.FC<YouTubeKitPreviewProps> = ({ metadata, onClose }) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const CopyButton: React.FC<{ text: string; fieldName: string; className?: string }> = ({ text, fieldName, className = 'top-2 right-2' }) => (
        <button
            onClick={() => handleCopy(text, fieldName)}
            className={`absolute ${className} bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 rounded-md transition-colors group`}
            aria-label={`Copy ${fieldName}`}
        >
            {copiedField === fieldName ? <CheckCircleIcon className="h-5 w-5 text-green-600" /> : <ClipboardIcon className="h-5 w-5" />}
            <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {copiedField === fieldName ? "Copied!" : `Copy ${fieldName}`}
            </span>
        </button>
    );

    return (
        <div className="border-t-2 border-dashed border-gray-300 mt-8 pt-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-sans text-lg font-bold text-dark flex items-center gap-2">
                     <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg>
                    YouTube Content Kit
                </h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Close YouTube Kit">
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-sans font-semibold text-red-800">Strategic Recommendations</h4>
                    <ul className="text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
                        <li><strong>Length:</strong> {metadata.recommendations.length}</li>
                        <li><strong>Format:</strong> {metadata.recommendations.format}</li>
                        <li><strong>Key Advice:</strong> {metadata.recommendations.advice}</li>
                    </ul>
                </div>
                 <div>
                    <label className="font-sans font-semibold text-gray-700 block mb-1">Title</label>
                    <div className="relative">
                        <input type="text" readOnly value={metadata.title} className="w-full bg-gray-100 p-2 border border-gray-300 rounded-md pr-12"/>
                        <CopyButton text={metadata.title} fieldName="title" />
                    </div>
                </div>
                 <div>
                    <label className="font-sans font-semibold text-gray-700 block mb-1">Description</label>
                    <div className="relative">
                        <textarea readOnly value={metadata.description} rows={5} className="w-full bg-gray-100 p-2 border border-gray-300 rounded-md pr-12"></textarea>
                        <CopyButton text={metadata.description} fieldName="description" />
                    </div>
                </div>
                 <div>
                    <label className="font-sans font-semibold text-gray-700 block mb-1">YouTube Shorts Script</label>
                    <div className="relative">
                        <textarea readOnly value={metadata.shortsScript} rows={3} className="w-full bg-gray-100 p-2 border border-gray-300 rounded-md pr-12"></textarea>
                        <CopyButton text={metadata.shortsScript} fieldName="Shorts Script" />
                    </div>
                </div>
                 <div>
                    <label className="font-sans font-semibold text-gray-700 block mb-1">Tags</label>
                    <div className="relative">
                        <div className="p-2 border bg-gray-100 rounded-md">
                            <p className="text-gray-800 text-sm leading-relaxed">{metadata.tags.join(', ')}</p>
                        </div>
                        <CopyButton text={metadata.tags.join(', ')} fieldName="tags" className="top-1/2 -translate-y-1/2 right-2" />
                    </div>
                </div>

                <a 
                    href="https://studio.youtube.com/upload" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full mt-4 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-soft-lg text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-sans"
                >
                     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg>
                    Upload to YouTube
                </a>
            </div>
        </div>
    );
};

export default YouTubeKitPreview;