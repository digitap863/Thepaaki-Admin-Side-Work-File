import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";

function Alluser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const AdminDeatails = useSelector((state) => state.admin.value);
  const columns = [
    {
      name: "CUST_ID",
      selector: (row) => row.CUST_ID,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "ACTION",
      sortable: true,
      cell: (row) => (
        <>
          <EditIcon
            style={{ fontSize: "18px", color: "blue", cursor: "pointer" }}
            onClick={() => {
              editHandler(row._id);
            }}
          />
          <DeleteIcon
            style={{
              fontSize: "18px",
              color: "red",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={() => deleteuser(row._id)}
          />
        </>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  //take all users
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": AdminDeatails.Token,
          },
        };
        const { data } = await axios.get("/api/superAdmin/viewAlluser", config);

        setData(data);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, [loading]);

  //make whlesaler function
  const editHandler = async (id) => {
    swal({
      title: "Are you sure?",
      text: "are you want to make wholesaler",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              "auth-token": AdminDeatails.Token,
            },
          };
          const { data } = await axios.post(
            `/api/superAdmin/wholesaler/${id}`,
            {},
            config
          );
          setLoading(true);
          setLoading(false);

          swal("success", {
            icon: "success",
          });
        } catch (eror) {
          swal("OOPS!", "Somthing Went Wrong!", "error");
        }
      } else {
        swal("Your Data Is Safe");
      }
    });
  };

  //delete user function
  const deleteuser = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              "auth-token": AdminDeatails.Token,
            },
          };
          const { data } = await axios.post(
            `/api/superAdmin/delete-user/${id}`,
            {},
            config
          );

          setLoading(true);
          setLoading(false);
          swal("Good job!", "You clicked the button!", "success");
        } catch (eror) {
          swal("OOPS!", "Somthing Went Wrong!", "error");
        }
      } else {
        swal("Your Data Is Safe");
      }
    });
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
          title={"User Deatails"}
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
