import "./header.scss"
import logo from "../../image/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import user from "../../image/user.png"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from 'react-typewriter-effect';
import { Link } from "react-router-dom";
import favouriteList from "../../image/favouriteList.png"
import signOut from "../../image/signOut.png"
import reservation from "../../image/reservation.png"
import manageAccount from "../../image/manageAccount.png"
import newRequest from "../../utils/newRequest.js"



const Header = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)


  const [destination, setDestination] = useState(localStorage.getItem("userCity") ? localStorage.getItem("userCity") : "london")
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date().setDate(new Date().getDate() + 1),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };


  const navigate = useNavigate()

  const handelSearch = () => {
     navigate("/hotels", { state: { destination, date, options } })
     window.scrollTo(0, 0);
  }

  const hotelPage = () => {
    navigate("/hotels", { state: { destination, date, options } })
    window.scrollTo(0, 0);;
  }

  const contactBtn = () => {
    navigate("/contact")
    window.scrollTo(0, 0);;

  }
  const logInBtn = () => {
    navigate("/logInOut")
    window.scrollTo(0, 0);;

  }
  const signUp = () => {
    const signup = true
    navigate("/logInOut", { state: { signup } })
    window.scrollTo(0, 0);;
  }

  useEffect(() => {
    try {
      const res =  newRequest.post("/auth/currentuser")
      res.then(res => {
        if (res.data){
          localStorage.setItem("currentUser", JSON.stringify(res.data))
        }
      })   
    }
    catch (err) {
      // setError(err.response.data)
    }
  }, []);


  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const handleSignout = async () => {
    try {
      await newRequest.post("/auth/signout")
      localStorage.setItem("currentUser", null)
      navigate("/")
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  }

  return (

    <div className="header">
      <div className="headerContainer">
        {/*  HEADER Navbar  */}
        <div className="headerNavbar">
          <div className="HeaderNavbarContainer">
            <img src={logo} className="logo" alt="" />
            <div className="listContainer">
                <span className="headerListItem">Home</span>
                <span className="headerListItem" onClick={hotelPage}>Hotels</span>
                <span className="headerListItem" onClick={contactBtn}>Contact</span>
            </div>

            {!currentUser && <div className="navItem">
              <button className="navButton" onClick={logInBtn}>Sign in</button>
              <button className="navButton" onClick={signUp}>Sign up</button>
            </div>}

            {currentUser &&
              (
                <div className="user" onClick={() => setOpenMenu(!openMenu)}>
                  <img src={user} alt="" className="profileImg" />
                  <span clacssName="userName">{currentUser?.first_name}</span>
                  {openMenu && <div className="menuOptions">
                    <Link to='/personalDetails'>
                      <div className="option2">
                        <img src={manageAccount} alt="" className="icon2" />
                        <span>Manage account</span>
                      </div>
                    </Link>
                    <hr />
                    <Link to='/reservations'>
                      <div className="option2">
                        <img src={reservation} alt="" className="icon2" />
                        <span>My Reservations</span>
                      </div>
                    </Link>
                    <hr />
                    <Link to='/favoriteList'>
                      <div className="option2">
                        <img src={favouriteList} alt="" className="icon2" />
                        <span>Favorite list</span>
                      </div>
                    </Link>
                    <hr />
                    <Link onClick={handleSignout}>
                      <div className="option2">
                        <img src={signOut} alt="" className="icon2" />
                        <span>Sign out</span>
                      </div>
                    </Link>
                  </div>}
                </div>
              )}
          </div>


          <div className="line1">
            <span className="one"></span>
            <span className="two"></span>
            <span className="three"></span>
          </div>
          <div className="line2">
            <span className="one"></span>
            <span className="two"></span>
            <span className="three"></span>
          </div>

          <div className="AnimatedHeader">
            <p className="headerTitle FristWordTitle">
              <TypeWriterEffect
                textStyle={{
                  fontWeight: 800,
                  fontSize: '30px',
                }}
                startDelay={1000}
                cursorColor="#fff"
                text="Welcome To"
                typeSpeed={100}
                hideCursorAfterText={true}
              />
            </p>
            <p className="headerTitle SecoundWordTitle">
              <TypeWriterEffect
                textStyle={{
                  fontWeight: 800,
                  fontSize: '30px'
                }}
                startDelay={2300}
                cursorColor="#fff"
                text="Tourscope"
                typeSpeed={200}
                hideCursorAfterText={true}
              />
            </p>
          </div>

          {/* Search bar  */}
          <div className="headerSearch">
            <div className="headerSearchItem">
              <input type="text" placeholder="Where are you going" className="headerSearchInput" onChange={e => setDestination(e.target.value)} />
            </div>

            <div className="headerSearchItem">
              <span className="headerSearchText" onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  const { selection } = item;
                  if (selection.startDate.getTime() === selection.endDate.getTime()) {
                    selection.endDate = new Date(selection.endDate.getTime() + 86400000);
                  }
                  setDate([selection]);
                }}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />}
            </div>

            <div className="headerSearchItem">
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
              {openOptions && (
                <div className="options">
                  <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.room <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="headerSearchItem" >
              <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handelSearch} className="searchIcon" />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header