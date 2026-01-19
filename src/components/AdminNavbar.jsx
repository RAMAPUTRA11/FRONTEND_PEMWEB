import { NavLink, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-navbar">
      <h2 className="logo">ADMIN PANEL</h2>

      <nav>
        <NavLink to="/admin/dashboard" className="nav-item">
          📊 Dashboard
        </NavLink>

        <NavLink to="/admin/withdraw" className="nav-item">
          💸 Withdraw
        </NavLink>
        <NavLink to="/admin/topup" className="nav-item">
          📤 Top Up
        </NavLink>
        <NavLink to="/admin/history" className="nav-item">
          📜 History
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default AdminNavbar;
