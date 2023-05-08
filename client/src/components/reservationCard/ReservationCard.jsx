import React from 'react'
import "./ReservationCard.scss"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faStar,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
const ReservationCard = () => {
  return (
    <div>
      <div className="reservation">
        <div className="reservationLeft">
          <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" className='reservationImg' />
        </div>
        <div className="reservationRight">
          <div className="reservationSec">
            <h2>Name Of The Hotel</h2>
            <div className="reservationDetails">
              <div className="stars">
                <FontAwesomeIcon icon={faStar} className="iconStar" />
                <FontAwesomeIcon icon={faStar} className="iconStar" />
                <FontAwesomeIcon icon={faStar} className="iconStar" />
                <FontAwesomeIcon icon={faStar} className="iconStar" />
              </div>
              <p>The Address Of The Hotel</p>
            </div>
          </div>
          <hr />
          <div className="reservationSec">
            <h2>Booking Details</h2>
            <div className="reservationDetails">
              <div className="reservationCol">
                <h3>Check In</h3>
                <p>June 3,2023</p>
              </div>
              <div className="reservationCol">
                <h3>Check Out</h3>
                <p>June 9,2023</p>
              </div>
              <div className="reservationCol">
                <h3>Status</h3>
                <p>Pending</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="reservationSec">
            <h2>Payment  Details</h2>
            <div className="reservationDetails">
              <div className="reservationCol">
                <h3>Date</h3>
                <p>June 3,2023</p>
              </div>
              <div className="reservationCol">
                <h3>Payment Method</h3>
                <p>Pay On Arrival</p>
              </div>
              <div className="reservationCol">
                <h3>price</h3>
                <p>35$</p>
              </div>
              <div className="reservationCol">
                <h3>Status</h3>
                <p>Pending</p>
              </div>
            </div>
          </div> 
            <hr />
          <div className="reservationSec">
            <h2>Pending</h2>
            <div className="reservationDetails">
              <p>3:25:33</p>
              <button className='reservationBtn'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationCard