import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";

function Alluser() {
  const [data, setData] = useState([]);
  const AdminDeatails = useSelector((state) => state.admin.value);

  const columns = [
    {
      name: "CUST_ID",
      selector: (row) => row.CUST_ID,
      sortable: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "TIME",
      selector: (row) => row.Time,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
  ];
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": AdminDeatails.Token,
          },
        };
        const { data } = await axios.get(
          "/api/superAdmin/view-all-wallet-info",
          config
        );
      
        setData(data);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);
  const tableData = {
    columns,
    data,
  };

  return (
    <div
      className="main ms-5 me-5 mt-4"
      style={{
        marginTop: "10px",
        boxShadow: "2px 4px 10px 7px rgba(201, 201, 201, 0.47)",
      }}
    >
      <DataTableExtensions {...tableData}>
        <DataTable
          title={"WALLET INFO"}
          columns={columns}
          data={data}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
}
export default Alluser;
