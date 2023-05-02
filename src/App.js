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
import SavedPurchaseOrders from "./pages/DistributorPurchseOrders/SavedPurchaseOrders/SavedPurchaseOrders";
import PendingPaymentPurchaseOrders from "./pages/DistributorPurchseOrders/PendingPaymentPurchaseOrders/PendingPaymentPurchaseOrders";
import NewPurchaseOrders from "./pages/DistributorPurchseOrders/NewPurchaseOrders/NewPurchaseOrders";
import ViewPurchaseOrders from "./pages/DistributorPurchseOrders/ViewPurchaseOrders/ViewPurchaseOrders";
import ViewDealerStocks from "./pages/ViewDealerStocks/ViewDealerStocks";
import NewPurchaseOrder from "./pages/DealerPurchaseOrders/NewPurchaseOrder/NewPurchaseOrder";
import AcceptedPurchaseOrders from "./pages/DealerPurchaseOrders/AcceptedPurchaseOrders/AcceptedPurchaseOrders";
import PendingPurchaseOrders from "./pages/DealerPurchaseOrders/PendingPurchaseOrders/PendingPurchaseOrders";
import DeclinedPurchaseOrders from "./pages/DealerPurchaseOrders/DeclinedPurchaseOrders/DeclinedPurchaseOrders.";
import PendingPaymentPurchaseOrdersDealer from "./pages/DealerPurchaseOrders/PendingPaymentPurchaseOrdersDealer/PendingPaymentPurchaseOrdersDealer";
import DistributorReports from "./pages/Reports/DistributorReports";
import ReturnStockToDistributor from "./pages/ReturnStockToDistributor/ReturnStockToDistributor";
import DealerSales from "./pages/DealerSales/DealerSales";
import Test from "./pages/Test";
import SalesReport from "./pages/Reports/DistributorReports/SalesReport/SalesReport";
import Receivables from "./pages/Reports/DistributorReports/Receivables/Receivables";
import TankReturns from "./pages/Reports/DistributorReports/TankReturns/TankReturns";
import StockReport from "./pages/Reports/DistributorReports/StockReport/StockReport";
import DealerStockReport from "./pages/Reports/DistributorReports/DealerStockReport/DealerStockReport";
import PurchaseOrdersReport from "./pages/Reports/DistributorReports/PurchaseOrdersReport/PurchaseOrdersReport";
import FastMovingStocks from "./pages/Reports/DistributorReports/FastMovingStocks/FastMovingStocks";
import AcceptedPurchaseOrdersDistributor from "./pages/DistributorPurchseOrders/AcceptedPurchaseOrders/AcceptedPurchaseOrders";
import DealerReports from "./pages/Reports/DealerReports";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  const user = useSelector((state) =>
    state.loginDMS.type ? state.loginDMS.type : "DEALER"
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/"}
          element={
            <ProtectedRoutes>
              <Sidebar />
            </ProtectedRoutes>
          }
        >
          <Route
            path=""
            element={user === "DISTRIBUTOR" ? <Dashboard /> : <SellTanks />}
          />

          <Route path="test" element={<Test />} />
          <Route path="new-stock" element={<NewStock />} />
          <Route path="accept-return" element={<AcceptReturns />} />
          <Route path="view-stock" element={<ViewStock />} />
          <Route path="distribute-stock" element={<DistributeStock />} />
          <Route path="new-order" element={<NewPurchaseOrder />} />
          <Route path="new-orders" element={<NewPurchaseOrders />} />
          <Route path="dealer-sales" element={<DealerSales />} />
          <Route path="dealer-reports" element={<DealerReports />} />

          <Route
            path="return-to-distributor"
            element={<ReturnStockToDistributor />}
          />
          <Route
            path="accepted-orders-distributor"
            element={<AcceptedPurchaseOrdersDistributor />}
          />
          <Route path="accepted-orders" element={<AcceptedPurchaseOrders />} />
          <Route path="pending-orders" element={<PendingPurchaseOrders />} />
          <Route path="declined-orders" element={<DeclinedPurchaseOrders />} />
          <Route path="distributor-reports" element={<DistributorReports />} />
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
          <Route
            path="distributor-reports/sales-report"
            element={<SalesReport />}
          />
          <Route
            path="distributor-reports/receivables-report"
            element={<Receivables />}
          />
          <Route
            path="distributor-reports/tank-returns-report"
            element={<TankReturns />}
          />
          <Route
            path="distributor-reports/stocks-report"
            element={<StockReport />}
          />
          <Route
            path="distributor-reports/dealer-stocks-report"
            element={<DealerStockReport />}
          />
          <Route
            path="distributor-reports/fast-moving-stocks-report"
            element={<FastMovingStocks />}
          />
          <Route
            path="distributor-reports/purchase-orders-report"
            element={<PurchaseOrdersReport />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
