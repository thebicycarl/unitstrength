import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Loader2, Play, RotateCcw } from 'lucide-react';

const SCROLL_THRESHOLD_SEC = 30;
/** Min seconds of media buffered from t=0 before showing play (fixed ~39s hero clip) */
const MIN_BUFFER_BEFORE_PLAY_SEC = 10;

/**
 * True if buffered ranges cover [0, targetSec] continuously from the start of the file.
 */
function bufferedCoversFromStart(buffered, targetSec) {
  const eps = 0.05;
  if (!buffered || buffered.length === 0) return false;
  if (buffered.start(0) > eps) return false;
  let pos = 0;
  for (let i = 0; i < buffered.length; i++) {
    if (buffered.start(i) > pos + eps) return false;
    pos = Math.max(pos, buffered.end(i));
    if (pos >= targetSec - eps) return true;
  }
  return pos >= targetSec - eps;
}

/**
 * Intro video — centered play (hidden while playing), tap anywhere to pause,
 * Shorts-style progress bar, replay at end, scroll hint after 30s (or end if shorter).
 */
const TopVideoHeroSection = () => {
  /** True once enough media is buffered from the start for smoother playback on slow networks */
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const videoRef = useRef(null);
  /** Scroll hint only after real playback reaches threshold */
  const hasPlaybackStartedRef = useRef(false);
  const isVideoReadyRef = useRef(false);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  }, []);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setProgress(0);
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

    const tryMarkReady = () => {
      if (isVideoReadyRef.current) return;
      const d = video.duration;
      if (!d || !Number.isFinite(d) || d <= 0) return;
      const targetSec = Math.min(MIN_BUFFER_BEFORE_PLAY_SEC, d);
      if (!bufferedCoversFromStart(video.buffered, targetSec)) return;
      isVideoReadyRef.current = true;
      setIsVideoReady(true);
    };

    const onPlay = () => {
      hasPlaybackStartedRef.current = true;
      setIsPlaying(true);
      setHasEnded(false);
    };
    const onPause = () => setIsPlaying(false);

    const onTimeUpdate = () => {
      const d = video.duration;
      if (d && Number.isFinite(d) && d > 0) {
        setProgress((video.currentTime / d) * 100);
        if (!hasPlaybackStartedRef.current) return;
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

    const onProgress = () => {
      tryMarkReady();
    };
    const onLoadedMetadata = () => {
      tryMarkReady();
    };
    const onDurationChange = () => {
      tryMarkReady();
    };
    const onCanPlay = () => {
      tryMarkReady();
    };
    const onCanPlayThrough = () => {
      tryMarkReady();
    };

    video.addEventListener('progress', onProgress);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('durationchange', onDurationChange);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('canplaythrough', onCanPlayThrough);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    tryMarkReady();

    return () => {
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('durationchange', onDurationChange);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('canplaythrough', onCanPlayThrough);
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

      <div
        className={`relative w-full overflow-hidden ${heroHeightClass}`}
        aria-busy={!isVideoReady}
      >
        {!isVideoReady && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        )}

        {!isVideoReady && (
          <div className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center">
            <Loader2
              className="h-10 w-10 animate-spin text-white/80"
              aria-label="Loading video"
            />
          </div>
        )}

        <video
          ref={videoRef}
          muted={muted}
          playsInline
          fetchPriority="high"
          preload="auto"
          className="absolute inset-0 z-0 h-full w-full cursor-pointer object-contain object-center"
          style={{
            opacity: isVideoReady ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <source src="/topclipv7-optimized.mp4" type="video/mp4" />
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
