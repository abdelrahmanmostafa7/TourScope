import React from 'react'
import Bed from "../../image/bed.png"
import Size from "../../image/maximize.png"
import Book from "../../image/save-instagram (1).png"
import { useNavigate } from "react-router-dom";
import "./RoomCard.scss"


const RoomCard = ({ item, data }) => {
  const navigate = useNavigate()
  const RoomBtn = () => {

    navigate(`/room/${item._id}`, { state: { item, data } })
    window.scrollTo(0, 0);;

  }
  return (
    <div>
      <div className="Room">
        <img src={item.images[0]} alt="" className='roomImg' />
        <div className="roomBottom">
          <div className="roomInfo">
            <div className="numberOfPeople">
              <img src={item.images[0]} alt="" className='roomIcon' />
              <p>Adults : {item.maxpeople}</p>
            </div>
            <div className="roomSize">
              <img src={Size} alt="" className='roomIcon' />
              <p>Size : {item.size}</p>
            </div>
          </div>
          <h4 className='roomName'>{item.name.slice(0,25)}</h4>
          <p className='roomPricePerNight'><span>{item.price} EGP</span>/Night</p> 
          {/* <div className="roomPrice">
            <p>{item.deal.roomscount}XRooms <br />  Total Price <span>{item.deal.price}EGP</span> </p>
            <button onClick={RoomBtn} ><img src={Book} alt="" className='BookIcon' /> Book</button>
          </div>
          {item.deal.price != null  ? (
            <div className="roomPrice">
              <p><span>${item.price} </span>/ Night</p>
              <p>{item.deal.roomscount}XRooms</p>
              <p>Total Price {item.deal.price}</p>
              <button onClick={RoomBtn} ><img src={Book} alt="" className='BookIcon' /> Book</button>
            </div>
          ) : (
            <>
              <span className='hotelPrice'>NO AVAILABLE ROOMS <br /> For this number of guests
              </span>
            </>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default RoomCard