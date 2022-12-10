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


  const ChangeOrderStatus = async (status, orderId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": AdminDeatails.Token,
        },
      };
      const { data } = await axios.post(
        "/api/superAdmin/Change-order-status",
        { status, orderId },
        config
      );
    } catch (error) {
     
    }
  };

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
      name: "U/W",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.Total,
      sortable: true,
    },
    {
      name: "DELIVERY CHARGE",
      selector: (row) => row.DeliveyCharge,
      sortable: true,
    },
    // {
    //   name: "PAYMENT STATUS",
    //   selector: (row) => row.Payment,
    //   sortable: true,
    // },
    {
      name: "COURIER SERVICE",
      selector: (row) => row.Courier,
      sortable: true,
    },
    {
      name: "OREDER STATUS",
      sortable: true,
      cell: (row) => (
        <>
          <select
            onChange={(e) => {
              ChangeOrderStatus(e.target.value, row.Id);
            }}
          >
            <option>{row.status}</option>
            <option value="Packed">Packed</option>
          </select>
        </>
      ),
    },

    {
      name: "ORDER DEATAILS",
      sortable: true,
      cell: (row) => (
        <>
          <RemoveRedEyeIcon
            onClick={() => navigate(`/view-order-item/${row.Id}`)}
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
          "/api/superAdmin/view-all-orders",
          config
        );
        setData(data);
      } catch (error) {
        swal({
          title: "NO RECODS",
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
      <div className="text-end">
        <button className="btn btn-primary" onClick={()=>{navigate("/download-yesterday-address")}}>DOWNLOAD ADDRESS</button>
      </div>
      <DataTableExtensions {...tableData}>
        <DataTable
          title={"Order Deatails"}
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
