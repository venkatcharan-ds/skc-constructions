import { useEffect, useRef } from "react";

// The intro film runs a few seconds; this is a floor, not a fixed length —
// if it ends early we loop briefly rather than cut away too fast, and a
// safety timeout guarantees we never get stuck if autoplay is blocked.
const MIN_DISPLAY_MS = 2000;
const SAFETY_TIMEOUT_MS = 4500;

export default function Loader({ onComplete }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const startedAt = performance.now();
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
      root.style.transition = "opacity 0.9s ease-in-out";
      root.style.opacity = "0";
      setTimeout(onComplete, 900);
    };

    const handleEnded = () => {
      const elapsed = performance.now() - startedAt;
      if (elapsed < MIN_DISPLAY_MS && video) {
        video.currentTime = 0;
        video.play().catch(finish);
      } else {
        finish();
      }
    };

    video?.addEventListener("ended", handleEnded);
    video?.play().catch(finish);

    safetyTimer = setTimeout(finish, SAFETY_TIMEOUT_MS);

    return () => {
      video?.removeEventListener("ended", handleEnded);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] bg-black"
      role="status"
      aria-label="Loading SKC Construction"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/loader-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      />
    </div>
  );
}
