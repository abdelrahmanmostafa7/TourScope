import "./RoomEdit.scss"
import { useState } from "react";
import useFetch from "../../hook/useFetch.js"
import Loading from '../../components/Loading/Loading';
import Heat from "../../image/heat.png"
import CoffeeMaker from "../../image/coffee-machine.png"
import Check from "../../image/check (1).png"
import FreeToiletries from "../../image/toiletries.png"
import Wc from "../../image/wc-sign.png"
import shower from "../../image/shower (1).png"
import Towels from "../../image/towel (1).png"
import Linens from "../../image/bed-sheets.png"
import Desk from "../../image/desk.png"
import Telephone from "../../image/phone-call.png"
import Ironing from "../../image/ironing.png"
import Socket from "../../image/socket.png"
import Tiles from "../../image/tiles.png"
import Tv from "../../image/television.png"
import Hairdryer from "../../image/hairdryer.png"
import Carpeted from "../../image/carpet.png"
import Kettle from "../../image/kettle.png"
import Outdoor from "../../image/sun-umbrella.png"
import CableChannels from "../../image/cable-tv.png"
import Closet from "../../image/closet.png"
import DiningArea from "../../image/outside.png"
import Safe from "../../image/safe.png"
import Bathrobe from "../../image/bathrobe.png"
import DiningTable from "../../image/chair.png"
import Sofa from "../../image/Sofa.png"
import ToiletPaper from "../../image/toilet-paper.png"
import Fan from "../../image/ceiling-fan.png"
import Alarm from "../../image/alarm.png"
import HandSanitizer from "../../image/liquid-soap.png"
import AirPurifiers from "../../image/air-purifier.png"
import Fax from "../../image/fax.png"
import Point from "../../image/right-arrow (3).png"
import Radio from "../../image/radio.png"
import Refrigerator from "../../image/refrigerator.png"
import Kitchen from "../../image/kitchen.png"
import CleaningProducts from "../../image/cleaning.png"
import Microwave from "../../image/microwave.png"
import Import from "../../image/import.png"
import Hypoallergenic from "../../image/hypoallergenic.png"
import Kitchenware from "../../image/kitchenware.png"
import WakeUp from "../../image/alarm-clock.png"
import Toaster from "../../image/toaster.png"
import SofaBed from "../../image/sofa-bed.png"
import Add from "../../image/add.png"
import Sidebar from "../../components/sidebar/Sidebar";
import Remove from "../../image/remove.png"
import Elevator from "../../image/lift.png"
import Laundry from "../../image/washe1r.png"
import Hours from "../../image/24-hours.png"
import Wifi from "../../image/wif1i.png"
import RoomService from "../../image/hotel-service.png"

// import { Checkbox } from '@mui/material/Checkbox';
import newRequest from '../../utils/newRequest'
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Size from "../../image/maximize.png"
import Book from "../../image/save-instagram (1).png"
import EditIcon from '@mui/icons-material/Edit';
import Upload from "../../image/upload.png"

function RoomEdit() {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const { data, loading } = useFetch(`/room/find/${id}`)
    const [open, setOpen] = useState(false);
    const features = [
        "Free toiletries",
        "Kitchen",
        "Toilet",
        "Sofa",
        "Bathtub or shower",
        "Towels",
        "Socket near the bed",
        "Cleaning products",
        "Hypoallergenic",
        "Desk",
        "Sitting area",
        "Private entrance",
        "TV",
        "Refrigerator",
        "Tea/Coffee maker",
        "Iron",
        "Microwave",
        "Hairdryer",
        "Kitchenware",
        "Kitchen",
        "Fan",
        "Towels/Sheets",
        "Outdoor furniture",
        "Cable channels",
        "Wake-up service",
        "Wardrobe or closet",
        "Toaster",
        "Dining area",
        "Dining table",
        "Clothes rack",
        "Toilet paper",
        "Sofa bed",
        "Hand sanitizer",
        "Kettle"
    ]
    const [showPopUp, setShowPopUp] = useState(false);
    const togglePopUp = () => {
        setShowPopUp(true);
    };

    const closePopUp = (event) => {
        if (event.target === event.currentTarget) {
            setShowPopUp(false);
        }
    };
    const fac = data.facilities

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    // const handleSubmit = async (e) => {
    //     console.log("ay 7aga2")
    //     e.preventDefault();
    //     try {
    //         const requestBody = {
    //             facilities: selectedCheckboxes
    //         };
    //         await newRequest.put("/room/update/643af6e310a61c109435e5dc", requestBody)

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const [toggle, setToggle] = useState(false)
    const handleCheckboxChange = (e) => {
        const checkboxValue = e.target.value;
        if (e.target.checked) {
            setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
        } else {
            setSelectedCheckboxes(selectedCheckboxes.filter((value) => value !== checkboxValue));
        }
        e.currentTarget.querySelector('input').checked = !e.currentTarget.querySelector('input').checked

    };
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isChecked, setIsChecked] = useState(true)

    useEffect(() => {
        if (data.facilities)
            setDataLoaded(true);
    }, [data])
    const handleDelete = async (facility) => {
        try {
            await newRequest.put(`/room/deleteRoomItem/${id}`, { facility });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeletePhoto = async (photo) => {
        try {
            await newRequest.put(`/room/deleteRoomItem/${id}`, { photo });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const navigate = useNavigate()
    const [facilities, setFacilities] = useState([])

    const handleFacilitiesChange = (event) => {
        const facilitiesArray = event.target.value.split(',');
        setFacilities(facilitiesArray);
    };
    const handleSubmitFacilities = async (e) => {
        e.preventDefault();
        try {
            const currentFacilities = data.facilities;
            const combinedFacilities = [...currentFacilities, ...facilities];
            await newRequest.put(`/Room/update/${id}`, { facilities: combinedFacilities });
        } catch (error) {
            console.log(error);
        }
        navigate(`/editRoom/${id}`)
        console.log("Facilities Added Successfully ...");
    };
    const goBack = () => {
        navigate("/editRoom")
    }
    const click = () => {
        window.location.reload()
    }


    // edit room details 
    const [roomDetails, setRoomDetails] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = (name, value) => {
        setRoomDetails((prev) => ({ ...prev, [name]: value }));
        setIsEdit(true);
    };
    const DetailsHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await newRequest.put(`/room/update/${id}`, roomDetails);
            setIsEdit(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    // edit room name 
    const [text, setText] = useState(data.name);
    // const [isEdit, setIsEdit] = useState(false);
    const handleEditName = () => {
        setText(data.name);
        setIsEdit(true);
    };
    const handleNameSubmit = async (e) => {
        e.preventDefault();
        try {
            await newRequest.put(`/room/update/${id}`, {
                name: text,
            });
            setIsEdit(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="RoomEdit">
                <Sidebar className="sideBarHotel" />
                {loading ? <Loading /> :
                    (<div className="roomContainer">
                        <div className="roomWrapper">
                            <form action="" onSubmit={handleNameSubmit} className="RoomNameForm">
                                {isEdit ? (
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="roomInputName"
                                    />
                                ) : (
                                    <h1 className="roomTitle">{data.name}</h1>
                                )}
                                {isEdit ? (
                                    <button type="submit" className="hotelDetailsSubmit">
                                        Submit
                                    </button>
                                ) : (
                                        <EditIcon className="roomNameEdit" onClick={handleEditName} />
                                )}
                            </form>
                            <div className="roomImages">
                                {data.images?.map((photo, i) => (
                                    <div className="roomImgWrapper" key={i}>
                                        <img
                                            onClick={() => handleOpen(i)}
                                            src={photo}
                                            alt=""
                                            className="RoomEditImg"
                                        />
                                        <img src={Remove} alt="" className="remove" onClick={() => handleDeletePhoto(photo)} />
                                    </div>
                                ))}
                                <div className="addRoomImg">
                                    <label htmlFor="file" className="addRoomImgLabel">
                                        <img src={Upload} alt="" className='newRoomImg' />
                                        Click To Add New Photo
                                    </label>
                                    <input type="file" className="imgUpload"  />
                                </div>
                            </div>
                            <h2 className="aboutRoom">Room Features</h2>
                            <span className="RoomFeatures">
                                {data.facilities?.map((facilities, i) => (
                                    <div className="FeaturesWrapper" key={i}>
                                        {facilities === "Free toiletries" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={FreeToiletries} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />
                                            </div>
                                        ) : facilities === "Toilet" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Wc} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Kitchen" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Kitchen} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Kitchenette" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Kitchen} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Wake-up service" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={WakeUp} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Microwave" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Microwave} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Sofa bed" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={SofaBed} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Toaster" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Toaster} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Kitchenware" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Kitchenware} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Hypoallergenic" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Hypoallergenic} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Cleaning products" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={CleaningProducts} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Private entrance" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Import} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Bathtub or shower" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={shower} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Shower" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={shower} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Radio" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Radio} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Refrigerator" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Refrigerator} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Towels" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Towels} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Towels/Sheets (extra fee)" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Towels} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Linens" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Linens} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Desk" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Desk} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Telephone" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Telephone} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Ironing facilities" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Ironing} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Iron" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Ironing} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Socket near the bed" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Socket} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Heating" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Heat} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "TV" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Tv} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Tile/Marble floor" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Tiles} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Tea/Coffee maker" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={CoffeeMaker} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Hairdryer" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Hairdryer} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Carpeted" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Carpeted} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Fax" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Fax} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Hardwood or parquet floors" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Carpeted} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Electric kettle" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Kettle} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Outdoor furniture" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Outdoor} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Cable channels" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={CableChannels} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Wardrobe or closet" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Closet} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Clothes rack" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Closet} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Dining area" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={DiningArea} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Safe" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Safe} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Bathrobe" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Bathrobe} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Dining table" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={DiningTable} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Sofa" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Sofa} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Sitting area" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Sofa} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Sitting area" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Sofa} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Toilet paper" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={ToiletPaper} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Fan" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Fan} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Alarm clock" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Alarm} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : facilities === "Hand sanitizer" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={HandSanitizer} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />
                                            </div>
                                        ) : facilities === "Air purifiers" ? (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={AirPurifiers} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />

                                            </div>
                                        ) : (
                                            <div className="inHotel">
                                                <h3 className="featureTitle">{facilities}</h3>
                                                <img src={Check} alt="" className="featureImages" />
                                                <img src={Remove} alt="" className="remove2" onClick={() => handleDelete(facilities)} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="FeaturesWrapper">
                                    <div className="inHotel">
                                        <img src={Add} alt="" className="featureImages big" onClick={togglePopUp} />
                                    </div>
                                </div>
                            </span>
                            {showPopUp && <div className="popup-background" onClick={closePopUp} >
                                <form className="popup-content-1" onSubmit={handleSubmitFacilities}>
                                    <h2 className='newRoomHeading'>Add Facilities</h2>
                                    <div className="col">
                                        <label htmlFor="">Write facility then " , " after each one</label>
                                        <textarea className='ta' name="amenities" onChange={handleFacilitiesChange} required></textarea>
                                        <div className="bottom">
                                            <button className='btn' >ADD</button>
                                            <button className='btn' onClick={closePopUp}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>}
                            <form onSubmit={DetailsHandleSubmit}>
                                <div className="roomDetailsTop">
                                    <h2 className="aboutRoom">Room Details</h2>
                                    {isEdit ? (
                                        <button type="submit" className="hotelDetailsSubmit">
                                            Submit
                                        </button>
                                    ) : (
                                        <EditIcon className="roomDetailsEdit" onClick={handleEdit} />
                                    )}
                                </div>

                                <div className="roomDetailsBottom">
                                    <div className="roomDetail">
                                        <h2>Price :</h2>
                                        {isEdit ? (
                                            <input
                                                type="text"
                                                value={roomDetails.price || data.price} // use previous value from state or current value from data
                                                onChange={(e) => handleEdit(e.target.name, e.target.value)}
                                                name="price"
                                                className="roomDetailInput"
                                            />
                                        ) : (
                                            <h3 className="roomDetailP">{data.price}</h3>
                                        )}

                                    </div>
                                    <div className="roomDetail">
                                        <h2>Size :</h2>
                                        {isEdit ? (
                                            <input
                                                type="text"
                                                value={roomDetails.size || data.size} // use previous value from state or current value from data
                                                onChange={(e) => handleEdit(e.target.name, e.target.value)}
                                                name="size"
                                                className="roomDetailInput"
                                            />
                                        ) : (
                                            <h3 className="roomDetailP">{data.size}</h3>
                                        )}
                                    </div>
                                    <div className="roomDetail">
                                        <h2>Beds :</h2>
                                        {isEdit ? (
                                            <input
                                                type="text"
                                                value={roomDetails.beds || data.beds} // use previous value from state or current value from data
                                                onChange={(e) => handleEdit(e.target.name, e.target.value)}
                                                name="beds"
                                                className="roomDetailInput"
                                            />
                                        ) : (
                                            <h3 className="roomDetailP">{data.beds}</h3>
                                        )}
                                    </div>
                                    <div className="roomDetail">
                                        <h2>Max People :</h2>
                                        {isEdit ? (
                                            <input
                                                type="text"
                                                value={roomDetails.maxpeople || data.maxpeople} // use previous value from state or current value from data
                                                onChange={(e) => handleEdit(e.target.name, e.target.value)}
                                                name="maxPeople"
                                                className="roomDetailInput"
                                            />
                                        ) : (
                                            <h3 className="roomDetailP">{data.maxpeople}</h3>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default RoomEdit