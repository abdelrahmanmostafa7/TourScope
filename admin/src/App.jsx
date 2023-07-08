import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/AdminHome";
import New from "./pages/NewUser/NewUser";
import UserStatus from "./pages/UserStatus/UserStatus";
import ReservationStatus from "./pages/Reservation Status/ReservationStatus"
import HotelEdit from "./pages/HotelEdit/HotelEdit";
import EditRoom from './pages/RoomEdit/RoomEdit';
import EditRooms from './pages/EditRooms/EditRooms';
import LogInOut from "./pages/login/LogIn";
import Page404 from "./pages/404/Page404"
function App() {
  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInOut />} />
          <Route path="/Login" element={<LogInOut />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/New" element={<New />} />
          <Route path="/UserStatus" element={<UserStatus />} />
          <Route path="/ReservationStatus" element={<ReservationStatus />} />
          <Route path="/HotelEdit" element={<HotelEdit />} />
          <Route path="/editRoom/:id" element={<EditRoom />} />
          <Route path="/editRooms" element={<EditRooms />} />
          <Route path="/404" element={<Page404 />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;