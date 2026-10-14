"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";

const POSTER = "/hero/hero-snowfall-poster.jpg";

/**
 * Only the two-column hero plays the footage, and only with motion allowed. Stacked layouts would show a thin,
 * heavily upscaled slice of it behind the copy, so phones and tablets skip the download and keep the poster.
 */
const PLAYBACK_MEDIA = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

/** The hero's decorative snowfall loop. Its poster (the first frame) stands in wherever the video doesn't play. */
export function HeroVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The poster is the hero's largest image and so its LCP element on every screen: fetch it with the page.
  preload(POSTER, { as: "image", fetchPriority: "high" });

  // Browsers only match <source media> when the video loads. Reload when the answer changes, so turning on
  // reduced motion (or narrowing the window) stops playback and brings back the poster, and the reverse starts it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const query = window.matchMedia(PLAYBACK_MEDIA);
    const reload = () => video.load();
    query.addEventListener("change", reload);
    return () => query.removeEventListener("change", reload);
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={POSTER}
      disablePictureInPicture
      disableRemotePlayback
      className={className}
    >
      <source src="/hero/hero-snowfall.webm" type='video/webm; codecs="vp9"' media={PLAYBACK_MEDIA} />
      <source src="/hero/hero-snowfall.mp4" type='video/mp4; codecs="avc1.64001E"' media={PLAYBACK_MEDIA} />
    </video>
  );
}
