export type MusicCategory =
  | "Country"
  | "Lofi"
  | "Dev Flow"
  | "Experimental"
  | "Rhumba"
  | "Bongo"
  | "Afrobeat"
  | "Ethiopian Jazz"
  | "HipHop"
  | "Gondwana"
  | "Amapiano"
  | "RnB"
  | "Genge"
  | "AfroRnB"
  | "Taarab"
  | "Reggae"
  | "Dancehall";

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
  | "soulful"
  | "energetic"
  | "groovy"
  | "romantic"
  | "melancholic"
  | "celebratory";

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
    audioSrc: "/music/Chatbot Cowgirl (Country).mp4",
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
    audioSrc: "/music/Laptop Yangu Ndio Bibi Extended (Rhumba).mp4",
    releaseDate: "2025-08-02",
    moods: ["playful", "storytelling", "soulful"],
    tags: ["Dev Love", "Rhumba"],
    accent: "from-emerald-400/25 via-cyan-300/20 to-sky-400/25",
  },
  {
    slug: "andika-kodi-extended-remix",
    title: "Andika Kodi Extended Remix (Bongo)",
    description:
      "High-energy Bongo Flava celebrating the art of writing code—catchy hooks and driving percussion for late-night coding sessions.",
    category: "Bongo",
    audioSrc: "/music/Andika Kodi Extended Remix (Bongo).mp4",
    releaseDate: "2025-07-25",
    moods: ["energetic", "upbeat", "playful"],
    tags: ["Coding", "Bongo Flava"],
    accent: "from-orange-400/25 via-red-300/20 to-pink-400/25",
  },
  {
    slug: "branches-afrobeat",
    title: "Branches (Afrobeat)",
    description:
      "Smooth Afrobeat rhythms exploring the beauty and chaos of git branches—perfect for when you're merging worlds together.",
    category: "Afrobeat",
    audioSrc: "/music/Branches (Afrobeat).mp4",
    releaseDate: "2025-07-22",
    moods: ["groovy", "upbeat", "storytelling"],
    tags: ["Git", "Development"],
    accent: "from-green-400/25 via-teal-300/20 to-cyan-400/25",
  },
  {
    slug: "bug-eskista",
    title: "Bug Eskista (Ethiopian Jazz 🇪🇹)",
    description:
      "Ethiopian jazz fusion with traditional shoulder dance vibes—celebrating the triumph over pesky bugs with cultural flair.",
    category: "Ethiopian Jazz",
    audioSrc: "/music/Bug Eskista (Ethiopian Jazz 🇪🇹).mp4",
    releaseDate: "2025-07-20",
    moods: ["celebratory", "upbeat", "playful"],
    tags: ["Debugging", "Ethiopian", "Jazz"],
    accent: "from-yellow-400/25 via-amber-300/20 to-orange-400/25",
  },
  {
    slug: "code-and-flow-hiphop",
    title: "Code and Flow (HipHop)",
    description:
      "Hard-hitting hip-hop beats for when you're in the zone—rhymes about algorithms, loops, and the hustle of development life.",
    category: "HipHop",
    audioSrc: "/music/Code and Flow (HipHop).mp4",
    releaseDate: "2025-07-15",
    moods: ["focus", "energetic", "upbeat"],
    tags: ["Productivity", "Hip-Hop"],
    accent: "from-purple-400/25 via-indigo-300/20 to-blue-400/25",
  },
  {
    slug: "deadline-close-gondwana",
    title: "Deadline Close (Gondwana)",
    description:
      "Mellow Gondwana reggae vibes for those moments when the deadline looms—chill yet purposeful, keeping you grounded under pressure.",
    category: "Gondwana",
    audioSrc: "/music/Deadline close (Gondwana).mp4",
    releaseDate: "2025-07-28",
    moods: ["chill", "focus", "melancholic"],
    tags: ["Deadlines", "Reggae", "Chill"],
    accent: "from-green-300/25 via-lime-300/20 to-emerald-400/25",
  },
  {
    slug: "eyes-so-wide-amapiano",
    title: "Eyes So Wide (Amapiano)",
    description:
      "Smooth Amapiano grooves with deep basslines—perfect for those late-night coding marathons when coffee kicks in.",
    category: "Amapiano",
    audioSrc: "/music/Eyes so wide (Amapiano).mp4",
    releaseDate: "2025-07-19",
    moods: ["groovy", "chill", "upbeat"],
    tags: ["Late Night", "Amapiano"],
    accent: "from-blue-400/25 via-cyan-300/20 to-teal-400/25",
  },
  {
    slug: "fine-code-lines-rnb",
    title: "Fine Code Lines (RnB)",
    description:
      "Silky smooth R&B celebrating elegant code and clean architecture—soulful vocals over sophisticated beats.",
    category: "RnB",
    audioSrc: "/music/Fine Code Lines (RnB).mp4",
    releaseDate: "2025-07-17",
    moods: ["soulful", "romantic", "chill"],
    tags: ["Clean Code", "R&B"],
    accent: "from-rose-400/25 via-pink-300/20 to-fuchsia-400/25",
  },
  {
    slug: "hackathon-groove-amapiano",
    title: "Hackathon Groove (Amapiano)",
    description:
      "Infectious Amapiano rhythms designed for the hackathon grind—keeping energy high through every sprint and pivot.",
    category: "Amapiano",
    audioSrc: "/music/Hackathon Groove (Amapiano).mp4",
    releaseDate: "2025-07-24",
    moods: ["energetic", "groovy", "upbeat"],
    tags: ["Hackathon", "Energy"],
    accent: "from-violet-400/25 via-purple-300/20 to-fuchsia-400/25",
  },
  {
    slug: "hackathon-marathon-genge",
    title: "Hackathon Marathon (Genge)",
    description:
      "Fast-paced Genge beats capturing the intensity of hackathon marathons—rapid flows and driving rhythms for non-stop coding.",
    category: "Genge",
    audioSrc: "/music/Hackathon Marathon (Genge).mp4",
    releaseDate: "2025-07-26",
    moods: ["energetic", "upbeat", "playful"],
    tags: ["Hackathon", "Genge"],
    accent: "from-red-400/25 via-orange-300/20 to-yellow-400/25",
  },
  {
    slug: "hadithi-mpya-bongo",
    title: "Hadithi Mpya (Bongo)",
    description:
      "Fresh stories told through Bongo Flava—every project has a new tale, and this track brings them to life with catchy melodies.",
    category: "Bongo",
    audioSrc: "/music/Hadithi Mpya (Bongo).mp4",
    releaseDate: "2025-07-21",
    moods: ["storytelling", "upbeat", "playful"],
    tags: ["Stories", "Bongo"],
    accent: "from-amber-400/25 via-orange-300/20 to-red-400/25",
  },
  {
    slug: "kazi-ni-code-afrornb",
    title: "Kazi ni Code (AfroRnB)",
    description:
      "AfroRnB fusion celebrating the work of coding—smooth vocals layered over contemporary Afro beats about dedication and craft.",
    category: "AfroRnB",
    audioSrc: "/music/Kazi ni Code (AfroRnB).mp4",
    releaseDate: "2025-07-23",
    moods: ["soulful", "upbeat", "storytelling"],
    tags: ["Work", "AfroRnB"],
    accent: "from-teal-400/25 via-cyan-300/20 to-blue-400/25",
  },
  {
    slug: "mapenzi-na-bug-taarab",
    title: "Mapenzi na Bug, ni Mateso (Coastal Taarab)",
    description:
      "Poetic Taarab melodies lamenting the love-hate relationship with bugs—romantic yet melancholic, like debugging at midnight.",
    category: "Taarab",
    audioSrc: "/music/Mapenzi na bug, ni mateso (Coastal Taarab).mp4",
    releaseDate: "2025-07-16",
    moods: ["romantic", "melancholic", "storytelling"],
    tags: ["Debugging", "Taarab", "Poetry"],
    accent: "from-indigo-400/25 via-blue-300/20 to-cyan-400/25",
  },
  {
    slug: "merge-conflict-extended-genge",
    title: "Merge Conflict Extended (Genge)",
    description:
      "Genge track about the drama of merge conflicts—rapid verses and energetic beats for when git gets complicated.",
    category: "Genge",
    audioSrc: "/music/Merge Conflict Extended (Genge).mp4",
    releaseDate: "2025-07-27",
    moods: ["energetic", "playful", "storytelling"],
    tags: ["Git", "Merge Conflicts"],
    accent: "from-orange-400/25 via-red-300/20 to-rose-400/25",
  },
  {
    slug: "one-code-one-love-reggae",
    title: "One Code One Love Part II (Reggae)",
    description:
      "Laid-back reggae vibes celebrating unity in coding—one codebase, one team, one love. Perfect for collaborative sessions.",
    category: "Reggae",
    audioSrc: "/music/One Code One Love Part II (Reggae).mp4",
    releaseDate: "2025-07-29",
    moods: ["chill", "upbeat", "celebratory"],
    tags: ["Collaboration", "Reggae"],
    accent: "from-green-400/25 via-lime-300/20 to-yellow-400/25",
  },
  {
    slug: "pull-up-to-de-hackaton-dancehall",
    title: "Pull Up To De Hackaton (Dancehall)",
    description:
      "High-energy dancehall anthem for pulling up to hackathons—infectious riddims and confident flows about showing up ready to code.",
    category: "Dancehall",
    audioSrc: "/music/Pull up To De Hackaton (Dancehall).mp4",
    releaseDate: "2025-07-30",
    moods: ["energetic", "upbeat", "celebratory"],
    tags: ["Hackathon", "Dancehall"],
    accent: "from-yellow-400/25 via-orange-300/20 to-red-400/25",
  },
  {
    slug: "still-we-try-gondwana",
    title: "Still We Try (Gondwana)",
    description:
      "Reflective Gondwana reggae about perseverance in development—even when bugs persist and features break, still we try.",
    category: "Gondwana",
    audioSrc: "/music/Still We Try (Gondwana).mp4",
    releaseDate: "2025-07-31",
    moods: ["chill", "melancholic", "storytelling"],
    tags: ["Perseverance", "Reggae"],
    accent: "from-emerald-400/25 via-green-300/20 to-teal-400/25",
  },
  {
    slug: "wifi-umeniacha-extended-bongo",
    title: "Wi-Fi Umeniacha Extended (Bongo)",
    description:
      "Bongo Flava heartbreak anthem about Wi-Fi letting you down—catchy hooks and relatable lyrics for every developer's connectivity woes.",
    category: "Bongo",
    audioSrc: "/music/Wi-Fi umeniacha Extended (Bongo).mp4",
    releaseDate: "2025-08-01",
    moods: ["playful", "melancholic", "storytelling"],
    tags: ["Connectivity", "Bongo"],
    accent: "from-blue-400/25 via-indigo-300/20 to-purple-400/25",
  },
];

export const musicCategories: MusicCategory[] = [
  "Lofi",
  "Dev Flow",
  "Experimental",
  "Rhumba",
  "Country",
  "Bongo",
  "Afrobeat",
  "Ethiopian Jazz",
  "HipHop",
  "Gondwana",
  "Amapiano",
  "RnB",
  "Genge",
  "AfroRnB",
  "Taarab",
  "Reggae",
  "Dancehall"
];

export function getMusicCategories(tracks: MusicTrack[] = musicTracks) {
  const set = new Set<MusicCategory>();
  tracks.forEach((track) => set.add(track.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
