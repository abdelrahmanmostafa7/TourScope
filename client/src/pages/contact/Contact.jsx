import React from 'react'
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import Write from"../../image/writing.png"
import Phone from"../../image/phone-call.png"
import Route from"../../image/route.png"
import "./Contact.scss"
const Contact = () => {
  return (
    <div>
      <Navbar/>
      <div className="contactContainer">
        <div className="contactWrapper">
          <div className="contact">
            <h1>Get In Touch</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eveniet saepe, dicta distinctio illum facere dolore perferendis. <br /> Ex labore minima temporibus alias, iusto aspernatur. Modi, vel incidunt. Quis, omnis delectus.</p>
            <div className="way">
              <div className="sec">
                <img src={Route} alt="" className='icon'/>
                <h2>Welcome</h2>
                <p>cairo Ain Shams 15 st</p>
              </div>
              <div className="sec">
                <img src={Phone} alt="" className='icon'/>
                <h2>Call</h2>
                <p>+020 1234 5678 90</p>
              </div>
              <div className="sec">
                <img src={Write} alt="" className='icon'/>
                <h2>Write</h2>
                <p>TourScope@gmail.com</p>
              </div>
            </div>
            <h1>TourScope <br /><span>Is Waiting For You</span></h1>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact