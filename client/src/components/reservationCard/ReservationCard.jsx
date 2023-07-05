import React, { useState } from 'react'
import "./ReservationCard.scss"
import newRequest from '../../utils/newRequest';

const ReservationCard = ({ item }) => {
  const startDate = new Date(item.check_in_out.in);
  const endDate = new Date(item.check_in_out.out);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

  // Subtract one day from the start and end dates
  const adjustedStartDate = new Date(startDate);
  adjustedStartDate.setDate(startDate.getDate() - 1);
  
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setDate(endDate.getDate() - 1);
  
  // Format the adjusted dates
  const formattedStartDate = adjustedStartDate.toLocaleDateString(undefined, options);
  const formattedEndDate = adjustedEndDate.toLocaleDateString(undefined, options);
  
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const user_id = currentUser ? currentUser._id : null;



  const handel_cancel = async () => {
    try {
      await newRequest.put(`/reservation/my_reservation/${item._id}`,{user_id})

      window.location.reload();

        window.scrollTo(0, 0);

      }
    
    catch (err) {
      //setError(err.response.data)
      console.log(err)
      // setTimeout(() => {
      //    navigate(`/logInOut`)

      // }, 3000);

    }
  }
  return (
    <div>
      <div className="reservation">
        <div className="reservationLeft">
          <img src={item.hotel_id.images} alt="" className='reservationImg' />
        </div>
        <div className="reservationRight">
          <div className="reservationSec">
            <h2>{item.hotel_id.name}</h2>
            <div className="reservationDetails">
              <div className="stars">
                <span className='favCardRating'> {item.hotel_id.rating}⭐</span>

              </div>
              <p style={{ fontSize: "13px", display: "flex", flexDirection: "column", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{item.hotel_id.address}</p>
            </div>
          </div>
          <hr />
          <div className="reservationSec">
            <h2>Booking Details</h2>
            <div className="reservationDetails">
              <div className="reservationCol">
                <h3>Check In</h3>
                <p>{formattedStartDate}</p>
              </div>
              <div className="reservationCol">
                <h3>Check Out</h3>
                <p>{formattedEndDate}</p>
              </div>
              <div className="reservationCol">
              <h3>Stays</h3>
              {diffDays}xNight
              </div>
            </div>
          </div>
          <hr />
          <div className="reservationSec">
            <h2>Payment  Details</h2>
            <div className="reservationDetails">
              <div className="reservationCol">
                <h3>Rooms</h3>
                <p>x{item.guests.number_rooms}</p>
              </div>
              <div className="reservationCol">
                <h3>Payment Method</h3>
                <p>Visa</p>
              </div>
              <div className="reservationCol">
                <h3>Total price</h3>
                <p>{item.total_price}</p>
              </div>
              <div className="reservationCol">
                <h3>Status</h3>
                <p>{item.status}</p>
              </div>
            </div>
            { item.status == "pending" &&
              <div className='location'>
                <button className='btn' onClick={handel_cancel}>Cancel</button>
              </div>
            }


          </div>
          {/* <hr />
          <div className="reservationSec">
            <h2>Pending</h2>
            <div className="reservationDetails">
              <p>3:25:33</p>
              <button className='reservationBtn'>Cancel</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ReservationCard