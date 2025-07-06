import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { generatePodcastScript, generateArticleFromScript, generateYouTubeMetadata, generateVideoComponents, generateYouTubeThumbnail } from '../../services/geminiService';
import { YouTubeMetadata, VideoComponents, GeneratedArticle, View, Article } from '../../types';
import YouTubeKitPreview from '../YouTubeKitPreview';
import SparklesIcon from '../icons/SparklesIcon';
import VideoCameraIcon from '../icons/VideoCameraIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import DocumentTextIcon from '../icons/DocumentTextIcon';
import VideoStoryboardPlayer from '../VideoStoryboardPlayer';
import DownloadIcon from '../icons/DownloadIcon';

interface AutomationViewProps {
    onAddArticle: (article: Omit<Article, 'id'>) => void;
    setCurrentView: (view: View) => void;
    initialTopic?: string;
    isAdmin: boolean;
}

const AutomationView: React.FC<AutomationViewProps> = ({ onAddArticle, setCurrentView, initialTopic, isAdmin }) => {
  const [topic, setTopic] = useState(initialTopic || '');
  const [script, setScript] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [articleImageUrl, setArticleImageUrl] = useState('');
  const [videoKit, setVideoKit] = useState<VideoComponents | null>(null);
  const [error, setError] = useState('');
  
  const [isLoadingScript, setIsLoadingScript] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [isLoadingArticleImage, setIsLoadingArticleImage] = useState(false);
  const [isLoadingYouTube, setIsLoadingYouTube] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  
  const [youtubeData, setYoutubeData] = useState<YouTubeMetadata | null>(null);
  const [showYouTubeKit, setShowYouTubeKit] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    if(initialTopic) {
        handleGenerateScript(initialTopic);
    }
  }, [initialTopic]);

  const resetState = () => {
    setScript('');
    setGeneratedArticle(null);
    setArticleImageUrl('');
    setVideoKit(null);
    setYoutubeData(null);
    setShowYouTubeKit(false);
    setIsPosted(false);
    setError('');
  };

  const handleGenerateScript = async (currentTopic = topic) => {
    if (!currentTopic) {
        setError('Please enter a topic to generate the script.');
        return;
    }
    setIsLoadingScript(true);
    resetState();
    const result = await generatePodcastScript(currentTopic);
    if (typeof result === 'string' && result.startsWith("An error occurred")) {
        setError(result);
    } else if (typeof result === 'string') {
        setScript(result);
    }
    setIsLoadingScript(false);
  };

  const handleGenerateArticle = async () => {
    if (!script) return;
    setIsLoadingArticle(true);
    setArticleImageUrl('');
    setIsPosted(false);
    const result = await generateArticleFromScript(script);
     if (typeof result === 'string') {
        setError(result);
        setGeneratedArticle(null);
    } else {
        setGeneratedArticle(result);
        setIsLoadingArticleImage(true);
        try {
            const imageUrl = await generateYouTubeThumbnail(result.title, result.featuredImagePrompt);
            if(imageUrl.startsWith('data:image')) {
                setArticleImageUrl(imageUrl);
            } else {
                setError('Could not generate article image.');
            }
        } catch(e) {
            setError('Could not generate article image.');
        }
        setIsLoadingArticleImage(false);
    }
    setIsLoadingArticle(false);
  };
  
  const handleGenerateVideoKit = async () => {
    if (!script || !generatedArticle?.title) {
        setError("Please generate a script and article title first.");
        return;
    };
    setIsLoadingVideo(true);
    const result = await generateVideoComponents(generatedArticle.title, script);
    if (typeof result === 'string') {
        setError(result);
    } else {
        setVideoKit(result);
    }
    setIsLoadingVideo(false);
  }

  const handlePrepareYouTube = async () => {
    if (!script) return;
    setIsLoadingYouTube(true);
    setShowYouTubeKit(false);
    const result = await generateYouTubeMetadata(script);
    if (typeof result === 'string') {
        setError(result);
    } else {
        setYoutubeData(result);
        setShowYouTubeKit(true);
    }
    setIsLoadingYouTube(false);
  };
  
  const handlePostToBlog = () => {
      if (!generatedArticle || !articleImageUrl || !isAdmin) return;
      onAddArticle({
          title: generatedArticle.title,
          content: generatedArticle.content,
          featuredImage: articleImageUrl,
          category: 'AI Generated',
          excerpt: generatedArticle.content.split(' ').slice(0, 20).join(' ') + '...',
      });
      setIsPosted(true);
      setTimeout(() => setCurrentView(View.Articles), 1000);
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDownloadImagesZip = async () => {
      if (!videoKit) return;
      const zip = new JSZip();
      const imageFetches = videoKit.scenes.map(async (scene, index) => {
          const response = await fetch(scene.imageUrl);
          const blob = await response.blob();
          zip.file(`scene_${index + 1}.jpeg`, blob);
      });
       const response = await fetch(videoKit.featuredImageUrl);
       const blob = await response.blob();
       zip.file(`thumbnail.jpeg`, blob);

      await Promise.all(imageFetches);
      zip.generateAsync({ type: 'blob' }).then(content => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = 'video_scene_images.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      });
  };

  const renderFormattedText = (text: string) => {
    const formatted = text
        .replace(/^(#+)\s*(.*)/gm, (match, hashes, content) => `<h${hashes.length} class="font-sans font-bold mt-4 mb-2 text-dark">${content}</h${hashes.length}>`)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[SOUND EFFECT:.*?\]/g, '<em class="text-accent text-sm">[SOUND EFFECT]</em>')
        .replace(/\n/g, '<br />');
    return <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />;
  };
  
  const Card: React.FC<{title: string; step: number; children: React.ReactNode}> = ({title, step, children}) => (
    <div className="bg-white p-6 rounded-xl shadow-soft-lg border border-black/5">
        <div className="flex items-center gap-3">
            <div className="bg-primary/20 text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold font-sans">{step}</div>
            <h2 className="font-sans text-xl font-bold text-dark">{title}</h2>
        </div>
        <div className="mt-4 pl-11">
            {children}
        </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-sans text-4xl font-bold text-dark">Content Studio</h1>
        <p className="mt-2 max-w-3xl mx-auto text-muted">
          Your AI-powered assistant. Generate trend-aware podcast scripts, transform them into articles, create video assets, and publish to your blog—all in one place.
        </p>
      </section>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">{error}</div>}

      <div className="space-y-6">
        <Card title="Create a Podcast Script" step={1}>
            <p className="text-muted mb-4 text-sm">Start by providing a topic. Our AI, supercharged with Google Search, will generate a script based on the latest trends and information.</p>
            <div className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'The future of sustainable travel in Southeast Asia'"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
                onClick={() => handleGenerateScript()}
                disabled={isLoadingScript}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-sans font-semibold px-6 py-2.5 rounded-full transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
            >
                <SparklesIcon className={`h-5 w-5 ${isLoadingScript ? 'animate-spin' : ''}`} />
                {isLoadingScript ? 'Generating Script...' : 'Generate Script'}
            </button>
            </div>
        </Card>

        {script && (
            <Card title="Your Generated Script & Actions" step={2}>
                <div className="prose max-w-none p-4 border rounded-md bg-gray-50/50 max-h-96 overflow-y-auto">
                    {renderFormattedText(script)}
                </div>
                <div className="border-t mt-4 pt-4">
                    <h3 className="font-sans text-md font-bold text-accent-dark mb-3">Create Your Content Assets:</h3>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={handleGenerateArticle} disabled={isLoadingArticle || isLoadingArticleImage} className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-sans font-semibold px-4 py-2 rounded-full transition-all duration-300 disabled:bg-gray-400">
                            <DocumentTextIcon className={`h-5 w-5 ${isLoadingArticle || isLoadingArticleImage ? 'animate-spin' : ''}`} />
                            {isLoadingArticle ? 'Creating Text...' : isLoadingArticleImage ? 'Creating Image...' : 'Generate Article & Image'}
                        </button>
                        <button onClick={handleGenerateVideoKit} disabled={isLoadingVideo || !generatedArticle} title={!generatedArticle ? "Generate article first" : "Generate video assets"} className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-900 text-white font-sans font-semibold px-4 py-2 rounded-full transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <VideoCameraIcon className={`h-5 w-5 ${isLoadingVideo ? 'animate-spin' : ''}`} />
                            {isLoadingVideo ? 'Creating Assets...' : 'Generate Video Assets'}
                        </button>
                        <button onClick={handlePrepareYouTube} disabled={isLoadingYouTube} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-800 text-white font-sans font-semibold px-4 py-2 rounded-full transition-all duration-300 disabled:bg-gray-400">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" /></svg>
                            {isLoadingYouTube ? 'Preparing...' : 'Prepare for YouTube'}
                        </button>
                    </div>
                </div>
            </Card>
        )}

        {(generatedArticle || videoKit || showYouTubeKit) && (
            <Card title="Review, Download & Publish" step={3}>
                <div className="space-y-8">
                    {generatedArticle && (
                        <div>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <h3 className="font-sans text-lg font-bold text-dark">Generated Article</h3>
                                <button onClick={handlePostToBlog} disabled={isPosted || !articleImageUrl || isLoadingArticleImage || !isAdmin} title={!isAdmin ? 'Enable Admin Mode in footer to post' : !articleImageUrl ? 'Generating thumbnail...' : 'Post to blog'} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-sans font-semibold px-4 py-2 rounded-full transition-all duration-300 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed">
                                    <CheckCircleIcon className="h-5 w-5" />
                                    {isPosted ? 'Posted to Blog!' : 'Post to Blog'}
                                </button>
                            </div>
                            <div className="mt-4 p-4 border rounded-lg bg-gray-50/50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1">
                                        {isLoadingArticleImage && <div className="w-full aspect-video bg-gray-200 rounded-lg animate-pulse"></div>}
                                        {articleImageUrl && <img src={articleImageUrl} alt="AI-generated article cover" className="rounded-lg shadow-md w-full object-cover aspect-video" />}
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="font-bold font-sans text-lg">{generatedArticle.title}</h4>
                                        <p className="text-sm text-muted mt-2 line-clamp-4">{generatedArticle.content}</p>
                                    </div>
                                </div>
                                <div className="border-t mt-4 pt-4">
                                     <button onClick={() => downloadFile(generatedArticle.content, 'article.md', 'text/markdown')} className="flex items-center justify-center gap-2 text-sm bg-white hover:bg-gray-100 border border-gray-300 text-dark font-sans font-semibold px-3 py-1.5 rounded-full transition-all duration-300">
                                        <DownloadIcon className="h-4 w-4" />
                                        Download Article (.md)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {videoKit && (
                        <div>
                            <h3 className="font-sans text-lg font-bold text-dark">Video Production Kit</h3>
                            <div className="mt-4">
                               <VideoStoryboardPlayer videoKit={videoKit} />
                            </div>
                            <div className="border-t mt-4 pt-4">
                                <h4 className="font-sans font-semibold text-gray-700 mb-3">Download Assets</h4>
                                <div className="flex flex-wrap gap-3">
                                    <button onClick={() => downloadFile(videoKit.voiceOverScript, 'voiceover_script.txt', 'text/plain')} className="flex items-center justify-center gap-2 text-sm bg-white hover:bg-gray-100 border border-gray-300 text-dark font-sans font-semibold px-3 py-1.5 rounded-full transition-all duration-300">
                                        <DownloadIcon className="h-4 w-4" />
                                        Script (.txt)
                                    </button>
                                    <a href={videoKit.featuredImageUrl} download="thumbnail.jpeg" className="flex items-center justify-center gap-2 text-sm bg-white hover:bg-gray-100 border border-gray-300 text-dark font-sans font-semibold px-3 py-1.5 rounded-full transition-all duration-300">
                                        <DownloadIcon className="h-4 w-4" />
                                        Thumbnail (.jpeg)
                                    </a>
                                     <button onClick={handleDownloadImagesZip} className="flex items-center justify-center gap-2 text-sm bg-white hover:bg-gray-100 border border-gray-300 text-dark font-sans font-semibold px-3 py-1.5 rounded-full transition-all duration-300">
                                        <DownloadIcon className="h-4 w-4" />
                                        All Images (.zip)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                     {youtubeData && showYouTubeKit && (
                        <YouTubeKitPreview metadata={youtubeData} onClose={() => setShowYouTubeKit(false)} />
                    )}
                </div>
            </Card>
        )}
      </div>
    </div>
  );
};

export default AutomationView;