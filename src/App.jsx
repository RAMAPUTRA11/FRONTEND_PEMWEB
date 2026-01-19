import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TopUp from "./pages/TopUp";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";
import AdminWithdraw from "./pages/AdminWithdraw";
import AdminTopup from "./pages/AdminTopup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHistory from "./pages/AdminHistory";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin/withdraw" element={<AdminWithdraw />} />
          <Route path="/admin/topup" element={<AdminTopup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/history" element={<AdminHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
