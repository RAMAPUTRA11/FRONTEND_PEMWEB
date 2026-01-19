import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Sidebar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">

      {/* USER INFO */}
      <div className="user-box">
        <div className="avatar">
          {user?.nama?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="user-info">
          <p className="user-name">
            {user?.nama || "User"}
          </p>
          <span className="user-role">
            {user?.role_id === 1 ? "Admin" : "User"}
          </span>
        </div>
      </div>

      <nav className="menu">
        <Link className={isActive("/dashboard")} to="/dashboard">
          📊 Dashboard
        </Link>

        <Link className={isActive("/topup")} to="/topup">
          ➕ Top Up
        </Link>

        <Link className={isActive("/withdraw")} to="/withdraw">
          ➖ Withdraw
        </Link>

        <Link className={isActive("/history")} to="/history">
          📜 Riwayat
        </Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

    </div>
  );
}
