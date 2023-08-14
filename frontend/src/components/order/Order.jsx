import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import LocalMallIcon from "@mui/icons-material/LocalMall";

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

function AllOrder() {
    const AdminDeatails = useSelector((state) => state.admin.value);
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [state, changeState] = useState();
    const [fromstate, setFromstate] = useState();
    const navigate = useNavigate();
    const [edit, setEdit] = useState();
    const { register, handleSubmit, trigger, reset, setValue } = useForm();

    const ChangeOrderStatus = async (status, orderId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "auth-token": AdminDeatails.Token,
                },
            };
            const { data } = await axios.post("/api/superAdmin/Change-order-status", { status, orderId }, config);
        } catch (error) {}
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
        {
            name: "COURIER SERVICE",
            selector: (row) => row.Courier,
            sortable: true,
        },

        {
            name: "ORDER STATUS",
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
            name: "ORDER DETAILS",
            sortable: true,
            cell: (row) => (
                <>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                {row.Product.map((items) => {
                                    return <div className="fw-bold m-2">{items.ProductID} / {items.color} / {items.size} / {items.quantity}</div>;
                                })}
                            </Tooltip>
                        }
                    >
                        <LocalMallIcon className="me-3" />
                    </OverlayTrigger>
                    <RemoveRedEyeIcon
                        onClick={() => navigate(`/view-order-item/${row._id}`)}
                        style={{ color: "blue", cursor: "pointer" }}
                    />
                    {row.role == "wholesaler" && (
                        <ModeEditIcon
                            style={{
                                marginLeft: "10px",
                                fontSize: "18px",
                                color: "blue",
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                TakeAddress(row._id);
                            }}
                        />
                    )}
                </>
            ),
        },
    ];

    const tableData = {
        columns,
        data,
    };
    const handleClose = () => {
        setOpen(false);
    };
    var newArray;
    const TakeAddress = (id) => {
        data.map((items) => {
            if (items._id == id) {
                newArray = items;
                setEdit(items);
                AddAddres(items.Address);
                AddAddresFrom(items.FromAddress);
            }
        });
        setOpen(true);
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
                const { data } = await axios.get("/api/superAdmin/view-all-orders", config);
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
    const AddAddres = (address) => {
        setValue("Name", address.Name);
        setValue("LastName", address.LastName);
        setValue("StreetAddress", address.StreetAddress);
        setValue("TownCity", address.TownCity);
        setValue("Postcode", address.Pincode);
        setValue("PhoneNumber", address.PhoneNumber);
        setValue("Email", address.Email);
        changeState(address.State);
    };
    const AddAddresFrom = (details) => {
        setValue("FromName", details.FromName);
        setValue("FromLastName", details.FromLastName);
        setValue("FromStreetAddress", details.FromStreetAddress);
        setValue("FromTownCity", details.FromTownCity);
        setValue("FromPincode", details.FromPincode);
        setValue("FromPhoneNumber", details.FromPhoneNumber);
        setValue("FromEmail", details.FromEmail);
        setFromstate(details.FromState);
    };
    const onSubmit = async (data) => {
        const Address = {
            Name: data.Name,
            LastName: data.LastName,
            StreetAddress: data.StreetAddress,
            TownCity: data.TownCity,
            Postcode: data.Postcode,
            PhoneNumber: data.PhoneNumber,
            Email: data?.Email,
            State: state,
        };
        const FromAddress = {
            FromName: data.FromName,
            FromLastName: data.FromLastName,
            FromStreetAddress: data.FromStreetAddress,
            FromTownCity: data.FromTownCity,
            FromPincode: data.FromPincode,
            FromPhoneNumber: data.FromPhoneNumber,
            FromEmail: data?.FromEmail,
            FromState: fromstate,
        };
        const id = edit._id;
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "auth-token": AdminDeatails.Token,
                },
            };
            const { data } = await axios.post("/api/superAdmin/edit-order-address", { Address, FromAddress, id }, config);
            setOpen(false);
        } catch (error) {
            swal({
                title: "NO RECODS",
                text: "Something Went Wrong!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
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
            <div className="text-end">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        navigate("/download-yesterday-address");
                    }}
                >
                    DOWNLOAD ADDRESS
                </button>
            </div>
            <DataTableExtensions {...tableData}>
                <DataTable
                    title={"Order Details"}
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
                            <h3 style={{ textAlign: "center" }}>ADDRESS EDITING</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>TO ADDRESS</label>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label>Name</label>
                                        <input
                                            name="name"
                                            className="form-control"
                                            {...register("Name", {
                                                required: "Name is required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("Name");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Last Name</label>
                                        <input
                                            name="LastName"
                                            className="form-control"
                                            {...register("LastName", {
                                                required: "Last Name  required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("LastName");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>State</label>
                                        <select
                                            className="form-control"
                                            onChange={(e) => {
                                                changeState(e.target.value);
                                            }}
                                        >
                                            {state ? <option>{state}</option> : <option>Select a State</option>}
                                            <option>Kerala</option>
                                            <option>Andhra Pradesh</option>
                                            <option>Arunachal Pradesh</option>
                                            <option>Assam</option>
                                            <option>Bihar</option>
                                            <option>Chhattisgarh</option>
                                            <option>Goa</option>
                                            <option>Gujarat</option>
                                            <option>Haryana</option>
                                            <option>Himachal Pradesh</option>
                                            <option>Jharkhand</option>
                                            <option>Karnataka</option>
                                            <option>Madhya Pradesh</option>
                                            <option>Maharashtra</option>
                                            <option>Manipur</option>
                                            <option>Meghalaya</option>
                                            <option>Mizoram</option>
                                            <option>Nagaland</option>
                                            <option>Odisha</option>
                                            <option>Punjab</option>
                                            <option>Rajasthan</option>
                                            <option>Sikkim</option>
                                            <option>Tamil Nadu</option>
                                            <option>Telangana</option>
                                            <option>Tripura</option>
                                            <option>Uttar Pradesh</option>
                                            <option>Uttarakhand</option>
                                            <option>West Bengal</option>
                                            <option>Mumbai</option>
                                            <option>Delhi</option>
                                            <option>Pondicherry</option>
                                            <option>Lakshadweep</option>
                                            <option>Andaman and Nicobar</option>
                                            <option>Chandigarh</option>
                                            <option>Dadra and Nagar Haveli</option>
                                            <option>Jammu and Kashmir</option>
                                            <option>Ladakh</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Street Address</label>
                                        <input
                                            name="StreetAddress"
                                            className="form-control"
                                            {...register("StreetAddress", {
                                                required: "required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("StreetAddress");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Town / City</label>
                                        <input
                                            name="TownCity"
                                            className="form-control"
                                            {...register("TownCity", {
                                                required: "required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("TownCity");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Postcode / ZIP</label>
                                        <input
                                            name="Postcode"
                                            className="form-control"
                                            {...register("Postcode", {
                                                required: "*required",
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Please Enter Valid PIN",
                                                },
                                            })}
                                            onKeyUp={() => {
                                                trigger("Postcode");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Phone</label>
                                        <input
                                            name="PhoneNumber"
                                            className="form-control"
                                            {...register("PhoneNumber", {
                                                required: "*required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("PhoneNumber");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Email Address</label>
                                        <input
                                            name="PhoneNumber"
                                            className="form-control"
                                            {...register("Email")}
                                            onKeyUp={() => {
                                                trigger("Email");
                                            }}
                                        />
                                    </div>
                                </div>
                                <label className="mt-5">FROM ADDRESS</label>
                                <div className="row ">
                                    <div className="col-lg-6">
                                        <label> Name</label>
                                        <input
                                            name="FromName"
                                            className="form-control"
                                            {...register("FromName", {
                                                required: "Name is required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("FromName");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Last Name</label>
                                        <input
                                            name="FromLastName"
                                            className="form-control"
                                            {...register("FromLastName", {
                                                required: "Last Name  required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("FromLastName");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>State</label>
                                        <select
                                            className="form-control"
                                            onChange={(e) => {
                                                setFromstate(e.target.value);
                                            }}
                                        >
                                            {state ? <option>{fromstate}</option> : <option>Select a State</option>}
                                            <option>Kerala</option>
                                            <option>Andhra Pradesh</option>
                                            <option>Arunachal Pradesh</option>
                                            <option>Assam</option>
                                            <option>Bihar</option>
                                            <option>Chhattisgarh</option>
                                            <option>Goa</option>
                                            <option>Gujarat</option>
                                            <option>Haryana</option>
                                            <option>Himachal Pradesh</option>
                                            <option>Jharkhand</option>
                                            <option>Karnataka</option>
                                            <option>Madhya Pradesh</option>
                                            <option>Maharashtra</option>
                                            <option>Manipur</option>
                                            <option>Meghalaya</option>
                                            <option>Mizoram</option>
                                            <option>Nagaland</option>
                                            <option>Odisha</option>
                                            <option>Punjab</option>
                                            <option>Rajasthan</option>
                                            <option>Sikkim</option>
                                            <option>Tamil Nadu</option>
                                            <option>Telangana</option>
                                            <option>Tripura</option>
                                            <option>Uttar Pradesh</option>
                                            <option>Uttarakhand</option>
                                            <option>West Bengal</option>
                                            <option>West Bengal</option>
                                            <option>Delhi</option>
                                            <option>Mumbai</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Street Address</label>
                                        <input
                                            name="FromStreetAddress"
                                            className="form-control"
                                            {...register("FromStreetAddress", {
                                                required: "required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("FromStreetAddress");
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Town / City</label>
                                        <input
                                            {...register("FromTownCity", {
                                                required: "required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("FromTownCity");
                                            }}
                                            className="form-control"
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Postcode / ZIP</label>
                                        <input
                                            className="form-control"
                                            {...register("FromPincode", {
                                                required: "*required",
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Please Enter Valid PIN",
                                                },
                                            })}
                                            onKeyUp={() => {
                                                trigger("FromPincode");
                                            }}
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Phone</label>
                                        <input
                                            className="form-control"
                                            {...register("FromPhoneNumber", {
                                                required: "*required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("FromPhoneNumber");
                                            }}
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Email Address</label>
                                        <input
                                            className="form-control"
                                            {...register("FromEmail")}
                                            onKeyUp={() => {
                                                trigger("FromEmail");
                                            }}
                                            type="text"
                                        />
                                    </div>

                                    <button className="btn btn-primary mt-3 mb-3" type="submit">
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
export default AllOrder;
