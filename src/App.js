import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dealers from "./pages/Dealers/Dealers";
import DistributeStock from "./pages/DistributeStock/DistributeStock";
import ViewGasTanks from "./pages/ViewGasTanks/ViewGasTanks";
import ViewStock from "./pages/ViewStock/ViewStock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Sidebar />}>
          <Route path="" element={<Dashboard />} />
          <Route path="view-stock" element={<ViewStock />} />
          <Route path="distribute-stock" element={<DistributeStock />} />
          <Route path="dealers" element={<Dealers />} />
          <Route path="view-gastanks" element={<ViewGasTanks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
