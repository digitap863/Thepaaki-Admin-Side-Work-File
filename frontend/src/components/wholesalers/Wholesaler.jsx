import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Alluser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const AdminDeatails = useSelector((state) => state.admin.value);
  const [open, setOpen] = React.useState(false);
  const [wholsealerEditId, setWholesalerEditId] = useState();
  const [hidde, setHidde] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    {
      name: "ID",
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
      name: "WALLET",
      selector: (row) => row.wallet,
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
            className="me-4"
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              editWalletAmount(row._id, row.wallet);
            }}
          />
          <DeleteIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              editHandler(row._id, row.wallet);
            }}
          />
        </>
      ),
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
          "/api/superAdmin/all-wholesaler",
          config
        );
        setData(data);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, [loading]);

  const editHandler = async (id, walletAmount) => {
    if (walletAmount == 0) {
      swal({
        title: "Are you sure?",
        text: "are you want to delet,confirm wallet",
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

               const { data } = await axios.delete(
              `/api/superAdmin/delete-wholesaler/${id}`,
              config
            ); 

            swal("OK", "successfuly added!", "success");
            setLoading(true);
            setLoading(false);
          } catch (eror) {
            swal("OOPS!", "Somthing Went Wrong!", "error");
          }
        } else {
          swal("Your Data Is Safe");
        }
      });
    } else {
      swal("OOPS!", "Please Check wallet!", "error");
    }
  };

  const tableData = {
    columns,
    data,
  };

  //wallet edit option
  const editWalletAmount = async (id, walletAmount) => {
    setWholesalerEditId(id);
    setAmount(walletAmount);
    handleOpen();
  };
  const handleClick = async () => {
    setHidde(true);
    const id = wholsealerEditId;
    const amoun = amount;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": AdminDeatails.Token,
        },
      };
      const { data } = await axios.post(
        "/api/superAdmin/update-wholsaler-wallet",
        { amoun, id },
        config
      );
      setHidde(false);
      setLoading(true);
      setLoading(false);
      handleClose();
      swal("success", {
        icon: "success",
      });
    } catch (eror) {
      setHidde(false);
      swal("OOPS!", "Somthing Went Wrong!", "error");
    }
  };

  return (
    <div
      className="main ms-5 me-5 mt-4"
      style={{
        marginTop: "10px",
        boxShadow: "2px 4px 10px 7px rgba(201, 201, 201, 0.47)",
      }}
    >
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
            <div className="text-center">
              <h5>WALLET EDITING</h5>
            </div>
            <div>
              <input
                className="form-control mt-4"
                type="text"
                defaultValue={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></input>
            </div>
            <div className="mt-4 text-center">
              {hidde ? (
                <button
                  className="btn btn-primary"
                  onClick={handleClick}
                  disabled
                >
                  submit
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleClick}>
                  submit
                </button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
      <DataTableExtensions {...tableData}>
        <DataTable
          title={"Wholesaler Deatails"}
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
