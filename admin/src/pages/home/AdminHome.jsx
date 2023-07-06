import Sidebar from "../../components/sidebar/Sidebar";
import "./Adminhome.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import useFetch from "../../hook/useFetch"
import newRequest from "../../utils/newRequest";
import { useState, useEffect } from "react";


const Home = () => {
  const [dashboard_data, set_dashboard_data] = useState();
  const [filteredData,setfilteredData] = useState(); 

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser ? currentUser._id : null;
  const { data:userData, loading } = useFetch(`/user/find/${userId}`);
  const hotelId = userData.hotel_id;

  const { data } = useFetch(`/hotel/dashboard/${hotelId}/`);


  useEffect(() => {
    if (data && data.dashboard_data) {
      const total_of_data = data.dashboard_data.filter(item => item._id === null )
      set_dashboard_data({
        "Guests": total_of_data[0].Guests,
        "Reservations": total_of_data[0].Reservations,
        "earnings": total_of_data[0].earnings,
        "total_rev_this_month":total_of_data[0].total_rev_this_month,
        "total_rev_last_month": total_of_data[0].total_rev_last_month,
        "average_night" : total_of_data[0].average_night
      });

      
      setfilteredData(data.dashboard_data.filter(item => item._id !== null))
    }
  }, [data]);


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

        {dashboard_data && <>
          <div className="widgets">
            <Widget type="Guests" input={dashboard_data.Guests} />
            <Widget type="Reservations" input={dashboard_data.Reservations} />
            <Widget type="Profit" input={dashboard_data.earnings} />
            <Widget type="AverageNight" input={dashboard_data.average_night} />

          </div>

          <div className="charts">
            <Featured rev={[dashboard_data.total_rev_this_month, dashboard_data.total_rev_last_month]} />
            <Chart title="Last 6 Months (Revenue)" input={filteredData} aspect={2 / 1} />
          </div>
        </>
        }
      </div>
    </div>
  );
};

export default Home;