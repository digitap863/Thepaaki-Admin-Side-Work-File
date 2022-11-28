import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Wholesalers from "./pages/wholesalers/Wholesaler";
import AdminPage from "./pages/adminManage/AdminPage";
import BannerManage from "./pages/bannerManage/Banner";
import AddProduts from "./pages/addProducts/AddProducts";
import AllProduts from "./pages/allProducts/AllProducts";
import SingleOrder from "./pages/singleOrderPage/SingleOrderpage";
import AllOrders from "./pages/order/Order";
import DealOfTheDAy from "./pages/dealOfDay/Deal";
import BottomBanner from "./pages/bottomBanner/BottomBanner";
import Dispatachorders from "./pages/dispatchOrders/DispatchOrders";
import PdfDownload from "./components/yesterdayAddress/PdfDownload";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPage from "./pages/EditProductPage/EditPage";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            </Route>
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="/home">
              <Route index element={<Home/>} />
            </Route>
            <Route path="/login">
              <Route index element={<Login/>} />
            </Route>
            <Route path="/wholesalers">
              <Route index element={<Wholesalers />} />
            </Route>
            <Route path="/admin-manage">
              <Route index element={<AdminPage />} />
            </Route>
            <Route path="/banner-manage">
              <Route index element={<BannerManage />} />
            </Route>

            <Route path="/add-products">
              <Route index element={<AddProduts />} />
            </Route>
            <Route path="/all-orders">
              <Route index element={<AllOrders />} />
            </Route>
            <Route path="/view-order-item/:id">
              <Route index element={<SingleOrder />} />
            </Route>
            <Route path="/view-all-products">
              <Route index element={<AllProduts />} />
            </Route>
            <Route path="/edit-produt-page/:id">
              <Route index element={<EditPage />} />
            </Route>
            <Route path="/deal-ofthe-day">
              <Route index element={<DealOfTheDAy />} />
            </Route>
            <Route path="/bottom-banner-view">
              <Route index element={<BottomBanner />} />
            </Route>
            <Route path="/view-dispatch-orders">
              <Route index element={<Dispatachorders />} />
            </Route>
            <Route path="/download-yesterday-address">
              <Route index element={<PdfDownload />} />
            </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
