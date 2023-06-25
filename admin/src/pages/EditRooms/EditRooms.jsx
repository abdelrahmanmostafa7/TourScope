import React from 'react'
import "./EditRooms.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import RoomsDatatable from "../../components/roomsDataTable/RoomsDatatable"
const EditRooms = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <RoomsDatatable />
      </div>
    </div>
  )
}
export default EditRooms