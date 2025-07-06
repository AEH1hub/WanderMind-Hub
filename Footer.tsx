import React from 'react';
import LogoIcon from './icons/LogoIcon';

interface AdminModeToggleProps {
  isAdminMode: boolean;
  setIsAdminMode: (isAdmin: boolean) => void;
}

const AdminModeToggle: React.FC<AdminModeToggleProps> = ({ isAdminMode, setIsAdminMode }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-sans font-semibold ${isAdminMode ? 'text-primary' : 'text-muted'}`}>
        Admin Mode
      </span>
      <button
        onClick={() => setIsAdminMode(!isAdminMode)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isAdminMode ? 'bg-primary' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={isAdminMode}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isAdminMode ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};


interface FooterProps {
    isAdminMode: boolean;
    setIsAdminMode: (isAdmin: boolean) => void;
}


const Footer: React.FC<FooterProps> = ({ isAdminMode, setIsAdminMode }) => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you'd handle the submission here
      console.log('Subscribed with:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-light/80 border-t border-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <LogoIcon className="h-8 w-8 text-primary" />
              <h3 className="font-sans font-bold text-xl text-dark">WanderMind Hub</h3>
            </div>
            <p className="mt-2 text-sm text-muted">Mindful travel for the modern soul. Your journey to conscious living starts here.</p>
          </div>
          <div className="md:col-span-2">
             <h3 className="font-sans font-semibold text-dark">Explore</h3>
             <ul className="mt-2 space-y-1 text-sm text-muted">
                <li><a href="#" className="hover:text-primary">Episodes</a></li>
                <li><a href="#" className="hover:text-primary">Articles</a></li>
                <li><a href="#" className="hover:text-primary">About Us</a></li>
             </ul>
          </div>
          <div className="md:col-span-6">
            <h3 className="font-sans font-semibold text-dark">Subscribe to our Newsletter</h3>
            <p className="mt-2 text-sm text-muted">Get the latest episodes and articles delivered to your inbox.</p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 rounded-full bg-white text-dark border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white font-sans font-semibold px-6 py-2 rounded-full transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            {subscribed && <p className="mt-2 text-sm text-green-600">Thank you for subscribing!</p>}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-black/5 flex justify-between items-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} WanderMind Hub. All rights reserved.</p>
          <AdminModeToggle isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;