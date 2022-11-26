import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Sidebar />}>
          <Route path="" element={<Dashboard />} />
          <Route path="home" element={<div>Home</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
