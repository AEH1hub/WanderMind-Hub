import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/views/HomeView';
import EpisodesView from './components/views/EpisodesView';
import ArticlesView from './components/views/ArticlesView';
import ContactView from './components/views/ContactView';
import AutomationView from './components/views/AutomationView';
import AboutView from './components/views/AboutView';
import HowToUseView from './components/views/HowToUseView';
import PlansView from './components/views/PlansView';
import EpisodePlayerModal from './components/EpisodePlayerModal';
import SearchOverlay from './components/SearchOverlay';
import Chatbot from './components/Chatbot';
import { View, PodcastEpisode, Article } from './types';
import { PODCAST_EPISODES, ARTICLES } from './constants';
import { getTrendingTopics } from './services/geminiService';
import ArticleDetailView from './components/views/ArticleDetailView';
import ChatBubbleLeftRightIcon from './components/icons/ChatBubbleLeftRightIcon';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [automationTopic, setAutomationTopic] = useState<string | undefined>(undefined);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await getTrendingTopics();
      if(Array.isArray(topics)) {
        setTrendingTopics(topics);
      }
    };
    fetchTopics();
  }, []);
  
  useEffect(() => {
    if (currentView === View.ArticleDetail) {
      const articleExists = articles.some(a => a.id === selectedArticleId);
      if (!articleExists) {
        setCurrentView(View.Articles);
      }
    }
  }, [currentView, selectedArticleId, articles]);

  const handleSelectEpisode = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode);
  };

  const handleCloseModal = () => {
    setSelectedEpisode(null);
  };

  const handleAddArticle = (newArticleData: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      id: articles.length + 1,
      ...newArticleData
    };
    setArticles(prev => [newArticle, ...prev]);
    handleSelectArticle(newArticle.id);
  };

  const handleSelectArticle = (id: number) => {
    setSelectedArticleId(id);
    setCurrentView(View.ArticleDetail);
  };

  const handleSearchNavigate = (view: View, itemId?: number) => {
      setIsSearchOpen(false);
      if (view === View.Episodes && itemId) {
          const episode = PODCAST_EPISODES.find(e => e.id === itemId);
          if (episode) setSelectedEpisode(episode);
      } else if (view === View.Articles && itemId) {
          handleSelectArticle(itemId);
      } else {
        setCurrentView(view);
      }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case View.Episodes:
        return <EpisodesView onSelectEpisode={handleSelectEpisode} />;
      case View.Articles:
        return <ArticlesView articles={articles} onSelectArticle={handleSelectArticle} />;
      case View.ArticleDetail: {
        const article = articles.find(a => a.id === selectedArticleId);
        if (article) {
          return <ArticleDetailView 
            article={article}
            episodes={PODCAST_EPISODES}
            onSelectEpisode={handleSelectEpisode}
            onBack={() => {
              setSelectedArticleId(null);
              setCurrentView(View.Articles);
            }} 
          />;
        }
        // Fallback to prevent crash if id is invalid
        return <ArticlesView articles={articles} onSelectArticle={handleSelectArticle} />;
      }
      case View.Contact:
        return <ContactView />;
      case View.Automation:
        return <AutomationView 
            onAddArticle={handleAddArticle} 
            setCurrentView={setCurrentView} 
            initialTopic={automationTopic}
            isAdmin={isAdminMode}
        />;
      case View.About:
        return <AboutView />;
      case View.HowToUse:
        return <HowToUseView />;
      case View.Plans:
        return <PlansView />;
      case View.Home:
      default:
        return <HomeView 
          onSelectEpisode={handleSelectEpisode} 
          articles={articles}
          onSelectArticle={handleSelectArticle}
          trendingTopics={trendingTopics}
          onTopicSelect={(topic) => {
            setAutomationTopic(topic);
            setCurrentView(View.Automation)
          }}
          />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {renderView()}
      </main>
      <Footer 
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />
      {selectedEpisode && (
        <EpisodePlayerModal
          episode={selectedEpisode}
          onClose={handleCloseModal}
        />
      )}
      {isSearchOpen && (
          <SearchOverlay 
            onClose={() => setIsSearchOpen(false)}
            articles={articles}
            episodes={PODCAST_EPISODES}
            onNavigate={handleSearchNavigate}
          />
      )}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-300"
          aria-label="Open AI Chat"
        >
          <ChatBubbleLeftRightIcon className="h-8 w-8" />
        </button>
      </div>
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;