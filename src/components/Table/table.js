import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import apiClient from "../../Instances/client";
import { Chip } from "@mui/material";
const Table = ({ onUserCreated }) => {
  const [userlist, setuserlist] = useState([]);
  const columns = [
    {
      label: (
        <div style={{ fontSize: "15px", fontWeight: 600 }}>First Name</div>
      ),
      name: "firstname",
    },
    {
      label: <div style={{ fontSize: "15px", fontWeight: 600 }}>Last Name</div>,
      name: "lastname",
    },

    {
      label: (
        <div style={{ fontSize: "15px", fontWeight: 600 }}>Email Address</div>
      ),
      name: "email",
    },
    {
      label: (
        <div style={{ fontSize: "15px", fontWeight: 600 }}>Phone Number</div>
      ),
      name: "phonenumber",
    },
    {
      label: (
        <div style={{ fontSize: "15px", fontWeight: 600 }}>Company Name</div>
      ),
      name: "companyname",
    },
    {
      label: <div style={{ fontSize: "15px", fontWeight: 600 }}>Roles</div>,
      name: "role",
    },
    {
      label: (
        <div style={{ fontSize: "15px", fontWeight: 600 }}>Permissions</div>
      ),
      name: "permissions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <>
            {value.map((v) => (
              <Chip
                label={v}
                sx={{
                  margin: "5px",
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    fontWeight: 550,
                    color: "#fff",
                    cursor: "not-allowed",
                  },
                }}
              />
            ))}
          </>
        ),
      },
    },
  ];

  const data = async () => {
    try {
      const res = await apiClient.get("/get-all-user");
      setuserlist(res.data.data);
      console.log("api response", res.data.data);
      console.log(userlist, "rweewrewrwerewrewrwewerrew");
    } catch (e) {
      console.log("error from table getting all user", e);
    }
  };
  useEffect(() => {
    console.log("requsted from db", userlist);
    data();
  }, [onUserCreated]);
  const options = {
    selectableRows: false,
    onRowClick: (rowData, rowMeta) => {
      // Implement your edit logic here
      console.log("Edit user with ID:", userlist[rowMeta.dataIndex].id);
      // You can open a modal or navigate to an edit page, etc.
    },
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <MUIDataTable
        title={"User Data"}
        data={userlist || []}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default Table;
