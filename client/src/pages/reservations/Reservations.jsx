import React from 'react'
import ReservationCard from "../../components/reservationCard/ReservationCard"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import useFetch from '../../hook/useFetch';
import "./Reservations.scss"
const Reservations = () => {
  const id = location.pathname.split("/")[2]
  console.log(id)
  const { data, loading } = useFetch(`/reservation/my_reservation/${id}`);
  console.log(data)
  return (
    <div>
      <Navbar />
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
      </div>
      <Footer />
    </div>
  )
}

export default Reservations