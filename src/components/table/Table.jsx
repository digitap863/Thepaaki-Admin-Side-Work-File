import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

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

const List = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [edit, setEdit] = useState({});
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const AdminDeatails = useSelector((state) => state.admin.value);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

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
          "/api/superAdmin/view-outof-stock",
          config
        );
        setData(data);
      } catch (error) {}
    })();
  }, [loading]);
  const onsubmit = async (data) => {
    const number = data.stock;
    const PRO_ID = edit.ProductID;
    const color = edit.color;
    const size = edit.size;
    const var_index = edit.variationindex;
    const size_index = edit.sizeindex;
    const ID = edit._id;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": AdminDeatails.Token,
        },
      };
      const { data } = await axios.patch(
        "/api/superAdmin/update-outof-stock",
        { number, PRO_ID, color, size, size_index, var_index, ID },
        config
      );
      setLoading(true);
      setLoading(false);
      setOpen(false);
      swal("Successfully Added!", {
        icon: "success",
      });
    } catch (error) {}
  };

  const deleteStock = async (id) => {
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
            "/api/superAdmin/delete-outof-stock",
            { id },
            config
          );
          setLoading(true);
          setLoading(false);
          swal("Successfully Added!", {
            icon: "success",
          });
        } catch (error) {
          swal("OOPS!", "Somthing Went Wrong!", "error");
        }
      } else {
        swal("Your Data Is Safe");
      }
    });
  };

  const stockProduct = (data) => {
    setEdit(data);
    handleOpen();
  };

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#E5E5F7" }}>
            <TableRow>
              <TableCell className="tableCell">PRO_ID</TableCell>
              <TableCell className="tableCell">COLOR</TableCell>
              <TableCell className="tableCell">SIZE</TableCell>
              <TableCell className="tableCell">STOCK</TableCell>
              <TableCell className="tableCell">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.ProductID}</TableCell>
                <TableCell className="tableCell">{row.color}</TableCell>
                <TableCell className="tableCell">{row.size}</TableCell>
                <TableCell className="tableCell">{row.stock}</TableCell>
                <TableCell className="tableCell">
                  <EditIcon
                    onClick={() => stockProduct(row)}
                    sx={{ color: "blue" }}
                  />{" "}
                  <DeleteForeverIcon
                    onClick={() => {
                      deleteStock(row._id);
                    }}
                    style={{ color: "red", marginLeft: "1rem" }}
                  />
                  {/* <span className={`status ${row.status}`}>{row.status}</span> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            UPDATE STOCK
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="col-12">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="stock"
                    {...register("stock", {
                      required: "Invalid Number",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please Enter Valid Number",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("stock");
                    }}
                    className="form-control"
                    style={{ width: "100px" }}
                  />
                </div>
                {errors.stock && (
                  <small className="text-danger">{errors.stock.message}</small>
                )}
                <div>
                  <button className="btn btn-primary mt-2" type="submit">
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default List;
// import "./table.scss";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const List = () => {
//   const rows = [
//     {
//       id: 1143155,
//       product: "Acer Nitro 5",
//       img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
//       customer: "John Smith",
//       date: "1 March",
//       amount: 785,
//       method: "Cash on Delivery",
//       status: "Approved",
//     },
//     {
//       id: 2235235,
//       product: "Playstation 5",
//       img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
//       customer: "Michael Doe",
//       date: "1 March",
//       amount: 900,
//       method: "Online Payment",
//       status: "Pending",
//     },
//     {
//       id: 2342353,
//       product: "Redragon S101",
//       img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
//       customer: "John Smith",
//       date: "1 March",
//       amount: 35,
//       method: "Cash on Delivery",
//       status: "Pending",
//     },
//     {
//       id: 2357741,
//       product: "Razer Blade 15",
//       img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
//       customer: "Jane Smith",
//       date: "1 March",
//       amount: 920,
//       method: "Online",
//       status: "Approved",
//     },
//     {
//       id: 2342355,
//       product: "ASUS ROG Strix",
//       img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
//       customer: "Harold Carol",
//       date: "1 March",
//       amount: 2000,
//       method: "Online",
//       status: "Pending",
//     },
//   ];
//   return (
//     <TableContainer component={Paper} className="table">
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell className="tableCell">Tracking ID</TableCell>
//             <TableCell className="tableCell">Product</TableCell>
//             <TableCell className="tableCell">Customer</TableCell>
//             <TableCell className="tableCell">Date</TableCell>
//             <TableCell className="tableCell">Amount</TableCell>
//             <TableCell className="tableCell">Payment Method</TableCell>
//             <TableCell className="tableCell">Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell className="tableCell">{row.id}</TableCell>
//               <TableCell className="tableCell">
//                 <div className="cellWrapper">
//                   <img src={row.img} alt="" className="image" />
//                   {row.product}
//                 </div>
//               </TableCell>
//               <TableCell className="tableCell">{row.customer}</TableCell>
//               <TableCell className="tableCell">{row.date}</TableCell>
//               <TableCell className="tableCell">{row.amount}</TableCell>
//               <TableCell className="tableCell">{row.method}</TableCell>
//               <TableCell className="tableCell">
//                 <span className={`status ${row.status}`}>{row.status}</span>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default List;
