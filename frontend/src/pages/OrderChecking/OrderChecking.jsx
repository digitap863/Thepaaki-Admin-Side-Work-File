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
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

export default function OrderChecking() {
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
        const order_id = data.order_id;
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "auth-token": AdminDeatails.Token,
                },
            };

            const { data } = await axios.post(
                "/api/superAdmin/check-order-details",

                {
                    order_id,
                },
                config
            );
            setData(data);
            setLoading(true);
            setLoading(false);
            reset();
        } catch (error) {
            swal("OOPS!", "Somthing Went Wrong!", "error");
        }
    };
    // const OrderConfirm = async (data) => {
    //     setLoading(true);
    //     const order_id = Data.razorpay_order_Id;
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "auth-token": AdminDeatails.Token,
    //             },
    //         };

    //         const { data } = await axios.post(
    //             "/api/superAdmin/order-confirm-admin",
    //             {
    //                 order_id,
    //             },
    //             config
    //         );
    //         setData(data);
    //         setLoading(true);
    //         setLoading(false);
    //         reset();
    //         swal("Success!", "Successfully Added!", "success");
    //     } catch (error) {
    //         swal("OOPS!", "Somthing Went Wrong!", "error");
    //     }
    // };

    //delete Admin Function


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
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
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
                    <h4 className="ms-3">Search Order</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="col-md-6 d-flex align-items-end">
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Enter Order Id"
                                        defaultValue=""
                                        variant="standard"
                                        {...register("order_id", {
                                            required: "Order Id is required",
                                        })}
                                        onKeyUp={() => {
                                            trigger("order_id");
                                        }}
                                    />
                                    <button
                                        style={{ height: "40px" }}
                                        type="submit"
                                        className="btn btn-primary rounded-0 mb-2 ms-4"
                                        variant="outlined"
                                        color="primary"
                                    >
                                        SEARCH
                                    </button>
                                    <div>
                                        {errors.order_id && (
                                            <div>
                                                <small className="text-danger">{errors.order_id.message}</small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {Data?.Product && (
                            <table className="table mt-3">
                                <thead>
                                    <tr className="bg-warning">
                                        <th style={{ textAlign: "center" }} scope="col">
                                            PRO_ID
                                        </th>

                                        <th style={{ textAlign: "center" }} scope="col">
                                            COLOR
                                        </th>
                                        <th style={{ textAlign: "center" }} scope="col">
                                            SIZE
                                        </th>
                                        <th style={{ textAlign: "center" }} scope="col">
                                            QTY
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Data.Product.map((items, index) => {
                                        return (
                                            <tr style={{ textAlign: "center", verticalAlign: "center" }} key={index}>
                                                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                                                    {items.ProductID}
                                                </th>

                                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                                    {items.color}
                                                </td>
                                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                                    {items.size}
                                                </td>
                                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                                    {items.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <div className="ms-3 mt-3" style={{ textTransform: "uppercase" }}>
                                    <b>TO:</b>
                                    <br />
                                    <p>
                                        {Data.Address?.Name},{Data.Address?.Lastname}
                                        <br />
                                        {Data.Address?.StreetAddress}
                                        <br></br>
                                        {Data.Address?.TownCity},{Data.Address?.Pincode},{Data.Address?.State}
                                        <br />
                                        {Data.Address?.Email}
                                        <br />
                                        {Data.Address?.PhoneNumber},
                                        {Data.Address?.message && <b>{Data.Address?.message}</b>}
                                    </p>
                                </div>
                            </table>
                        )}
                    </div>
                    {/* <div className="w-100 d-flex align-items-center justify-content-center">
                        <button
                        onClick={OrderConfirm}
                            style={{ height: "40px" }}
                            className="btn btn-success rounded-0 mb-2 ms-4"
                            variant="outlined"
                            color="primary"
                        >
                            Confirm Order
                        </button>
                    </div> */}
                </Box>
            </div>
        </div>
    );
}
