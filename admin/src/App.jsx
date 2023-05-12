import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/AdminHome";
import New from "./pages/NewUser/NewUser";
import ReservationStatus from "./pages/ReservationStatus/ReservationStatus";
import UserStatus from "./pages/UserStatus/UserStatus";
import HotelEdit from "./pages/HotelEdit/HotelEdit";
import LogInOut from "./pages/Login-out/LogInOut";

function App() {

  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LogInOut" element={<LogInOut />} />
          <Route path="/ReservationStatus" element={<ReservationStatus />} />
          <Route path="/New" element={<New />} />
          <Route path="/UserStatus" element={<UserStatus />} />
          <Route path="/HotelEdit" element={<HotelEdit />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
