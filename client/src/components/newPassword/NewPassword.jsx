import React from 'react'
import "./newPassword.scss"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import newRequest from '../../utils/newRequest'
import Aleart from '../Aleart/Aleart'
import { useEffect } from 'react'

const NewPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [flash, setFlash] = useState("");

  const signIn = () => {
    navigate("/signIn");
  }
  const token = window.location.href.split("/").pop();
  const save = async () => {
    if (password === confirmPassword) {
      try {
        const res = await newRequest.post("/auth/resetpassword", { password, token })
        setShowAlert(true);
        setMessage(res.data);
        setFlash("success");
        setTimeout(() => {
          setShowAlert(false);
          navigate("/logInOut");
        }, 3000);


      }
      catch (err) {
       setError(err.response.data);
      }
    }
    else {
      setError("Password doesn't match")
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
    <div>
      {showAlert && <Aleart Type={flash} Message={message} state={true} />}
      <div className="newPasswordContainer">
        <h1>New Password</h1>
        <div className="newPasswordCol">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="newPasswordCol">
          <label htmlFor="password">Confirm New Password</label>
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button className='newPasswordBtn' onClick={save}>Save</button>
        {error && <p className="error">{error}</p>}
        <p>Know your password? <span onClick={signIn}>Sign In</span></p>
      </div>
    </div>
  )
}

export default NewPassword