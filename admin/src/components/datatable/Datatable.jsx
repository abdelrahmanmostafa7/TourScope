import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import useFetch from "../../hook/useFetch"
import newRequest from "../../utils/newRequest";
import { useState, useEffect } from "react";

const Datatable = () => {
  const {data} = useFetch(`/hotel/userstatus/6490327d0b468e93e5fb7e4c`);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data && data.admin) {
      const rowsWithId = data.admin.map((row) => ({ ...row, id: row._id }));
      setRows(rowsWithId);
    }
  }, [data]);

  const [user_input, set_input] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "supervisor"
  });


  //new user popup
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = (event) => {
    if (event.target === event.currentTarget) {
      setShowPopUp(false);
      set_input({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "supervisor"
      })
    }
  };


  const handleSubmit = async () => {
    try {
      console.log(user_input)
      await newRequest.post("/hotel/userstatus/newuser/15151", { ...user_input })
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    set_input((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleDelete = async (id) => {
    try {
      await newRequest.post("http://localhost:8800/api/hotel/userstatus/delete/" + id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  const handleRole = async (id) => {
    const modifiedRow = rows.find(row => row.id === id);
    let newRole = null;
    if (modifiedRow.role === "supervisor") {
      newRole = "moderator";
    } else if (modifiedRow.role === "moderator") {
      newRole = "supervisor";
    }
  
    try {
      await newRequest.post("http://localhost:8800/api/hotel/userstatus/modifiy/" + id, { newRole });      
      if (newRole) {
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, role: newRole };
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

            <div className="modifiybtn" onClick={() => handleRole(params.row.id)}>Modifiy Rule</div>
            <div
              className="deletebtn"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];



  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User

        <button className="link" onClick={togglePopUp}>
          Add New
        </button>
        {showPopUp && <div className="popup-background" onClick={closePopUp}>
          <div className="popup-content-newusers" >
            <form className="popup-content5-newusers" >
              <h2 className='newusersHeading'>Add New User</h2>
              <div className="newusersDetails">
                <div className="newusersCol">
                  <label htmlFor="first_name">Frist Name</label>
                  <input type="text" name='first_name' onChange={handleChange}
                    value={user_input.first_name}
                  />
                </div>
                <div className="newusersCol">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" name='last_name' onChange={handleChange}
                    value={user_input.last_name}

                  />
                </div>
                <div className="newusersCol">
                  <label htmlFor="email">Email</label>
                  <input type="text" name='email' onChange={handleChange}
                    value={user_input.email}
                  />
                </div>
                <div className="newusersCol">
                  <label htmlFor="password">Password</label>
                  <input type="text" name='password' onChange={handleChange}
                    value={user_input.password}
                  />
                </div>
                <div className="newusersCol">
                  <label htmlFor="role">Role</label>
                  <select name="role" className="role" value={user_input.role} onChange={handleChange}
                  >
                    <option value="supersivor">supervisor</option>
                    <option value="moderator">moderator</option>
                  </select>
                </div>


              </div>
              <div className="newusersBottom">
                <button type="button" className='btn'>Cancel</button>
                <button type="button" className="btn" onClick={handleSubmit}>
                  Add New
                </button>
              </div>

            </form>
          </div>
        </div>
        }



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

export default Datatable;
