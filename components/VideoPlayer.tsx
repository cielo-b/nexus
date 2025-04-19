import React, { useRef, useEffect } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return; // Ensure video is not null before proceeding

    const handleEnded = () => {
      // When the video ends, play it in reverse
      if (video) {
        video.playbackRate = -1;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      // Cleanup: Remove event listener
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video className="w-1/2 z-40 max-lg:w-full" ref={videoRef} loop autoPlay>
      <source src={"/videos/screens.webm"} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
