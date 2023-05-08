import React from 'react'
import ReservationCard from "../../components/reservationCard/ReservationCard"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Reservations.scss"
const Reservations = () => {
  return (
    <div>
      <Navbar/>
      <div className="reservationContainer">
        <div className="reservationWrapper">
          <ReservationCard/>
          <ReservationCard/>
          <ReservationCard/>
          <ReservationCard/>
          <ReservationCard/>
          <ReservationCard/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Reservations