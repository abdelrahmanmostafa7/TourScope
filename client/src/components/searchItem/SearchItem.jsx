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
        <div className="searchItem">
            <img
                src={item.images[0]}
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <h1 className="siTitle" onClick={hotelDetails}>{item.name}</h1>
                <p className="siDistance">Distance From City Center : {item.distanceFromCityCenter}Km</p>
                <span className="siFeatures">
                    {item.amenities.slice(0, 9).map((amenity, i) => (
                        <div className="siFeaturesWrapper" key={i}>
                            {amenity === "Free WiFi" ? (
                                <>
                                    <img src={Wifi} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Bar" ? (
                                <>
                                    <img src={Bar} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Non-smoking rooms" ? (
                                <>
                                    <img src={NoSmoking} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Room service" ? (
                                <>
                                    <img src={RoomService} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Elevator" ? (
                                <>
                                    <img src={Elevator} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Terrace" ? (
                                <>
                                    <img src={Terrace} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Air conditioning" ? (
                                <>
                                    <img src={AirConditioning} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Laundry" ? (
                                <>
                                    <img src={Laundry} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "24-hour front desk" ? (
                                <>
                                    <img src={Hours} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "La Terrazza" ? (
                                <>
                                    <img src={LaTerrazza} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Breakfast" ? (
                                <>
                                    <img src={LaTerrazza} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Restaurant" ? (
                                <>
                                    <img src={LaTerrazza} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Heating" ? (
                                <>
                                    <img src={Heat} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Daily housekeeping" ? (
                                <>
                                    <img src={DailyHouseKeeping} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Family rooms" ? (
                                <>
                                    <img src={FamilyRooms} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Tea/Coffee Maker in All Rooms" ? (
                                <>
                                    <img src={CoffeeMaker} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Baggage storage" ? (
                                <>
                                    <img src={Luggage} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Parking on site" ? (
                                <>
                                    <img src={parking} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Parking" ? (
                                <>
                                    <img src={parking} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Free parking" ? (
                                <>
                                    <img src={parking} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Private Parking" ? (
                                <>
                                    <img src={parking} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Fitness center" ? (
                                <>
                                    <img src={FitnessCenter} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Airport shuttle" ? (
                                <>
                                    <img src={AirportShuttle} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : amenity === "Outdoor swimming pool" ? (
                                <>
                                    <img src={Pool} alt="" className="amenityImg" /> <span className="transText">-</span> {amenity}
                                </>
                            ) : (
                                <>
                                    ✔ {amenity}
                                </>
                            )}
                        </div>
                    ))}
                </span>
            </div>
            <div className="siDetails">
                <div className="saveRating">
                    {item.rating && <div className="siRating">
                        <button>{item.rating}</button>
                    </div>}
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
                <div className="siDetailTexts">
                    <span className="siPrice">{item.price}</span>
                    <button className="siCheckButton" onClick={hotelDetails}>View Hotel</button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem