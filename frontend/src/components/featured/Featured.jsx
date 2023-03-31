import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import swal from "sweetalert";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Featured = () => {
  const [total, SetTotal] = useState(null);
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
          "/api/superAdmin/view-total-amount",
          config
        );
        const TotalAmount =parseInt(data[0].Total).toFixed(0);
       SetTotal(TotalAmount);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"90%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales</p>
        <p className="amount">₹{total}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          {/* <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
          {/* <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
          {/* <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
