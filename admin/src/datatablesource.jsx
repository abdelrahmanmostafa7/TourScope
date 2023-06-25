export const userColumns = [

  { field: "id", headerName: "ID", width: 150 },

  {
    field: "first_name",
    headerName: "Employee",
    width: 250,
    renderCell: (params) => {
      const fullName = `${params.row.first_name} ${params.row.last_name}`;
      return (
        <div className="cellAction">
          <div>{fullName}</div>
        </div>
      );
    },
  },

  {
    field: "email",
    headerName: "Email",
    width: 280,
  },

  {
    field: "role",
    headerName: "Role",
    width: 250,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },

];
