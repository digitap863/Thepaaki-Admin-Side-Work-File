
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import EditProducts from "../../components/editProductPage/EditProdutPage"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <EditProducts/>
      </div>
    </div>
  )
}

export default List