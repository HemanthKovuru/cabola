import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  const notification = JSON.parse(localStorage.getItem("notification"));

  const acceptRide = async () => {
    try {
      localStorage.removeItem("driver");
      const ride = await axios.patch(`/api/v1/rides/${notification._id}`);
      console.log(ride);
      if (ride.data.status === "success") {
        window.location.replace("/");
        localStorage.setItem("notification", JSON.stringify(ride.data.data));
      }
    } catch (err) {
      alert(err);
      console.log(err.response);
    }
  };

  const cancelRide = async () => {
    try {
      localStorage.removeItem("driver");
      const ride = await axios.delete("/api/v1/rides");
      console.log(ride);
      if (ride.data.status === "success") {
        window.location.replace("/");
        localStorage.removeItem("notification");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <div>
      <Link to='/'> &#8592;back</Link>
      {notification ? (
        <div>
          <div>Name: {notification.user.firstname}</div>
          <div>Phone: {notification.user.email}</div>
          <button disabled={notification.accepted} onClick={acceptRide}>
            {notification.accepted ? "accepted" : "accept"}
          </button>
          <button onClick={cancelRide}>cancel</button>
        </div>
      ) : (
        <div>No notifications</div>
      )}
    </div>
  );
};

export default Notification;
