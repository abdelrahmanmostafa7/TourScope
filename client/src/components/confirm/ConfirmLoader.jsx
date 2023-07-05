import React, { useState } from 'react'
import "./ConfirmLoader.scss"
import Confirmed from "../../image/check12.png"
import NotConfirmed from "../../image/cross.png"
const ConfirmLoader = ({ confirmed, errmessage }) => {

  const [isConfirmed, setIsConfirmed] = useState(confirmed)
  return (
    <div className='mainContainer'>
      <div className="loaderContainer">
        <div className="loaderTop">
          {
            isConfirmed ?
              <img src={Confirmed} alt="" className='loaderImg' />
              :
              <img src={NotConfirmed} alt="" className='loaderImg' />
          }
        </div>
        <div className="loaderCenter">
          {
            isConfirmed ?
              <>
                <h3>Awesome!</h3>
                <p>Your booking has been confirmed. <br /> Check your email for details.</p>
              </>
              :
              <>
                <h3>Error!</h3>
                <p>{errmessage? errmessage : "Please Try Again Later"}</p>
              </>
          }
        </div>
        <div className="loaderBottom">
          {
            isConfirmed ?
              <button className='loaderBtn'>Ok</button>
              :
              <button className='loaderBtn2'>Ok</button>
          }
        </div>
      </div>
    </div>
  )
}

export default ConfirmLoader