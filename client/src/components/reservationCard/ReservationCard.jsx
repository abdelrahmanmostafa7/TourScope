import React , {useState} from 'react'
import "./ReservationCard.scss"
import Aleart  from '../Aleart/Aleart';
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faStar,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
const ReservationCard = ({item}) => {
  const startDate = new Date(item.check_in_out.in);
  const endDate = new Date(item.check_in_out.out);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

  const formattedstartDate = startDate.toLocaleDateString(undefined, options);
  const formattedendDate = endDate.toLocaleDateString(undefined, options);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const [Error, setError] = useState({
    show: false,
    type: "error",
    message: "error"
  });
  

  const handel_cancel = () => {
    setError((prv) => {
     
    })
  }
  return (
    <div>
       <Aleart type={Error.type} message={Error.message}/> 
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
                <p>{formattedstartDate}</p>
              </div>
              <div className="reservationCol">
                <h3>Check Out</h3>
                <p>{formattedendDate}</p>
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
                <p>{formattedstartDate}</p>
              </div>
              <div className="reservationCol">
                <h3>Payment Method</h3>
                <p>Visa</p>
              </div>
              <div className="reservationCol">
                <h3>price</h3>
                <p>{item.total_price}</p>
              </div>
              <div className="reservationCol">
                <h3>Status</h3>
                <p>{item.status}</p>
              </div>
            </div>
            <button className='btn' onClick={handel_cancel}>Cancel</button>

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