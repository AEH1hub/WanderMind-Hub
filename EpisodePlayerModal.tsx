import React, { useState } from 'react';
import { PodcastEpisode } from '../types';
import { generatePodcastSummary } from '../services/geminiService';
import XMarkIcon from './icons/XMarkIcon';
import SparklesIcon from './icons/SparklesIcon';

interface EpisodePlayerModalProps {
  episode: PodcastEpisode;
  onClose: () => void;
}

const EpisodePlayerModal: React.FC<EpisodePlayerModalProps> = ({ episode, onClose }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generatePodcastSummary(episode.title, episode.teaser);
      setSummary(result);
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-light/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-black/10">
          <h2 className="font-sans text-xl font-bold text-dark truncate">{episode.title}</h2>
          <button onClick={onClose} className="text-muted hover:text-dark transition-colors" aria-label="Close player">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={episode.coverArt} alt={episode.title} className="w-full md:w-48 h-48 rounded-md object-cover flex-shrink-0 shadow-lg"/>
            <div className="flex flex-col">
              <p className="text-muted mb-4">{episode.teaser}</p>
              <audio controls src={episode.audioSrc} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-4">
              <h3 className="font-sans font-bold text-lg text-dark">Episode Summary</h3>
              {!summary && (
                <button
                  onClick={handleGenerateSummary}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-sans text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 disabled:bg-gray-400 transform hover:scale-105"
                >
                  <SparklesIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Generating...' : 'Generate with AI'}
                </button>
              )}
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            
            {summary ? (
              <div className="prose prose-sm max-w-none mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
            ) : (
                !isLoading && <p className="mt-2 text-sm text-muted">Click the button to generate an AI-powered summary of this episode.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodePlayerModal;