import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────── helpers ─────────────────────────── */
function fmtTime(s) {
  if (!isFinite(s) || s < 0) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const QUALITIES = ["Auto", "1080p", "720p", "480p", "360p"];

function SkipFlash({ side, show }) {
  if (!show) return null;
  return (
    <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-white select-none z-30 ${side === "left" ? "left-6" : "right-6"}`}>
      <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 animate-skipFlash">
        <span className="text-2xl font-bold">{side === "left" ? "⏪" : "⏩"}</span>
      </div>
      <span className="text-xs font-semibold drop-shadow">10s</span>
    </div>
  );
}

function Tooltip({ label, children }) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50">
        {label}
      </div>
    </div>
  );
}

export function VideoPlayer({
  src, poster, title, episodeTitle,
  onNext, onPrev, hasNext, hasPrev,
  showSkipIntro, onSkipIntro,
  subtitleTracks = [],
  onEnded, onTimeUpdate, initialTime = 0,
  episodesList, onEpisodeSelect, currentEpisodeIndex,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimerRef = useRef(null);
  const progressRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState("");
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(!!src);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState("Auto");
  const [subtitle, setSubtitle] = useState("Off");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [skipFlash, setSkipFlash] = useState(null);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverX, setHoverX] = useState(0);
  const [pip, setPip] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false);
    }, 3000);
  }, []);

  useEffect(() => { return () => clearTimeout(controlsTimerRef.current); }, []);

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.volume = volume; v.muted = muted; }
  }, [volume, muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      switch (e.key) {
        case " ": case "k": e.preventDefault(); togglePlay(); break;
        case "ArrowLeft": e.preventDefault(); skip(-10); break;
        case "ArrowRight": e.preventDefault(); skip(10); break;
        case "ArrowUp": e.preventDefault(); setVolume((v) => Math.min(1, v + 0.1)); break;
        case "ArrowDown": e.preventDefault(); setVolume((v) => Math.max(0, v - 0.1)); break;
        case "f": toggleFullscreen(); break;
        case "m": toggleMute(); break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  async function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
        setPlaybackError("");
      } catch {
        setPlaybackError("Playback could not start. Check the stream or choose another server.");
      }
    } else {
      v.pause();
    }
    resetControlsTimer();
  }

  function skip(seconds) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + seconds));
    setSkipFlash(seconds < 0 ? "left" : "right");
    setTimeout(() => setSkipFlash(null), 700);
    resetControlsTimer();
  }

  function toggleMute() { setMuted((m) => !m); }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await containerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  }

  async function togglePip() {
    const v = videoRef.current;
    if (!v) return;
    if (document.pictureInPictureElement) { await document.exitPictureInPicture(); setPip(false); }
    else { await v.requestPictureInPicture(); setPip(true); }
  }

  function handleProgressHover(e) {
    const bar = progressRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    setHoverTime(((e.clientX - rect.left) / rect.width) * duration);
    setHoverX(e.clientX - rect.left);
  }

  function handleProgressClick(e) {
    const bar = progressRef.current;
    if (!bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const v = videoRef.current;
    if (v) v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  }

  let tapTimer = null;
  function handleVideoTap(e) {
    if (tapTimer) {
      clearTimeout(tapTimer); tapTimer = null;
      const rect = containerRef.current.getBoundingClientRect();
      skip(e.clientX - rect.left < rect.width / 2 ? -10 : 10);
    } else {
      tapTimer = setTimeout(() => { tapTimer = null; togglePlay(); }, 250);
    }
  }

  const pct = duration ? (currentTime / duration) * 100 : 0;
  const nextEpisodeThreshold = duration > 90 && currentTime >= duration - 60;

  const effectiveSrc =
    src ||
    "https://media.w3.org/2010/05/sintel/trailer.mp4";

  return (
    <div
      ref={containerRef}
      className={`relative bg-black select-none overflow-hidden ${fullscreen ? "w-screen h-screen" : "w-full aspect-video"}`}
      onMouseMove={resetControlsTimer}
      onTouchStart={resetControlsTimer}
      onClick={isMobile ? handleVideoTap : undefined}
    >
      <video
        ref={videoRef}
        src={effectiveSrc}
        poster={poster}
        className="w-full h-full object-contain bg-black cursor-pointer"
        onLoadStart={() => { setPlaybackError(""); setLoading(true); }}
        onPlay={() => { setPlaying(true); setPlaybackError(""); }}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => { setDuration(e.target.duration); setLoading(false); }}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onError={(e) => {
          setLoading(false);
          const errorCode = e.currentTarget.error?.code;
          const messages = {
            2: "A network error interrupted the stream. Check your connection or choose another server.",
            3: "The video stream could not be decoded. Try another server.",
            4: "This video stream is unavailable or uses an unsupported format. Try another server.",
          };
          setPlaybackError(
            messages[errorCode] || "The video could not be loaded. Try another server."
          );
        }}
        onTimeUpdate={() => {
          const v = videoRef.current; if (!v) return;
          setCurrentTime(v.currentTime);
          if (v.buffered.length > 0) setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
          onTimeUpdate?.(v.currentTime, v.duration);
        }}
        onEnded={() => { setPlaying(false); onEnded?.(); }}
        playsInline
      />

      {playbackError && (
        <div
          role="alert"
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 px-6 text-center"
        >
          <p className="max-w-lg text-sm font-medium text-white/90">{playbackError}</p>
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-red-500 animate-spin" />
        </div>
      )}

      <SkipFlash side="left" show={skipFlash === "left"} />
      <SkipFlash side="right" show={skipFlash === "right"} />

      {/* Skip Intro */}
      {showSkipIntro && currentTime < 90 && (
        <button onClick={(e) => { e.stopPropagation(); onSkipIntro?.(); }}
          className="absolute bottom-28 right-4 z-30 bg-white/15 hover:bg-white/30 backdrop-blur border border-white/40 text-white text-sm font-bold px-5 py-2.5 rounded transition-all">
          Skip Intro ⏭
        </button>
      )}

      {/* Next Episode */}
      {hasNext && nextEpisodeThreshold && (
        <button onClick={(e) => { e.stopPropagation(); onNext?.(); }}
          className="absolute bottom-28 right-4 z-30 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded flex items-center gap-2 transition-all">
          Next Episode ▶▶
        </button>
      )}

      {/* Controls overlay */}
      <div className={`absolute inset-0 z-20 flex flex-col justify-between transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-4 pb-8 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <button onClick={() => window.history.back()} className="text-white hover:text-red-400 transition text-2xl font-bold leading-none">←</button>
            <div>
              <p className="text-white font-bold text-sm sm:text-base leading-tight">{title}</p>
              {episodeTitle && <p className="text-white/60 text-xs">{episodeTitle}</p>}
            </div>
          </div>
          {episodesList?.length > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setShowEpisodes((v) => !v); }}
              className="text-white/80 hover:text-white text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition">
              📋 Episodes
            </button>
          )}
        </div>

        {/* Center controls — desktop */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-6">
            {hasPrev && (
              <button onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
                className="text-white/80 hover:text-white transition" title="Previous Episode">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
              </button>
            )}
            <button onClick={(e) => { e.stopPropagation(); skip(-10); }}
              className="text-white/80 hover:text-white transition" title="Rewind 10s (←)">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur flex items-center justify-center transition text-white">
              {playing
                ? <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                : <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              }
            </button>
            <button onClick={(e) => { e.stopPropagation(); skip(10); }}
              className="text-white/80 hover:text-white transition" title="Forward 10s (→)">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
              </svg>
            </button>
            {hasNext && (
              <button onClick={(e) => { e.stopPropagation(); onNext?.(); }}
                className="text-white/80 hover:text-white transition" title="Next Episode">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z" /></svg>
              </button>
            )}
          </div>
        )}

        {/* Bottom control bar */}
        <div className="px-3 pb-3 pt-10 bg-gradient-to-t from-black/90 to-transparent">
          {/* Progress bar */}
          <div ref={progressRef}
            className="relative h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group/progress hover:h-2.5 transition-all"
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoverTime(null)}>
            <div className="absolute inset-y-0 left-0 bg-white/30 rounded-full" style={{ width: `${buffered}%` }} />
            <div className="absolute inset-y-0 left-0 bg-red-500 rounded-full" style={{ width: `${pct}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-red-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition -ml-1.5 shadow-lg" style={{ left: `${pct}%` }} />
            {hoverTime !== null && (
              <div className="absolute -top-8 bg-black/90 text-white text-xs px-2 py-0.5 rounded pointer-events-none -translate-x-1/2" style={{ left: hoverX }}>
                {fmtTime(hoverTime)}
              </div>
            )}
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile: skip + play buttons inline */}
            {isMobile && <>
              <button onClick={() => skip(-10)} className="text-white/80 hover:text-white p-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" /></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white p-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                {playing
                  ? <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  : <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                }
              </button>
              <button onClick={() => skip(10)} className="text-white/80 hover:text-white p-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" /></svg>
              </button>
            </>}

            <span className="text-white text-xs font-mono whitespace-nowrap">{fmtTime(currentTime)} / {fmtTime(duration)}</span>
            <div className="flex-1" />

            {/* Volume — desktop */}
            {!isMobile && (
              <div className="flex items-center gap-1.5">
                <Tooltip label={muted ? "Unmute (M)" : "Mute (M)"}>
                  <button onClick={toggleMute} className="text-white/80 hover:text-white transition p-1">
                    {muted || volume === 0
                      ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0014 7.97V9.76l2.48 2.48c.01-.08.02-.16.02-.24zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-13.07-9L4.5 4.43 7 6.93V7c0 1.11.39 2.14 1 2.95V5.5l3.72 3.72-.28.28L7 5v3.17l-3-3V3.07l-.07.07zM7 15.17V19l5-5-2.65-2.65L7 15.17z" /></svg>
                      : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0016 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                    }
                  </button>
                </Tooltip>
                <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume}
                  onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
                  className="w-20 accent-red-500 cursor-pointer" />
              </div>
            )}

            {/* Speed */}
            <div className="relative">
              <Tooltip label="Speed">
                <button onClick={(e) => { e.stopPropagation(); setShowSpeedMenu((v) => !v); setShowQualityMenu(false); setShowSubMenu(false); }}
                  className="text-white/80 hover:text-white text-xs font-bold bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition min-w-[44px] text-center">
                  {speed}x
                </button>
              </Tooltip>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-2xl z-50">
                  {SPEEDS.map((s) => (
                    <button key={s} onClick={(e) => { e.stopPropagation(); setSpeed(s); setShowSpeedMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition hover:bg-zinc-700 ${speed === s ? "text-red-500 font-bold" : "text-white"}`}>
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality */}
            <div className="relative hidden sm:block">
              <Tooltip label="Quality">
                <button onClick={(e) => { e.stopPropagation(); setShowQualityMenu((v) => !v); setShowSpeedMenu(false); setShowSubMenu(false); }}
                  className="text-white/80 hover:text-white text-xs font-bold bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition">
                  {quality}
                </button>
              </Tooltip>
              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-2xl z-50">
                  {QUALITIES.map((q) => (
                    <button key={q} onClick={(e) => { e.stopPropagation(); setQuality(q); setShowQualityMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition hover:bg-zinc-700 ${quality === q ? "text-red-500 font-bold" : "text-white"}`}>
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subtitles */}
            <div className="relative">
              <Tooltip label="Subtitles / CC">
                <button onClick={(e) => { e.stopPropagation(); setShowSubMenu((v) => !v); setShowSpeedMenu(false); setShowQualityMenu(false); }}
                  className={`text-xs font-bold px-2 py-1 rounded transition min-w-[44px] text-center ${subtitle !== "Off" ? "text-red-400 bg-red-900/30" : "text-white/80 hover:text-white bg-white/10 hover:bg-white/20"}`}>
                  CC
                </button>
              </Tooltip>
              {showSubMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-2xl z-50 min-w-[120px]">
                  {["Off", ...subtitleTracks].map((track) => (
                    <button key={track} onClick={(e) => { e.stopPropagation(); setSubtitle(track); setShowSubMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition hover:bg-zinc-700 ${subtitle === track ? "text-red-500 font-bold" : "text-white"}`}>
                      {track}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PiP */}
            {typeof document !== "undefined" && document.pictureInPictureEnabled && !isMobile && (
              <Tooltip label={pip ? "Exit PiP" : "Picture in Picture (I)"}>
                <button onClick={togglePip} className={`text-white/80 hover:text-white transition p-1 ${pip ? "text-red-400" : ""}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z" />
                  </svg>
                </button>
              </Tooltip>
            )}

            {/* Fullscreen */}
            <Tooltip label={fullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}>
              <button onClick={toggleFullscreen} className="text-white/80 hover:text-white transition p-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                {fullscreen
                  ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
                  : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                }
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Episodes sidebar */}
      {showEpisodes && episodesList?.length > 0 && (
        <div className="absolute top-0 right-0 h-full w-72 bg-zinc-950/95 backdrop-blur-md z-40 overflow-y-auto border-l border-zinc-800" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-800">
            <h3 className="text-white font-bold">Episodes</h3>
            <button onClick={() => setShowEpisodes(false)} className="text-white/60 hover:text-white text-2xl leading-none">×</button>
          </div>
          <div className="p-2 space-y-1">
            {episodesList.map((ep, idx) => (
              <button key={ep.id || idx}
                onClick={() => { onEpisodeSelect?.(ep, idx); setShowEpisodes(false); }}
                className={`w-full flex gap-3 p-2 rounded-lg text-left transition hover:bg-zinc-800 ${currentEpisodeIndex === idx ? "bg-red-900/30 border border-red-800/40" : ""}`}>
                <div className="w-20 aspect-video rounded bg-zinc-800 shrink-0 overflow-hidden flex items-center justify-center text-white/30 text-xs">
                  {ep.thumbnail ? <img src={ep.thumbnail} alt="" className="w-full h-full object-cover" /> : idx + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">Ep {idx + 1}: {ep.title}</p>
                  <p className="text-white/40 text-xs">{ep.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
