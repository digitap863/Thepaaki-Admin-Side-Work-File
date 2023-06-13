import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const AdminDeatails = useSelector((state) => state.admin.value);
  var superAdmin = false;
  if (AdminDeatails?.superAdmin) {
    superAdmin = true;
  }
  useEffect(() => {
    if (AdminDeatails && AdminDeatails.Token) {
    } else {
      navigate("/");
    }
    if (AdminDeatails) {
      superAdmin = AdminDeatails.superAdmin;
    }
  }, [AdminDeatails]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {superAdmin && (
          <>
            <div className="widgets">
              <Widget type="user" />
              <Widget type="order" />
              <Widget type="earning" />
              <Widget type="balance" />
            </div>
            <div className="charts">
              <Featured />
              <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>{" "}
          </>
        )}
        {/* <div className="listContainer">
          <div className="listTitle">Stock Updations</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
