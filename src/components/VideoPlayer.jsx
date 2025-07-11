import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ url, startTime = 20, endTime = 130 }) => {
  const videoRef = useRef(null);


  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.pause();
      }
    };

    const handleLoadedMetadata = () => {
      video.currentTime = startTime;
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.play();
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [startTime, endTime]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      controls
       muted
      src={url}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
