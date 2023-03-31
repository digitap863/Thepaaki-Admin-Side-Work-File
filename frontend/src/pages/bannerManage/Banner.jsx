
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import BannerManage from "../../components/bannerManage/Banner"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <BannerManage/>
      </div>
    </div>
  )   
}

export default List