import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/AdminHome";
import New from "./pages/NewUser/NewUser";
import ReservationStatus from "./pages/ReservationStatus/ReservationStatus";
import UserStatus from "./pages/UserStatus/UserStauts";

function App() {

  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ReservationStatus" element={<ReservationStatus />} />
          <Route path="/New" element={<New />} />
          <Route path="/UserStatus" element={<UserStatus />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
