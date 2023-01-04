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
import NewStock from "./pages/NewStock/NewStock";
import SellTanks from "./pages/SellTanks/SellTanks";
import ViewGasTanks from "./pages/ViewGasTanks/ViewGasTanks";
import ViewStock from "./pages/ViewStock/ViewStock";
import Test from "./pages/Test";
import SavedPurchaseOrders from "./pages/SavedPurchaseOrders/SavedPurchaseOrders";
import PendingPaymentPurchaseOrders from "./pages/PendingPaymentPurchaseOrders/PendingPaymentPurchaseOrders";
import NewPurchaseOrders from "./pages/NewPurchaseOrders/NewPurchaseOrders";
import ViewPurchaseOrders from "./pages/ViewPurchaseOrders/ViewPurchaseOrders";
import ViewDealerStocks from "./pages/ViewDealerStocks/ViewDealerStocks";
import NewPurchaseOrder from "./pages/DealerPurchaseOrders/NewPurchaseOrder/NewPurchaseOrder";
import AcceptedPurchaseOrders from "./pages/DealerPurchaseOrders/AcceptedPurchaseOrders/AcceptedPurchaseOrders";
import PendingPurchaseOrders from "./pages/DealerPurchaseOrders/PendingPurchaseOrders/PendingPurchaseOrders";
import DeclinedPurchaseOrders from "./pages/DealerPurchaseOrders/DeclinedPurchaseOrders/DeclinedPurchaseOrders.";
import PendingPaymentPurchaseOrdersDealer from "./pages/DealerPurchaseOrders/PendingPaymentPurchaseOrdersDealer/PendingPaymentPurchaseOrdersDealer";

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
          <Route path="new-orders" element={<NewPurchaseOrders />} />
          <Route path="accepted-orders" element={<AcceptedPurchaseOrders />} />
          <Route path="pending-orders" element={<PendingPurchaseOrders />} />
          <Route path="declined-orders" element={<DeclinedPurchaseOrders />} />
          <Route
            path="pending-payments-dealer"
            element={<PendingPaymentPurchaseOrdersDealer />}
          />
          <Route path="saved-orders" element={<SavedPurchaseOrders />} />
          <Route
            path="payment-pending-orders"
            element={<PendingPaymentPurchaseOrders />}
          />
          <Route path="view-orders" element={<ViewPurchaseOrders />} />
          <Route path="dealers" element={<Dealers />} />
          <Route path="dealer-stocks" element={<ViewDealerStocks />} />
          <Route path="test" element={<Test />} />
          <Route path="new-gastank" element={<NewGasTank />} />
          <Route path="view-gastanks" element={<ViewGasTanks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
