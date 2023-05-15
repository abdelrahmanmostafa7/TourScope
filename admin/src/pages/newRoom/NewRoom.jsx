import React from 'react'
import "./NewRoom.scss"
import Datatable from '../../components/datatable/Datatable'
import { useState } from 'react'
import newRequest from '../../utils/newRequest'
import axios from 'axios'
import Upload from "../../image/upload.png"
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
  };
  const handelClick = async (e) =>{
    e.preventDefault();
    const data =new FormData()
    data.append("file",file);
    data.append("upload_preset" , "upload")
    try{
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dgrxevubf/image/upload",data)
      console.log(uploadRes)

    }catch(err){
      console.log(err)
    }
  }
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
                <label htmlFor="numberOfRoom">Number Of Room</label>
                <input type="text" name='numberOfRoom' onChange={handleChange}/>
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
              <div className="newRoomCol">
                <img src={Upload} alt="" className='newRoomImg'/>
                <label htmlFor="file">Upload</label>
                <input type="file" name='file'/>
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