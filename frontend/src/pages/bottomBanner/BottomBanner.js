
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import BottomBannerManage from "../../components/bottomBanner/BottomBanner"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <BottomBannerManage/>
      </div>
    </div>
  )   
}

export default List