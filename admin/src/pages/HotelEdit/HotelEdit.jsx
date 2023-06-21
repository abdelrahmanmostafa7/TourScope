import React from 'react'
import "./HotelEdit.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import { useState } from 'react';
import useFetch from "../../hook/useFetch"
import Loading from "../../components/Loading/Loading";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
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
import EditIcon from '@mui/icons-material/Edit';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import newRequest from '../../utils/newRequest'
const HotelEdit = () => {
  const hotelId = "643bb10810a61c1094360089";
  const { data: hotel, loading: hotelLoading } = useFetch(`/hotel/find/${hotelId}`);

  // To add new photo 
  const [file, setFile] = useState(null);
  const upload = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_present", "TourScope")
    try {
      const res = await newRequest.post("https://api/cloudinary.com/v1_1/abdelrahmanzaki747@gmail.com/image/upload", data);

      const { url } = res.data
      return url
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleImageSubmit = async () => {
    e.preventDefault()
    const url = await upload(file)
    try {
      await newRequest.put(`/hotel/update/${hotelId}`, { images: url });
      // window.location.reload();
    }
    catch (err) {
      console.log(err);
    }
  }

  // To edit hotel desc 
  const [text, setText] = useState(hotel.description);
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setText(hotel.description);
    setIsEdit(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.put(`/hotel/update/${hotelId}`, {
        description: text,
      });
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='hotelEdit'>
      <Sidebar />
      {hotelLoading ? <Loading /> :
        (<div className="hotelContainer">
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{hotel.name}</h1>
            <form className="hotelImages" onSubmit={handleImageSubmit}>
              {hotel.images?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                  <RemoveCircleOutlineIcon className="ImageDeleteIcon" />
                </div>
              ))}
              {file && <img src={URL.createObjectURL(file)} alt="" className='NewHotelImg' />}
              <div className="addHotelImg">
                <label htmlFor="file" className="addHotelImgLabel">
                  <DriveFolderUploadOutlinedIcon htmlFor="file" className="addImgIcon" /> <br />
                  Click To Add New Photo
                </label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              </div>
                <button className="DoneBtn" type="submit">Done</button>
            </form>

            <h2 className="aboutHotel">Hotel Features</h2>
            <span className="HotelFeatures">
              {hotel.amenities?.map((amenity, i) => (
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
                      <RemoveCircleOutlineIcon className="amenitiesDeleteIcon" />
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
              <button className='addHotelFeature'>+</button>
            </span>

            <form onSubmit={handleSubmit} className="hotelDetailsTexts">
              <div className="hotelDetailsTop">
                <h2 className="aboutHotel">Details about Hotel</h2>
                {isEdit ? (
                  <button type="submit" className="hotelDetailsSubmit">
                    Submit
                  </button>
                ) : (
                  <EditIcon className="hotelDetailsEdit" onClick={handleEdit} />
                )}
              </div>
              <div className="hotelDetailsBottom">
                {isEdit ? (
                  <textarea
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="hotelDescInput"
                  />
                ) : (
                  <p className="hotelDesc">{hotel.description}</p>
                )}
              </div>
            </form>
          </div>
        </div>)}
    </div>
  )
}

export default HotelEdit