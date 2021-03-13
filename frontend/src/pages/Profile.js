import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cab, setCab] = useState(false);

  const updateLocation = async (e) => {
    e.preventDefault();
    try {
      setCab(true);
      const { data } = await axios.patch(
        `http://localhost:4000/api/v1/users/updatelocation/${user.data.user._id}`,
        {
          x,
          y,
        }
      );
      if (data.status === "success") {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        // window.location.replace("/");
        setCab(false);
        alert("location updated!");
      }
    } catch (err) {
      alert(err);
      console.log(err.response);
    }
  };

  return (
    <div>
      <Link to='/'> &#8592;back</Link>
      <div>
        Account Type: {user.data.user.role === "rider" ? "rider" : "driver"}
      </div>
      {user.data.user.role === "driver" && (
        <>
          <div>
            status: {user.data.user.availability ? "online" : "offline"}
          </div>
          <div>CoordinateX: {user.data.user.coordinateX}</div>
          <div>CoordinateY: {user.data.user.coordinateY}</div>
          <button onClick={() => setCab(true)}>update location</button>
        </>
      )}

      {cab && (
        <div className='background-box'>
          <div className='signin-box'>
            <span onClick={() => setCab(false)} className='cross'>
              &#10005;
            </span>
            <div className='step1'>
              <h2 className='heading__secondary'>Enter Location</h2>

              <form onSubmit={updateLocation} className='form__signup'>
                <input
                  onChange={(evt) => setX(evt.target.value)}
                  className='form__input custom__input'
                  type='number'
                  placeholder='Enter x-coordinate'
                  required
                />
                <input
                  onChange={(evt) => setY(evt.target.value)}
                  className='form__input custom__input'
                  type='number'
                  placeholder='Enter y-coordinate'
                  required
                />
                <button
                  onClick={updateLocation}
                  type='submit'
                  className='btn btn-submit custom__input'>
                  Update Location
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
