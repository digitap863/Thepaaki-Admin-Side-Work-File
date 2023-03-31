
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AllProducts from "../../components/allProduts/AllProducts"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AllProducts/>
      </div>
    </div>
  )
}

export default List