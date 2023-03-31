
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import MonthlyInvoice from "../../components/MothlyReport/MonthlyInvoice"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <MonthlyInvoice/>
      </div>
    </div>
  )
}

export default List