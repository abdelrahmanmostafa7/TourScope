import React from 'react'
import "./updateRoom.scss"
import Datatable from '../../components/datatable/Datatable'
import { useState } from 'react'
import newRequest from '../../utils/newRequest'
import axios from 'axios'
import Upload from "../../image/upload.png"
import { useNavigate } from 'react-router-dom'
import useFetch from "../../hook/useFetch.js"
import { useEffect } from "react"

const UpdateRoom = () => {
  const [path, setPath] = useState(`/room/find/64920ebca4078e28356b5974`)
  const { data, loading } = useFetch(path)
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (data.facilities)
      setDataLoaded(true);
  }, [data])
  const navigate = useNavigate()
  const features = [
    "Free toiletries",
    "Kitchen",
    "Toilet",
    "Bathtub or shower",
    "Towels",
    "Socket near the bed",
    "Cleaning products",
    "Hypoallergenic",
    "Desk",
    "Sitting area",
    "Private entrance",
    "Refrigerator",
    "Microwave",
    "Hairdryer",
    "Kitchenware",
    "Kitchen",
    "Fan",
    "Towels/Sheets",
    "Outdoor furniture",
    "Cable channels",
    "Wake-up service",
    "closet",
    "Toaster",
    "Dining table",
    "Clothes rack",
    "Toilet paper",
    "Sofa bed",
    "Hand sanitizer",
    "Kettle",
    "Comfortable bed",
    "Private bathroom",
    "Air conditioning",
    "Heating",
    "Television",
    "Free Wi-Fi",
    "Telephone",
    "fridge",
    "Coffee/tea maker",
    "Iron",
    "Hairdryer",
    "Desk or workspace",
    "Wardrobe or closet",
    "Seating area",
    "Room service",
    "Daily housekeeping",
    "Laundry",
    "Dining options",
    "24-hour front desk",
    "Luggage",
    "Elevator",
    "Gym",
    "Swimming pool",
    "Spa",
    "Sauna",
    "Jacuzzi",
    "Restaurant",
    "dining options",
    "Bar",
    "Parking"
  ]
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };
  const [room, setRoom] = useState({
    name: "",
    roomNumber: 0,
    price: 0,
    maxpeople: 0,
    type: "",
    size: 0,
    beds: "",
    status: "",
    description: "",
    facilities: [],
  });
  const fac = "free-wifi,tv,radio"
  let facA =fac.split(',');
  console.log(facA)
  useEffect(() => {
    if (data) {
      setRoom({
        name: data.name,
        number: data.roomNumber,
        price: data.price,
        maxpeople: data.maxpeople,
        type: data.type,
        size: data.size,
        beds: data.beds,
        status: data.status,
        description: data.description,
        facilities: data.facilities,
      });
    }
  }, [data]);
  console.log(room)
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const handleChange = (e) => {
    setRoom((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Room Updated Successfully.. ")
    try {
      await newRequest.put(`/room/update/64920ebca4078e28356b5974`, { ...room });
    } catch (error) {
      console.log(error);
    }
    // navigate("/editRooms")
  };
  // const handleCheckboxChange = (e) => {
  //   let newArray = [...room.facilities, e.target.value];
  //   if (room.facilities.includes(e.target.value)) {
  //     newArray = newArray.filter(facility => facility !== e.target.value);
  //   }
  //   setRoom({
  //     ...room,
  //     facilities: newArray
  //   });
  //   toggleChecked();
  // };
  const [checkedFacilities, setCheckedFacilities] = useState([]);
  // console.log(checkedFacilities)
  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    if (e.target.checked) {
      setCheckedFacilities([...checkedFacilities, value]);
    } else {
      setCheckedFacilities(checkedFacilities.filter((facility) => facility !== value));
    }
  };
  return (
    <div className='roomMain'>
      <form className="popup-content5" onSubmit={handleSubmit}>
        <h2 className='newRoomHeading'>Update Room</h2>
        <div className="newRoomDetails">
          <div className="newRoomCol">
            <label htmlFor="name">Room Name</label>
            <input type="text" name='name' onChange={handleChange} placeholder={data.name} />
          </div>
          <div className="newRoomCol">
            <label htmlFor="roomNumber">Room Number</label>
            <input type="text" name='roomNumber' onChange={handleChange} placeholder={data.roomNumber} />
          </div>
          <div className="newRoomCol">
            <label htmlFor="price">Price</label>
            {/* 4496 */}
            <input type="text" name='price' onChange={handleChange} placeholder={data.price} />
          </div>
          <div className="newRoomCol">
            <label htmlFor="maxpeople">max People</label>
            <input type="text" name='maxpeople' onChange={handleChange} placeholder={data.maxpeople} />
          </div>
          <div className="newRoomCol">
            <label htmlFor="type">Type</label>
            <input type="text" name='type' onChange={handleChange} placeholder={data.type} />
          </div>
          <div className="newRoomCol">
            <label htmlFor="size">Size</label>
            <input type="text" name='size' onChange={handleChange} placeholder={data.size} />
          </div>
          <div className="newRoomCol">
            <label htmlFor="beds">Beds</label>
            <input type="text" name='beds' onChange={handleChange} placeholder={data.beds} />
          </div>
          <div className="newRoomCol">
            <label htmlFor="status">Status</label>
            <input type="text" name='status' onChange={handleChange} placeholder={data.status} />
          </div>
          <div className="des">
            <label htmlFor="description">Description</label>
            <textarea name="description" onChange={handleChange} placeholder={data.description}></textarea>
          </div>
          <div className="row">
            {dataLoaded && data.facilities.map((facility, i) => (
              <div className="fac" key={i}>
                <label htmlFor="facility">
                  <input type="checkbox" name='facilities' value={facility} onChange={handleCheckboxChange} checked={checkedFacilities.includes(facility)} />
                  {facility}
                </label>
              </div>
            ))}
          </div>

          {/* <div className="newRoomCol">
                <img src={Upload} alt="" className='newRoomImg'/>
                <label htmlFor="file">Upload</label>
                <input type="file" name='file'/>
              </div> */}
        </div>
        <div className="newRoomBottom">
          <button type="submit" className='btn' onClick={handleSubmit}>Add New Room</button>
          <button className='btn'>Cancel</button>
        </div>

      </form>
    </div>
  )
}

export default UpdateRoom