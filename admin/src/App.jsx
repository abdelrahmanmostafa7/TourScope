import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/AdminHome";
import New from "./pages/NewUser/NewUser";
import ReservationStatus from "./pages/ReservationStatus/ReservationStatus";
import UserStatus from "./pages/UserStatus/UserStatus";
import HotelEdit from "./pages/HotelEdit/HotelEdit";
import EditRooms from './pages/RoomsEdit/RoomsEdit';
import LogInOut from './pages/Login-out/LogInOut';
import NewRoom from "./pages/newRoom/NewRoom";
import UpdateRoom from "./components/UpdateRoom/UpdateRoom";
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
          <Route path="/editRooms" element={<EditRooms />} />
          <Route path="/newRoom" element={<NewRoom />} />
          <Route path="/updateRoom" element={<UpdateRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
