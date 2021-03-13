import React from "react";
import { Link } from "react-router-dom";
import "./../scss/Navbar.scss";

const Navbar = ({
  signupPopUp,
  signinPopUp,
  signout,
  getImages,
  bookacabPopup,
  handlenotifications,
  handleHistory,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className='navbar__container'>
      <div className='navbar'>
        <div>
          {user && user.data.user.role === "rider" ? (
            <button onClick={bookacabPopup} className='btn btn-upload'>
              Book a cab
            </button>
          ) : (
            <button className='btn btn-upload'>cabola</button>
          )}
        </div>
        <div className='navbar__right'>
          {!user ? (
            <div>
              <span onClick={signinPopUp} className='btn btn-signin'>
                signin
              </span>
              <span onClick={signupPopUp} className='btn btn-signup'>
                signup
              </span>
            </div>
          ) : (
            <div>
              <span className='btn btn-signin'>
                username: {user.data.user.firstname}
              </span>
              {user.data.user.role === "driver" && (
                <span onClick={handlenotifications} className='btn btn-signin'>
                  <Link to='/notifications'>rider notifications</Link>
                </span>
              )}
              {user.data.user.role === "rider" && (
                <span onClick={handleHistory} className='btn btn-signin'>
                  <Link to='/history'>history</Link>
                </span>
              )}
              <span onClick={getImages} className='btn btn-signin'>
                <Link to='/profile'>profile</Link>
              </span>
              <span onClick={signout} className='btn btn-signup'>
                logout
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
