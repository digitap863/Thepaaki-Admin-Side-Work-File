
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AddProducts from "../../components/addProducts/AddProducts"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AddProducts/>
      </div>
    </div>
  )
}

export default List