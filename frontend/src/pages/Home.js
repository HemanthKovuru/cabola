import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import "./../scss/Home.scss";
import axios from "axios";

const Home = () => {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);

  // for login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for signup state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [spasswprd, ssetPasswprd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coord, setCoord] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [role, setRole] = useState();
  const [cab, setCab] = useState();
  const [reqRide, setReqRide] = useState(false);
  const [notification, setNotification] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const driver = JSON.parse(localStorage.getItem("driver"));

  // signup popup box
  const signupPopUp = () => {
    setSignup(!signup);
  };

  // signin popup box
  const signinPopUp = () => {
    setSignin(!signin);
  };

  // signup
  const handleSignup = async (evt) => {
    evt.preventDefault();
    try {
      let data = await axios.post(
        "http://localhost:4000/api/v1/users/signup",
        {
          firstname,
          lastname,
          email: emailAddress,
          password: spasswprd,
          confirmPassword,
          coordinateX: x,
          coordinateY: y,
          role,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("user", JSON.stringify(data.data));
      if (data.data.status === "success") {
        window.location.replace("/");
      }
      alert("signup successful..!");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response);
    }
  };

  //  signin
  const handleSignin = async (evt) => {
    evt.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/users/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));
      if (data.status === "success") {
        window.location.replace("/");
      }
      alert("signin successful..!");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response);
    }
  };

  // signout
  const handleSignOut = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/users/signout"
      );
      console.log(data);

      if (data.status === "success") {
        localStorage.removeItem("user");
        alert(data.message);
        cancelRide();
        window.location.reload();
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  // bookacab
  const bookacabPopup = () => {
    setCab(!cab);
  };

  // findcabs
  const creaRide = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/rides", {
        userId: user.data.user._id,
        driverId: driver.id,
      });
      if (res.data.status === "success") {
        const btn = document.querySelector(".btnd");
        btn.disabled = true;
      }
    } catch (err) {
      alert(err);
      console.log(err.response);
    }
  };
  const findCab = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("please login to continue");
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/rides/findride",
        {
          coordinateX: 3,
          coordinateY: 8,
        }
      );
      localStorage.setItem("driver", JSON.stringify(data.driver));
      // creaRide(user.data.user.id, data.driver.id);

      if (data.status === "success") {
        alert("finding a cab near your coordinates");
        window.location.replace("/");
        bookacabPopup();
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  // displayCoordinates
  const handleDriver = (e) => {
    setCoord(true);
    setRole(e.target.value);
  };

  const handleRider = (e) => {
    setCoord(false);
    setRole(e.target.value);
  };

  const cancelRide = async () => {
    try {
      localStorage.removeItem("driver");
      const ride = await axios.delete("http://localhost:4000/api/v1/rides");
      console.log(ride);
      if (ride.data.status === "success") {
        window.location.replace("/");
        localStorage.removeItem("driver");
        document.querySelector(".btnd").getAttribute("disabled");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  // handlenotifications
  const handlenotifications = async () => {
    try {
      const notification = await axios.get(
        `http://localhost:4000/api/v1/rides/${user.data.user._id}`
      );
      console.log(notification);
      if (notification.data.status === "success") {
        localStorage.setItem(
          "notification",
          JSON.stringify(notification.data.data)
        );
      }
    } catch (err) {
      alert(err);
      console.log(err.response);
    }
  };

  // handleHistory
  const handleHistory = async () => {
    try {
      const history = await axios.get(
        `http://localhost:4000/api/v1/rides/history/${user.data.user._id}`
      );
      if (history.data.status === "success") {
        console.log(history);
        localStorage.setItem("history", JSON.stringify(history.data.data));
      }
    } catch (err) {
      alert(err);
      console.log(err.response);
    }
  };

  return (
    <div>
      <Navbar
        signinPopUp={signinPopUp}
        signupPopUp={signupPopUp}
        signout={handleSignOut}
        bookacabPopup={bookacabPopup}
        handlenotifications={handlenotifications}
        handleHistory={handleHistory}
      />

      {driver && (
        <div>
          <div>name: {driver.fisrtname}</div>
          <div>Phone: {driver.email}</div>
          <button disabled={false} className='btnd' onClick={creaRide}>
            request a ride
          </button>
          <button onClick={cancelRide}>cancel</button>
        </div>
      )}

      {cab && (
        <div className='background-box'>
          <div className='signin-box'>
            <span onClick={bookacabPopup} className='cross'>
              &#10005;
            </span>
            <div className='step1'>
              <h2 className='heading__secondary'>Enter Location</h2>

              <form onSubmit={findCab} className='form__signup'>
                <input
                  onChange={(evt) => setEmail(evt.target.value)}
                  className='form__input custom__input'
                  type='number'
                  placeholder='Enter x-coordinate'
                  required
                />
                <input
                  onChange={(evt) => setPassword(evt.target.value)}
                  className='form__input custom__input'
                  type='number'
                  placeholder='Enter y-coordinate'
                  required
                />
                <button type='submit' className='btn btn-submit custom__input'>
                  Find cabs
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {signup && (
        <div className='background-box'>
          <div className='signup-box'>
            <span onClick={signupPopUp} className='cross'>
              &#10005;
            </span>
            <div className='step1'>
              <h2 className='heading__secondary'>Sign Up</h2>
              {/* <div className='heading__sub'>It's quick and easy</div> */}

              <form onSubmit={handleSignup} className='form__signup'>
                <input
                  onChange={(evt) => setFirstname(evt.target.value)}
                  className='form__input'
                  type='text'
                  placeholder='First Name'
                  required
                />
                <input
                  onChange={(evt) => setLastname(evt.target.value)}
                  className='form__input'
                  type='text'
                  placeholder='Last Name'
                  required
                />
                <input
                  onChange={(evt) => setEmailAddress(evt.target.value)}
                  className='form__input custom__input'
                  type='email'
                  placeholder='Email'
                  required
                />
                <input
                  onChange={(evt) => ssetPasswprd(evt.target.value)}
                  className='form__input custom__input'
                  type='password'
                  placeholder='Password'
                  required
                />
                <input
                  onChange={(evt) => setConfirmPassword(evt.target.value)}
                  className='form__input custom__input'
                  type='password'
                  placeholder='Confirm Password'
                  required
                />
                <div className='radio-btn'>
                  <input
                    type='radio'
                    name='role'
                    id='rider'
                    value='rider'
                    onClick={handleRider}
                  />
                  <label htmlFor='rider'>Rider</label>
                </div>
                <div className='radio-btn'>
                  <input
                    type='radio'
                    name='role'
                    id='driver'
                    value='driver'
                    onClick={handleDriver}
                  />
                  <label htmlFor='driver'>Driver</label>
                  {coord && (
                    <>
                      <input
                        onChange={(evt) => setX(evt.target.value)}
                        className='form__input custom__input radio'
                        type='number'
                        placeholder='Enter x-coordinate'
                        required
                      />
                      <input
                        onChange={(evt) => setY(evt.target.value)}
                        className='form__input custom__input radio'
                        type='number'
                        placeholder='Enter y-coordinate'
                        required
                      />{" "}
                    </>
                  )}
                </div>
                <button type='submit' className='btn btn-submit custom__input'>
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* end of sign up */}

      {signin && (
        <div className='background-box'>
          <div className='signin-box'>
            <span onClick={signinPopUp} className='cross'>
              &#10005;
            </span>
            <div className='step1'>
              <h2 className='heading__secondary'>Sign In</h2>

              <form onSubmit={handleSignin} className='form__signup'>
                <input
                  onChange={(evt) => setEmail(evt.target.value)}
                  className='form__input custom__input'
                  type='text'
                  placeholder='Email'
                  required
                />
                <input
                  onChange={(evt) => setPassword(evt.target.value)}
                  className='form__input custom__input'
                  type='password'
                  placeholder='Password'
                  required
                />
                <button type='submit' className='btn btn-submit custom__input'>
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
