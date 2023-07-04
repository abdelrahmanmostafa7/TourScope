// import React from 'react'
import React, { useState } from 'react';
import Navbar from '../../components/navBar/Navbar';
import Footer from '../../components/footer/Footer';
import "./SMTPMessage.scss"
const SMTPMessage = () => {
  return (
    <div>
      <Navbar />
      <div className="roomContainer">
        <div className="roomWrapper">
          <div className="message">
            <h1>Hilton Hotel</h1>
            <div className="messageTop">
              <div className="messageLeft">
                <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='messageImg' />
              </div>
              <div className="messageRight">
                <h2>Stay Date</h2>
                <p>Jul 25,2023 - Jul 29,2023</p>
                <p>Total Price 5000 EGP</p>
              </div>
            </div>
            <div className="messageBottom">
              <h2>Stay OverView</h2>

              <p>Hilton Hotel</p>
              <p>Checkin : Jul 25,2023 12pm</p>
              <p>Checkout : Jul 29,2023 3pm</p>              
              <p>Double Room</p>
              <p>For 2 people</p>


            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SMTPMessage