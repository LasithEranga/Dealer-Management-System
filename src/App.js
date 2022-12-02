import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dealers from "./pages/Dealers/Dealers";
import DistributeStock from "./pages/DistributeStock/DistributeStock";
import NewGasTank from "./pages/NewGasTank/NewGasTank";
import NewStock from "./pages/NewStock/NewStock";
import ViewGasTanks from "./pages/ViewGasTanks/ViewGasTanks";
import ViewStock from "./pages/ViewStock/ViewStock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Sidebar />}>
          <Route path="" element={<Dashboard />} />
          <Route path="new-stock" element={<NewStock />} />
          <Route path="view-stock" element={<ViewStock />} />
          <Route path="distribute-stock" element={<DistributeStock />} />
          <Route path="dealers" element={<Dealers />} />
          <Route path="new-gastank" element={<NewGasTank />} />
          <Route path="view-gastanks" element={<ViewGasTanks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
