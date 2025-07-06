import React from 'react';
import { PodcastEpisode } from '../types';
import PlayIcon from './icons/PlayIcon';
import CalendarIcon from './icons/CalendarIcon';

interface PodcastCardProps {
  episode: PodcastEpisode;
  onSelectEpisode: (episode: PodcastEpisode) => void;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ episode, onSelectEpisode }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group border border-black/5 animate-slide-up">
      <div className="relative overflow-hidden">
        <img src={episode.coverArt} alt={episode.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onSelectEpisode(episode)}
            className="bg-primary/80 backdrop-blur-sm text-white rounded-full p-4 transform hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg"
            aria-label={`Play episode: ${episode.title}`}
          >
            <PlayIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center text-xs text-muted mb-2">
          <CalendarIcon className="h-4 w-4 mr-1.5" />
          <span>{episode.date}</span>
          <span className="mx-2">·</span>
          <span>{episode.duration}</span>
        </div>
        <h3 className="font-sans font-bold text-lg text-dark truncate group-hover:text-accent transition-colors">{episode.title}</h3>
        <p className="text-sm text-muted mt-2 line-clamp-2">{episode.teaser}</p>
      </div>
    </div>
  );
};

export default PodcastCard;