import React from 'react';
import { PodcastEpisode, Article } from '../../types';
import { PODCAST_EPISODES } from '../../constants';
import PodcastCard from '../PodcastCard';
import ArticleCard from '../ArticleCard';
import SparklesIcon from '../icons/SparklesIcon';

interface HomeViewProps {
  onSelectEpisode: (episode: PodcastEpisode) => void;
  articles: Article[];
  trendingTopics: string[];
  onTopicSelect: (topic: string) => void;
  onSelectArticle: (id: number) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSelectEpisode, articles, onSelectArticle, trendingTopics, onTopicSelect }) => {
  const latestEpisodes = PODCAST_EPISODES.slice(0, 3);
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative text-center bg-white p-8 md:p-12 rounded-xl shadow-soft-lg overflow-hidden border border-black/5">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover opacity-10" alt="Mountain Landscape"/>
          <div className="absolute inset-0 bg-gradient-to-t from-light via-light/95 to-transparent"></div>
        </div>
        <div className="relative animate-slide-up">
          <h1 className="font-sans text-4xl md:text-6xl font-extrabold text-dark">Travel Consciously. Live Fully.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
            Welcome to WanderMind Hub, your sanctuary for mindful travel and personal growth. Explore stories that inspire, guides that inform, and a community that cares.
          </p>
          <button className="mt-8 bg-primary hover:bg-primary-dark text-white font-sans font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </section>
      
      {/* Trending Topics Section */}
      {trendingTopics.length > 0 && (
          <section>
             <div className="text-center mb-8">
                <h2 className="font-sans text-3xl font-bold text-dark inline-flex items-center gap-3">
                    <SparklesIcon className="h-7 w-7 text-primary"/>
                    Trending Now
                </h2>
                <p className="text-muted mt-2">Click a topic to generate a script in our Content Studio!</p>
             </div>
            <div className="flex flex-wrap justify-center gap-3">
              {trendingTopics.map((topic, index) => (
                <button 
                  key={index} 
                  onClick={() => onTopicSelect(topic)}
                  className="bg-white border border-gray-200/80 text-accent font-sans font-semibold px-5 py-2.5 rounded-full hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-soft"
                >
                  {topic}
                </button>
              ))}
            </div>
          </section>
      )}


      {/* Latest Episodes Section */}
      <section>
        <h2 className="font-sans text-3xl font-bold text-dark mb-8 text-center">Latest Episodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestEpisodes.map((episode) => (
            <PodcastCard key={episode.id} episode={episode} onSelectEpisode={onSelectEpisode} />
          ))}
        </div>
      </section>

      {/* Featured Article Section */}
       {featuredArticles.length > 0 && (
        <section className="bg-white/50 p-8 md:p-12 rounded-xl shadow-soft-lg border border-black/5">
         <h2 className="font-sans text-3xl font-bold text-dark mb-8 text-center">From the Blog</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map(article => <ArticleCard key={article.id} article={article} onSelectArticle={onSelectArticle} />)}
         </div>
      </section>
      )}
    </div>
  );
};

export default HomeView;