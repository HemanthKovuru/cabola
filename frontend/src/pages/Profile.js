import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Link to='/'> &#8592;back</Link>
      <div>
        Account Type: {user.data.user.role === "rider" ? "rider" : "driver"}
      </div>
      {user.data.user.role === "driver" && (
        <>
          <div>{user.data.user.availability}</div>
          <div>CoordinateX: {user.data.user.coordinateX}</div>
          <div>CoordinateY: {user.data.user.coordinateY}</div>
          <button>update location</button>
        </>
      )}
    </div>
  );
};

export default Profile;
