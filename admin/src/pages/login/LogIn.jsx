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

  const closeBtn = () => {
    navigate("/");
  }


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
      pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
    },

  ];

  return (
    <div className="loginContainer">
      <img src={Close} alt="" className='closeBtn' onClick={closeBtn} />
      <div className='error_position'>
        {error && <Aleart type={"error"} message={error.message} />}
      </div>
      <div className="sectionContainer">
        <h2 className='signinTitle'>Sign In</h2>
        <form className='signinFrom' onSubmit={SigninForm}>
          <label htmlFor="emailSignIn">Email</label>
          <input type="email" id="emailSignIn" onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="passwordSignIn">Password</label>
          <input type="password" id="passwordSignIn" onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="LogBtn logInBtn">Sign In</button>
        </form>
      </div>
    </div>

  )
}

export default LogInOut