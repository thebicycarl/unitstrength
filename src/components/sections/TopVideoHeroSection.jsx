import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, RotateCcw } from 'lucide-react';

const SCROLL_THRESHOLD_SEC = 30;

/**
 * Intro video — centered play (hidden while playing), tap anywhere to pause,
 * Shorts-style progress bar, replay at end, scroll hint after 30s (or end if shorter).
 */
const TopVideoHeroSection = () => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const videoRef = useRef(null);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  }, []);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    setHasEnded(false);
    video.play().catch(() => {});
  }, []);

  const onPlayButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      startPlayback();
    },
    [startPlayback]
  );

  const onReplayClick = useCallback(
    (e) => {
      e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      setMuted(false);
      video.currentTime = 0;
      setHasEnded(false);
      setProgress(0);
      video.play().catch(() => {});
    },
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setIsVideoReady(true);

    const onPlay = () => {
      setIsPlaying(true);
      setHasEnded(false);
    };
    const onPause = () => setIsPlaying(false);

    const onTimeUpdate = () => {
      const d = video.duration;
      if (d && Number.isFinite(d) && d > 0) {
        setProgress((video.currentTime / d) * 100);
        const threshold = Math.min(SCROLL_THRESHOLD_SEC, d);
        if (video.currentTime >= threshold - 0.05) {
          setShowScrollHint(true);
        }
      }
    };

    const onEnded = () => {
      setHasEnded(true);
      setIsPlaying(false);
      setProgress(100);
    };

    video.addEventListener('loadedmetadata', markReady);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    if (video.readyState >= 1) {
      markReady();
    }

    return () => {
      video.removeEventListener('loadedmetadata', markReady);
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const scrollToMainHero = () => {
    const el = document.getElementById('main-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroHeightClass = 'h-[calc(100svh-4rem)] min-h-[280px]';
  const showPlayOverlay = isVideoReady && !isPlaying && !hasEnded;
  const showTapToPause = isPlaying && !hasEnded;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" aria-label="Intro video">
      <div className="h-16 shrink-0" aria-hidden />

      <div className={`relative w-full overflow-hidden ${heroHeightClass}`}>
        {!isVideoReady && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        )}

        <video
          ref={videoRef}
          muted={muted}
          playsInline
          preload="auto"
          className="absolute inset-0 z-0 h-full w-full cursor-pointer object-contain object-center"
          style={{
            opacity: isVideoReady ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <source src="/20260206_135917-optimized.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/35"
          aria-hidden
        />

        {/* Tap anywhere to pause while playing */}
        {showTapToPause && (
          <button
            type="button"
            aria-label="Pause video"
            className="absolute inset-0 z-20 cursor-pointer bg-transparent"
            onClick={pauseVideo}
          />
        )}

        {/* Centered play — only when paused and not ended */}
        {showPlayOverlay && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            <button
              type="button"
              onClick={onPlayButtonClick}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-all hover:bg-black/65"
              aria-label="Play video"
            >
              <Play className="ml-1 h-8 w-8 text-white" />
            </button>
          </div>
        )}

        {/* Replay when finished */}
        {hasEnded && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            <button
              type="button"
              onClick={onReplayClick}
              className="pointer-events-auto flex flex-col items-center gap-2 rounded-lg border border-white/30 bg-black/50 px-6 py-4 backdrop-blur-sm transition-all hover:bg-black/65"
              aria-label="Replay video"
            >
              <RotateCcw className="h-10 w-10 text-white" />
              <span className="text-sm font-medium text-white">Replay</span>
            </button>
          </div>
        )}

        {/* Shorts-style progress */}
        {isVideoReady && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 px-0">
            <div className="h-[3px] w-full overflow-hidden bg-white/20">
              <div
                className="h-full bg-white/90 transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Bouncing scroll — only after 30s (or end if video shorter than 30s) */}
        {showScrollHint && (
          <div className="absolute bottom-10 left-0 right-0 z-[50] flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <button
                type="button"
                onClick={scrollToMainHero}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                aria-label="Scroll to main content"
              >
                <ArrowDown className="h-5 w-5 text-white" />
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopVideoHeroSection;
