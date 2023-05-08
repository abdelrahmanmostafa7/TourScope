import React from 'react'
import Sidebar from '../../../components/sidebar/sidebar'
import DataTable from '../../../components/roomstable/Rooms_table'
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './hotel_managment.scss'

const hotel_managment = () => {

  return (
    <>
      <div className='hotel_Managment_Container'>
        <Sidebar />
        <div className="hotel_managmnet_warper">


          <div className='hotel_managment_header'>
            <h1>Rooms Managment</h1>
          </div>
          <DataTable />



        </div>




      </div>



    </>
  )
}

export default hotel_managment