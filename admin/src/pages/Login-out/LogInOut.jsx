import React from 'react'
import "./LogInOut.scss"
import { useState, useEffect } from 'react'
import newRequest from '../../utils/newRequest'
import { useNavigate } from "react-router-dom";
import Close from "../../image/right-arrow.png"
import FaceBook from "../../image/facebook.png"
import Google from "../../image/search.png"
import Apple from "../../image/apple-black-logo.png"
import { useLocation } from "react-router-dom";
import Alert from "../../components/Aleart/Aleart"


const LogInOut = () => {
  const location = useLocation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isSignIn, setIsSignIn] = useState(location.state?.signup ? false : true);
  const [user, setUser] = useState({})

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
      navigate("/")

   
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
  const navigate = useNavigate()

  const closeBtn = () => {
    navigate("/");
  }
  const forget = () => {
    navigate("/forget")
  }
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
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" onChange={handleChange} required />

                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange} required />

                <label htmlFor="=password">Password</label>
                <input type="password" name="password" onChange={handleChange} required />

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
                <p className="forgetPassword" onClick={forget}>Forget Password?</p>
                <button type="submit" className="LogBtn logInBtn">
                  Sign In
                </button>
              </form>
              <div className="signInBottom">
                <p>Or Continue With</p>
                <div className="signInWays">
                  <img src={Google} onClick={google_auth} alt="" className='signInWayImg' />
                  <img src={FaceBook} onClick={facebook_auth} alt="" className='signInWayImg' />
                  <img src={Apple} alt="" className='signInWayImg' />
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
      </div>
    </div>

  )
}

export default LogInOut