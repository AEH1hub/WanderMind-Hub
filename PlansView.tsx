import React from 'react';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import SparklesIcon from '../icons/SparklesIcon';
import DocumentTextIcon from '../icons/DocumentTextIcon';
import InfinityIcon from '../icons/InfinityIcon';

interface PlanCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    icon: React.ReactNode;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, description, features, isPopular, icon }) => (
    <div className={`border rounded-xl p-8 flex flex-col ${isPopular ? 'border-primary shadow-2xl scale-105 bg-white' : 'border-gray-200/80 bg-white/50 shadow-soft-lg'}`}>
        {isPopular && (
            <div className="bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full self-center -mt-11 mb-4">
                Most Popular
            </div>
        )}
        <div className="text-accent mb-4">{icon}</div>
        <h3 className="font-sans text-2xl font-bold text-dark">{title}</h3>
        <p className="text-muted mt-2">{description}</p>
        <div className="my-6">
            <span className="text-5xl font-extrabold font-sans text-dark">{price}</span>
            <span className="text-muted">{price !== 'Free' && ' / month'}</span>
        </div>
        <ul className="space-y-3 text-muted flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full mt-8 py-3 px-6 font-sans font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${isPopular ? 'bg-primary text-white hover:bg-primary-dark shadow-lg' : 'bg-accent text-white hover:bg-accent-dark'}`}>
            Get Started
        </button>
    </div>
);


const PlansView: React.FC = () => {
    return (
        <div className="space-y-16">
            <section className="text-center">
                <h1 className="font-sans text-4xl font-bold text-dark">Find Your Perfect Plan</h1>
                <p className="mt-2 max-w-2xl mx-auto text-muted">
                    Whether you're just starting or scaling your content empire, we have a plan that fits your needs.
                </p>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                <PlanCard
                    title="Explorer"
                    price="Free"
                    description="For the curious traveler starting their content journey."
                    icon={<SparklesIcon className="w-10 h-10" />}
                    features={[
                        "3 AI Script Generations per month",
                        "3 Article Generations per month",
                        "Standard AI Model",
                        "Community Support"
                    ]}
                />
                <PlanCard
                    title="Creator"
                    price="$29"
                    description="The perfect toolkit for dedicated content creators."
                    icon={<DocumentTextIcon className="w-10 h-10" />}
                    isPopular={true}
                    features={[
                        "Unlimited AI Script Generations",
                        "Unlimited Article Generations",
                        "Advanced AI Model with Search",
                        "YouTube & Video Asset Generation",
                        "Priority Email Support"
                    ]}
                />
                <PlanCard
                    title="Visionary"
                    price="$79"
                    description="For teams and professionals building a content brand."
                    icon={<InfinityIcon className="w-10 h-10" />}
                    features={[
                        "All 'Creator' features",
                        "Team Access (Up to 5 users)",
                        "API Access (Coming Soon)",
                        "Dedicated Onboarding Support",
                        "Early access to new features"
                    ]}
                />
            </section>
        </div>
    );
};

export default PlansView;