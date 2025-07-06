import React from 'react';
import SparklesIcon from '../icons/SparklesIcon';
import VideoCameraIcon from '../icons/VideoCameraIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';

const Step: React.FC<{ num: string; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
    <div className="flex flex-col md:flex-row items-center gap-8 even:md:flex-row-reverse text-center md:text-left">
        <div className="flex-shrink-0 bg-primary/20 text-primary rounded-full h-24 w-24 flex items-center justify-center border-4 border-white shadow-lg">
            <span className="font-sans font-bold text-5xl">{num}</span>
        </div>
        <div className="flex-1">
            <h2 className="font-sans font-bold text-2xl text-accent-dark mb-2">{title}</h2>
            <p className="text-gray-700 leading-relaxed">
                {children}
            </p>
        </div>
    </div>
);


const HowToUseView: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto border border-black/5 animate-fade-in">
            <div className="text-center mb-16">
                <SparklesIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                <h1 className="font-sans text-4xl font-extrabold text-dark">How to Use the Content Studio</h1>
                <p className="mt-4 text-xl text-accent">Your guide to effortless content creation.</p>
            </div>

            <div className="space-y-16">
                <Step num="1" title="Generate Your Podcast Script">
                    Start by navigating to the <strong className="text-accent">Content Studio</strong>. In "Step 1", simply enter a topic for your next podcast episode. Our AI, enhanced with Google Search, will analyze current trends and information to write a complete, engaging, and relevant script for you. Click "Generate Script" and watch the magic happen.
                </Step>

                <Step num="2" title="Create Your Content Assets">
                    Once your script is ready, a new section appears with powerful tools. You can generate a full blog article, a complete video production kit, and even prepare metadata for YouTube—all with a single click.
                </Step>
                
                <Step num="3" title="Review and Publish">
                    All your generated assets appear at the bottom. The AI will even create a unique, "viral-style" cover image for your article. When you're satisfied, click the <strong className="text-green-600">"Post to Blog"</strong> button. Your new article will be instantly published and visible on the "Articles" page. It's that simple!
                </Step>
            </div>
        </div>
    );
};

export default HowToUseView;
