import "./list.scss"
import HotelLocationBox from "../../components/HotelslocationBox/HotelsLocationBox"
import Navbar from "../../components/navBar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem"
import Footer from "../../components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import useSearch from "../../hook/useSearch.js"
import { useLocation } from "react-router-dom"
import { format } from "date-fns";
import { DateRange } from "react-date-range"
import Loading from "../../components/Loading/Loading";
import ScrollTop from "../../components/scrolltop/ScrollTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state?.destination ? location.state.destination : "london")
  const [date, setDate] = useState(location.state?.date ? location.state.date : [{
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate() + 1),
    key: "selection",
  }])

  const [options, setOptions] = useState(location.state?.options ? location.state.options : {
    adult: 1,
    children: 0,
    room: 1
  })
  const [rooms, setRooms] = useState(location.state?.rooms ? location.state.rooms : [{
    adult: 1,
    children: 0,
  }])

  const [addroomsbtn, setaddactive] = useState(false);
  const [removebtn, setactiveremove] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

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
      return { ...perv_options, room: options.room + 1, adult: options.adult + 1, children: options.children + 0 }
    });
    setRooms([...rooms, {
      adult: 1, children: 0
    }]);

  };


  const scrollableRef = useRef(null);
  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (scrollable) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  }, [rooms.length]);



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


  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(50);
  const [max, setMax] = useState(9999);
  const { data, loading, reFetch } = useSearch(`/hotel?city=${destination}&startdate=${date[0].startDate}&enddate=${date[0].endDate}&roomsoption=${encodeURIComponent(JSON.stringify(rooms))}&min=${min || 50}&max=${max || 9999}&limit=${20}`)
  console.log(data)
  const handelSearch = () => {
    reFetch()
  }
  return (
    <div>
      <ScrollTop />

      <Navbar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {!loading && data.length === 0 && (
              <h1 className="noHotelResult">No results found,
                <br />
                There is no Hotel in your City,
                <br />
                Try  to search another city</h1>
            )}
            {data.map(item =>
              <SearchItem item={item} key={item._id} />
            )}
          </div>

          <div className="filterResult">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label className="lsLabel">Destination</label>
                <input placeholder={destination} type="text" onChange={e => setDestination(e.target.value)} />
              </div>
              <div className="lsItem">
                <label className="lsLabel">Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  {`${format(
                    date[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => {
                      const { selection } = item;
                      if (selection.startDate.getTime() === selection.endDate.getTime()) {
                        selection.endDate = new Date(selection.endDate.getTime() + 86400000);
                      }
                      setDate([selection]);
                    }} minDate={new Date()}
                    ranges={date}
                  />
                )}
              </div>
              <div className="lsItem">
                <div className="headerSearchItem">
                  <span onClick={toggleroom} className="headerSearchText ">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                  {openOptions && <div ref={refcomponent} className="openOptions">
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
              </div>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    <p> Min price per night</p>
                  </span>
                  <input
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    <p> Max price per night</p>
                  </span>
                  <input
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
              </div>
              <button onClick={handelSearch}>Search</button>
            </div>
            <HotelLocationBox />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default List