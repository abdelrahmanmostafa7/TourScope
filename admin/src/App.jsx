import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/AdminHome";
import New from "./pages/NewUser/NewUser";
import ReservationStatus from "./pages/ReservationStatus/ReservationStatus";
import UserStatus from "./pages/UserStatus/UserStatus";
import HotelEdit from "./pages/HotelEdit/HotelEdit";
import EditRoom from './pages/RoomEdit/RoomEdit';
import EditRooms from './pages/EditRooms/EditRooms';
function App() {

  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/LogInOut" element={<LogInOut />} /> */}
          <Route path="/ReservationStatus" element={<ReservationStatus />} />
          <Route path="/New" element={<New />} />
          <Route path="/UserStatus" element={<UserStatus />} />
          <Route path="/HotelEdit" element={<HotelEdit />} />
          <Route path="/editRoom/:id" element={<EditRoom />} />
          <Route path="/editRooms" element={<EditRooms />} />
<<<<<<< HEAD
          <Route path="/newRoom" element={<NewRoom />} />
          <Route path="/updateRoom" element={<UpdateRoom />} />
=======
>>>>>>> 5fc24c90f18dd35094afe025f7fb0c341743d91a
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
