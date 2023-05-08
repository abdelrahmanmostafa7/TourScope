import React from 'react'
import Sidebar from '../../../components/sidebar/sidebar'
import DataTable from '../../../components/reservationstable/Reservations_table'
import './reservations.scss'
const Reservation = () => {
  return (
    <>
      <div className='reservation_Container'>

        <Sidebar />
        <div className="reservation_warper">
          <div className="reservation_header">
            <h1>Reservations Managment</h1>
          </div>

          <DataTable />



        </div>




      </div>


    </>

  )
}

export default Reservation