import "./reservationStatus.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import ReservationDatatable from "../../components/datatable/ReservationDatatable"

const Single = () => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="bottom">
          <h1 className="title">Reservations</h1>
          <ReservationDatatable />
        </div>
      </div>
    </div>
  );
};

export default Single;
