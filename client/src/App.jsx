import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Room from "./pages/room/Room";
import Rooms from "./pages/rooms/Rooms.jsx";
import FavoriteList from "./pages/favoritelist/FavoriteList";
import PersonalDetails from "./pages/personaldetails/PersonalDetails";
import EditAccount from "./pages/editaccount/EditAccount";
import Contact from "./pages/contact/Contact.jsx";
import ReservationDetails from "./pages/reservations/Reservations";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import NewPassword from "./components/newPassword/NewPassword";
import RoomCard from "./components/roomCard/RoomCard";
import Planner from "./pages/Planner/Planner";
import Hote_managment from "./pages/Admin/Hotel_managment/Hotel_managment";
import Revervations from "./pages/Admin/reservations/Reservations";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import LogInOut from "./components/Login-out/LogInOut";
import PlannerOneChoiceBtn from "./components/PlannerOneChoiceBtn/PlannerOneChoiceBtn";
import Loading from "./components/Loading/Loading";
import Payment from "./pages/payment/Payment"

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/rooms/:id" element={<Rooms />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/favoriteList" element={<FavoriteList />} />
        <Route path="/personalDetails" element={<PersonalDetails />} />
        <Route path="/editAccount" element={<EditAccount />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservations" element={<ReservationDetails />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<NewPassword />} />
        <Route path="/RoomCard" element={<RoomCard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotel_managment" element={<Hote_managment />} />
        <Route path="/admin_reservations" element={<Revervations />} />
        <Route path="/logInOut" element={<LogInOut />} />
        <Route path="btn" element={<PlannerOneChoiceBtn />} />
        <Route path="loading" element={<Loading />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
