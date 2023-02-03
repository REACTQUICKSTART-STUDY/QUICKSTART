import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type AboutPropsType = {
  title: string;
};

const About = ({ title }: AboutPropsType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const maxPage = 9;
  const navigate = useNavigate();

  const goPrev = () => {
    if (page === 1) navigate(location.pathname + "?page=9");
    else navigate(location.pathname + "?page=" + (page - 1));
  };

  const goNext = () => {
    if (page === maxPage) navigate(location.pathname + "?page=1");
    else navigate(location.pathname + "?page=" + (page + 1));
  };

  useEffect(() => {
    const strPage = searchParams.get("page");
    if (Number(strPage) < 1 || Number(strPage) > maxPage) {
      navigate("/about");
    } else {
      setPage(Number(strPage) || 1);
    }
  }, [searchParams]);

  return (
    <div className="card card-body">
      <h2>About {title} 민지 </h2>
      <div>
        <img
          src={`photos/minji${page}.jpg`}
          alt="뉴진스"
          className="img-thumbnail"
          style={{ width: "700px" }}
        />
      </div>
      <div>
        <div className="m-2">
          현재 페이지 : {page} / {maxPage}
        </div>
        <button className="btn btn-secondary m-1" onClick={goPrev}>
          prev
        </button>
        <button className="btn btn-secondary m-1" onClick={goNext}>
          next
        </button>
      </div>
    </div>
  );
};

export default About;
