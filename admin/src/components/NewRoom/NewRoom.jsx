import React from 'react'
import "./NewRoom.scss"
import { useState } from 'react'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'
const NewRoom = () => {
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
        number: 0,
        price: 0,
        maxpeople: 0,
        type: "",
        size: 0,
        beds: 0,
        status: "",
        description: "",
        facilities: [],
    });
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
        console.log("New Room Created Successfully.. ")
        try {
            await newRequest.post(`/room/643bb10810a61c1094360089`, { ...room });
        } catch (error) {
            console.log(error);
        }
        navigate("/editRooms")
    };
    const handleCheckboxChange = (e) => {
        let newArray = [...room.facilities, e.target.value];
        if (room.facilities.includes(e.target.value)) {
            newArray = newArray.filter(facility => facility !== e.target.value);
        }
        setRoom({
            ...room,
            facilities: newArray
        });
        console.log(newArray)
    };
    return (
        <div>
            <div className="newRoomContainer">
                {/* <button className="btn" onClick={togglePopUp}>Add Room</button> */}
                {showPopUp && <div className="popup-background" onClick={closePopUp}>
                    <form className="popup-content5" onSubmit={handleSubmit}>
                        <h2 className='newRoomHeading'>Add New Room</h2>
                        <div className="newRoomDetails">
                            <div className="newRoomCol">
                                <label htmlFor="name">Room Name</label>
                                <input type="text" name='name' onChange={handleChange} />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="roomNumber">Room Number</label>
                                <input type="text" name='roomNumber' onChange={handleChange} />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="price">Price</label>
                                <input type="text" name='price' onChange={handleChange} />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="maxpeople">max People</label>
                                <input type="text" name='maxpeople' onChange={handleChange} />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="type">Type</label>
                                <input type="text" name='type' onChange={handleChange} />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="size">Size</label>
                                <input type="text" name='size' onChange={handleChange} />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="beds">Beds</label>
                                <input type="text" name='beds' onChange={handleChange} />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="status">Status</label>
                                <input type="text" name='status' onChange={handleChange} />
                            </div>
                            <div className="des">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" onChange={handleChange}></textarea>
                            </div>
                            <div className="row">
                                {features.map((facility, i) => (
                                    <div className="fac" key={i}>
                                        <label htmlFor="facility">
                                            <input type="checkbox" name='facilities' value={facility} onChange={handleCheckboxChange} />
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
                }
            </div>
        </div>
    )
}

export default NewRoom