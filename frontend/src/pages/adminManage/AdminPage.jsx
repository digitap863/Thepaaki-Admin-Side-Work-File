
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AdminManage from "../../components/admin/AdminManage"

const List = () => {
  return (
    <div className="list">   
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AdminManage/>
      </div>
    </div>
  )
}

export default List