import React from 'react'
import "./HotelEdit.scss"
import { useState } from 'react';
import useFetch from "../../hook/useFetch"
import Loading from "../../components/Loading/Loading";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Wifi from "../../image/wif1i.png"
import Bar from "../../image/martini.png"
import Laundry from "../../image/washe1r.png"
import Heat from "../../image/heat.png"
import NoSmoking from "../../image/no-smoking.png"
import RoomService from "../../image/hotel-service.png"
import Elevator from "../../image/lift.png"
import Terrace from "../../image/terrace.png"
import AirConditioning from "../../image/airConditioning.png"
import Hours from "../../image/24-hours.png"
import LaTerrazza from "../../image/dish.png"
import DailyHouseKeeping from "../../image/mop.png"
import FamilyRooms from "../../image/family.png"
import CoffeeMaker from "../../image/coffee-machine (1).png"
import Luggage from "../../image/luggage.png"
import parking from "../../image/parking-area.png"
import FitnessCenter from "../../image/gym.png"
import AirportShuttle from "../../image/bus.png"
import Pool from "../../image/poolIcon.png"
import Check from "../../image/check (1).png"
const HotelEdit = () => {
  // To fetch data 
  const { data: hotel, loading: hotelLoading } = useFetch(`/hotel/find/643bb10810a61c109435fe16`);

  const [open, setOpen] = useState(false);
  const [imgNumber, setNumber] = useState(6);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
    setNumber(hotel.images.length)
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? imgNumber : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === imgNumber ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  };
  return (
    <div>
      {hotelLoading ? <Loading /> :
        (<div className="hotelContainer">
          <div className="hotelWrapper">
            {open && (
              <div className="slider">
                <CloseIcon className="close"
                  onClick={() => setOpen(false)} />
                <ArrowBackIcon className="arrow"
                  onClick={() => handleMove("l")} />
                <div className="sliderWrapper">
                  <img
                    src={hotel.images[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <ArrowForwardIcon className="arrow"
                  onClick={() => handleMove("r")} />
              </div>
            )}
            <h1 className="hotelTitle">{hotel.name}</h1>
            <div className="hotelTop">
              <div className="hotelRight">
                <div className="hotelImages">
                  <div className="hotelMainImg">
                    <img src={hotel.images ? hotel.images[0] : ""} alt="" className="mainImg" onClick={() => handleOpen(0)} />
                  </div>
                  <div className="hotelSubImg">
                    {hotel.images?.slice(1, 4).map((photo, i) => (
                      <div className="hotelImgWrapper" key={i}>
                        <img
                          onClick={() => handleOpen(i)}
                          src={photo}
                          alt=""
                          className="hotelImg"
                        />
                      </div>
                    ))}
                    {hotel.images?.length > 6 && <>
                      <div className="lastImgBtn">
                        <img
                          onClick={() => handleOpen(5)}
                          src={hotel.images[5]}
                          alt=""
                          className="hotelImg lastImg"
                        />
                        <button onClick={() => setOpen(true)} className="seeMoreBtn">
                          see more
                        </button>
                      </div>
                    </>
                    }
                  </div>
                </div>
                <h2 className="aboutHotel">Hotel Features</h2>
                <span className="HotelFeatures">
                  {hotel.amenities?.slice(0, 8).map((amenity, i) => (
                    <div className="FeaturesWrapper" key={i}>
                      {amenity === "Free WiFi" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Wifi} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Bar" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Bar} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Non-smoking rooms" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={NoSmoking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Room service" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={RoomService} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Elevator" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Elevator} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Terrace" ? (
                        <div>
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Terrace} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Air conditioning" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={AirConditioning} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Laundry" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Laundry} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "24-hour front desk" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Hours} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "La Terrazza" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Breakfast" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Restaurant" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Heating" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Heat} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Daily housekeeping" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={DailyHouseKeeping} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Family rooms" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={FamilyRooms} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Tea/Coffee Maker in All Rooms" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">Coffee Maker</h3>
                          <img src={CoffeeMaker} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Baggage storage" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Luggage} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Parking on site" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Parking" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Free parking" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Private Parking" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Fitness center" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={FitnessCenter} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Airport shuttle" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={AirportShuttle} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Outdoor swimming pool" ? (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Pool} alt="" className="featureImages" />
                        </div>
                      ) : (
                        <div className="inHotel">
                          <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Check} alt="" className="featureImages" />
                        </div>
                      )}
                    </div>
                  ))}
                </span>
                <div className="hotelDetailsTexts">
                  <h2 className="aboutHotel">Details about Hotel</h2>
                  <p className="hotelDesc">
                    {hotel.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </div>
  )
}

export default HotelEdit