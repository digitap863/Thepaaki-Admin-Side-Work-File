import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function AllOrder() {
  const AdminDeatails = useSelector((state) => state.admin.value);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      name: "ORDER ID",
      selector: (row) => row.Id,
      sortable: true,
    },
    {
      name: "CUST ID",
      selector: (row) => row.CUST_ID,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.Total,
      sortable: true,
    },
    {
      name: "PAYMENT STATUS",
      selector: (row) => row.Payment,
      sortable: true,
    },
    {
      name: "OREDER STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "ORDER DEATAILS",
      sortable: true,
      cell: (row) => (
        <>
          <RemoveRedEyeIcon
            onClick={() => navigate(`/view-order-item/${row._id}`)}
            style={{ color: "blue", cursor: "pointer" }}
          />
        </>
      ),
    },
  ];
  const tableData = {
    columns, 
    data,
  };
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
          "/api/superAdmin/view-dispatch-orders",
          config
        );
        setData(data);
      } catch (error) {
        swal({
          title: "NO RECODES",
          text: "Once deleted, you will not be able to recover this data file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }); 
      }
    })();
  }, []);

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
          title={"Dispatched Orders"}
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
export default AllOrder;
