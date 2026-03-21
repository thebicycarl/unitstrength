import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const VIDEO_SRC = '/20260206_135917-optimized.mp4';
const SCROLL_PROMPT_LAST_SECONDS = 5;

const LuxuryTopVideoSection = ({ scrollToSection }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [lastFramePoster, setLastFramePoster] = useState(null);
  const thumbVideoRef = useRef(null);
  const unmuteOnPlayingRef = useRef(false);

  const handlePlayClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    // Start muted so play() is not blocked by browser policy; unmute once playing
    unmuteOnPlayingRef.current = true;
    video.muted = true;
    video.play().then(() => {
      // If already playing (e.g. event fired before), update state and unmute now
      if (!video.paused) {
        if (unmuteOnPlayingRef.current) {
          video.muted = false;
          unmuteOnPlayingRef.current = false;
        }
        setIsPlaying(true);
      }
    }).catch(() => {
      unmuteOnPlayingRef.current = false;
    });
  }, []);

  const handlePlaying = useCallback(() => {
    const video = videoRef.current;
    if (unmuteOnPlayingRef.current && video) {
      video.muted = false;
      unmuteOnPlayingRef.current = false;
    }
    setIsPlaying(true);
  }, []);

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowScrollPrompt(false);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowScrollPrompt(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.duration && video.duration - video.currentTime <= SCROLL_PROMPT_LAST_SECONDS) {
        setShowScrollPrompt(true);
      }
    };
    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [isPlaying]);

  // Hidden video used only to capture the last frame for the poster
  const captureThumbToPoster = useCallback(() => {
    const video = thumbVideoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return false;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    try {
      ctx.drawImage(video, 0, 0);
      setLastFramePoster(canvas.toDataURL('image/jpeg', 0.9));
      return true;
    } catch (_) {
      return false;
    }
  }, []);

  const handleThumbSeeked = useCallback(() => {
    if (captureThumbToPoster()) return;
    setTimeout(() => captureThumbToPoster(), 150);
  }, [captureThumbToPoster]);

  const handleThumbCanSeek = useCallback(() => {
    const video = thumbVideoRef.current;
    if (!video || !isFinite(video.duration) || video.duration <= 0) return;
    video.currentTime = Math.max(0, video.duration - 0.01);
  }, []);

  const handlePauseClick = () => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Placeholder / loading background */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      )}

      {/* Hidden video: only used to capture last frame for poster (contained so it never causes horizontal scroll) */}
      <div className="absolute top-0 left-0 w-px h-px overflow-hidden opacity-0 pointer-events-none" aria-hidden>
        <video
          ref={thumbVideoRef}
          src={VIDEO_SRC}
          muted
          preload="auto"
          playsInline
          className="min-w-full min-h-full object-cover"
          style={{ width: 1, height: 1 }}
          onLoadedMetadata={handleThumbCanSeek}
          onLoadedData={handleThumbCanSeek}
          onSeeked={handleThumbSeeked}
        />
      </div>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={lastFramePoster ?? undefined}
        className="absolute z-0 w-full h-full object-contain bg-gray-900"
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        onPlaying={handlePlaying}
        onEnded={handleVideoEnded}
        onPause={handleVideoPause}
        onError={(e) => {
          console.error('Video failed to load or play:', e.target?.error);
        }}
      />

      {/* Play overlay – shown when paused */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlayClick}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          aria-label="Play video"
        >
          <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 text-gray-900 hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl">
            <Play className="w-10 h-10 md:w-12 md:h-12 ml-1" fill="currentColor" />
          </span>
          <span className="absolute bottom-12 left-0 right-0 text-center text-white/90 text-sm md:text-base font-light tracking-wide">
            Tap to play
          </span>
        </button>
      )}

      {/* Invisible overlay when playing – tap/click anywhere to pause */}
      {isPlaying && (
        <button
          type="button"
          onClick={handlePauseClick}
          className="absolute inset-0 z-10 cursor-pointer focus:outline-none"
          aria-label="Pause video"
        />
      )}

      {/* Scroll down prompt – last 5s of video */}
      {showScrollPrompt && isPlaying && scrollToSection && (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { duration: 0.4 }, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
            className="pointer-events-auto"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection('benefits');
              }}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              aria-label="Scroll down"
            >
              <ArrowDown className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default LuxuryTopVideoSection;
