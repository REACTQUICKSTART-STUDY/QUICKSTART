import React from "react";
import YouTube from "react-youtube";

type Props = {
  youtubeLink: string;
};

const YoutubePlayer = ({ youtubeLink }: Props) => {
  return (
    <>
      <YouTube
        className="video"
        videoId={youtubeLink}
        opts={{
          playerVars: { autoplay: 1 },
        }}
      />
    </>
  );
};

export default YoutubePlayer;
