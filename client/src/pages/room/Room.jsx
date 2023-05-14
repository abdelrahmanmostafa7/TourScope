import "./room.scss"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import headSet from "../../image/headSet.jpg"
import { useState } from "react";
import useFetch from "../../hook/useFetch.js"
import { useLocation } from "react-router-dom"
import Loading from './../../components/Loading/Loading';
import Heat from "../../image/heat.png"
import CoffeeMaker from "../../image/coffee-machine.png"
import Check from "../../image/check (1).png"
import FreeToiletries from "../../image/toiletries.png"
import Wc from "../../image/wc-sign.png"
import shower from "../../image/shower (1).png"
import Towels from "../../image/towel (1).png"
import Linens from "../../image/bed-sheets.png"
import Desk from "../../image/desk.png"
import Telephone from "../../image/phone-call.png"
import Ironing from "../../image/ironing.png"
import Socket from "../../image/socket.png"
import Tiles from "../../image/tiles.png"
import Tv from "../../image/television.png"
import Hairdryer from "../../image/hairdryer.png"
import Carpeted from "../../image/carpet.png"
import Kettle from "../../image/kettle.png"
import Outdoor from "../../image/sun-umbrella.png"
import CableChannels from "../../image/cable-tv.png"
import Closet from "../../image/closet.png"
import DiningArea from "../../image/outside.png"
import Safe from "../../image/safe.png"
import Bathrobe from "../../image/bathrobe.png"
import DiningTable from "../../image/chair.png"
import Sofa from "../../image/Sofa.png"
import ToiletPaper from "../../image/toilet-paper.png"
import Fan from "../../image/ceiling-fan.png"
import Alarm from "../../image/alarm.png"
import HandSanitizer from "../../image/liquid-soap.png"
import AirPurifiers from "../../image/air-purifier.png"
import Fax from "../../image/fax.png"
import Point from "../../image/right-arrow (3).png"
import Down from "../../image/download.png"

function Room() {
  // To fetch data 
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const paymentinfo  = location.state.item;
  const reservationDetails = location.state.data;
  console.log(reservationDetails)

  const { data, loading } = useFetch(`/room/find/${id}`)
  // To navigate to all rooms 
  const navigate = useNavigate()

  const payment = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    if (currentUser == null) {
      const from = "/room"
      navigate("/logInOut", {state:{from , reservationDetails}} )
    } else {
      navigate("/payment" , {state:{reservationDetails}})

    }
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

  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };

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
                <h2 className="aboutHotel">Room Features</h2>
                <span className="RoomFeatures">
                  {data.facilities?.slice(0, 8).map((facilities, i) => (
                    <div className="FeaturesWrapper" key={i}>
                      {facilities === "Free toiletries" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={FreeToiletries} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Toilet" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Wc} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Bathtub or shower" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={shower} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Shower" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={shower} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Towels" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Towels} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Towels/Sheets (extra fee)" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Towels} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Linens" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Linens} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Desk" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Desk} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Telephone" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Telephone} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Ironing facilities" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Ironing} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Iron" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Ironing} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Socket near the bed" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Socket} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Heating" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Heat} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "TV" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Tv} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Tile/Marble floor" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Tiles} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Tea/Coffee maker" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={CoffeeMaker} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Hairdryer" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Hairdryer} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Carpeted" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Carpeted} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Fax" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Fax} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Hardwood or parquet floors" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Carpeted} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Electric kettle" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Kettle} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Outdoor furniture" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Outdoor} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Cable channels" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={CableChannels} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Wardrobe or closet" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Closet} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Clothes rack" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Closet} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Dining area" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={DiningArea} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Safe" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Safe} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Bathrobe" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Bathrobe} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Dining table" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={DiningTable} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Sofa" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Sofa} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Sitting area" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Sofa} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Sitting area" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Sofa} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Toilet paper" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={ToiletPaper} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Fan" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Fan} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Alarm clock" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Alarm} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Hand sanitizer" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={HandSanitizer} alt="" className="featureImages" />
                        </div>
                      ) : facilities === "Air purifiers" ? (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={AirPurifiers} alt="" className="featureImages" />
                        </div>
                      ) : (
                        <div className="inHotel">
                          <h3 className="featureTitle">{facilities}</h3>
                          <img src={Check} alt="" className="featureImages" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="seeMoreContainer">
                    <img src={Down} alt="" className="seeMore" onClick={togglePopUp} />
                  </div>
                </span>

                {showPopUp && <div className="popup-background" onClick={closePopUp}>
                  <div className="popup-content3" >
                    <h2>Facilities</h2>
                    <ul>
                      {
                        data.facilities?.map((facilities, i) => (
                          <li key={i}><img src={Point} alt="" className="Point" />{facilities}</li>
                        )
                        )}
                    </ul>
                  </div>
                </div>
                }
              </div>
              <div className="roomLeft">
                <div className="vrOption">
                  <span>Show By VR</span>
                  <img src={headSet} alt="" className="headSet" />
                </div>
                <div className="roomDetails">
                  <span>Adult : {data.maxpeople}</span>
                  <p>|</p>
                  <span>Size : {data.size}ft</span>
                </div>
                <div className="roomPrice">
                  <p><span>{data.price} EGP</span> Per Night</p>
                </div>
                <div className="roomPrice">
                  <p>{paymentinfo.deal.roomscount} X Rooms</p>
                  <p>Total Price <span>{paymentinfo.deal.price} EGP</span></p>
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