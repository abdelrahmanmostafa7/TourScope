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


  return (
    <div>
      <Navbar />
      {loading ? ("loading...") :
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
                  {data.images?.slice(0, 5).map((photo, i) => (
                    <div className="roomImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                      />
                    </div>
                  ))}
                  {data.images?.length > 6 && <>

                    <div className="lastImgbtn">
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
                <h2 className="aboutHotel">Hotel Features</h2>
                <span className="HotelFeatures">
                  {data.amenities?.slice(0, 8).map((facilities, i) => (
                    <div className="FeaturesWrapper" key={i}>
                      {facilities === "Free WiFi" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Wifi} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Bar" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Bar} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Non-smoking rooms" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={NoSmoking} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Room service" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={RoomService} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Elevator" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Elevator} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Terrace" ? (
                        <div>
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Terrace} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Air conditioning" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={AirConditioning} alt="" className="featureImages" />
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
                          <img src={Pool} alt="" className="featureImages" />
                        </div>
                      ) : (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Pool} alt="" className="featureImages" />
                        </div>
                      )}
                    </div>
                  ))}
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