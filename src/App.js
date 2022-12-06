import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AcceptReturns from "./pages/AcceptReturns/AcceptReturns";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dealers from "./pages/Dealers/Dealers";
import DistributeStock from "./pages/DistributeStock/DistributeStock";
import Login from "./pages/Login/Login";
import NewGasTank from "./pages/NewGasTank/NewGasTank";
import NewPurchaseOrder from "./pages/NewPurchaseOrder/NewPurchaseOrder";
import NewStock from "./pages/NewStock/NewStock";
import SellTanks from "./pages/SellTanks/SellTanks";
import ViewGasTanks from "./pages/ViewGasTanks/ViewGasTanks";
import ViewStock from "./pages/ViewStock/ViewStock";

function App() {
  const user = useSelector((state) =>
    state.loginDMS.type ? state.loginDMS.type : "DEALER"
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Sidebar />}>
          <Route
            path=""
            element={user === "DISTRIBUTOR" ? <Dashboard /> : <SellTanks />}
          />
          <Route path="new-stock" element={<NewStock />} />
          <Route path="accept-return" element={<AcceptReturns />} />
          <Route path="view-stock" element={<ViewStock />} />
          <Route path="distribute-stock" element={<DistributeStock />} />
          <Route path="new-order" element={<NewPurchaseOrder />} />
          <Route path="dealers" element={<Dealers />} />
          <Route path="new-gastank" element={<NewGasTank />} />
          <Route path="view-gastanks" element={<ViewGasTanks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
