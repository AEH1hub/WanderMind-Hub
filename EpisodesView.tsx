import React, { useState, useMemo } from 'react';
import { PodcastEpisode } from '../../types';
import { PODCAST_EPISODES } from '../../constants';
import PodcastCard from '../PodcastCard';
import SearchIcon from '../icons/SearchIcon';

interface EpisodesViewProps {
  onSelectEpisode: (episode: PodcastEpisode) => void;
}

const EpisodesView: React.FC<EpisodesViewProps> = ({ onSelectEpisode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEpisodes = useMemo(() => {
    return PODCAST_EPISODES.filter(
      (episode) =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.teaser.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-sans text-4xl font-bold text-dark">All Episodes</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted">
          Browse our full archive of conversations. Search for a specific topic or explore by title.
        </p>
      </section>

      <div className="relative max-w-lg mx-auto">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <SearchIcon className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search episodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-soft"
          aria-label="Search episodes"
        />
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <PodcastCard key={episode.id} episode={episode} onSelectEpisode={onSelectEpisode} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted py-10">No episodes found matching your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default EpisodesView;