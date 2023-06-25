import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const Widget = ({ type, input }) => {
  let data;
  //temporary
  const amount = input;
  const diff = 20;

  switch (type) {
    case "AverageNight":
      data = {
        title: "Average night",
        isMoney: false,
        // link: "See all users",
        icon: (
          <EditCalendarIcon
            className="icon"
            style={{
              color: "rgb(0, 128, 255,0.2)",
              backgroundColor: "	rgb(0, 191, 255,0.2)	",
            }}
          />
        ),
      };
      break;
    case "Guests":
      data = {
        title: "Guests",
        isMoney: false,
        // link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Reservations":
      data = {
        title: "Reservations",
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Profit":
      data = {
        title: "Profit",
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default: break;

  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount} {data.isMoney && "L.E"}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
