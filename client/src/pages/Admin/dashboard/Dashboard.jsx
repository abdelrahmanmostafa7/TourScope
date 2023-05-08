import React from 'react'
import Sidebar from '../../../components/sidebar/sidebar'
import Widget from '../../../components/dashboardwidget/Widget'
import Piechart from '../../../components/piechart/Piechart'
import Areachart from '../../../components/areachart/Areachart'
import "./dashboard.scss"
const Dashboard = () => {
    return (

        <>
            <div className='dashboard_Container'>
                <Sidebar />
                <div className="dashboard_warper">
                    <div className="dash_widgets">
                        <Widget type="totalRooms" />
                        <Widget type="totalRevenue" />
                        <Widget type="totalGuests" />
                        <Widget type="totalBookings" />
                    </div>
                    <div className="graphs">
                        <div className="piechart chart">
                            <Piechart />
                            <h3 className='pielabel'>Ex: How many people likes our system </h3>
                        </div>
                        <div className="curve">
                            <Areachart />
                        </div>

                    </div>



                </div>




            </div>







        </>


    )
}

export default Dashboard