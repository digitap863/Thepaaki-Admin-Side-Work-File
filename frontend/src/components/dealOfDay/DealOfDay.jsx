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
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function FormPropsTextFields() {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const AdminDeatails = useSelector((state) => state.admin.value);
  const [value, setValue] = React.useState(dayjs());
  const [image, setImage] = useState();
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
          "/api/superAdmin/view-all-deals-day",
          config
        );
        setData(data);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, [loading]);
  const onSubmit = async (data) => {
    setLoading(true);

    const PROID = data.PROID;
    const OFFER = data.OFFER;
    const DealImage = image;
    const date = value.$d.toLocaleDateString();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": AdminDeatails.Token,
        },
      };

      const { data } = await axios.post(
        "/api/superAdmin/add-deal-day",
        { PROID, OFFER, DealImage, date },
        config
      );
      reset();
      setImage("");
      setLoading(true);
      setLoading(false);
      reset();
      swal("Success!", "Successfully Added!", "success");
    } catch (error) {
      swal("OOPS!", `${error.response.data}!`, "error");
    }
  };
  //delete Deal function
  const deleteDeal = (id) => {
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
          const { data } = await axios.delete(
            ` /api/superAdmin/delete-Deal-Day-Offer/${id}`,

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
  const Imageupload = () => {
    var myWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: "dk8efhvbn",
        uploadPreset: "z0mb5p1h",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(result.info.url);

          // setImage((prev) => [
          //   ...prev,
          //   { url: result.info.url, public_id: result.info.public_id },
          // ]);
        }
      }
    );
    myWidget.open();
  };

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
  const UploadImage = async (e) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const { data } = await axios.post(
        "/api/superAdmin/image-uploading",
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
      enctype="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "20ch" },
        marginTop: "3%",
      }}
      noValidate
      autoComplete="off"
    >
      <div className="text-center">
        <h4>DEAL ADD SECTION</h4>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  views={["day"]}
                  label="Just date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className="col-lg-3 col-md-6">
            <TextField
              required
              id="standard-required"
              label="Enter Product ID"
              defaultValue=""
              variant="standard"
              {...register("PROID", {
                required: "Product ID required",
                // pattern: {
                //   value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                //   message: "invalid email address",
                // },
              })}
              onKeyUp={() => {
                trigger("PROID");
              }}
            />
            <div>
              {errors.PROID && (
                <div>
                  <small className="text-danger">{errors.PROID.message}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <TextField
              required
              id="standard-required"
              label="Offer Percentange"
              defaultValue=""
              variant="standard"
              {...register("OFFER", {
                required: "Offer is required",
                // pattern: {
                //   value: /^[a-zA-Z]{8,22}$/,
                //   message: "Invalid Pasword",
                // },
              })}
              onKeyUp={() => {
                trigger("OFFER");
              }}
            />
            <div>
              {errors.OFFER && (
                <small className="text-danger">{errors.OFFER.message}</small>
              )}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <input
              type="file"
              id="files"
              className="form-control"
              onChange={UploadImage}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <button
              style={{ marginTop: "7%" }}
              type="submit"
              className="btn btn-primary"
              variant="outlined"
              color="primary"
            >
              CREATE
            </button>
          </div>
          {image && (
            <div className="col-md-2">
              <img
                src={image}
                style={{ width: "200px", height: "250px" }}
              ></img>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <h4 style={{ marginTop: "5%" }}>DEAL DEATAILS</h4>
      </div>
      <div className="container-fluid">
        <div
          className="row col-lg-10"
          style={{
            alignItems: "center",
            width: "100%",
            justifyContent: " center",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">S/No</StyledTableCell>
                  <StyledTableCell align="center">PRO_ID</StyledTableCell>
                  <StyledTableCell align="center">DATE</StyledTableCell>
                  <StyledTableCell align="center">OFFER</StyledTableCell>
                  <StyledTableCell align="center">IMAGE</StyledTableCell>
                  <StyledTableCell align="center">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Data.map((row, index) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.PROID}</StyledTableCell>
                    <StyledTableCell align="left">{row.date}</StyledTableCell>
                    <StyledTableCell align="left">{row.OFFER}</StyledTableCell>

                    <StyledTableCell align="left">
                      <img
                        style={{ width: "200px", height: "150px" }}
                        src={row.DealImage}
                      ></img>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <DeleteIcon
                        style={{
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => deleteDeal(row._id)}
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
