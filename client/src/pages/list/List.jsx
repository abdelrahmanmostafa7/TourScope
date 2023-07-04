import "./list.scss"
import HotelLocationBox from "../../components/HotelslocationBox/HotelsLocationBox"
import Navbar from "../../components/navBar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem"
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import useSearch from "../../hook/useSearch.js"
import { json, useLocation } from "react-router-dom"
import { format } from "date-fns";
import { DateRange } from "react-date-range"
import Loading from "../../components/Loading/Loading";

const List = () => {
  const location = useLocation()
  const Saved_reservation =  JSON.parse(localStorage.getItem("reservation_details")) || null

  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false)
  
  const [destination, setDestination] = useState(Saved_reservation?.destination ? Saved_reservation.destination : "london")
  const [date, setDate] = useState(Saved_reservation?.date ?  [{
    startDate: new Date(Saved_reservation.date[0].startDate),
    endDate: new Date(Saved_reservation.date[0].endDate),
    key: "selection",
  }] : [{
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate() + 1),
    key: "selection",
  }])
  const [options, setOptions] = useState(Saved_reservation?.options? Saved_reservation.options : {
    adult: 1,
    children: 0,
    room: 1
  })

  const [reservation_data , setReservation_data] = useState(Saved_reservation? Saved_reservation : {
    date,
    options,
    destination
  })
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const [min, setMin] = useState(50);
  const [max, setMax] = useState(9999);
  const { data, loading, reFetch } = useSearch(`/hotel?city=${destination}&startdate=${date[0].startDate}&enddate=${date[0].endDate}&min=${min || 50}&max=${max || 9999}&limit=${20}&roomsoption=${encodeURIComponent(JSON.stringify([options]))}`)
  const handelSearch = () => {
    reFetch()
  }



  useEffect(() => {
    setReservation_data({
      date,
      options,
      destination
  });
  },[date , options , destination])
  

  return (
    <div>
      <Navbar />
      {loading ? <Loading /> :
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
                <SearchItem item={item} reservationdata={reservation_data} key={item._id}  />
              )}
            </div>

            <div className="filterResult">
              <div className="listSearch">
                <h1 className="lsTitle">Search</h1>
                <div className="lsItem">
                  <label className="lsLabel">Destination</label>
                  <input
                    placeholder={destination}
                    type="text"
                    onChange={e => { setDestination(e.target.value) }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setReservation_data({
                          date,
                          options,
                          destination
                        })
                        reFetch()
                      }
                    }}
                  />
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
                  <label className="lsLabel">Options</label>
                  <div className="headerSearchItem">
                    <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText ">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                    {openOptions && (
                      <div className="ListOptions">
                        <div className="optionItem">
                          <span className="optionText">Adult</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.adult <= 1}
                              className="optionCounterButton"
                              onClick={() => handleOption("adult", "d")}>-</button>
                            <span className="optionCounterNumber">
                              {options.adult}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("adult", "i")}>+</button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Children</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.children <= 0}
                              className="optionCounterButton"
                              onClick={() => handleOption("children", "d")}>-</button>
                            <span className="optionCounterNumber">
                              {options.children}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("children", "i")}>+</button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Room</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.room <= 1}
                              className="optionCounterButton"
                              onClick={() => handleOption("room", "d")}>-</button>
                            <span className="optionCounterNumber">
                              {options.room}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("room", "i")}>+</button>
                          </div>
                        </div>
                      </div>
                    )}
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
        </div>}
      <Footer />
    </div>
  );
}

export default List