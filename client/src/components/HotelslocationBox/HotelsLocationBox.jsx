import "./HotelslocationBox.scss";
import Mapbox from "../MapBox/Mapbox";
import mapboximg from "../../image/mapbox.png";
import { useState, useEffect } from "react";
import locations from "../MapBox/location.json";

function LocationBox() {
  const [showPopUp, setShowPopUp] = useState(false);
  // const [loading, setLoading] = useState(true);
  const size = useState({
    "hight": 800,
    "width": 1000,
  });

  const togglePopUp = () => {
    if (showPopUp) {
      setShowPopUp(true);
      // setLoading(false); 
    } else {
      setShowPopUp(false);
      // setLoading(true); 
    }
  };


  return (
    <div className="HotelLocationBox" onClick={togglePopUp}>
      <div className="HotelLocationBoxCover">
        <img src={mapboximg} className="HotelLocationBoxImg" alt="" />
        <h2 className="HotelLocationTitle">Search On Map</h2>
      </div>
      {showPopUp && (
        <div className="closePopupBackGround" onClick={togglePopUp}>
          <div className="popup-content">
            <Mapbox size={size} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationBox;
