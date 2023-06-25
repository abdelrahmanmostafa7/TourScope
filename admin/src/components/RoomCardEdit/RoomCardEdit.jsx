import React from 'react'
import Bed from "../../image/bed.png"
import Size from "../../image/maximize.png"
import Book from "../../image/save-instagram (1).png"
import { useNavigate } from "react-router-dom";
import "./RoomCardEdit.scss"


const RoomCard = ({ item }) => {
  const navigate = useNavigate()
  const RoomBtn = () => {
    navigate(`/room/${item._id}`)
    window.scrollTo(0, 0);;
  }
  return (
    <div>
      <div className="Room">
        <div className="roomTop">
          <img src={item.images[0]} alt="" className='roomImg' />
        </div>
        <div className="roomBottom">
          <div className="roomInfo">
            <div className="numberOfPeople">
              <img src={item.images[0]} alt="" className='roomIcon' />
              <p>Adults : 4</p>
            </div>
            <div className="roomSize">
              <img src={Size} alt="" className='roomIcon' />
              <p>Size : {item.size}</p>
            </div>
          </div>
          <div className="roomDescription">
            <h4>{item.name}</h4>
          </div>
          <div className="roomPrice">
            <p><span>${item.price} </span>/ Night</p>
            <button onClick={RoomBtn} ><img src={Book} alt="" className='BookIcon' /> Book</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomCard