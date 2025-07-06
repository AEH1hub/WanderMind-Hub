import React from 'react';
import { View } from '../types';
import LogoIcon from './icons/LogoIcon';
import SparklesIcon from './icons/SparklesIcon';
import SearchIcon from './icons/SearchIcon';
import LiveClock from './LiveClock';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onSearchClick: () => void;
}

const NavLink: React.FC<{
  view: View;
  currentView: View;
  setCurrentView: (view: View) => void;
  children: React.ReactNode;
}> = ({ view, currentView, setCurrentView, children }) => {
  const isActive = view === currentView;
  const baseClasses = "px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300";
  const activeClasses = 'bg-primary/10 text-primary';
  const inactiveClasses = 'text-muted hover:text-dark';

  return (
    <button
      onClick={() => setCurrentView(view)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onSearchClick }) => {
  return (
    <header className="sticky top-0 bg-light/80 backdrop-blur-lg shadow-soft z-50 border-b border-black/5">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => setCurrentView(View.Home)} className="flex-shrink-0 flex items-center gap-2 group">
              <LogoIcon className="h-9 w-9 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-sans font-bold text-2xl text-dark">WanderMind Hub</span>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2">
              <NavLink view={View.Home} currentView={currentView} setCurrentView={setCurrentView}>Home</NavLink>
              <NavLink view={View.Episodes} currentView={currentView} setCurrentView={setCurrentView}>Episodes</NavLink>
              <NavLink view={View.Articles} currentView={currentView} setCurrentView={setCurrentView}>Articles</NavLink>
              <NavLink view={View.Plans} currentView={currentView} setCurrentView={setCurrentView}>Plans</NavLink>
              <NavLink view={View.About} currentView={currentView} setCurrentView={setCurrentView}>About</NavLink>
              <NavLink view={View.HowToUse} currentView={currentView} setCurrentView={setCurrentView}>How to Use</NavLink>
              <NavLink view={View.Contact} currentView={currentView} setCurrentView={setCurrentView}>Contact</NavLink>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={onSearchClick} className="hidden md:block text-muted hover:text-dark transition-colors" aria-label="Search">
                <SearchIcon className="h-6 w-6"/>
             </button>
             <LiveClock />
             <button onClick={() => setCurrentView(View.Automation)} className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-sans font-semibold px-4 py-2.5 rounded-full shadow-soft-lg hover:shadow-accent/20 transform hover:scale-105 transition-all duration-300">
                <SparklesIcon className="h-5 w-5" />
                <span className="hidden lg:block">Content Studio</span>
              </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;