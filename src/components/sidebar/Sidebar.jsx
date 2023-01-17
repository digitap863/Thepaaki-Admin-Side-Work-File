import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInAdmin } from "../../redux/slices/AdminData";
import swal from "sweetalert";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const dispatchs = useDispatch();
  const AdminDeatails = useSelector((state) => state.admin.value);
  var superAdmin = false;
  if (AdminDeatails && AdminDeatails?.superAdmin) {
    superAdmin = true;
  }
  useEffect(() => {
    if (!AdminDeatails && AdminDeatails?.Token) {
      navigate("/");
    }
  }, [superAdmin]);

  const Logout = () => {
    swal({
      title: "Are you sure?",
      text: "are you want to Logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("OK", "successfuly Logouted!", "success");
        dispatchs(logInAdmin(null));
        navigate("/");
      } else {
        swal("Your Data Is Safe");
      }
    });
  };
  return (
    <div className="sidebar text-light">
      <div className="top ">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Moffa Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          {superAdmin && (
            <>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>

              <Link to="/wholesalers" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Wholesalers</span>
                </li>
              </Link>
              <Link to="/admin-manage" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Admin Manage</span>
                </li>
              </Link>
              <Link to="/view-wallet-info" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Wallet Info</span>
                </li>
              </Link>
              <Link
                to="/monthly-invoice-download"
                style={{ textDecoration: "none" }}
              >
                <li>
                  <StoreIcon className="icon" />
                  <span>Monthly Invoice</span>
                </li>
              </Link>
            </>
          )}
          <Link to="/banner-manage" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Slider-Banner</span>
            </li>
          </Link>

          <Link to="/bottom-banner-view" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Banner-Manage</span>
            </li>
          </Link>
          <Link to="/view-all-products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/add-products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Add Products</span>
            </li>
          </Link>
          <Link to="/deal-ofthe-day" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Deal Day</span>
            </li>
          </Link>
          <Link to="/all-orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <li>
            <Link to="/view-dispatch-orders" style={{ textDecoration: "none" }}>
              <LocalShippingIcon className="icon" />
              <span>Delivery</span>
            </Link>
          </li>

          {/* <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li> */}
          {/* <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/*       
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li> */}
          {/* <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li> */}
          {/* <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}

          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <li onClick={Logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
