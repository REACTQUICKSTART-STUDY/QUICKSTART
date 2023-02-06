import pMinDelay from "p-min-delay";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import About from "./pages/About";
// import Home from "./pages/Home";
import Members from "./pages/Members";
import Player from "./pages/songs/Player";
// import SongList from "./pages/SongList";
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

const Home = React.lazy(() => pMinDelay(import("./pages/Home"), 1000));
// const About = React.lazy(() => pMinDelay(import("./pages/About"), 1000));
// const Members = React.lazy(() => pMinDelay(import("./pages/Members"), 1000));
const SongList = React.lazy(() => pMinDelay(import("./pages/SongList"), 1000));
// const SongIndex = React.lazy(() =>
//   pMinDelay(import("./pages/songs/Index"), 1000)
// );
// const Player = React.lazy(() =>
//   pMinDelay(import("./pages/songs/Player"), 1000)
// );
// const NotFound = React.lazy(() =>
//   pMinDelay(import("./components/NotFound"), 1000)
// );

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
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About title={"뉴진스"} />} />
            <Route path="/members" element={<Members members={members} />} />
            <Route path="/songs" element={<SongList songs={songs} />}>
              <Route index element={<SongIndex />} />
              <Route path=":id" element={<Player />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
};

export default App1;
