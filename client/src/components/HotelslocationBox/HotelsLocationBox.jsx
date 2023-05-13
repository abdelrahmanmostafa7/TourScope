import "./HotelslocationBox.scss";
import Mapbox from "../MapBox/Mapbox";
import mapboximg from "../../image/mapbox.png";
import { useState, useEffect } from "react";
import locations from "../MapBox/location.json";

function LocationBox() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const size = useState({
    "hight": 800,
    "width": 1000,
  });

  const togglePopUp = () => {
    setShowPopUp(true);
    setLoading(false)
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
      setLoading(true)
    }
  };


  return (
    <div className="HotelLocationBox" >
      <div className="HotelLocationBoxCover" onClick={togglePopUp}>
        <img src={mapboximg} className="HotelLocationBoxImg" alt="" />
        <h2 className="HotelLocationTitle">Search On Map</h2>
      </div>
      {!loading &&showPopUp && (
        <div className="closePopupBackGround" onClick={closePopUp}>
          <div className="popup-content">
            <Mapbox size={size} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationBox;
