export enum View {
  Home = 'HOME',
  Episodes = 'EPISODES',
  Articles = 'ARTICLES',
  Contact = 'CONTACT',
  Automation = 'AUTOMATION',
  About = 'ABOUT',
  HowToUse = 'HOW_TO_USE',
  Search = 'SEARCH',
  ArticleDetail = 'ARTICLE_DETAIL',
  Plans = 'PLANS',
}

export interface PodcastEpisode {
  id: number;
  title: string;
  teaser: string;
  date: string;
  duration: string;
  audioSrc: string;
  coverArt: string;
}

export interface Article {
  id: number;
  title:string;
  category: string;
  excerpt: string;
  featuredImage: string;
  content: string; 
  relatedPodcastId?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface YouTubeMetadata {
  title: string;
  description: string;
  tags: string[];
  shortsScript: string;
  recommendations: {
    length: string;
    format: string;
    advice: string;
  };
}

export interface VideoScene {
  imageUrl: string;
  imagePrompt: string;
  subtitle: string;
  voiceOverChunk: string;
}

export interface VideoComponents {
  voiceOverScript: string;
  featuredImagePrompt: string;
  featuredImageUrl: string;
  scenes: VideoScene[];
}

export interface GeneratedArticle {
    title: string;
    content: string;
    featuredImagePrompt: string;
}