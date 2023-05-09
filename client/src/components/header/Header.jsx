import "./header.scss"
import logo from "../../image/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBed,
  faCalendarDays,
  faPerson,
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
import Aleart from "../../components/Aleart/Aleart"



const Header = ({ type }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openDate, setOpenDate] = useState(false)
  const [showerror, setshow] = useState(false)

  const [destination, setDestination] = useState(localStorage.getItem("userCity") ? localStorage.getItem("userCity") : "london")
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date().setDate(new Date().getDate() + 1),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);

  //hadel options

  const [addroomsbtn, setaddactive] = useState(false);
  const [removebtn, setactiveremove] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })
  const [rooms, setRooms] = useState([{
    adult: 2,
    children: 0,
  }]);





  const navigate = useNavigate()

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




  const handelSearch = () => {
    const options = { year: 'numeric', day: '2-digit', month: '2-digit' };

    if (date[0].startDate.toLocaleDateString(undefined, options) == new Date(date[0].endDate).toLocaleDateString(undefined, options)) {
      setshow(true)
      setshow(true)
    } else {
      navigate("/hotels", { state: { destination, date, options, rooms } })
      window.scrollTo(0, 0);;

    }
  }


  // hide and show content header  
  const [showTagText, setShowTagText] = useState(false);
  const toggleroom = () => {
    setOpenDate(false);
    setOpenOptions(!openOptions);
  };
  const toggledate = () => {
    setOpenOptions(false);
    setOpenDate(!openDate);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleclickoutsidecomponent, true);
  }, []);
  const refcomponent = useRef(null);
  const handleclickoutsidecomponent = (e) => {
    if (refcomponent.current && !refcomponent.current.contains(e.target)) {
      setOpenDate(false);
      setOpenOptions(false);
      refcomponent.current = null;
    }
  };


  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const handleSignout = async () => {
    try {
      await newRequest.post("/auth/signout")
      localStorage.setItem("currentUser", null)
      navigate("/")
      window.scrollTo(0, 0);;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (showerror) {
      setTimeout(() => {
        setshow(false)
      }, 3000);
    }
  }, [showerror])




  useEffect(() => {

    if (rooms.length == 1) {
      setactiveremove(true)
    } else {
      setactiveremove(false)

    }

    if (rooms.length > 9) {
      setaddactive(true)
    } else {
      setaddactive(false)

    }
  }, [rooms])

  const removeRoom = (index) => {
    const updatedRoomsList = [...rooms];
    const updatedOptions = {
      room: options.room - 1,
      adult: options.adult - updatedRoomsList[index].adult,
      children: options.children - updatedRoomsList[index].children
    };
    setOptions(updatedOptions);
    updatedRoomsList.splice(index, 1);
    setRooms(updatedRoomsList);
  };


  const handleOption = (name, action, index) => {
    const value = options[name];
    const roomslist = [...rooms];
    if (action === "i") {
      setOptions({ ...options, [name]: value + 1 });
      roomslist[index] = { ...roomslist[index], [name]: roomslist[index][name] + 1 };
      setRooms(roomslist);
    } else if (action === "d") {
      if (value > 0) {
        setOptions({ ...options, [name]: value - 1 });
        roomslist[index] = { ...roomslist[index], [name]: roomslist[index][name] - 1 };
        setRooms(roomslist);
      }
    }
  };


  const addRoom = () => {
    setOptions((perv_options) => {
      return { ...perv_options, room: options.room + 1, adult: options.adult + 2, children: options.children + 0 }
    });
    setRooms([...rooms, {
      adult: 2, children: 0
    }]);

  };


  const scrollableRef = useRef(null);
  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (scrollable) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  }, [rooms.length]);


  return (

    <div className="header">
      <div className="headerContainer">
        {/*  HEADER Navbar  */}
        <div className="headerNavbar">
          <div className="HeaderNavbarContainer">
            <img src={logo} className="logo" alt="" />
            <div className="listContainer">
              <div className="headerListItem active ">
                <span >Home</span>
              </div>
              <div className="headerListItem">
                <span onClick={hotelPage}>Hotels</span>
              </div>
              <div className="headerListItem">
                <span onClick={contactBtn}>Contact</span>
              </div>
            </div>

            {!currentUser && <div className="navItem">
              <button className="navButton" onClick={logInBtn}>Sign in</button>
              <button className="navButton" onClick={signUp}>Sign up</button>
            </div>}
            <div className="homeError">
              {showerror && <Aleart type={"error"} message={"invalid date"} />}
            </div>

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

          {/* <h2 className="searchTitle">Find your next stay</h2>
          <span className="searchP">Search low prices on hotels, homes and much more...</span> */}
          {/* Search bar  */}
          <div className="headerSearch">
            <div className="headerSearchItem">
              <input type="text" placeholder="Where are you going" className="headerSearchInput" onChange={e => setDestination(e.target.value)} />
            </div>

            <div className="headerSearchItem" ref={refcomponent}>
              <span onClick={toggledate} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
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
              <span onClick={toggleroom} className="headerSearchText ">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
              {
                openOptions && <div ref={refcomponent} className="options">
                  <div ref={scrollableRef} className="optionsContainer">
                    <label>Travelers</label>
                    {rooms.map((room, index) => (
                      <div className="cards">
                        <div className="optionsTitle">
                          <label>Room {index + 1}</label>
                          <button onClick={() => removeRoom(index)} className="removebtn" {
                            ...removebtn && { style: { display: "none" } }
                          }><FontAwesomeIcon icon={faTrashCan} className="roomstable_icon" />Remove</button>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Adult</span>
                          <div className="optionCounter">
                            <button
                              className="optionCounterButton"
                              disabled={room.adult <= 1}
                              onClick={() => handleOption("adult", "d", index)}> - </button>
                            <span className="optionCounterNumber">{room.adult}</span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("adult", "i", index)}> + </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Children</span>
                          <div className="optionCounter">
                            <button
                              className="optionCounterButton"
                              disabled={room.children <= 0}
                              onClick={() => handleOption("children", "d", index)}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">{room.children}</span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("children", "i", index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button disabled={addroomsbtn} onClick={addRoom} style={{ marginBottom: '10px' }} className="button-34">add room</button>
                  </div>
                </div>
              }
            </div>

            <div className="headerSearchItem" onMouseOver={() => setShowTagText(true)} onMouseOut={() => setShowTagText(false)} >
              <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handelSearch} className="searchIcon" />
              {showTagText && <div className="tag-text">Search</div>}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header