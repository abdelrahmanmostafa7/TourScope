import "./locationBox.scss";
import Mapbox from "../../components/MapBox/Mapbox";
import mapboximg from "../../image/mapbox.png";
import { useState, useEffect } from "react";
import locations from "../MapBox/location.json";

function LocationBox({ id }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(true);  
  const size = useState({
    "hight": 800,
    "width": 1000,
  });

  const togglePopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };

  useEffect(() => {
    const data = locations.find((loc) => loc._id.$oid === id);
    if(data){
      setHotel({
        _id: data._id.$oid,
        coordinates: [
          data.location.coordinates[0],
          data.location.coordinates[1],
        ],
      });
      setLoading(false);
    }
    
  }, [id]);

  return (
    <div className="locationBox">
      <h1 className="lTitle">Location</h1>
      <div className="viewLocation">
      <img src={mapboximg} className="tab_location" alt="" />
          <button className="viewMap seeMapBtn" onClick={togglePopUp}>
            View Map
          </button>
      </div>

      {!loading && showPopUp &&  (
        <div className="popup-background" onClick={closePopUp}>
          <div className="popup-content">
            <Mapbox viewmap={hotel}  size={size}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationBox;
