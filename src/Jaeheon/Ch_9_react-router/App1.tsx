import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Player from "./pages/Player";
import SongList from "./pages/SongList";
import SongIndex from "./pages/songs/Index";

export type MemberType = {
  name: string;
  photo: string;
};

export type SongType = {
  id: number;
  title: string;
  album: string;
  youtube_link: string;
};

const App1 = () => {
  const [members, setMembers] = useState<MemberType[]>([
    { name: "해린", photo: "photos/haerin.PNG" },
    { name: "민지", photo: "photos/minji.PNG" },
    { name: "혜인", photo: "photos/hyein.PNG" },
    { name: "다니엘", photo: "photos/danielle.PNG" },
    { name: "하니", photo: "photos/hanni.PNG" },
  ]);

  const [songs, setSongs] = useState<SongType[]>([
    {
      id: 1,
      title: "Hype boy",
      album: "New Jeans",
      youtube_link: "11cta61wi0g",
    },
    {
      id: 2,
      title: "Attention",
      album: "New Jeans",
      youtube_link: "js1CtxSY38I",
    },
    { id: 3, title: "Cookie", album: "New Jeans", youtube_link: "VOmIplFAGeg" },
    { id: 4, title: "Hurt", album: "New Jeans", youtube_link: "tVIXY14aJms" },
    { id: 5, title: "Omg", album: "OMG", youtube_link: "pSUydWEqKwE" },
    { id: 6, title: "Ditto", album: "OMG", youtube_link: "_ZAgIHmHLdc" },
  ]);

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About title={"뉴진스"} />} />
          <Route path="/members" element={<Members members={members} />} />
          <Route path="/songs" element={<SongList songs={songs} />}>
            <Route index element={<SongIndex />} />
            <Route path=":id" element={<Player />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App1;
