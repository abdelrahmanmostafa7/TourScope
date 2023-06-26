import React from 'react'
import "./LogInOut.scss"
import { useState, useEffect } from 'react'
import newRequest from '../../utils/newRequest'
import Aleart from "../Aleart/Aleart"
import { useNavigate, useMatch, useSearchParams } from "react-router-dom";
import Close from "../../image/right-arrow.png"
import FaceBook from "../../image/facebook.png"
import Google from "../../image/search.png"
import Apple from "../../image/apple-black-logo.png"
import { useLocation } from "react-router-dom";
import ForgetPassword from '../forgetPassword/ForgetPassword'
import FormInput from './FormInput'


const LogInOut = () => {
  const location = useLocation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isSignIn, setIsSignIn] = useState(location.state?.signup ? false : true);
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  //const match = useMatch();
  const previousRoute = location.state?.from || null

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const SignUpForm = async (e) => {
    e.preventDefault()
    try {
      await newRequest.post("/auth/signup", { ...user })
      setIsSignIn(true)
    }
    catch (err) {
      setError(err.response.data)
    }
  }

  const SigninForm = async (e) => {
    e.preventDefault()
    try {
      const res = await newRequest.post("/auth/signin", { email, password })

      localStorage.setItem("currentUser", JSON.stringify(res.data))
      if (previousRoute && res.data) {
        navigate("/payment")
      } else {
        navigate("/")

      }
    }
    catch (err) {
      setError(err.response.data)
    }
  }
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 3000);
    }

  }, [error])

  const google_auth = () => {
    window.open("http://localhost:8800/api/auth/google", "_self");
    window.close();
  }
  const facebook_auth = () => {
    window.open("http://localhost:8800/api/auth/facebook", "_self");
    window.close();
  }


  const handleSignIn = () => {
    setIsSignIn(true);
  };
  const handleSignUp = () => {
    setIsSignIn(false);
  };

  const closeBtn = () => {
    navigate("/");
  }

  //Forget Password Popup
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };
  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };
  //validation
  const [focused, setFocused] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const inputs = [
    {
      id: 1,
      name: "first_name",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*_-])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },

  ];

  const handleFocus = (e) => {
    setFocused(true);
  };
  const handleFocus1 = (e) => {
    setFocused1(true);
  };
  return (
    <div className="roomsContainer">
      <div className="roomsWrapper">
        <img src={Close} alt="" className='signInImg close' onClick={closeBtn} />
        <div className='error_position'>
          {error && <Aleart type={"error"} message={error.message} />}
        </div>
        <section className="container">
          <main className={isSignIn ? "slide-right" : ""}>
            <section className="form-block" id="signUpForm" onSubmit={SignUpForm} >
              <h2>Create Account</h2>
              <form>
                {/* <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name"
                  onChange={handleChange}
                  required
                  onBlur={handleFocus}
                  pattern='^[A-Za-z]{3,16}$'
                  focused={focused.toString()}
                />
                <span>Username should be 3-16 characters and shouldn't include any special character!</span>

                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name"
                  onChange={handleChange}
                  required
                  onBlur={handleFocus}
                  pattern='^[A-Za-z0-9]{3,16}$'
                  focused1={focused1.toString()}
                />
                <span>Username should be 3-16 characters and shouldn't include any special character!</span>

                <label htmlFor="email">Email</label>
                <input type="email" name="email"
                  onChange={handleChange}
                  required
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <span>It should be a valid email address!</span>

                <label htmlFor="=password">Password</label>
                <input type="password" name="password"
                  onChange={handleChange}
                  required
                  onBlur={handleFocus}
                  pattern='^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
                  focused={focused.toString()}
                  />
                <span>Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span>

              */}
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    onChange={handleChange}
                  />
                ))}
                <button type="submit" className="LogBtn">Sign Up</button>

              </form>
            </section>
            <section className="form-block" id="signInForm">
              <h2>Sign In</h2>

              <form onSubmit={SigninForm}>
                <label htmlFor="emailSignIn">Email</label>
                <input type="email" id="emailSignIn" onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="passwordSignIn">Password</label>
                <input type="password" id="passwordSignIn" onChange={e => setPassword(e.target.value)} required />
                <p className="forgetPassword" onClick={togglePopUp}>Forget Password?</p>
                <button type="submit" className="LogBtn logInBtn">
                  Sign In
                </button>
              </form>
              <div className="signInBottom">
                <p>Or Continue With</p>
                <div className="signInWays">
                  <img src={Google} onClick={google_auth} alt="" className='signInWayImg' />
                  <img src={FaceBook} onClick={facebook_auth} alt="" className='signInWayImg' />
                </div>
              </div>

            </section>
          </main>
          <aside className={isSignIn ? "slide-left" : ""}>
            <section className="login-block">
              <h2>Already a User?</h2>
              <button type="submit" id="login-btn" className="LogBtn" onClick={handleSignIn}>
                Sign In
              </button>
            </section>
            <section className="register-block">
              <h2>New User?</h2>
              <div className="btnSec">
                <button type="submit" id="register-btn" className="LogBtn" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </section>
          </aside>
        </section>
        {
          showPopUp && <div className="popup-background" onClick={closePopUp}>
            <div className="popup-content10">
              <ForgetPassword />
            </div>
          </div>
        }
      </div>
    </div>

  )
}

export default LogInOut