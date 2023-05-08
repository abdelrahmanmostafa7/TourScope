import React from 'react'
import './widget.scss'
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Widget = ({ type }) => {

    let widgetType;
    const diff = 20;
    const amount = 2000;

    switch (type) {
        case 'totalRooms':
            widgetType = {
                icon: <BedroomParentIcon sx={{ fontSize: 60 }} />,
                title: 'Reserved Rooms',
                isMoney: false,
                isgreen: true,
            }
            break;
        case 'totalRevenue':
            widgetType = {
                icon: <FontAwesomeIcon icon={faSackDollar} style={{fontSize:"60px"}} />,
                title: 'Earnings',
                isMoney: true,
            }
            break;
        case 'totalGuests':
            widgetType = {
                icon: <GroupIcon sx={{ fontSize: 60 }} />,
                title: 'Total Guests',
                isMoney: false,
            }
            break;
        case 'totalBookings':
            widgetType = {
                icon: <HowToRegIcon sx={{ fontSize: 60 }} />,
                title: 'Total Bookings',
                isMoney: false,
            }
            break;
        default:
            break;


    }

    return (
        <div className='widget'>
            <div className="left">
                <span className="widget_shape_icon">
                    {widgetType.icon}
                </span>
            </div>
            <div className="right">
                <span className='widget_percentage positive'> 
                <ArrowDropUpIcon className='arrow' sx={{ fontSize: 26 }} /> {diff}% </span>
                <span className="counter">
                    {widgetType.isMoney ? '$' : ''}{amount}
                </span>

                <span className="card_dec">{widgetType.title}</span>
            </div>
        </div>
    )
}

export default Widget