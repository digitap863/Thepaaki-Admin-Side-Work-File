import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AllOrders from "../../components/dispatchOrders/DispatchOrders";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar/>
        <AllOrders/>
      </div>
    </div>
  );
};

export default List;
