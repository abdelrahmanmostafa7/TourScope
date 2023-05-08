import "./room.scss"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import RoomCard from "../../components/roomCard/RoomCard";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import dish from "../../image/dish.png"
import securityCam from "../../image/securityCam.png"
import washer from "../../image/washer.png"
import wifi from "../../image/wifi.png"
import taxi from "../../image/taxi.png"
import laundry from "../../image/laundry.png"
import poolIcon from "../../image/poolIcon.png"
import headSet from "../../image/headSet.jpg"
import { useState } from "react";
import useFetch from "../../hook/useFetch.js"
import { useLocation } from "react-router-dom"
import Loading from './../../components/Loading/Loading';
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

import Point from "../../image/right-arrow (3).png"

function Room() {
  // To fetch data 
  const location = useLocation()
  console.log(location);
  const id = location.pathname.split("/")[2]
  const { data, loading } = useFetch(`/room/find/${id}`)
  // To navigate to all rooms 
  const navigate = useNavigate()
  const roomsBtn = () => {
    navigate("/rooms")
  }
  const payment = () => {
    navigate("/payment")
  }
  console.log(data.facilities)
  // Slider states & functions 
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const [imgNumber, setNumber] = useState(6);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
    setNumber(data.images.length)
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

  // const standardFacilities = data.facilities.filter((facility) =>{
  //   return facility=== "Desk" || facility==="Free toiletries"
  // });

  // console.log(standardFacilities);
  //   const filteredFacilities = data.facilities.filter(facility => {
  //     return [
  //       "Safe",
  //       "Shower",
  //       "TV",
  //       "Socket near the bed"
  //     ].includes(facility);
  //   });

  // console.log(filteredFacilities);
  // const 
  return (
    <div>
      <Navbar />
      {loading ? <Loading /> :
        (<div className="roomContainer">
          <div className="roomWrapper">
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
                    src={data.images[slideNumber]}
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
            <h1 className="roomTitle">{data.name}</h1>
            <div className="roomTop">
              <div className="roomRight">
                <div className="roomImages">
                  <div className="RoomMainImage">
                    <img src={data.images ? data.images[0] : ""} alt="" className="roomMainImg" onClick={() => handleOpen(0)} />
                  </div>
                  <div className="roomSubImg">
                    {data.images?.slice(1, 4).map((photo, i) => (
                      <div className="roomImgWrapper" key={i}>
                        <img
                          onClick={() => handleOpen(i)}
                          src={photo}
                          alt=""
                          className="hotelImg"
                        />
                      </div>
                    ))}
                    {data.images?.length > 5 && <>
                      <div className="lastImgBtn">
                        <img
                          onClick={() => handleOpen(5)}
                          src={data.images[5]}
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
                  <div className="hotelFeaturesLeft">
                    <span><img src={Point} alt="" className="featureIcon" /></span>
                    <div className="feature">{data.facilities[0] || ""}</div>
                  </div>
                  <div className="hotelFeaturesRight">
                    <span><img src={Point} alt="" className="featureIcon" /></span>
                    <div className="feature"></div>
                  </div>
                  {/* {data.facilities?.slice(0, 8).map((facilities, i) => (
                    <div className="FeaturesWrapper" key={i}>
                      {facilities === "Free toiletries" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Wifi} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Safe" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Safe} alt="" className="featureImages" />
                        </div>
                        ) : facilities === "Toilet" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Wifi} alt="" className="featureImages" />
                        </div>
                          ) : facilities === "Bathtub or shower" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Wifi} alt="" className="featureImages" />
                        </div>

                      ) : facilities === "Laundry" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Laundry} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "24-hour front desk" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Hours} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "La Terrazza" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Breakfast" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Restaurant" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={LaTerrazza} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Heating" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Heat} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Daily housekeeping" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={DailyHouseKeeping} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Family rooms" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={FamilyRooms} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Tea/Coffee Maker in All Rooms" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={CoffeeMaker} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Baggage storage" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Luggage} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Parking on site" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Parking" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Free parking" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Private Parking" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={parking} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Fitness center" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={FitnessCenter} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Airport shuttle" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={AirportShuttle} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Outdoor swimming pool" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Safe} alt="" className="featureImages" />
                        </div>
                      ) : (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Check} alt="" className="featureImages" />
                        </div>
                      )}
                    </div>
                  ))} */}

                </span>
              </div>
              <div className="roomLeft">
                <div className="vrOption">
                  <span>Show By VR</span>
                  <img src={headSet} alt="" className="headSet" />
                </div>
                <div className="roomDetails">
                  <span>Adult : 2</span>
                  <p>|</p>
                  <span>Size : 50ft</span>
                </div>
                <div className="roomPrice">
                  <span>${data.price}</span>
                  <p>per night</p>
                </div>
                <div className="roomReservation">
                  <button className="bookBtn" onClick={payment}>BOOK NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      <Footer />
    </div>
  )
}

export default Room