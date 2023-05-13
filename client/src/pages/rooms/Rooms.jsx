import "./rooms.scss"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import RoomCard from "../../components/roomCard/RoomCard";
import { useLocation } from "react-router-dom"
import useFetch from "../../hook/useFetch.js"
import Loading from "../../components/Loading/Loading";
import { useState } from "react";


const Rooms = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [roomsdata,setdata] = useState(location.state.roomsdata) 
    
    
    
    
    
   const { data: rooms, loading: roomsLoading } = useFetch(`/room/finds/${id}`);

    return (
        <div>
            <Navbar />
            <div className="roomsContainer">
                <div className="roomsWrapper">
                    <h1 className="roomTitle">Choose your Room</h1>
                    <div className="roomCards">
                        {roomsLoading ? <Loading /> : <>
                            {roomsdata.map((item) => (  
                        <RoomCard item={item} key={item._id} />
                      ))}
                        </>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Rooms