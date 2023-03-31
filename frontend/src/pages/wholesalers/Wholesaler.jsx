
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import WholesalerDatatable from "../../components/wholesalers/Wholesaler"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <WholesalerDatatable/>
      </div>
    </div>
  )
}

export default List