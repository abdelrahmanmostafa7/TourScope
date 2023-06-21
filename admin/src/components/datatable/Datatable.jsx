import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hook/useFetch"
const Datatable = () => {

  const id = "643bb10810a61c1094360089"
  const { data, loading } = useFetch(`/hotel/hotelRooms/${id}`)
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data && data.rooms) {
      const rowsWithId = data.rooms.map((row) => ({ ...row, id: row._id }));
      setRows(rowsWithId);
    }
  }, [data]);


  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };
  
  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };
  
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/editRoom" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Rooms In Hotel
        <button className="link" onClick={togglePopUp}>Add Room</button>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
