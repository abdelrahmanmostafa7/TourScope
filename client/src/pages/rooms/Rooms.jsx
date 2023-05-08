import "./rooms.scss"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import RoomCard from "../../components/roomCard/RoomCard";
import { useLocation } from "react-router-dom"
import useFetch from "../../hook/useFetch.js"
import Loading from "../../components/Loading/Loading";


function Rooms() {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const { data: rooms, loading: roomsLoading } = useFetch(`/room/finds/${id}`);

    return (
        <div>
            <Navbar />
            <div className="roomsContainer">
                <div className="roomsWrapper">
                    <h1 className="roomTitle">Choose your Room</h1>
                    <div className="roomCards">
                        {roomsLoading ? <Loading /> : <>
                            {rooms.map(item =>
                                <RoomCard item={item} key={item._id} />
                            )}
                        </>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Rooms