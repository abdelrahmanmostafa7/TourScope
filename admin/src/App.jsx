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
          <Route path="/editRoom" element={<EditRoom />} />
          <Route path="/editRooms" element={<EditRooms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
