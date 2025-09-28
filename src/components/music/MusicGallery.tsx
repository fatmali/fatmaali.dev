"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { MusicTrack } from "@/content/music/tracks";
import { cn } from "@/utils/cn";

interface MusicGalleryProps {
  tracks: MusicTrack[];
  /**
   * When true, swaps the layout so the playlist/track list appears on the left
   * and the active player panel appears on the right on large screens.
   * Mobile (single column) order remains unchanged for natural reading order.
   */
  reverse?: boolean;
  /** External query to filter tracks (title, description, moods, tags, category). */
  query?: string;
  /** Hide internal filters/search bar when external search UI is used. */
  showFilters?: boolean;
}
// (Removed old standalone catalog filter pill styling after unifying into dropdown)

function formatReleaseDate(date?: string) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function formatTime(value?: number, fallback = "0:00") {
  if (!Number.isFinite(value) || value === undefined || value < 0) {
    return fallback;
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function MusicGallery({ tracks, reverse = false, query, showFilters = true }: MusicGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Unified search dropdown (categories inside search input similar to blog UX)
  const [showCategoryMenu, setShowCategoryMenu] = useState<boolean>(false);
  const [currentTrackSlug, setCurrentTrackSlug] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.9);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sortedTracks = useMemo(() => {
    return [...tracks].sort((a, b) => {
      const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return bDate - aDate;
    });
  }, [tracks]);

  const categories = useMemo(() => {
    if (!showFilters) return ["All"]; // categories UI hidden; keep logic simple
    const set = new Set<string>();
    sortedTracks.forEach((track) => set.add(track.category));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [sortedTracks, showFilters]);

  const filteredTracks = useMemo(() => {
    const activeSearch = (query ?? searchTerm).trim().toLowerCase();
    return sortedTracks.filter((track) => {
      const matchesCategory = !showFilters || selectedCategory === "All" || track.category === selectedCategory;
      const haystack = `${track.title} ${track.description} ${track.category} ${track.moods?.join(" ") ?? ""} ${track.tags?.join(" ") ?? ""}`.toLowerCase();
      const matchesSearch = activeSearch.length === 0 || haystack.includes(activeSearch);
      return matchesCategory && matchesSearch;
    });
  }, [sortedTracks, selectedCategory, searchTerm, query, showFilters]);

  useEffect(() => {
    if (filteredTracks.length === 0) {
      setCurrentTrackSlug(null);
      setIsPlaying(false);
      return;
    }

    if (!currentTrackSlug) {
      setCurrentTrackSlug(filteredTracks[0].slug);
      return;
    }

    const stillExists = filteredTracks.some((track) => track.slug === currentTrackSlug);
    if (!stillExists) {
      setCurrentTrackSlug(filteredTracks[0].slug);
    }
  }, [filteredTracks, currentTrackSlug]);

  const currentTrackIndex = useMemo(() => {
    return filteredTracks.findIndex((track) => track.slug === currentTrackSlug);
  }, [filteredTracks, currentTrackSlug]);

  const currentTrack = useMemo(() => {
    if (currentTrackIndex >= 0) return filteredTracks[currentTrackIndex];
    return filteredTracks[0] ?? null;
  }, [filteredTracks, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentTrack?.audioSrc) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack?.audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);

    if (!currentTrack?.audioSrc) return;

    audio.load();
  }, [currentTrack?.audioSrc]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSelectTrack = useCallback((slug: string) => {
    setCurrentTrackSlug(slug);
    setIsPlaying(true);
  }, []);

  const handleSeek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value;
    }
  }, []);

  const handleNext = useCallback(
    (autoplay = isPlaying) => {
      if (filteredTracks.length === 0) return;

      if (filteredTracks.length === 1) {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
        if (autoplay) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => setIsPlaying(false));
          }
          setIsPlaying(true);
        }
        return;
      }

      const index = currentTrackIndex >= 0 ? currentTrackIndex : 0;
      const nextIndex = (index + 1) % filteredTracks.length;
      setCurrentTrackSlug(filteredTracks[nextIndex].slug);
      if (autoplay) {
        setIsPlaying(true);
      }
    },
    [filteredTracks, currentTrackIndex, isPlaying]
  );

  const handlePrevious = useCallback(() => {
    if (filteredTracks.length === 0) return;

    if (filteredTracks.length === 1) {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setIsPlaying(false));
        }
        setIsPlaying(true);
      }
      return;
    }

    const index = currentTrackIndex >= 0 ? currentTrackIndex : 0;
    const previousIndex = index === 0 ? filteredTracks.length - 1 : index - 1;
    setCurrentTrackSlug(filteredTracks[previousIndex].slug);
    if (isPlaying) {
      setIsPlaying(true);
    }
  }, [filteredTracks, currentTrackIndex, isPlaying]);

  const progressValue = duration > 0 ? currentTime : 0;
  const progressMax = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const queueLength = filteredTracks.length;
  const totalTracks = sortedTracks.length;
  const currentReleaseLabel = formatReleaseDate(currentTrack?.releaseDate ?? undefined);

  const gridCols = reverse
    ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]";

  const playerCardClass = cn(
    "relative overflow-hidden rounded-3xl border border-border bg-background/90 backdrop-blur shadow-lg shadow-primary/10",
    reverse && "lg:order-2"
  );

  const queueClass = cn(
    "rounded-3xl border border-border bg-background/85 backdrop-blur p-5 md:p-6",
    reverse && "lg:order-1"
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      <audio
        ref={audioRef}
        src={currentTrack?.audioSrc ?? ""}
        preload="metadata"
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (!audio) return;
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration || 0);
        }}
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (!audio) return;
          setDuration(audio.duration || 0);
        }}
        onEnded={() => handleNext(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      >
        Your browser does not support the audio element.
      </audio>
      {showFilters && (
        <section className="flex flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xs uppercase tracking-[0.4em] text-muted-foreground lg:pt-0">Catalog</h2>
            <div className="w-full max-w-md lg:max-w-sm relative lg:ml-auto">
              <label htmlFor="music-search" className="sr-only">Search beats</label>
              <input
                id="music-search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowCategoryMenu(true)}
                onBlur={() => setTimeout(() => setShowCategoryMenu(false), 120)}
                placeholder="Search title, description, mood, tag"
                className="w-full rounded-full border border-border bg-background/80 backdrop-blur pl-5 pr-16 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 placeholder:text-muted-foreground"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
                >Clear</button>
              )}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">⌘K</span>
              <AnimatePresence>
                {showCategoryMenu && categories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute z-30 mt-2 w-full rounded-2xl border border-border bg-background/95 backdrop-blur p-3 shadow-lg"
                  >
                    <p className="px-1 pb-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">Categories</p>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map(cat => {
                        const isActive = cat === selectedCategory;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onMouseDown={() => setSelectedCategory(cat)}
                            className={cn(
                              "px-3 py-1 rounded-full text-[11px] font-medium border transition",
                              isActive
                                ? "bg-primary text-primary-foreground border-primary shadow shadow-primary/30"
                                : "border-border/60 bg-muted/40 hover:bg-muted/70 text-muted-foreground"
                            )}
                          >{cat}</button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
        <span>
          Showing <strong className="text-foreground">{queueLength}</strong> of {totalTracks} tracks
        </span>
        {showFilters ? (
          searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
            >
              Clear search
            </button>
          )
        ) : (
          query && (
            <span className="text-muted-foreground/70">Query: {query}</span>
          )
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {filteredTracks.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl border border-dashed border-border bg-muted/30 px-10 py-20 text-center"
          >
            <p className="text-2xl mb-3">🤔</p>
            <h3 className="text-xl font-semibold mb-2">No tracks found</h3>
            <p className="text-muted-foreground">
              Try a different category or clear the search to explore more Suno-made sounds.
            </p>
          </motion.div>
        ) : (
          <motion.div key={currentTrack?.slug ?? "playlist"} layout className="space-y-6">
            <section className={cn("grid gap-6", gridCols)}>
              <motion.div
                layout
                className={playerCardClass}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", currentTrack?.accent ?? "from-primary/10 to-secondary/10")} />
                <div className="relative flex h-full flex-col gap-5 p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>{currentTrack?.category ?? "Playlist"}</span>
                    {currentReleaseLabel ? (
                      <span>{currentReleaseLabel}</span>
                    ) : (
                      <span>Fresh cut</span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <motion.h3
                      layout
                      className="text-3xl font-semibold leading-tight text-foreground md:text-4xl"
                    >
                      {currentTrack?.title ?? "Select a track"}
                    </motion.h3>
                    <p className="text-sm leading-relaxed text-muted-foreground/90 md:text-base">
                      {currentTrack?.description ?? "Choose a beat from the playlist to start listening."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentTrack?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {currentTrack?.moods?.map((mood) => (
                      <span
                        key={mood}
                        className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary"
                      >
                        {mood}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                        <span>
                          Track {currentTrackIndex >= 0 ? String(currentTrackIndex + 1).padStart(2, "0") : "--"} of {queueLength}
                        </span>
                        {currentTrack?.duration && <span>{currentTrack.duration}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrevious}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                          aria-label="Play previous track"
                        >
                          <SkipBack className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={handlePlayPause}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg shadow-foreground/20 transition hover:-translate-y-0.5"
                          aria-label={isPlaying ? "Pause track" : "Play track"}
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNext()}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                          aria-label="Play next track"
                        >
                          <SkipForward className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <input
                        type="range"
                        min={0}
                        max={progressMax}
                        step={progressMax ? Math.max(progressMax / 200, 0.25) : 1}
                        value={progressValue}
                        onChange={(event) => handleSeek(Number(event.target.value))}
                        className="w-full accent-primary"
                        aria-label="Seek through track"
                      />
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration, "--:--")}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                        <Volume2 className="h-4 w-4" />
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={volume}
                          onChange={(event) => handleVolumeChange(Number(event.target.value))}
                          className="w-32 accent-primary"
                          aria-label="Adjust volume"
                        />
                      </div>
                      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
                        {isPlaying ? "Now playing" : "Ready to play"}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                layout
                className={queueClass}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  <span>Playlist queue</span>
                  <span>{queueLength} tracks</span>
                </div>

                <ul className="mt-5 space-y-3">
                  {filteredTracks.map((track, index) => {
                    const isActive = track.slug === currentTrack?.slug;

                    return (
                      <motion.li
                        key={track.slug}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectTrack(track.slug)}
                          className={cn(
                            "group flex w-full items-center justify-between gap-6 rounded-2xl border border-transparent bg-background/60 px-4 py-3 text-left transition",
                            isActive
                              ? "border-primary/60 bg-primary/10 text-foreground shadow-sm shadow-primary/15"
                              : "hover:border-primary/40 hover:bg-primary/5"
                          )}
                          aria-current={isActive}
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-xs text-muted-foreground/70">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="space-y-1">
                              <p className="text-sm font-semibold leading-tight">
                                {track.title}
                              </p>
                              <p className="text-xs text-muted-foreground/80 uppercase tracking-[0.25em]">
                                {track.category}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground/80">
                            {track.duration && <span>{track.duration}</span>}
                            {isActive && (
                              <span className="flex items-center gap-2 text-primary">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                </span>
                                {isPlaying ? "Playing" : "Paused"}
                              </span>
                            )}
                          </div>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
