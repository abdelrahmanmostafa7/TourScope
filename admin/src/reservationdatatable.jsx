export const userColumns = [,
  {
    field: "roomname",
    headerName: "Room",
    width: 165,
  },


  {
    field: "guests",
    headerName: "Count",
    width: 100,
    renderCell: (params) => {
      const Count = `${params.row.guests.number_rooms}`;
      return (
        <div className="cellAction">
          <div>{Count}</div>
        </div>
      );
    },
  },
  
{
    field: "check_in_out",
    headerName: "Cheack in/out",
    width: 200,
    renderCell: (params) => {
      const Date = `${params.row.check_in_out.in} - ${params.row.check_in_out.out}`;
      return (
        <div className="cellAction">
          <div>{Date}</div>
        </div>
      );
    },
  },
  {
    field: "first_name",
    headerName: "Guest Name",
    width: 150,
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
    field: "total_price",
    headerName: "Total Price",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },


  {
    field: "status",
    headerName: "Status",
    width: 170,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

