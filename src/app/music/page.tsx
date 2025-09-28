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
    description: "Playful to focus-mode Suno AI tracks engineered for dev life.",
  },
};

export default function MusicPage() {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]">
              Music for devs, dreamers, and delightfully weird demos.
            </h1>
          </div>
                      <div className="rounded-3xl border border-border bg-muted/30 p-8 backdrop-blur">
            <div className="space-y-6">
                          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              I make AI-generated tracks with Suno that span comedic storytelling, chill beats for deep work, and futuristic anthems for sprint demos. Queue something playful, drop into flow, or find the perfect soundtrack for your next launch video.
            </p>
              <a
                href="mailto:ping@fatmaali.dev?subject=Suno%20AI%20Music"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:translate-y-[-1px]"
              >
                Request a custom track →
              </a>
            </div>
          </div>
        </div>
        
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <MusicGallery tracks={musicTracks} />
      </section>
    </>
  );
}
