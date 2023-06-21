import "./hotel.scss";
import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchBox from '../../components/searchBox/SearchBox'
import LocationBox from '../../components/locationBox/LocationBox'
import RoomCard from "../../components/roomCard/RoomCard";
import useSearch from "../../hook/useSearch.js"
import { format } from "date-fns";
import { DateRange } from "react-date-range"
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
import CoffeeMaker from "../../image/coffee-machine (1).png"
import Luggage from "../../image/luggage.png"
import parking from "../../image/parking-area.png"
import FitnessCenter from "../../image/gym.png"
import AirportShuttle from "../../image/bus.png"
import Pool from "../../image/poolIcon.png"
import Check from "../../image/check (1).png"

const Hotel = () => {
  // To fetch data 
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false)
  let currentDay = new Date()
  currentDay=currentDay.getDate()+1
  const [date, setDate] = useState(location.state?.date ? location.state.date : [{
    startDate: new Date(),
    endDate: currentDay,
    key: "selection",
  }])
  
  const [options, setOptions] = useState(location.state?.options ? location.state.options : {
    adult: 1,
    children: 0,
    room: 1
  })

 
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };


  const { data: hotel, loading: hotelLoading, reFetch } = useSearch(`/hotel/find/${id}/?startdate=${date[0].startDate}&enddate=${date[0].endDate}&roomsoption=${encodeURIComponent(JSON.stringify([options]))}`)
  const handelSearch = () => {
    reFetch()
  }
  // Fetch Room Data 
  const [sliderLoaded, setSliderLoaded] = useState(false);
  useEffect(() => {
    if (hotel.rooms) {
      setSliderLoaded(true);
    }
  }, [hotel]);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    duration: 500,
    swipe: true,
  };

  const navigate = useNavigate()
  const reservationData = {
    hotelname:hotel.name,
    hotelimg:hotel.images ? hotel.images[0] : null,
    roomsdata: hotel.rooms,
    userDate: date,
    roomoptions: options,
  };
  const roomsBtn = () => { navigate(`/rooms/${id}`, { state: { reservationData } }) }
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
                <div className="HotelFeatures">
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
                          <h3 className="featureTitle">Coffee Maker</h3>
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
                          <img src={Check} alt="" className="featureImages" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="hotelDetailsTexts">
                  <h2 className="aboutHotel">Details about Hotel</h2>
                  <p className="hotelDesc">
                    {hotel.description}
                  </p>
                </div>
              </div>
              <div className="hotelLeft">
                {/* search box */}
                <div className="listSearch">
                  <h1 className="lsTitle">Search</h1>
                  <div className="lsItem">
                    <label className="lsLabel">Check-in Date</label>
                    <span onClick={() => setOpenDate(!openDate)}>
                      {`${format(
                        date[0].startDate,
                        "MM/dd/yyyy"
                      )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                    {openDate && (
                      <DateRange
                        onChange={(item) => {
                          const { selection } = item;
                          if (selection.startDate.getTime() === selection.endDate.getTime()) {
                            selection.endDate = new Date(selection.endDate.getTime() + 86400000);
                          }
                          setDate([selection]);
                        }} minDate={new Date()}
                        ranges={date}
                      />
                    )}
                  </div>
                  <div className="lsItem">
                    <label className="lsLabel">Options</label>
                    <div className="headerSearchItem">
                      <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText ">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                      {openOptions && (
                        <div className="ListOptions">
                          <div className="optionItem">
                            <span className="optionText">Adult</span>
                            <div className="optionCounter">
                              <button
                                disabled={options.adult <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("adult", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.adult}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("adult", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="optionItem">
                            <span className="optionText">Children</span>
                            <div className="optionCounter">
                              <button
                                disabled={options.children <= 0}
                                className="optionCounterButton"
                                onClick={() => handleOption("children", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.children}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("children", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="optionCounter">
                              <button
                                disabled={options.room <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.room}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={handelSearch}>Search</button>
                </div>
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
                        <RoomCard item={item} passreservation={reservationData}  key={item._id} />
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
