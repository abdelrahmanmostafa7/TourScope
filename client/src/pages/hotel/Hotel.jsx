import "./hotel.scss";
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchBox from '../../components/searchBox/SearchBox'
import LocationBox from '../../components/locationBox/LocationBox'
import RoomCard from "../../components/roomCard/RoomCard";
import useFetch from "../../hook/useFetch.js"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import BoykaSlider from "../../components/Slide/BoykaSlider";
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
import CoffeeMaker from "../../image/coffee-machine.png"
import Luggage from "../../image/luggage.png"
import parking from "../../image/parking-area.png"
import FitnessCenter from "../../image/gym.png"
import AirportShuttle from "../../image/bus.png"
import Pool from "../../image/poolIcon.png"
import styled from "@emotion/styled";

const Hotel = () => {
  // To fetch data 
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const { data: hotel, loading: hotelLoading } = useFetch(`/hotel/find/${id}`);


  // Fetch Room Data 
  const [sliderLoaded, setSliderLoaded] = useState(false);
  useEffect(() => {
    if (hotel.rooms) {
      setSliderLoaded(true);
    }
  }, [hotelLoading, hotel, sliderLoaded]);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    duration: 500,
    swipe: true,
  };

  // To navigate to all rooms 
  const navigate = useNavigate()
  const datauser = []
  datauser.push(hotel.rooms)
  const roomsBtn = () => { navigate(`/rooms/${id}`) }
  // Slider states & functions 
  const [slideNumber, setSlideNumber] = useState(0);
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
      <Navbar />
      {hotelLoading ? <Loading /> :
        (<div className="hotelContainer">
          <div className="hotelWrapper">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={hotel.images[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <h1 className="hotelTitle">{hotel.name}</h1>
            <div className="hotelTop">
              <div className="hotelRight">
                <div className="hotelImages">
                  {hotel.images?.slice(0, 5).map((photo, i) => (

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

                    <div className="lastImgbtn">
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
                <h2 className="aboutHotel">Hotel Features</h2>
                <span className="HotelFeatures">
                  {hotel.amenities?.slice(0, 8).map((amenity, i) => (
                    <div className="FeaturesWrapper" key={i}>
                      {amenity === "Free WiFi" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Wifi} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Bar" ? (
                        <div className="inHotel">
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
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={RoomService} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Elevator" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Elevator} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Terrace" ? (
                        <div>
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Terrace} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Air conditioning" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={AirConditioning} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Laundry" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Laundry} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "24-hour front desk" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Hours} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "La Terrazza" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Breakfast" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Restaurant" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Heating" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Heat} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Daily housekeeping" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={DailyHouseKeeping} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Family rooms" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={FamilyRooms} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Tea/Coffee Maker in All Rooms" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={CoffeeMaker} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Baggage storage" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Luggage} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Parking on site" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Parking" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Free parking" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Private Parking" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Fitness center" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={FitnessCenter} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Airport shuttle" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={AirportShuttle} alt="" className="featureImages" />
                        </div>
                      ) : amenity === "Outdoor swimming pool" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={Pool} alt="" className="featureImages" />
                        </div>
                      ) : (
                        <div className="inHotel">
                          <h3 className="featureTitle">{amenity}</h3>
                          <img src={FamilyRooms} alt="" className="featureImages" />
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
              <div className="hotelLeft">
                <SearchBox />
                <LocationBox id={hotel._id} />
              </div>
            </div>
            <div className="hotelBottom">
              {(
                <>
                  <h2>Available Rooms</h2>
                  <button className="roomsBtn" onClick={roomsBtn}>All Rooms</button>
                  {sliderLoaded ? (
                    <BoykaSlider {...settings}>
                      {hotel.rooms.map((item) => (
                        <RoomCard item={item} key={item._id} />
                      ))}
                    </BoykaSlider>
                  ) : (
                    <p>Slider loading...</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>)}
      <Footer />
    </div>
  );
};

export default Hotel;