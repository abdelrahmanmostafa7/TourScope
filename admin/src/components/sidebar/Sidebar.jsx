import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png"
import newRequest from "../../utils/newRequest.js"
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const handleSignout = async () => {
    try {
      await newRequest.post("/auth/signout")
      localStorage.setItem("currentUser", null)
      window.location.reload();
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  const logInBtn = () => {
    navigate("/Login")
  }
  const home = ()=>{
    navigate("/Home")
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/Home" style={{ textDecoration: "none" }}>
          <img src={logo} alt="" className="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={home}>
            <Link to="/" className="dashboardTitle" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span className="pageName">Dashboard</span>
            </Link>
          </li>

          <p className="title">Management</p>
          <Link to="/HotelEdit" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span className="pageName">Hotel Management</span>
            </li>
          </Link>

          <Link to="/editRooms" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span className="pageName">Rooms Management</span>
            </li>
          </Link>

          <p className="title">Status</p>
          <Link to="/UserStatus" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span className="pageName">User</span>
            </li>
          </Link>
          {!currentUser && 
            <li onClick={logInBtn}>
              <ExitToAppIcon className="icon" />
              <span className="pageName">Login</span>
            </li>
          }
          {currentUser && 
            <li onClick={handleSignout}>
              <ExitToAppIcon className="icon" />
              <span className="pageName">Logout</span>
            </li>
          }

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
