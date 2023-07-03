/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker, Popup } from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import locations from './location.json'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import './mapbox.scss'
import { useNavigate } from 'react-router-dom';
import GetCity from './GetCity.jsx'


function Mapbox({ viewmap }) {
  const [current_clicked, setcurrent_clicked] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: -2.5278115216167407,
    latitude: 40.58631643466279,
    zoom: 1,
  });


  const [customStyle, setStyle] = useState({
    height: '400px',
    width: '1000px',
  });


  const positionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
    circleRadius: 20,
  };
  const navigate = useNavigate()
  const hotelDetails = (hotel) => {
    navigate(`/hotels/` + hotel._id.$oid, { state: { destination: hotel.city } })
  }


  const hander_close = () => {
    setcurrent_clicked(null)
  }


  const filterLocations = () => {
    const filteredLocations = locations.filter((hotel) => {
      const [longitude, latitude] = hotel.location.coordinates;
      const withinLongitude = longitude >= viewport.longitude - 1 && longitude <= viewport.longitude + 1;
      const withinLatitude = latitude >= viewport.latitude - 1 && latitude <= viewport.latitude + 1;
      return withinLongitude && withinLatitude;
    });
    return filteredLocations;
  };
  const token = "pk.eyJ1IjoiYW50ZXJtYW4iLCJhIjoiY2xnbjNoZ3c1MGJ3azNmb2V6cHcyZW44dyJ9.3ZVPifDWiDq0SQj2jPs85w"

  const handleMapClick = (id, long, lat, zoom) => {
    setcurrent_clicked(id)
    setViewport({
      ...viewport,
      longitude: long,
      latitude: lat,
      zoom: zoom,
    });

  };

  useEffect(() => {

    if (viewmap) {
      setStyle({
        height: '600px',
        width: '1200px'
      })
      handleMapClick(viewmap._id, viewmap.coordinates[0], viewmap.coordinates[1], 20)

    }


  }, [viewmap])

  return (
    <div className="app_container">
      <div className='map'>

        <GetCity />
        <Map
          {...viewport}
          onMove={evt => setViewport(evt.viewState)}
          transitionDuration="200"
          style={customStyle}
          mapStyle="mapbox://styles/anterman/clhiduscq01hg01qy1do77vbs"
          mapboxAccessToken="pk.eyJ1IjoiYW50ZXJtYW4iLCJhIjoiY2xnbjNoZ3c1MGJ3azNmb2V6cHcyZW44dyJ9.3ZVPifDWiDq0SQj2jPs85w"
        >
          {/* <div className="mapTitles">
            <h1 className='mapTitle1'>You Can Search On Map</h1>
            <h1 className='mapTitle2'>To find hotels by price</h1>
          </div> */}


          <GeocoderControl mapboxAccessToken={token} position="top-right" />

          <FullscreenControl
            position='bottom-right' />
          <GeolocateControl
            showAccuracyCircle={false}
            positionOptions={positionOptions}
            position='bottom-left'
            fitBoundsOptions={{ maxZoom: 18 }}
          />

          {filterLocations().map((hotel) => (
            <>
              {viewport.zoom > 5 &&
                <Marker
                  longitude={hotel.location.coordinates[0]}
                  latitude={hotel.location.coordinates[1]}
                  onClick={() => handleMapClick(hotel._id, hotel.location.coordinates[0], hotel.location.coordinates[1], viewport.zoom)}
                >
                  <div style={{ position: 'relative', textAlign: 'center', cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faMessage} style={{ fontSize: viewport.zoom * 4, color: "#ffffff" }} />
                    <div style={{ position: 'absolute', bottom: '20px', color: "black", left: 0, right: 0, fontSize: 15, fontStyle: "inherit", fontWeight: 600 }}>
                      <span className="price_user">{hotel.price} &#36;</span>
                    </div>
                  </div>


                </Marker>
              }
              {
                hotel._id === current_clicked && (
                  <Popup
                    key={hotel._id}
                    longitude={hotel.location.coordinates[0]}
                    latitude={hotel.location.coordinates[1]}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setcurrent_clicked(null)}
                    anchor='left'
                  >
                    <div className="card">
                      <img src={hotel.image} alt="" className='hotelCardMapImg' />
                      <p className='hotelMapCardDistance'>Start Price:{hotel.price}<span className='dollar'>$</span> <br /> {hotel.distanceFromCityCenter}35 Km from center</p>
                      <h1 className='name'>{hotel.name}</h1>
                      <span className='hotelMapCardRating'> {hotel.rating}⭐</span>
                      <div className='btn_controllers'>
                        <button class="button-34" role="button" onClick={() => hotelDetails(hotel)}>View Hotel</button>
                        <button class="button-34 close_btn" onClick={hander_close} role="button">Close</button>

                      </div>
                    </div>
                  </Popup>
                )
              }
            </>
          ))}

        </Map>

      </div>
    </div >
  )
}

export default Mapbox
