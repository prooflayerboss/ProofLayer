'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        playsInline
      />

      {/* Play/Pause Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 cursor-pointer ${
          showControls && !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={togglePlay}
      >
        <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110">
          <svg className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div
          className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer mb-3 group/progress"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-blue-500 rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          <span className="text-white text-sm font-medium">
            Watch how ProofLayer works
          </span>
        </div>
      </div>
    </div>
  );
}
