import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../reservationdatatable";
import useFetch from "../../hook/useFetch"
import newRequest from "../../utils/newRequest";
import { useState, useEffect } from "react";

const UsersDataTable = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const {data} = useFetch(`/reservation/hotelReservations/${currentUser.hotel_id}`);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      const rowsWithId = data.map((row) => ({ ...row, id: row._id }));
      setRows(rowsWithId);
    }
  }, [data]);




  


  const handleDelete = async (id) => {
    try {
      await newRequest.post("http://localhost:8800/api/hotel/userstatus/delete/" + id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  const handleRole = async (id,role) => {

    const modifiedRow = rows.find(row => row.id === id);
    let newState = role;
  
  
    try {
      await newRequest.put("http://localhost:8800/api/reservation/admin_resevation/" + id, { newState });      
      if (newState) {
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, status: newState };
          }
          return row;
        });
        setRows(updatedRows);
      }
    } catch (err) {
      console.log(err);
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
            {
              params.row.status === "pending" &&<>
             
              <div className="modifiybtn" onClick={() => handleRole(params.row.id ,"confirmed" )}>confirm</div>
              <div className="deletebtn" onClick={() => handleRole(params.row.id,"cancelled")}>
              cancel
            </div>
              </>
            }
          
          </div>
        );
      },
    },
  ];
  

  return (
    <div className="datatable">
      <div className="datatableTitle">
    
  


      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default UsersDataTable;
