
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import WalletINfo from "../../components/walletinfo/WalletInfo"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <WalletINfo/>
      </div>
    </div>
  )
}

export default List