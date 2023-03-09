import React from "react";

interface VolumeBarProps {
  video: HTMLVideoElement;
  styles: {
    progress: React.CSSProperties,
    progressVol: React.CSSProperties,
  };
}

function VolumeBar({ video, styles }: VolumeBarProps) {
  const volumeChangeHandler = (
    e: React.MouseEvent<HTMLProgressElement>,
    video: HTMLVideoElement
  ) => {
    const percent = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
    video.volume = percent;
  };

  return (
    <progress
      onClick={(e) => volumeChangeHandler(e, video)}
      min="0"
      max="1"
      value={video.volume}
      style={{
        ...styles.progress,
        ...styles.progressVol,
      }}
    ></progress>
  );
}

export default VolumeBar;
