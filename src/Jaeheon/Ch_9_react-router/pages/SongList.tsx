import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import { SongType } from "../App1";

type SongListPropsType = {
  songs: SongType[];
};

const SongList = ({ songs }: SongListPropsType) => {
  const pathMatch = useMatch("/songs/:id");
  const param_id: number = Number(pathMatch?.params.id) || -1;

  const list = songs.map((song) => {
    const cn =
      "list-group-item" +
      (song.id === param_id ? " list-group-item-secondary" : "");
    return (
      <li key={song.id} className={cn}>
        <Link
          to={`/songs/${song.id}`}
          style={{ textDecoration: "none", padding: "10px 20px" }}
        >
          {song.title} ({song.album})
          <span className="float-end badge bg-secondary">
            <i className="fa fa-play"></i>
          </span>
        </Link>
      </li>
    );
  });
  return (
    <div>
      <h2 className="mt-4 mb-3">Song List</h2>
      <ul className="list-group">{list}</ul>
      <Outlet context={{ songs: songs }} />
    </div>
  );
};

export default SongList;
