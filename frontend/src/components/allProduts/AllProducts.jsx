import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "10%",
  left: "30%",

  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Alluser() {
  const [variant, setVariant] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setVariant([]);
    setOpen(false);
  };
  const AdminDeatails = useSelector((state) => state.admin.value);
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
          "/api/superAdmin/view-all-products",
          config
        );
        setData(data);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, [loading]);
  const columns = [
    {
      name: "NO",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "PRO_ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "CATEGORY",
      selector: (row) => <span>{row.category.join(", ")}</span>,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "PRICE",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "WHOLESALER PRICE",
      selector: (row) => row.wholesaler,
      sortable: true,
    },
    {
      name: "DISCOUNT",
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: "SALES COUNT",
      selector: (row) => row.saleCount,
      sortable: true,
    },

    {
      name: "ACTION",
      sortable: true,
      cell: (row) => (
        <>
          <RemoveRedEyeIcon
            style={{ fontSize: "18px", color: "blue", cursor: "pointer" }}
            onClick={(d) => {
              handleOpen(row.id);
            }}
          />
          <ModeEditIcon
            style={{
              marginLeft: "10px",
              fontSize: "18px",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={(d) => {
              navigate(`/edit-produt-page/${row.id}`);
            }}
          />
          <DeleteIcon
            style={{
              fontSize: "18px",
              color: "red",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={() => deleteProducts(row.id)}
          />
        </>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  //view modal functions

  const handleOpen = (id) => {
    const newArray = data.filter(function (el) {
      return el.id == id;
    });
    const Singles = newArray[0].variation;
    Singles.map((items) => {
      variant.push(items);
    });
    setOpen(true);
  };

  //make whlesaler function
  //   const editHandler = async (id) => {
  //     swal({
  //       title: "Are you sure?",
  //       text: "are you want to make wholesaler",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then(async (willDelete) => {
  //       if (willDelete) {
  //         try {
  //           const config = {
  //             headers: {
  //               "Content-type": "application/json",
  //               "auth-token": AdminDeatails.Token,
  //             },
  //           };
  //           const { data } = await axios.post(
  //             `/api/superAdmin/wholesaler/${id}`,
  //             {},
  //             config
  //           );
  //           setLoading(true);
  //           setLoading(false);
  //           swal("Do You Want Delete!", {
  //             icon: "success",
  //           });
  //         } catch (eror) {
  //           swal("OOPS!", "Somthing Went Wrong!", "error");
  //         }
  //       } else {
  //         swal("Your Data Is Safe");
  //       }
  //     });
  //   };

  //delete user function
  const deleteProducts = async (id) => {
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
            `/api/superAdmin/delete-produt/${id}`,
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
          title={"PRODUCTS"}
          columns={columns}
          data={data}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ height: "70vh", overflow: "scroll" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">COLOR</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">SIZE-STOCK</th>
                  </tr>
                </thead>
                <tbody>
                  {variant.map((items, index) => {
                    return (
                      <tr key={index}>
                        <th>{items.color}</th>
                        <td>
                          <img
                            src={items.image}
                            style={{ width: "75px", height: "100px" }}
                          ></img>
                        </td>
                        <td>
                          {items.size.map((group, index) => {
                            return (
                              <span key={index}>
                                {group.name}-{group.stock}
                                <br />
                              </span>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <h2>Vertical headers:</h2>
            <table style={{ border: "1px solid black" }}>
              <tbody>
                <tr style={{ border: "1px solid black" }}>
                  <th style={{ border: "1px solid black" }}>Size</th>
                  <td style={{ border: "1px solid black" }}>Bustline</td>
                  <td style={{ border: "1px solid black" }}>Hip</td>
                  <td style={{ border: "1px solid black" }}>Length</td>
                  <td style={{ border: "1px solid black" }}>Sleeve</td>
                </tr>
                {variant.map((items,index) => {
                  return (
                    <>
                      {items.size.map((group, index) => {
                        return (
                          <tr key={index}>
                            <th style={{ border: "1px solid black" }}>
                              {group.name}
                            </th>
                            <td style={{ border: "1px solid black" }}>
                              {group.Bustline}
                            </td>
                            <th style={{ border: "1px solid black" }}>
                              {group.Hip}
                            </th>
                            <td style={{ border: "1px solid black" }}>
                              {group.Length}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                              {group.Sleeve}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  );
                })}
              </tbody>
            </table> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default Alluser;
