import React from 'react'
import "./NewRoom.scss"
import Datatable from '../../components/datatable/Datatable'
import { useState } from 'react'
import newRequest from '../../utils/newRequest'

const NewRoom = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };
  const [room, setRoom] = useState({});
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
  };
  return (
    <div>
      <div className="newRoomContainer">
        <button className="btn" onClick={togglePopUp}>Add Room</button>
        {showPopUp && <div className="popup-background" onClick={closePopUp}>
          <form className="popup-content5" onSubmit={handleSubmit }>
            <h2 className='newRoomHeading'>Add New Room</h2>
            <div className="newRoomDetails">
              <div className="newRoomCol">
                <label htmlFor="name">Room Name</label>
                <input type="text" name='name' onChange={handleChange}/>
              </div>
              <div className="newRoomCol">
                <label htmlFor="price">Price</label>
                <input type="text" name='price' onChange={handleChange}/>
              </div>
              <div className="newRoomCol">
                <label htmlFor="number">Number Of Room</label>
                <input type="text" name='number' onChange={handleChange}/>
              </div>
              <div className="newRoomCol">
                <label htmlFor="type">Type</label>
                <input type="text" name='type' onChange={handleChange}/>
              </div>
              <div className="newRoomCol">
                <label htmlFor="status">Status</label>
                <input type="text" name='status' onChange={handleChange}/>
              </div>
              <div className="newRoomCol">
                <label htmlFor="facilities">Facilities</label>
                <input type="text" name='facilities' onChange={handleChange}/>
              </div>
            </div>
            <div className="newRoomBottom">
              <button type="submit" className='btn'>Add New Room</button>
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