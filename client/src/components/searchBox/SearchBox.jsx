import "./searchBox.scss"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns";
import { DateRange } from "react-date-range"
import useFetch from "../../hook/useFetch.js"


function SearchBox() {

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
    room: 1,
  })
  
  const [openDate, setOpenDate] = useState(false)
  const { data, loading, reFetch } = useFetch(`/hotel?city=${destination}`)



  const handelSearch = () => {
    reFetch()
  }
  return (

    <div className="listSearch">
      <h1 className="lsTitle">Search</h1>
      <div className="lsItem">
        <label className="lsLabel">Destination</label>
        <input placeholder={destination} type="text" />
      </div>
      <div className="lsItem">
        <label className="lsLabel">Check-in Date</label>
        <span onClick={() => setOpenDate(!openDate)}>{`${format(
          date[0].startDate,
          "MM/dd/yyyy"
        )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
        {openDate && (
          <DateRange
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            ranges={date}
          />
        )}
      </div>
      <div className="lsItem">
        <div className="lsOptions">
          <div className="lsOptionItem">
            <span className="lsOptionText">Adult</span>
            <input
              type="number"
              min={1}
              className="lsOptionInput"
              placeholder={options.adult}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Children</span>
            <input
              type="number"
              min={0}
              className="lsOptionInput"
              placeholder={options.children}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Room</span>
            <input
              type="number"
              min={1}
              className="lsOptionInput"
              placeholder={options.room}
            />
          </div>
        </div>
      </div>
      <button onClick={handelSearch}>Search</button>
    </div>

  )
}

export default SearchBox