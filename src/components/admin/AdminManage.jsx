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

export default function FormPropsTextFields() {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const AdminDeatails = useSelector((state) => state.admin.value);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": AdminDeatails.Token,
        },
      };

      const { data } = await axios.post(
        "/api/superAdmin/add-admin",

        {
          email,
          password,
        },
        config
      );
      
      setLoading(true);
      setLoading(false);
      reset();
      swal("Success!", "Successfully Added!", "success");
    } catch (error) {
      swal("OOPS!", "Somthing Went Wrong!", "error");
    }
  };

  //delete Admin Function
  const deleteuser = (id) => {
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
            "/api/superAdmin/delete-admin",
            {
              id,
            },
            config
          );
          setLoading(true);
          swal("Successfully Deleted!", {
            icon: "success",
          });
        } catch (error) {
          
        }
      } else {
        swal("Your Data Is Safe");
      }
    });
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
          "/api/superAdmin/view-all-admin",
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "35ch" },
        marginTop: "3%",
      }}
      noValidate
      autoComplete="off"
    >
      <h4 className="ms-3">ADMIN ADD SECTION</h4>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="col-md-6">
              <TextField
                required
                id="standard-required"
                label="Email"
                defaultValue=""
                variant="standard"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "invalid email address",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              <div>
                {errors.email && (
                  <div>
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <TextField
                required
                id="standard-required"
                label="Password"
                defaultValue=""
                variant="standard"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^[a-zA-Z]{8,22}$/,
                    message: "Invalid Pasword",
                  },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              <div>
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-2">
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
          </div>
        </div>
      </div>

      <h4 className="ms-3" style={{ marginTop: "5%" }}>ADMIN DEATAILS</h4>

      <div className="container">
        <div className="row">
          <div className="col-6">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">S/No</StyledTableCell>
                    <StyledTableCell align="left">EMAIL</StyledTableCell>
                    <StyledTableCell align="center">STATUS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Data.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <DeleteIcon
                          style={{
                            fontSize: "18px",
                            cursor: "pointer",
                            color: "red",
                          }}
                          onClick={() => deleteuser(row._id)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Box>
  );
}
