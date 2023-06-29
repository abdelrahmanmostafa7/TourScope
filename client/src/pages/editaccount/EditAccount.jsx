import React from 'react'
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import "./EditAccount.scss"
import { useState , useEffect } from 'react';
import useFetch from './../../hook/useFetch';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest'
import { useNavigate } from "react-router-dom";
import Loading from './../../components/Loading/Loading';
import userImg from "../../image/user.png"
import Aleart from "../../components/Aleart/Aleart"



const EditAccount = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const id = currentUser._id;
  const { data, loading } = useFetch(`/user/find/${id}`);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);


  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 3000);
    }

  }, [error])

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z ]+$/;
    if (regex.test(value)) {
      setUser((prev) => {
        return { ...prev, [e.target.name]: value };
      });
    }else{
      setError("enter valid fristname")
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(value)) {
      setUser((prev) => {
        return { ...prev, [e.target.name]: value };
      });
    }else{
      setError("enter vaild email")
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // remove non-numeric characters
    setUser((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.put(`/user/update/${id}`, { ...user });
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/personalDetails");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? <Loading /> :
        <div className="editAccountContainer">
          <div className="editAccountWrapper" >
            <div className='error_position'>
              {error && <Aleart type={"error"} message={error} />}
            </div>
            <form className='editAccount' id='handleSubmit' onSubmit={handleSubmit}  >
              <div className="editImgSec">
                <img src={userImg} alt="" className="editAccountImg" />
                <p className='editAccountParagraph'>Update your information and find out how it's used.</p>
              </div>
              <hr />
              <div className="editAccountSec">
                <div className="editAccountLeft">
                  <h2>Name</h2>
                </div>
                <div className="editAccountCenter">
                  <div className="editAccountCol">
                    <label for="first_name" className='editAccountLabel'>First Name</label>
                    <input type="text" className='editAccountInput' onChange={handleNameChange} name='first_name' placeholder={data.first_name} pattern="[A-Za-z ]+" />
                  </div>
                  <div class="editAccountCol">
                    <label for="last_name" className='editAccountLabel'>Last Name</label>
                    <input type="text" className='editAccountInput' onChange={handleNameChange} name='last_name' placeholder={data.last_name} pattern="[A-Za-z ]+" />
                  </div>
                </div>
                <div className="editAccountRight"></div>
              </div>
              <hr />
              <div className="editAccountSec">
                <div className="editAccountLeft">
                  <h2>Email</h2>
                </div>
                <div className="editAccountCenter">
                  <div className="editAccountCol">
                    <label for="email" className='editAccountLabel'>Email Address</label>
                    <input type="email" name="email" className="editAccountInput editAccountLong" onChange={handleEmailChange} placeholder={data.email} />
                  </div>
                </div>
                <div className="editAccountRight"></div>
              </div>
              <hr />
              <div className="editAccountSec">
                <div className="editAccountLeft">
                  <h2>Password</h2>
                </div>
                <div className="editAccountCenter">
                  <div className="editAccountCol">
                    <div className="editAccountCol">
                      <label for="password" className='editAccountLabel'>Current Password</label>
                      <input type="password" name='password' className='editAccountInput' onChange={handleChange} />
                    </div>
                    <div className="editAccountCenter">
                      <div className="editAccountCol">
                        <label for="new" className='editAccountLabel'>New Password</label>
                        <input type="password" className='editAccountInput' />
                      </div>
                      <div className="editAccountCol">
                        <label for="new" className='editAccountLabel'>Confirm New Password</label>
                        <input type="password" className='editAccountInput' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="editAccountRight"></div>
              </div>
              <hr />
              <div className="editAccountSec">
                <div className="editAccountLeft">
                  <h2>Phone <br />Number</h2>
                </div>
                <div className="editAccountCenter">
                  <div className="editAccountCol">
                    <label for="phone_number" className='editAccountLabel'>Phone Number</label>
                    <input type="text" name='phone_number' className='editAccountInput' onChange={handlePhoneChange} placeholder={data.phone_number} />
                    <p>Pressing 'Send ‘ will text a 6-digit code to your phone.<br />
                      You'll need to enter this at the next step.</p>
                  </div>
                </div>
                <div className="editAccountRight"></div>
              </div>
              <hr />
              <div className="editAccountSec">
                <div className="editAccountLeft">
                  <h2>Date Of Birth</h2>
                </div>
                <div className="editAccountCenter">
                  <div className="editAccountCol">
                    <label for="date_of_birth" className='editAccountLabel'>Date Of Birth</label>
                    <input type="text" name="date_of_birth" className='editAccountInput' onChange={handleChange} />
                  </div>
                </div>
                <div className="editAccountRight"></div>
              </div>
              <hr />
              <div className="editAccountSec">
                <div className="editAccountLeft">
                  <h2>Gender</h2>
                </div>
                <div className="editAccountCenter">
                  <div className="editAccountCol">
                    <label for="gender" className='editAccountLabel'>Gender</label>
                    <select name="gender" id="gender" className='editAccountSelect' onChange={handleChange}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="editAccountRight"></div>
              </div>
              <div className="editAccountBottom">
                <Link to='/personalDetails'>
                  <button type="submit" className="editAccountBtn" onClick={handleSubmit}>Submit</button>
                  <button className='editAccountButton'>Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>}
      <Footer />
    </div>
  )
}

export default EditAccount