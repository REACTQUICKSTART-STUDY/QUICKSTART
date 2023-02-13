import React from "react";
import { MemberType } from "../App1";

type Props = {
  member: MemberType;
};

const MemberImage = ({ member }: Props) => {
  const imgStyle = { width: 150, height: 200 };

  return (
    <>
      <img
        src={member.photo}
        alt={member.name}
        className="img-thumbnail"
        style={imgStyle}
      />
      <br />
      <h6>{member.name}</h6>
      <br />
      <br />
    </>
  );
};

export default MemberImage;
