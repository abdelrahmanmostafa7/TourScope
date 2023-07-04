import React, { useEffect } from 'react'
import "./Payment.scss"
import newRequest from '../../utils/newRequest';
import useFetch from './../../hook/useFetch';
import Navbar from './../../components/navBar/Navbar';
import Visa from "../../image/visa.png"
import MasterCard from "../../image/master-card.png"
import DefaultMaster from "../../image/credit-card (2).png"
import { useState } from 'react';
import Footer from './../../components/footer/Footer';
import { useNavigate, useLocation, useOutlet } from 'react-router-dom';
import Aleart from '../../components/Aleart/Aleart';
import ConfirmLoader from './../../components/confirm/ConfirmLoader';

const Payment = () => {
  const location = useLocation()
  const room = location.state.room;
  const reservation_data = JSON.parse(localStorage.getItem("reservation_details"));
  const selected_hotel = JSON.parse(localStorage.getItem("selected_hotel"));
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const startDate = new Date(reservation_data.date[0].startDate);
  const endDate = new Date(reservation_data.date[0].endDate);
  const formattedstartDate = startDate.toLocaleDateString(undefined, options);
  const formattedendDate = endDate.toLocaleDateString(undefined, options);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);


  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setPhoneNumber('');
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  
  const getCountryPhoneCode = () => {
    const selectedCountryData = countries.find((country) => country.cca2 === selectedCountry);
    if (selectedCountryData && selectedCountryData.callingCodes && selectedCountryData.callingCodes.length > 0) {
      return selectedCountryData.callingCodes[0];
    }
    return '';
  };

  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const id = currentUser ? currentUser._id : null;
  const { data, loading } = useFetch(`/user/find/${id}`);
  const [Error, setError] = useState();
  const [toggle, set_toggle] = useState();
 
  const [cardNumber, setCardNumber] = useState('');
  const [isActive, setIsActive] = useState(false)
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };
  const handleActive = () => {
    setIsActive(true);
  }

  const [showPopUp, setShowPopUp] = useState(false);
  const reservationDetails = {
    roomoptions:reservation_data.options
    ,roomId:room._id,
    date:reservation_data.date,
    deal:room.deal,
    user_id:id
  }
  const togglePopUp = async() => {
    try {
     const data = await newRequest.post("/reservation/make_reservation", reservationDetails );
    
    if (data){
      setShowPopUp(true);
      set_toggle("success");


      setTimeout(() => {
        // localStorage.removeItem("selected_hotel_rooms")
        // localStorage.removeItem("selected_hotel")
        // localStorage.removeItem("reservation_details")

        navigate(`/reservations`)

      if (data.data) {
        setShowPopUp(true);
        setTimeout(() => {
          navigate(`/reservations`)

        }, 3000);
      }
    }
    catch (err) {
      setError(err.response.data.message)
      setShowPopUp(true);
      set_toggle("error");
      setTimeout(() => {
        // localStorage.removeItem("selected_hotel_rooms")
        // localStorage.removeItem("selected_hotel")
        // localStorage.removeItem("reservation_details")

        // navigate(`/`)

      }, 3000);
      
    }
    };

  const getCardType = () => {
    const firstNumber = parseInt(cardNumber.charAt(0));
    if (firstNumber === 4) {
      return <img src={Visa} alt="Visa" className="paymentImg fade-in" />;
    } else if (firstNumber === 5) {
      return <img src={MasterCard} alt="MasterCard" className="paymentImg fade-in" />;
    } else {
      return null;
    }
  };

  //const reservationDetails = location.state.reservationDetails;
  const navigate = useNavigate();
  const reservation = () => {
    navigate("/reservations");
  }
  const userName = data.first_name + " " + data.last_name
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
    setTimeout(() => {
      navigate(`/reservations`)

    }, 3000);
  };
  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };
  return (

    <div>
      <Navbar />
      <div className="roomContainer">
        <div className="roomWrapper">
          <div className="pay">
            <div className="payment">
            {showPopUp && <Aleart type={toggle} message={Error} />}
              <div className="userInformation">
                <div className="heading">
                  <h1>Your Information</h1>
                  <p>Required fields are followed by <span>*</span></p>
                </div>
                <div className="userInformationFields">
                  <div className="colShow">
                    <label htmlFor="first_name">First Name <span>*</span></label>
                    <input type="text" name="first_name" placeholder={data.first_name} disabled />
                  </div>
                  <div className="colShow">
                    <label htmlFor="last_name">Last Name <span>*</span></label>
                    <input type="text" name="last_name" placeholder={data.last_name} disabled />
                  </div>
                  <div className="colShow">
                    <label htmlFor="email">Email <span>*</span></label>
                    <input type="text" name="email" placeholder={data.email} disabled />
                  </div>
                  <div className="colShow">
                    <label htmlFor="phone_number">Phone <span>*</span></label>
                    <input type="text" name="phone_number" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder={getCountryPhoneCode()} />
                  </div>

                  <div className="colShow">
                    <label htmlFor="Country">Country</label>
                    <select name="country" value={selectedCountry} onChange={handleCountryChange}>
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.cca2} value={country.cca2}>
                          {country.name.common}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="colShow">
                    <label htmlFor="zip_code">Zip Code</label>
                    <input type="text" name="zip_code" />
                  </div>
                </div>

                <div className="heading">
                  <h1>How do you want to pay?</h1>
                </div>
                <div className="paymentMethodContainer">
                  <div className="paymentMethod">
                    <div className="left">
                      <div className="colShow">
                        <label htmlFor="name">Cardholder's Name <span>*</span></label>
                        <input type="text" name="name" className='a7' />
                      </div>
                      <div className="colShow">
                        <label htmlFor="card_number">Card Number <span>*</span></label>
                        <input
                          type="text"
                          name="card_number"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className='a7'
                        />
                      </div>

                      <div className="beside">
                        <div className="colShow2">
                          <label htmlFor="Expiration_date">
                            Expiration Date <span>*</span>
                          </label>
                          <input type="text" name="Expiration_date" className="smallInput" />
                        </div>
                        <div className="colShow2">
                          <label htmlFor="cvv">cvv <span>*</span></label>
                          <input type="text" name="cvv" className="smallInput" />
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      {getCardType() || <img src={DefaultMaster} alt="Visa" className="paymentImg " />}
                    </div>
                  </div>
                </div>
                {/* {showPopUp && <div className="popup-background" onClick={closePopUp}>
                  <div className="popup-content2" >
                    <button className='paymentBtn2' onClick={reservation}>Go To Reservations</button>
                  </div>
                </div>} */}
              </div>
              <button className='btn' onClick={handelSubmit && togglePopUp}>Confirm</button>
              {
                showPopUp && <div className="popup-background" onClick={closePopUp}>
                  <div className="popup-contentLoader">
                    <ConfirmLoader confirmed={error ? false : true} />
                  </div>
                </div>
              }
            </div>
            <div className="paymentDetails">
              <div className="arrivalInfo">
                <img src={selected_hotel.hotelimg} alt="" className='HotelImg' />
                <div className="arrivalInfoBottom">
                  <p> {selected_hotel.hotelname} </p>
                  <p>{room.name}</p>
                  {/* <p className='refundable'>Non-refundable</p> */}
                  <p>Check-in:{formattedstartDate}</p>
                  <p>Check-out: {formattedendDate}</p>
                  <p>{diffDays}-night stay</p>
                </div>
              </div>
              <div className="payPrice">
                <h1>Price details</h1>
                <hr />
                <div className="payRow">
                  <p>{room.deal.roomscount} room x {diffDays} night</p>
                  <p>{room.deal.price} EGP</p>
                </div>
                <div className="payRow">
                  <p>Taxes and fees</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="payRow">
                  <p>Total</p>
                  <p>{room.deal.price} EGP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment