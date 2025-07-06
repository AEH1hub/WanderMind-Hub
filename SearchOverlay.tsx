import React, { useState, useMemo } from 'react';
import { Article, PodcastEpisode, View } from '../types';
import XMarkIcon from './icons/XMarkIcon';
import SearchIcon from './icons/SearchIcon';

interface SearchOverlayProps {
    onClose: () => void;
    articles: Article[];
    episodes: PodcastEpisode[];
    onNavigate: (view: View, itemId?: number) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose, articles, episodes, onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArticles = useMemo(() => {
        if (!searchTerm) return [];
        return articles.filter(
            article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
    }, [searchTerm, articles]);

    const filteredEpisodes = useMemo(() => {
        if (!searchTerm) return [];
        return episodes.filter(
            episode =>
                episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                episode.teaser.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
    }, [searchTerm, episodes]);

    const handleArticleNavigate = (id: number) => {
        // A bit of a hack to ensure the view changes correctly
        onNavigate(View.Articles, id);
        setTimeout(() => onNavigate(View.ArticleDetail, id), 0);
    }
    
    return (
        <div 
            className="fixed inset-0 bg-light/90 backdrop-blur-lg z-50 animate-fade-in" 
            onClick={onClose}
        >
            <div 
                className="w-full h-full flex flex-col items-center"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full max-w-3xl mx-auto px-4 pt-20">
                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted">
                            <SearchIcon className="h-6 w-6" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search articles and episodes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus
                          className="w-full pl-14 pr-14 py-4 border-2 border-gray-200 bg-white rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button onClick={onClose} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted hover:text-dark">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {searchTerm && (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-sans font-bold text-dark border-b pb-2 mb-4">Articles</h3>
                                <div className="space-y-3">
                                    {filteredArticles.length > 0 ? (
                                        filteredArticles.map(article => (
                                            <button key={`article-${article.id}`} onClick={() => handleArticleNavigate(article.id)} className="text-left w-full p-3 rounded-lg hover:bg-primary/10 transition-colors">
                                                <p className="font-sans font-semibold text-accent">{article.title}</p>
                                                <p className="text-sm text-muted line-clamp-2">{article.excerpt}</p>
                                            </button>
                                        ))
                                    ) : <p className="text-sm text-muted p-3">No articles found.</p>}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-dark border-b pb-2 mb-4">Podcast Episodes</h3>
                                <div className="space-y-3">
                                     {filteredEpisodes.length > 0 ? (
                                        filteredEpisodes.map(episode => (
                                            <button key={`episode-${episode.id}`} onClick={() => onNavigate(View.Episodes, episode.id)} className="text-left w-full p-3 rounded-lg hover:bg-primary/10 transition-colors">
                                                <p className="font-sans font-semibold text-accent">{episode.title}</p>
                                                <p className="text-sm text-muted line-clamp-2">{episode.teaser}</p>
                                            </button>
                                        ))
                                    ) : <p className="text-sm text-muted p-3">No episodes found.</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;