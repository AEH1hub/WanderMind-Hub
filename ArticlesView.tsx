import React, { useState, useMemo } from 'react';
import { Article } from '../../types';
import ArticleCard from '../ArticleCard';

const ALL_CATEGORIES = 'All';

interface ArticlesViewProps {
  articles: Article[];
  onSelectArticle: (id: number) => void;
}

const ArticlesView: React.FC<ArticlesViewProps> = ({ articles, onSelectArticle }) => {
  const categories = useMemo(() => [ALL_CATEGORIES, ...new Set(articles.map((a) => a.category))], [articles]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) {
      return articles;
    }
    return articles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory, articles]);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-sans text-4xl font-bold text-dark">Articles & Guides</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted">
          Deep-dive guides, show notes, and sustainable travel tips to fuel your journey.
        </p>
      </section>

      <div className="flex justify-center flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 text-sm font-sans font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-accent text-white shadow-soft-lg'
                : 'bg-white text-dark hover:bg-primary/10 border border-gray-200/80 shadow-soft'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onSelectArticle={onSelectArticle} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted py-10">No articles found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlesView;