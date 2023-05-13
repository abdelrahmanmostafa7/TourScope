import "./searchItem.scss"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { useState } from "react"
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Wifi from "../../image/wif1i.png"
import Bar from "../../image/martini.png"
import Laundry from "../../image/washe1r.png"
import Heat from "../../image/heat.png"
import NoSmoking from "../../image/no-smoking.png"
import RoomService from "../../image/hotel-service.png"
import Elevator from "../../image/lift.png"
import Terrace from "../../image/terrace.png"
import AirConditioning from "../../image/airConditioning.png"
import Hours from "../../image/24-hours.png"
import LaTerrazza from "../../image/dish.png"
import DailyHouseKeeping from "../../image/mop.png"
import FamilyRooms from "../../image/family.png"
import CoffeeMaker from "../../image/coffee-machine.png"
import Luggage from "../../image/luggage.png"
import parking from "../../image/parking-area.png"
import FitnessCenter from "../../image/gym.png"
import AirportShuttle from "../../image/bus.png"
import Pool from "../../image/poolIcon.png"
import Check from "../../image/check (1).png"
import Spa from "../../image/massage.png"
import newRequest from "../../utils/newRequest";
import useFetch from "../../hook/useFetch";

const SearchItem = ({ item }) => {
    const location = useLocation()
    const [destination, setDestination] = useState(location.state?.destination ? location.state.destination : "london")
    const [date, setDate] = useState(location.state?.date ? location.state.date : [{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    }])

    const [options, setOptions] = useState(location.state?.options ? location.state.options : {
        adult: 1,
        children: 0,
        room: 1,
    })

    const navigate = useNavigate()
    const hotelDetails = () => {
        navigate(`/hotels/${item._id}`, { state: { destination, date, options } })
    }


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    // const id = currentUser._id
    // const hotelId = item._id

    // const handleButton = async () => {
    //     try {
    //         await newRequest.put(`/user/addOrRemove/${id}`, { hotelId })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <div>
            <div className="hotelCardContainer" onClick={hotelDetails}>
                <div className="hotelCardLeft">
                    <img src={item.images[0]} alt="" className='hotelCardImg' />
                </div>
                <div className="hotelCardCenter">
                    <div className="hotelCenterTop">
                        <h1 className='hotelTitle' onClick={hotelDetails}>{item.name}</h1>
                        <p className='hotelDistance'>Distance From City Center : {item.distanceFromCityCenter} Km</p>
                    </div>
                    <div className="hotelCenterBottom">
                        {item.amenities.slice(0, 9).map((amenity, i) => (
                            <div className="hotelAmenity" key={i}>
                                {
                                    amenity === "Free WiFi" ? (
                                        <>
                                            <img src={Wifi} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Bar" ? (
                                        <>
                                            <img src={Bar} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Non-smoking rooms" ? (
                                        <>
                                            <img src={NoSmoking} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Room service" ? (
                                        <>
                                            <img src={RoomService} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Elevator" ? (
                                        <>
                                            <img src={Elevator} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Terrace" ? (
                                        <>
                                            <img src={Terrace} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Air conditioning" ? (
                                        <>
                                            <img src={AirConditioning} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Laundry" ? (
                                        <>
                                            <img src={Laundry} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "24-hour front desk" ? (
                                        <>
                                            <img src={Hours} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "La Terrazza" ? (
                                        <>
                                            <img src={LaTerrazza} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Breakfast" ? (
                                        <>
                                            <img src={LaTerrazza} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Restaurant" ? (
                                        <>
                                            <img src={LaTerrazza} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Heating" ? (
                                        <>
                                            <img src={Heat} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Daily housekeeping" ? (
                                        <>
                                            <img src={DailyHouseKeeping} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Family rooms" ? (
                                        <>
                                            <img src={FamilyRooms} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Tea/Coffee Maker in All Rooms" ? (
                                        <>
                                            <img src={CoffeeMaker} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Baggage storage" ? (
                                        <>
                                            <img src={Luggage} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Free parking" ? (
                                        <>
                                            <img src={parking} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Parking on site" ? (
                                        <>
                                            <img src={parking} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Parking" ? (
                                        <>
                                            <img src={parking} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Private Parking" ? (
                                        <>
                                            <img src={parking} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Fitness center" ? (
                                        <>
                                            <img src={FitnessCenter} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Airport shuttle" ? (
                                        <>
                                            <img src={AirportShuttle} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Outdoor swimming pool" ? (
                                        <>
                                            <img src={Pool} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "2 swimming pools" ? (
                                        <>
                                            <img src={Pool} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) : amenity === "Spa" ? (
                                        <>
                                            <img src={Spa} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                    ) :
                                        <>
                                            <img src={Check} alt="" className="amenityIcon" /> {amenity}
                                        </>
                                }
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="hotelCardRight">
                    <div className="hotelRightTop">
                        {
                            item.rating && <div className="hotelRating"><button>{item.rating}</button></div>
                        }
                        <Checkbox
                            {...label}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                            sx={{
                                color: "#142662",
                                '&.Mui-checked': {
                                    color: "#142662",
                                },
                            }}
                        />
                    </div>
                    <div className="hotelRightBottom">
                        <div className="priceDetails">
                            <span className='hotelPrice'>{item.price} EGP</span>
                            <p>For {item.deals.rooms}xRoom</p>
                            <p>Total Price {item.deals.price}</p>
                        </div>
                        <button className='btn' >View Hotel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItem