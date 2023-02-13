import React, { useEffect } from "react";

type Props = {
  page: number;
};

const MinjiImage = ({ page }: Props) => {
  return (
    <div>
      <img
        src={`photos/minji${page}.jpg`}
        alt="뉴진스"
        className="img-thumbnail"
        style={{ width: "700px" }}
      />
    </div>
  );
};

export default MinjiImage;
