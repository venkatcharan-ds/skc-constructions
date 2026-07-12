import { useEffect, useRef } from "react";

const FADE_MS = 800;
// Purely a fallback if autoplay is blocked or playback stalls — the video
// itself is always left to play through to its own natural end first, in
// full, with no trimming or looping.
const SAFETY_TIMEOUT_MS = 20000;

export default function Loader({ onComplete, src = "/video/loader-intro.mp4" }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let finished = false;
    let safetyTimer;

    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(safetyTimer);
      const root = rootRef.current;
      if (!root) {
        onComplete();
        return;
      }
      root.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      root.style.opacity = "0";
      setTimeout(onComplete, FADE_MS);
    };

    video?.addEventListener("ended", finish);
    video?.play().catch(finish);

    safetyTimer = setTimeout(finish, SAFETY_TIMEOUT_MS);

    return () => {
      video?.removeEventListener("ended", finish);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] overflow-hidden bg-black"
      style={{ willChange: "opacity" }}
      role="status"
      aria-live="polite"
      aria-label="Loading SKC Construction"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 block h-full w-full object-cover object-center"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      />

      {/* Corner-only vignette — center stays fully clear so it never softens
          the footage itself, just grounds the frame edges into the theme. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
