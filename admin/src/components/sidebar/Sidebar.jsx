import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">TourScope</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/" className="dashboardTitle" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>

          <p className="title">Hotel</p>
          <Link style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Hotel Management</span>
            </li>
          </Link>
          <li>
            <StoreIcon className="icon" />
            <span>Room Management</span>
          </li>

          <p className="title">Status</p>
          <Link to="/UserStatus" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>User</span>
            </li>
          </Link>
          <Link to="RoomStatus" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>ٌRooms</span>
            </li>
          </Link>
          <Link to="/ReservationStatus" style={{ textDecoration: "none" }}>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>Reservations</span>
            </li>
          </Link>

          <p className="title">Admin</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
