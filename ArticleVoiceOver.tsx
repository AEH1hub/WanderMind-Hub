import React, { useState, useEffect } from 'react';
import PlayCircleIcon from './icons/PlayCircleIcon';
import PauseCircleIcon from './icons/PauseCircleIcon';
import StopCircleIcon from './icons/StopCircleIcon';
import SpeakerWaveIcon from './icons/SpeakerWaveIcon';

interface ArticleVoiceOverProps {
  textContent: string;
}

const ArticleVoiceOver: React.FC<ArticleVoiceOverProps> = ({ textContent }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const plainText = textContent.replace(/<[^>]*>?/gm, ' ').replace(/#+/g, '');

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const availableVoices = synth.getVoices().filter(v => v.lang.startsWith('en'));
      setVoices(availableVoices);
      // Prefer a native US English voice if available
      const preferredVoice = availableVoices.find(v => v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Samantha')));
      setSelectedVoice(preferredVoice || availableVoices[0] || null);
    };

    // onvoiceschanged can fire multiple times
    const handleVoicesChanged = () => {
      const allVoices = synth.getVoices();
      if(allVoices.length) {
        updateVoices();
      }
    };
    
    handleVoicesChanged();
    synth.onvoiceschanged = handleVoicesChanged;
    
    // Cleanup on unmount
    return () => {
        synth.cancel();
        synth.onvoiceschanged = null;
    }
  }, []);
  
  const handlePlay = () => {
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
    } else {
      synth.cancel(); // Clear any previous utterance
      const utterance = new SpeechSynthesisUtterance(plainText);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsSpeaking(false);
        setIsPaused(false);
      }
      synth.speak(utterance);
    }
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    // Note: isSpeaking should remain true to indicate that an utterance is active
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoiceName = event.target.value;
    const voice = voices.find(v => v.name === selectedVoiceName);
    if(voice) {
        setSelectedVoice(voice);
    }
  }
  
  const isPlaying = isSpeaking && !isPaused;
  const isActionable = isSpeaking || isPaused;

  return (
    <div className="bg-light rounded-lg p-4 my-6 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
      <div className='flex items-center gap-3'>
        <SpeakerWaveIcon className="h-6 w-6 text-accent"/>
        <h4 className="font-sans font-semibold text-dark">Listen to this Article</h4>
      </div>
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <button onClick={handlePlay} title={isPaused ? "Resume" : "Play"} aria-label={isPaused ? "Resume" : "Play"}>
            <PlayCircleIcon className="h-10 w-10 text-accent hover:text-accent-dark transition-colors"/>
          </button>
        ) : (
          <button onClick={handlePause} title="Pause" aria-label="Pause">
            <PauseCircleIcon className="h-10 w-10 text-accent hover:text-accent-dark transition-colors"/>
          </button>
        )}
        <button onClick={handleStop} disabled={!isActionable} title="Stop" aria-label="Stop">
          <StopCircleIcon className={`h-10 w-10 transition-colors ${!isActionable ? 'text-gray-300' : 'text-accent hover:text-accent-dark'}`}/>
        </button>
        
        <div className="h-10 w-px bg-gray-200 mx-2"></div>

        <select 
          value={selectedVoice?.name || ''} 
          onChange={handleVoiceChange} 
          className="bg-white border border-gray-300 rounded-md px-2 py-1.5 text-sm h-10 focus:ring-accent focus:border-accent"
          aria-label="Select voice"
        >
            {voices.map(voice => (
                <option key={voice.name} value={voice.name}>{voice.name.split('(')[0]} ({voice.lang})</option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ArticleVoiceOver;