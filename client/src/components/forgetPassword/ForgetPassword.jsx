import React from 'react'
import "./ForgetPassword.scss"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import newRequest from '../../utils/newRequest'
import Aleart from '../Aleart/Aleart'

const ForgetPassword = ({ closePopUp }) => {
  const navigate = useNavigate()
  const [email , setEmail] = useState("")
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [flash, setFlash] = useState("");
  
  const signIn = () =>{
    navigate("/signIn");
  }
  const send = async ()=>{
    try {
    const res = await newRequest.post("/auth/forgetpassword" , {email})
    setShowAlert(true);
    setMessage(res.data);
    setFlash("success");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  } catch (err) {
    setShowAlert(true);
    setMessage(err.response.data);
    setFlash("error");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }


  }
  return (
    <div>
        { showAlert && <Aleart Type={flash} Message={message} state={true}/> }

      <div className="forgetContainer">
        <h1>Reset Password</h1>
        <p>Enter your email and we’ll send you instructions on how to reset your password.</p>
        <div className='forgetCol'>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button onClick={send}>Send</button>
        <p>Back To <span onClick={closePopUp}>Sign In</span></p>
      </div>
    </div>
  )
}

export default ForgetPassword