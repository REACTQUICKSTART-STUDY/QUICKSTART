import pMinDelay from "p-min-delay";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { SongType } from "../../App1";
import Loading from "../../components/Loading";
import LoadingVideo from "../../components/LoadingVideo";
// import YoutubePlayer from "../../components/YoutubePlayer";

type PlayerPropsType = {};

type SongIdParam = {
  id?: string;
};

type ContextType = {
  songs: SongType[];
};

const YoutubePlayer = React.lazy(() =>
  pMinDelay(import("../../components/YoutubePlayer"), 1000)
);

const Player = ({}: PlayerPropsType) => {
  const { id } = useParams<SongIdParam>();
  const navigate = useNavigate();
  const { songs } = useOutletContext<ContextType>();
  const [title, setTitle] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");

  useEffect(() => {
    // 여기 의존성 배열??
    const song = songs.find((song) => song.id === Number(id));
    if (song) {
      setTitle(song.title || "");
      setYoutubeLink(song.youtube_link || "");
    } else {
      navigate("/songs");
    }
  }, []);

  return (
    <div className="modal">
      <div className="box position-relative">
        <div className="heading">
          <span className="title h6 mb-0">&nbsp;&nbsp;&nbsp;{title}</span>
          <Link className="close" to={"/songs"}>
            <h6 className="pointer mb-0">
              <span className="badge bg-secondary">X</span>
            </h6>
            &nbsp;&nbsp;&nbsp;
          </Link>
        </div>
        <div className="player">
          <React.Suspense fallback={<LoadingVideo />}>
            {/* <YouTube
            className="video"
            videoId={youtubeLink}
            opts={{
              playerVars: { autoplay: 1 },
            }}
          /> */}
            <YoutubePlayer youtubeLink={youtubeLink} />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default Player;
