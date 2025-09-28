export type MusicCategory =
  | "Country"
  | "Lofi"
  | "Dev Flow"
  | "Experimental"
  | "Rhumba";

type MoodTag =
  | "playful"
  | "nostalgic"
  | "upbeat"
  | "dreamy"
  | "focus"
  | "cinematic"
  | "storytelling"
  | "sci-fi"
  | "retro"
  | "chill"
| "soulful";

export interface MusicTrack {
  slug: string;
  title: string;
  description: string;
  category: MusicCategory;
  audioSrc: string;
  duration?: string;
  releaseDate?: string;
  moods?: MoodTag[];
  accent?: string;
  posterImage?: string;
  tags?: string[];
}

export const musicTracks: MusicTrack[] = [
  {
    slug: "chatbot-cowgirl-country",
    title: "Chatbot Cowgirl (Country)",
    description:
      "Sun-baked twang with playful lyrics about a chatbot lassoing runaway bugs—perfect for lighthearted demo days.",
    category: "Country",
    audioSrc: "/music/Chatbot Cowgirl (Country).mp3",
    releaseDate: "2025-07-18",
    moods: ["playful", "storytelling"],
    tags: ["Romantic", "Comical"],
    accent: "from-amber-300/25 via-rose-300/20 to-pink-400/25",
  },
  {
    slug: "laptop-yangu-ndio-bibi",
    title: "Laptop Yangu Ndio Bibi",
    description:
      "Upbeat rhumba celebrating a dev's undying love for their laptop—layered guitars, polyrhythms, and vibrant call-and-response hooks.",
    category: "Rhumba",
    audioSrc: "/music/Laptop Yangu Ndio Bibi Extended (Rhumba).mp3",
    releaseDate: "2025-08-02",
    moods: ["playful", "storytelling", "soulful"],
    tags: ["Dev Love", "Rhumba"],
    accent: "from-emerald-400/25 via-cyan-300/20 to-sky-400/25",
  },
];

export const musicCategories: MusicCategory[] = [
  "Lofi",
  "Dev Flow",
  "Experimental",
  "Rhumba",
  "Country"
];

export function getMusicCategories(tracks: MusicTrack[] = musicTracks) {
  const set = new Set<MusicCategory>();
  tracks.forEach((track) => set.add(track.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
