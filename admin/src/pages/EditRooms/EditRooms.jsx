import React from 'react'
import "./EditRooms.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"
const EditRooms = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  )
}

export default EditRooms