import React from 'react';
import { PodcastEpisode } from '../types';
import PlayIcon from './icons/PlayIcon';

interface EmbeddedPodcastPlayerProps {
    episode: PodcastEpisode;
    onSelectEpisode: (episode: PodcastEpisode) => void;
}

const EmbeddedPodcastPlayer: React.FC<EmbeddedPodcastPlayerProps> = ({ episode, onSelectEpisode }) => {
    return (
        <div className="bg-light rounded-lg p-4 my-6 border border-gray-200 flex flex-col sm:flex-row items-center gap-4 shadow-soft">
            <img 
                src={episode.coverArt} 
                alt={episode.title}
                className="w-24 h-24 rounded-md object-cover flex-shrink-0 shadow-md"
            />
            <div className="flex-grow text-center sm:text-left">
                <p className="font-sans font-semibold text-accent text-sm">Related Episode</p>
                <h4 className="font-sans font-bold text-lg text-dark mt-1">{episode.title}</h4>
                <p className="text-sm text-muted mt-1">{episode.teaser}</p>
            </div>
            <button
                onClick={() => onSelectEpisode(episode)}
                className="bg-primary text-white font-sans font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 self-stretch sm:self-auto flex items-center gap-2"
                aria-label="Open full podcast player"
            >
                <PlayIcon className="h-5 w-5" />
                <span>Play Episode</span>
            </button>
        </div>
    );
};

export default EmbeddedPodcastPlayer;