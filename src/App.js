import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewStock from "./pages/ViewStock/ViewStock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Sidebar />}>
          <Route path="" element={<Dashboard />} />
          <Route path="view-stock" element={<ViewStock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
