import React from 'react'
import "./LogIn.scss"
import { useState, useEffect } from 'react'
import newRequest from '../../utils/newRequest'
import Aleart from "../../components/Aleart/Aleart"
import { useNavigate,   } from "react-router-dom";
import Close from "../../image/right-arrow.png"


const LogInOut = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  //const match = useMatch();

  const SigninForm = async (e) => {
    e.preventDefault()
    try {
      const res = await newRequest.post("/auth/adminSignin", { email, password })
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      navigate("/Home")
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

  return (
    <div className="loginContainer">
      {/* <img src={Close} alt="" className='closeBtn' onClick={closeBtn} /> */}
      <div className='error_position'>
        {error && <Aleart type={"error"} message={error.message} />}
      </div>
      <div className="sectionContainer">
        <h2 className='signinTitle'>Sign In</h2>
        <form className='signinFrom' onSubmit={SigninForm}>
          <div className="logInCol">
          <label htmlFor="emailSignIn">Email</label>
          <input type="email" id="emailSignIn" onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="logInCol">
          <label htmlFor="passwordSignIn">Password</label>
          <input type="password" id="passwordSignIn" onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="LogBtn logInBtn">Sign In</button>
        </form>
      </div>
    </div>

  )
}

export default LogInOut