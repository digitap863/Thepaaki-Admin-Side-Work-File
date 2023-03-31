import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SinglOrderPage from "../../components/singleOrderPage/SingleOrderPage";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar/>
        <SinglOrderPage/>
      </div>
    </div>
  );
};

export default List;
