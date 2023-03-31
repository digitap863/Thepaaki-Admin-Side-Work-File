import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useState } from "react";

const Widget = ({ type }) => {
  const [user, setUser] = useState(null);
  const [wholsaler,setWholesalers]=useState(null)
  const [admin,setAdmin]=useState(null)
  const [orders,setOrders]=useState(null)
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
        const { data } = await axios.get("/api/superAdmin/viewAlluser", config);
        const num = data.length;
        setUser(num);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);
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
        const num=data.length
        setWholesalers(num)
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);

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
      const num=data.length
     setAdmin(num)
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);

  
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
          "/api/superAdmin/view-all-orders",
          config
        );
       const num =data.length
       setOrders(num)
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);

  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        num:user,
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "WHOLESALERS",
        isMoney: false,
        num:wholsaler,
        link: "View all Wholesalers",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "ADMIN",
        num:admin,
        isMoney: false,
        link: "View all Admin",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "ORDERS",
        isMoney: false,
        num:orders,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title text-dark">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.num}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
