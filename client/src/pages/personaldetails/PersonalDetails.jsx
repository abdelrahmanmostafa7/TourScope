import React from 'react'
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import "./PersonalDetails.scss"
import user from "../../image/user.png"
import { useNavigate } from "react-router-dom";
import useFetch from './../../hook/useFetch';
import Loading from './../../components/Loading/Loading';

const PersonalDetails = () => {
  const navigate = useNavigate()
  const editBtn = () => {
    navigate("/editaccount")
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const id = currentUser._id
  const { data, loading } = useFetch(`/user/find/${id}`);

  
  return (
    <div>
      <Navbar />
      {loading ? <Loading /> :
        <div className="personalDetailsContainer">
          <div className="personalDetailsWrapper">
            <div className="personalDetails">
              <div className="personalDetailsImgSec">
                <img src={user}
                  alt=""
                  className='personalDetailsImg' />
                <span>Update your information and find out how it's used.</span>
              </div>
              <hr />
              <div className="personalDetailsSec">
                <h2>Name</h2>
                <p>{data.first_name} {data.last_name}</p>
                <button onClick={editBtn}>Edit</button>
              </div>
              <hr />
              <div className="personalDetailsSec">
                <h2>Email</h2>
                <p>{data.email}</p>
                <button onClick={editBtn}>Edit</button>
              </div>
              <hr />
              <div className="personalDetailsSec">
                <h2>Phone Number</h2>
                {/* <p>{data.phone_number === null ?  "add phone number":data.phone_number}</p> */}
                {/* <p>{data.phone_number ? data.phone_number : "add phone number"}</p> */}
                <p>{data.phone_number || data.phone_number === null ? "add phone number" : data.phone_number}</p>
                <button onClick={editBtn}>Edit</button>
              </div>
              <hr />
              <div className="personalDetailsSec">
                <h2>Password</h2>
                <p>Reset your password regularly to keep your account secure</p>
                <button onClick={editBtn}>Edit</button>
              </div>
              <hr />
              <div className="personalDetailsSec">
                <h2>Date of
                  Birth</h2>
                <p>{data.date_of_birth || "Add Date Of Birth"}</p>
                <button onClick={editBtn}>Edit</button>
              </div>
              <hr />
              <div className="personalDetailsSec">
                <h2>Gender</h2>
                <p>{data.gender || "Add Gender"}</p>
                <button onClick={editBtn}>Edit</button>
              </div>
            </div>
          </div>
        </div>}
      <Footer />
    </div>
  )
}

export default PersonalDetails