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

import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import swal from "sweetalert";
import { useSelector } from "react-redux";
// import { useToasts } from "react-toast-notifications";

export default function FormPropsTextFields() {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
          "/api/superAdmin/view-all-bottom-banner",
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

  const Imageupload = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Edit, you will not be able to recover this edit file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        var myWidget = window.cloudinary.openUploadWidget(
          {
            cloudName: "dq06v1dnz",
            uploadPreset: "thepaaki",
          },
          async (error, result) => {
            if (!error && result && result.event === "success") {
              const ID = id;
              const image = result.info.url;

              try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    "auth-token": AdminDeatails.Token,
                  },
                };
                const { data } = await axios.post(
                  "/api/superAdmin/edit-bottom-banner",
                  {
                    ID,
                    image,
                  },
                  config
                );
                setLoading(true)
                setLoading(false)
              } catch (error) {
                console.log(error);
              }
            }
          }
        );
        myWidget.open();
      } else {
        swal("Your Data Is Safe");
      }
    });
  };

  return (
    <Box>

      <div className="container">
        <div className="col-10">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">S/No</StyledTableCell>
                  <StyledTableCell align="center">BANNER IMAGE(431x214)</StyledTableCell>
                  <StyledTableCell align="center">TITILE</StyledTableCell>
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
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <EditIcon
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => Imageupload(row.id)}

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
