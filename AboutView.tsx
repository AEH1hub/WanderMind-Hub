import React from 'react';
import LogoIcon from '../icons/LogoIcon';
import SparklesIcon from '../icons/SparklesIcon';
import TagIcon from '../icons/TagIcon';
import PlayIcon from '../icons/PlayIcon';

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, children: React.ReactNode}> = ({icon, title, children}) => (
    <div className="bg-white/50 p-6 rounded-xl border border-black/5 text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-soft-lg">
        <div className="inline-block bg-primary/20 text-primary p-3 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="font-sans font-bold text-xl text-accent-dark mb-2">{title}</h3>
        <p className="text-muted text-sm">{children}</p>
    </div>
)

const AboutView: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="bg-white p-8 rounded-xl shadow-soft-lg max-w-4xl mx-auto border border-black/5 animate-fade-in">
        <div className="text-center mb-12">
          <LogoIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-sans text-4xl font-extrabold text-dark">About WanderMind Hub</h1>
          <p className="mt-4 text-xl text-accent font-semibold">Mindful Travel for the Modern Soul.</p>
        </div>

        <div className="prose lg:prose-lg max-w-none text-muted leading-relaxed space-y-6">
          <p className="text-center text-lg">
            In a world that constantly rushes, <strong>WanderMind Hub</strong> is your sanctuary for slowing down. We believe that travel is more than just visiting new places; it’s an opportunity for profound personal growth, a practice in mindfulness, and a chance to connect more deeply with ourselves and the world around us.
          </p>
          
          <p>
            Our journey began with a simple idea: what if we could combine the adventure of travel with the introspection of mindfulness? What if we could explore the globe not just to see, but to understand? This question sparked the creation of our podcast, our articles, and our community.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="font-sans font-bold text-3xl text-dark text-center mb-8">Our Core Offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard icon={<PlayIcon className="h-8 w-8"/>} title="Engaging Podcasts">
                We share conversations with seasoned travelers, wellness experts, and digital nomads who offer their wisdom on everything from sustainable travel to mental well-being on the road.
            </FeatureCard>
            <FeatureCard icon={<TagIcon className="h-8 w-8"/>} title="In-Depth Articles">
                Our blog is a treasure trove of practical guides, reflective essays, and detailed show notes. Whether you need a packing list or tips for finding stillness, we’ve got you covered.
            </FeatureCard>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-soft-lg max-w-4xl mx-auto border border-black/5">
        <div className="text-center">
            <h2 className="font-sans font-bold text-3xl text-dark">Our Philosophy</h2>
            <p className="mt-4 text-xl text-accent-dark">
                We champion a philosophy of <strong>"conscious curiosity."</strong>
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-muted">
                This means we encourage you to travel with an open heart and an inquisitive mind, to ask meaningful questions, to tread lightly on the earth, and to leave a positive impact on the communities you visit. It's about choosing depth over breadth, connection over collection, and presence over performance.
            </p>
        </div>
      </div>

      <p className="text-center text-muted pt-4">
        Welcome to the hub. We're so glad you're here. Let's start this journey together.
      </p>
    </div>
  );
};

export default AboutView;