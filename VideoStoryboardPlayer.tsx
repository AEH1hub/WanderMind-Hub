import React, { useState, useEffect, useRef } from 'react';
import { VideoComponents } from '../types';
import PlayCircleIcon from './icons/PlayCircleIcon';
import PauseCircleIcon from './icons/PauseCircleIcon';
import SpeakerWaveIcon from './icons/SpeakerWaveIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';

interface VideoStoryboardPlayerProps {
    videoKit: VideoComponents;
}

const VideoStoryboardPlayer: React.FC<VideoStoryboardPlayerProps> = ({ videoKit }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const synth = window.speechSynthesis;
    const utterances = useRef<SpeechSynthesisUtterance[]>([]);

    useEffect(() => {
        // Stop any speech when the component unmounts or videoKit changes
        return () => {
            synth.cancel();
        };
    }, [videoKit]);

    const handlePlay = () => {
        if (isPlaying) {
            synth.pause();
            setIsPlaying(false);
            return;
        }
        
        if (synth.paused) {
            synth.resume();
            setIsPlaying(true);
            return;
        }

        setIsPlaying(true);
        setIsFinished(false);
        if(currentSceneIndex >= videoKit.scenes.length - 1) {
            setCurrentSceneIndex(0); // Restart if at the end
            playScene(0);
        } else {
            playScene(currentSceneIndex);
        }
    };

    const playScene = (index: number) => {
        if (index >= videoKit.scenes.length) {
            setIsPlaying(false);
            setIsFinished(true);
            return;
        }
        setCurrentSceneIndex(index);
        const scene = videoKit.scenes[index];
        const utterance = new SpeechSynthesisUtterance(scene.voiceOverChunk);
        
        // Use a preferred voice if available
        const voices = synth.getVoices().filter(v => v.lang.startsWith('en'));
        const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'));
        utterance.voice = preferredVoice || voices[0] || null;

        utterance.onend = () => {
            playScene(index + 1);
        };
        utterance.onerror = (e) => {
            console.error("Speech synthesis error", e);
            setIsPlaying(false);
        }
        synth.speak(utterance);
    }
    
    const handlePause = () => {
        synth.pause();
        setIsPlaying(false);
    }
    
    const handleStop = () => {
        synth.cancel();
        setIsPlaying(false);
        setCurrentSceneIndex(0);
    }

    const currentScene = videoKit.scenes[currentSceneIndex];
    const progressPercentage = isPlaying ? ((currentSceneIndex + 1) / videoKit.scenes.length) * 100 : 0;

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-black/20">
            {/* Image and Subtitle Overlay */}
            <div className="relative w-full aspect-video bg-black">
                {videoKit.scenes.map((scene, index) => (
                     <img
                        key={index}
                        src={scene.imageUrl}
                        alt={`Scene ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentSceneIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
               
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex items-end h-1/2">
                    {isPlaying && currentScene && (
                         <p key={currentSceneIndex} className="text-white font-sans font-bold text-lg md:text-2xl text-center w-full animate-fade-in" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
                           {currentScene.subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Player Controls */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 text-white">
                <div className="flex items-center gap-4">
                    <button onClick={isPlaying ? handlePause : handlePlay} className="text-white hover:text-primary transition-colors">
                        {isPlaying ? <PauseCircleIcon className="h-10 w-10" /> : <PlayCircleIcon className="h-10 w-10" />}
                    </button>
                     <div className="flex-grow flex items-center gap-2">
                        <SpeakerWaveIcon className="h-5 w-5 text-gray-400" />
                        <div className="w-full bg-gray-600 rounded-full h-1.5">
                            <div 
                                className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-linear" 
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-mono text-gray-400">{currentSceneIndex + 1} / {videoKit.scenes.length}</span>
                     </div>
                </div>
            </div>
             <div className="group relative flex items-center justify-center px-4 py-2 text-xs text-gray-400 bg-gray-900/50">
                <InformationCircleIcon className="h-4 w-4 mr-2" />
                <span>Voice-over quality depends on your browser.</span>
                <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-center text-xs rounded-lg py-2 px-3">
                    The voice is generated by your browser's built-in Text-to-Speech engine. Different browsers (Chrome, Safari, etc.) and operating systems will have different voices available.
                </div>
            </div>
        </div>
    );
};

export default VideoStoryboardPlayer;