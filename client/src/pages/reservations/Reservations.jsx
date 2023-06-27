import React from 'react'
import ReservationCard from "../../components/reservationCard/ReservationCard"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import useFetch from '../../hook/useFetch';
import "./Reservations.scss"
const Reservations = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const id = currentUser._id
  const { data, loading } = useFetch(`/reservation/my_reservation/${id}`);
  return (
    <div>
      <Navbar />
      {loading ? "loading" : 
      <div className="reservationContainer">
        <div className="reservationWrapper">
          {!loading && data.length === 0 && (
            <h1 className="noHotelResult">No results found,
              <br />
              There is no Hotel in your City,
              <br />
              Try  to search another city</h1>
          )}
          {data.map(item =>
            <ReservationCard item={item} key={item._id} />
          )}
        </div>
      </div>}
      <Footer />
    </div>
  )
}

export default Reservations