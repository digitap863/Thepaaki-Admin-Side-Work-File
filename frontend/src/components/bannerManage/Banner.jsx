import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { maxWidth } from "@mui/system";
// import { useToasts } from "react-toast-notifications";

export default function FormPropsTextFields() {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const { addToast } = useToasts();
  const [Image, setImage] = useState();
  const AdminDetails = useSelector((state) => state.admin.value);
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
            "auth-token": AdminDetails.Token,
          },
        };
        const { data } = await axios.get(
          "/api/superAdmin/view-all-banner",
          config
        );
        setData(data);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, [loading]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const onSubmit = async (data) => {
    if (Image) {
      const title = "Enjoy This Offer Today";
      const subtitle = "New Collection <br /> Sale";
      const image = Image;
      const url = "/shop-grid-standard";
      try {
        const config = {
          headers: {
            "Contact-type": "application/json",
            "auth-token": AdminDetails.Token,
          },
        };
        const { data } = await axios.post(
          "/api/superAdmin/add-banner-image",
          {
            title,
            subtitle,
            image,
            url,
          },
          config
        );
        setImage("");
        setLoading(true);
        setLoading(false);

        reset();
        swal("Successfully Added!", {
          icon: "success",
        });
      } catch (error) {
        swal("OOPS!", "Something Went Wrong!", "error");
      }
    } else {
      swal("OOPS!", "Please Verify Image!", "error");
    }
  };

  //delete Banner Function
  const deleteBanner = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("Do You Want Delete!", {
          icon: "success",
        });
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              "auth-token": AdminDetails.Token,
            },
          };
          const { data } = await axios.post(
            "/api/superAdmin/delete-banner",
            {
              id,
            },
            config
          );
          setLoading(true);
          setLoading(false);
          swal("Successfully Deleted!", {
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

  const Imageupload = async (e) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const { data } = await axios.post(
        "/api/superAdmin//upload-banner-image",
        formData
      );
      setImage(data.url);
      // setImage((prev) => [
      //   ...prev,
      //   { url: result.info.url, public_id: result.info.public_id },
      // ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "45ch" },
        marginTop: "2%",
        overflow: "hidden",
      }}
      noValidate
      autoComplete="off"
    >
      <div className="text-center ">
        <h5 style={{ marginLeft: "4%" }}>BANNER ADD SECTION</h5>{" "}
      </div>
      <div className="container ms-5">
        <div className="row">
          <div className="col-12">
            {/* <div className="col-md-6">
              <TextField
                required
                id="outlined-uncontrolled"
                label="Enter Offer Percentage"
                defaultValue=""
                {...register("offer", {
                  required: "Invalid Number",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Invalid Number",
                  },
                })}
                onKeyUp={() => {
                  trigger("offer");
                }}
              />
              {errors.offer && (
                <div>
                  <small className="text-danger">{errors.offer.message}</small>
                </div>
              )}
            </div>
            <div className="col-md-6">
              <TextField
                required
                id="outlined-uncontrolled"
                label="Enter Product ID"
                defaultValue=""
                {...register("link", {
                  required: "ID is required",
                })}
                onKeyUp={() => {
                  trigger("link");
                }}
              />
              <div>
                {errors.link && (
                  <small className="text-danger">{errors.link.message}</small>
                )}
              </div>
            </div> */}
            <div className="col-12">
              <div className="col-md-4">
                <label>UPLOAD IMAGE(1920x800)</label>
                <input
                type="file"
                  onChange={Imageupload}
                  style={{ marginTop: "3%", width: "100%" }}
                  className="form-control ms-2"
                />
              </div>
              <div className="col-md-4 ">
                <div>
                  {Image && (
                    <img
                      src={Image}
                      style={{ width: "200px", height: "150px" }}
                      className="mt-3"
                    />
                  )}

                  <button
                    style={{ marginTop: "5%" }}
                    type="submit"
                    className="btn btn-primary "
                    variant="outlined"
                    color="primary"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h4 style={{ marginTop: "5%", marginLeft: "4%", marginBottom: "4%" }}>
          BANNER DEATAILS
        </h4>
      </div>
      <div className="container ms-5 ">
        <div className="row col-lg-10">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">S/No</StyledTableCell>
                  <StyledTableCell align="center">BANNER IMAGE</StyledTableCell>
                  <StyledTableCell align="center">
                    OFFER PERCENTAGE
                  </StyledTableCell>
                  <StyledTableCell align="center">PRODUCT LINK</StyledTableCell>
                  <StyledTableCell align="center"> </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Data.map((row, index) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <img
                        src={row.image}
                        style={{ width: "200px", height: "100px" }}
                      ></img>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.subtitle}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <a
                        style={{ color: "blue" }}
                        href={`https://www.thepaaki.com/product/${row.url}`}
                        target="_blank"
                      >
                        Deatails
                      </a>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <DeleteIcon
                        style={{
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => deleteBanner(row._id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Box>
  );
}
