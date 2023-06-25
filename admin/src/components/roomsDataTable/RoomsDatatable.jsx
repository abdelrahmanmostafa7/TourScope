import "./RoomsDataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../roomdatatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hook/useFetch"
import NewRoom from "../NewRoom/NewRoom"
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
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

  const navigate = useNavigate()
  const roomDetails = (roomId) => {
    navigate(`/editRoom/${roomId}`)
    window.scrollTo(0, 0);
  }

  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await newRequest.delete(`/room/${roomId}/${id}`, { hotelid: id });
      window.location.reload();
    }
    catch (err) {
      console.log(err)
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const { id } = params.row; // Get the id of the current row
        return (
          <div className="cellAction">
            <button className="viewButton" onClick={() => roomDetails(id)}>View</button>
            <button className="deleteButton" onClick={() => deleteRoom(id)}>Delete</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle" >
        All Rooms In Hotel
        <button className="link" onClick={togglePopUp}>Add Room</button>
        {showPopUp && <NewRoom />}

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
