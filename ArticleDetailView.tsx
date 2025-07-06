import React from 'react';
import { Article, PodcastEpisode } from '../../types';
import ArticleVoiceOver from '../ArticleVoiceOver';
import EmbeddedPodcastPlayer from '../EmbeddedPodcastPlayer';

interface ArticleDetailViewProps {
    article: Article;
    episodes: PodcastEpisode[];
    onSelectEpisode: (episode: PodcastEpisode) => void;
    onBack: () => void;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ article, onBack, episodes, onSelectEpisode }) => {

    const relatedPodcast = article.relatedPodcastId 
        ? episodes.find(e => e.id === article.relatedPodcastId) 
        : undefined;

    const renderContent = (content: string) => {
        const formatted = content
            .replace(/^### (.*$)/gim, '<h3 class="font-sans font-bold text-xl text-dark mt-6 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="font-sans font-bold text-2xl text-accent-dark mt-8 mb-4">$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
            .replace(/\n/g, '<br />');
        return { __html: formatted };
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button
                onClick={onBack}
                className="mb-8 font-sans font-semibold text-accent hover:text-accent-dark transition-colors duration-300 flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Articles
            </button>

            <article className="bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-soft-lg border border-black/5">
                <header>
                    <p className="font-sans font-semibold text-accent mb-2">{article.category.toUpperCase()}</p>
                    <h1 className="font-sans text-3xl md:text-4xl font-extrabold text-dark leading-tight">
                        {article.title}
                    </h1>
                </header>

                <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg my-8 shadow-md"
                />

                <ArticleVoiceOver textContent={article.content} />
                
                {relatedPodcast && (
                    <EmbeddedPodcastPlayer 
                        episode={relatedPodcast}
                        onSelectEpisode={onSelectEpisode}
                    />
                )}

                <div
                    className="prose lg:prose-lg max-w-none text-muted leading-relaxed mt-8"
                    dangerouslySetInnerHTML={renderContent(article.content)}
                />
            </article>
        </div>
    );
};

export default ArticleDetailView;