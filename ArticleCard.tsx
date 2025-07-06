import React from 'react';
import { Article } from '../types';
import TagIcon from './icons/TagIcon';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (id: number) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelectArticle }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group border border-black/5 flex flex-col animate-slide-up">
      <div className="overflow-hidden">
        <img src={article.featuredImage} alt={article.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-accent mb-2 font-sans font-semibold">
          <TagIcon className="h-4 w-4 mr-1"/>
          <span>{article.category.toUpperCase()}</span>
        </div>
        <h3 className="font-sans font-bold text-lg text-dark group-hover:text-accent transition-colors">{article.title}</h3>
        <p className="text-sm text-muted mt-2 flex-grow">{article.excerpt}</p>
        <button 
          onClick={() => onSelectArticle(article.id)}
          className="text-accent font-sans font-semibold text-sm mt-4 self-start group-hover:text-accent-dark transition-colors duration-300 text-left"
          aria-label={`Read more about ${article.title}`}
        >
          Read More &rarr;
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;