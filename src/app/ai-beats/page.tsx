import type { Metadata } from "next";
import { MusicGallery } from "@/components/music/MusicGallery";
import { musicTracks } from "@/content/music/tracks";

export const metadata: Metadata = {
  title: "Music | Fatma Ali",
  description:
    "A curated collection of Suno AI tracks ranging from comedic storytelling to lofi dev flow beats—perfect for pairing with code, demos, and creative tinkering.",
  alternates: { canonical: "https://fatmaali.dev/music" },
  openGraph: {
    title: "Music | Fatma Ali",
    description:
      "Suno AI powered tracks crafted by Fatma Ali—comical anthems, focus-ready lofi, and experimental dev vibes.",
    url: "https://fatmaali.dev/music",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Music | Suno Sessions by Fatma Ali",
    description:
      "Playful to focus-mode Suno AI tracks engineered for dev life.",
  },
};

export default function MusicPage() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-6">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h1 className="text-3xl font-semibold leading-tight sm:text-[2.5rem]">
            Music only devs can relate to.
          </h1>
          <div className="mt-3 space-y-3">
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              I make AI-generated tracks with Suno AI that span comedic storytelling, chill beats for deep work, and futuristic anthems for sprint demos. Queue something playful, or drop into flow and enjoy!
            </p>
          </div>
        </div>
      </div>

      <MusicGallery tracks={musicTracks} reverse/>
    </section>
  );
}
