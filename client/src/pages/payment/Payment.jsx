import React, { useEffect } from 'react'
import "./Payment.scss"
import useFetch from './../../hook/useFetch';
import Navbar from './../../components/navBar/Navbar';
import Visa from "../../image/visa.png"
import MasterCard from "../../image/master-card.png"
import DefaultMaster from "../../image/credit-card (2).png"
import { useState } from 'react';
import Footer from './../../components/footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation()


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
    console.log(selectedCountryData)
    if (selectedCountryData && selectedCountryData.callingCodes && selectedCountryData.callingCodes.length > 0) {
      console.log(selectedCountryData.callingCodes[0])
      return selectedCountryData.callingCodes[0];
    }
    return '';
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const id = currentUser ? currentUser._id : null;
  const { data, loading } = useFetch(`/user/find/${id}`);
  const [cardNumber, setCardNumber] = useState('');
  const [isActive, setIsActive] = useState(false)
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };
  const handleActive = () => {
    setIsActive(true);
  }

  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
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

  const reservationDetails = location.state.reservationDetails;
  const navigate = useNavigate();
  const reservation = () => {
    navigate("/reservations");
  }
  const userName = data.first_name + " " + data.last_name
  return (
    <div>
      <Navbar />
      <div className="roomContainer">
        <div className="roomWrapper">
          <div className="payment">
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
                  <label htmlFor="phone_number">Phone</label>
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
                      <input type="text" name="name" />
                    </div>
                    <div className="colShow">
                      <label htmlFor="card_number">Card Number <span>*</span></label>
                      <input
                        type="text"
                        name="card_number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
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
                {showPopUp && <div className="popup-background" onClick={closePopUp}>
                  <div className="popup-content2" >
                    <h1>Hotel Name</h1>
                    {/* <p className='userName'>{userName}</p> */}
                    <div className="resetRow">
                      <p>Number of rooms :</p>
                      <p>1 Room</p>
                    </div>
                    <div className="resetRow">
                      <p>Number of people : </p>
                      <p>2 adults</p>
                    </div>


                    <div className="resetRow">
                      <p>check in Data :</p>
                      <p>5-5-2023</p>
                    </div>
                    <div className="resetRow">
                      <p>check out Data :</p>
                      <p>10-5-2023</p>
                    </div>
                    <div className="resetRow">
                      <p>Total price :</p>
                      <p>2120 EGP</p>
                    </div>
                    <button className='paymentBtn2' onClick={reservation}>Go To Reservations</button>
                  </div>
                </div>}
              </div>
            </div>
            {/* <button className='paymentBtn' onClick={!isActive?handleActive:reservation}>{isActive?"Go To Reservations":"Confirm"}</button> */}
            <button className='paymentBtn' onClick={togglePopUp}>Confirm</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment