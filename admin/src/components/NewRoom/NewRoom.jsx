import React from 'react'
import "./NewRoom.scss"
import { useState } from 'react'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'
const NewRoom = ({closePopUpn}) => {
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
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser ? currentUser._id : null;
    console.log(currentUser)
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
        beds: "",
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
        try {
            await newRequest.post(`/room/${currentUser.hotel_id}`, { ...room });
            console.log("New Room Created Successfully.. ")
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
    const goBack = () => {
        window.location.reload()
    }
    return (
        <div>
            <div className="newRoomContainer">
                <div className="popup-background" onClick={closePopUpn}>
                    <form className="popup-content5" onSubmit={handleSubmit}>
                        <h2 className='newRoomHeading'>Add New Room</h2>
                        <div className="newRoomDetails">
                            <div className="newRoomCol">
                                <label htmlFor="name">Room Name <span>*</span></label>
                                <input type="text" name='name' onChange={handleChange} required/>
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="roomNumber">Room Number <span>*</span></label>
                                <input type="text" name='roomNumber' onChange={handleChange} required />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="price">Price <span>*</span></label>
                                <input type="text" name='price' onChange={handleChange} required />
                            </div>
                            <div className="newRoomCol">
                                <label htmlFor="maxpeople">max People <span>*</span></label>
                                <input type="text" name='maxpeople' onChange={handleChange} required />
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
                                <label className='facNewRoom'>Facilities</label>
                            <div className="rowNewRoom">
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
                            <button type="submit" className='btn' onClick={goBack}>Add New Room</button>
                            <button className='btn' onClick={closePopUp}>Cancel</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewRoom