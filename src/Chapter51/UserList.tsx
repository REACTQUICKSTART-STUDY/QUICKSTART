import React from "react";

type Props = {
  users: Array<string>;
};

const UserList = (props: Props) => {
  return (
    <ul>
      {props.users.map((userId) => (
        <li key={userId}>{userId}</li>
      ))}
    </ul>
  );
};

export default UserList;
