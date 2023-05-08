import React, { useState } from 'react';
import "./sidebar.scss";
import { NavLink } from 'react-router-dom';
import logo from "../../image/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine, faHotel, faList, faPenSquare, faPenToSquare, faSquare } from "@fortawesome/free-solid-svg-icons";


const Sidebar = ({ children }) => {
  return (
    <>
      <div className="sidebar_container">
        <div className="sidebar_menu">
          <div className="top_section">
            <h1 className="logo_bar"><img className='sidebar_icon' src={logo} alt="" /></h1>
          </div>

          <div className="body_section">
            <NavLink to="/Dashboard" className="link" >
              <FontAwesomeIcon
                icon={faChartLine}
                className='dashboardIcon'
              />
              <div
                className="link_text">Dashboard
              </div>
            </NavLink>
            <NavLink to="/admin_reservations" className="link" >
              <FontAwesomeIcon
                icon={faList}
                className='dashboardIcon'
              />
              <div
                className="link_text">Reservations
              </div>
            </NavLink>
            <NavLink to="/hotel_managment" className="link"  >
              <FontAwesomeIcon
                icon={faHotel}
                className='dashboardIcon'
              />
              <div
                className="link_text">Hotel Management
              </div>
            </NavLink>


            <NavLink to="/dashboard" className="link" >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className='dashboardIcon'
              />
              <div
                className="link_text">update hotel
              </div>
            </NavLink>


            <NavLink to="/dashboard" className="link" >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className='dashboardIcon'
              />
              <div className="link_text">Add Rooms</div>

            </NavLink>





          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;