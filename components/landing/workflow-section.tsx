"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  MoreVertical,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

interface WorkflowStep {
  number: string;
  label: string;
  startTime: number;
}

const STEP_INTERVAL = 4; // 4 seconds per step interval

const WORKFLOW_STEPS: WorkflowStep[] = [
  { number: "01", label: "YOUR STACK", startTime: 0 },
  { number: "02", label: "GET A PROJECT", startTime: 4 },
  { number: "03", label: "BUILD IT", startTime: 8 },
  { number: "04", label: "AI REVIEW", startTime: 12 },
  { number: "05", label: "SHOW YOUR WORK", startTime: 16 },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25);
  const [hasEnded, setHasEnded] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Video time updates - progress steps every 4s while video is playing
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setCurrentTime(current);
    if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }

    // 0-4s: Step 0, 4-8s: Step 1, 8-12s: Step 2, 12-16s: Step 3, 16s+: Step 4
    const stepIdx = Math.min(
      WORKFLOW_STEPS.length - 1,
      Math.floor(current / STEP_INTERVAL)
    );
    setActiveStepIndex(stepIdx);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (hasEnded) {
      videoRef.current.currentTime = 0;
      setHasEnded(false);
      videoRef.current.play().then(() => setIsPlaying(true));
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  }, [isPlaying, hasEnded]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetTime = parseFloat(e.target.value);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
    setHasEnded(false);
    const stepIdx = Math.min(
      WORKFLOW_STEPS.length - 1,
      Math.floor(targetTime / STEP_INTERVAL)
    );
    setActiveStepIndex(stepIdx);
  };

  const jumpToStep = (index: number) => {
    if (!videoRef.current) return;
    const targetTime = WORKFLOW_STEPS[index].startTime;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
    setActiveStepIndex(index);
    setHasEnded(false);
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const resetControlsTimeout = () => {
    setControlsVisible(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative w-full h-[100dvh] max-h-[100dvh] min-h-[640px] overflow-hidden text-[#E8E5D5] flex flex-col justify-center items-center py-4 sm:py-6 lg:py-8"
    >
      {/* --- Fullscreen Background Image (/features.png connecting with Features section) --- */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none transform-gpu">
        <Image
          src="/features.png"
          alt="SkillForge Workflow Environment"
          fill
          priority={false}
          unoptimized
          className="object-cover object-center brightness-[0.90] contrast-[1.03]"
          sizes="100vw"
        />
      </div>

      {/* --- Top Transition Overlay (Seamless blend connecting Features section) --- */}
      <div
        className="absolute top-0 left-0 right-0 h-28 sm:h-36 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* --- Ambient Radial Vignette for Content & Video Contrast --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.64) 70%, rgba(0,0,0,0.94) 100%)",
        }}
      />

      {/* --- Bottom Fade into Next Section --- */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-[1] pointer-events-none" />

      {/* --- Main Centered Content Container --- */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-3.5 sm:gap-4.5 lg:gap-5.5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: easeCurve }}
          className="text-center max-w-[680px] mx-auto shrink-0"
        >

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-[#E8E5D5] leading-[1.06] mb-4 sm:mb-6">
            <span>How it </span>
            <span className="font-serif-editorial italic font-normal text-[#F4F1E8]">
              works?
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-xs sm:text-[13px] md:text-sm text-[#E8E5D5]/70 font-normal leading-relaxed max-w-[580px] mx-auto mb-2 sm:mb-3 lg:mb-4">
            SkillForge turns your existing skills into real projects, evaluates what you build, and helps you showcase the result.
          </p>
        </motion.div>

        {/* --- Main Video Frame (Matches ~60-64% width of reference image) --- */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="w-full flex flex-col items-center justify-center"
        >
          <div
            ref={videoContainerRef}
            onMouseMove={resetControlsTimeout}
            onMouseEnter={() => setControlsVisible(true)}
            className="group relative w-[92%] sm:w-[82%] md:w-[72%] lg:w-[60%] xl:w-[58%] max-w-[840px] aspect-[16/9] max-h-[44vh] rounded-2xl overflow-hidden border border-[#E8E5D5]/20 bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(232,229,213,0.04)] transition-all duration-300 transform-gpu"
          >
            {/* Real HTML5 Video Element */}
            <video
              ref={videoRef}
              src="/workflow.webm"
              muted={isMuted}
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer select-none"
            />

            {/* Ambient Inner Border Glow */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/[0.04] shadow-inner" />

            {/* Click-to-Play/Pause Central Icon for Replay or Paused State */}
            {(!isPlaying || hasEnded) && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-opacity duration-300 cursor-pointer z-20"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/75 border border-[#E8E5D5]/40 flex items-center justify-center text-[#E8E5D5] shadow-[0_0_25px_rgba(0,0,0,0.8),0_0_12px_rgba(232,229,213,0.15)] hover:scale-110 hover:border-[#E8E5D5] hover:text-white transition-all duration-300">
                  {hasEnded ? (
                    <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 translate-x-0.5 fill-[#E8E5D5] stroke-none" />
                  )}
                </div>
              </div>
            )}

            {/* --- Bottom Video Control Bar Overlay (Exact match to reference UI) --- */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-30 px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-1.5 transition-opacity duration-300 ${
                controlsVisible || !isPlaying
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Controls Row: Play/Pause, Time, Volume, Fullscreen, More */}
              <div className="flex items-center justify-between text-xs text-[#E8E5D5]/90">
                {/* Left: Play/Pause & Time Display */}
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                  <button
                    onClick={togglePlay}
                    type="button"
                    className="p-1 text-[#E8E5D5] hover:text-white transition-colors focus:outline-none cursor-pointer"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    )}
                  </button>

                  <span className="font-mono text-[10px] sm:text-[11px] text-[#E8E5D5]/70 select-none">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right: Audio, Fullscreen, Options */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#E8E5D5]/70">
                  <button
                    onClick={toggleMute}
                    type="button"
                    className="p-1 hover:text-white transition-colors focus:outline-none cursor-pointer"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    type="button"
                    className="p-1 hover:text-white transition-colors focus:outline-none cursor-pointer"
                    aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    className="p-1 hover:text-white transition-colors focus:outline-none cursor-pointer hidden sm:block"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Scrubber Bar */}
              <div className="relative w-full flex items-center group/scrubber cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max={duration || 25}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek video progress"
                  className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer focus:outline-none accent-[#E8E5D5] hover:h-1.5 transition-all duration-150"
                  style={{
                    background: `linear-gradient(to right, #E8E5D5 0%, #E8E5D5 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* --- 5-Step Continuous Product Journey Track (Stretched for wide spacious layout) --- */}
          <div className="w-[96%] sm:w-[90%] md:w-[82%] lg:w-[72%] xl:w-[70%] max-w-[980px] mt-6 sm:mt-7 lg:mt-8 relative">
            {/* Connecting Base Line (Center of node 01 to center of node 05) */}
            <div className="absolute top-[8px] sm:top-[9px] left-[10%] right-[10%] h-[1px] bg-[#E8E5D5]/15 z-0" />

            {/* Glowing Active Highlight Line (Smoothly advances with 4s step intervals) */}
            <div
              className="absolute top-[8px] sm:top-[9px] left-[10%] h-[1px] bg-gradient-to-r from-[#E8E5D5] via-[#E8E5D5]/85 to-transparent z-0 transition-all duration-300"
              style={{
                width: `${Math.min(
                  1,
                  currentTime / ((WORKFLOW_STEPS.length - 1) * STEP_INTERVAL)
                ) * 80}%`,
              }}
            />

            {/* 5 Step Nodes Grid */}
            <div className="relative z-10 grid grid-cols-5 gap-1 items-start text-center">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;

                return (
                  <button
                    key={step.number}
                    onClick={() => jumpToStep(idx)}
                    type="button"
                    className="group/step flex flex-col items-center focus:outline-none cursor-pointer transition-all duration-300"
                  >
                    {/* Circle Node Marker (Matches reference image double-ring on active step) */}
                    <div className="relative w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center mb-1.5 sm:mb-2">
                      {isActive ? (
                        /* Active Node: Concentric outer ring + glowing dot */
                        <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border border-[#E8E5D5] bg-black/70 flex items-center justify-center shadow-[0_0_14px_rgba(232,229,213,0.6)]">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E8E5D5]" />
                        </div>
                      ) : (
                        /* Inactive / Passed Node: Subtle ring + central dot */
                        <div
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                            isPassed
                              ? "border-[#E8E5D5]/50 bg-black/60"
                              : "border-[#E8E5D5]/25 bg-black/80 group-hover/step:border-[#E8E5D5]/50"
                          }`}
                        >
                          <div
                            className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                              isPassed
                                ? "bg-[#E8E5D5]/60"
                                : "bg-[#E8E5D5]/30 group-hover/step:bg-[#E8E5D5]/60"
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Step Number */}
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider transition-colors duration-300 ${
                        isActive
                          ? "text-[#E8E5D5]"
                          : "text-[#E8E5D5]/40 group-hover/step:text-[#E8E5D5]/70"
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Step Label */}
                    <span
                      className={`text-[8.5px] sm:text-[10px] md:text-[10.5px] font-semibold tracking-[0.1em] sm:tracking-[0.16em] uppercase mt-0.5 transition-colors duration-300 ${
                        isActive
                          ? "text-[#E8E5D5] font-bold drop-shadow-[0_0_8px_rgba(232,229,213,0.25)]"
                          : "text-[#E8E5D5]/45 group-hover/step:text-[#E8E5D5]/75"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
