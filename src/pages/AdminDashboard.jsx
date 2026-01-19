import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/AdminDashboard.css";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard() {
  const [withdraws, setWithdraws] = useState([]);
  const token = localStorage.getItem("token");

  const loadData = async () => {

    try {
      const res = await api.get("/withdraw/admin/withdraw-pending", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWithdraws(res.data);
    } catch (err) {
      alert("Gagal mengambil data withdraw");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const approve = async (id) => {
    await api.post(
      `/withdraw/admin/approve-withdraw/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    loadData();
  };

  const reject = async (id) => {
    await api.post(
      `/withdraw/admin/reject-withdraw/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    loadData();
  };

  return (
    
   <div className="admin-container">
    <AdminNavbar />

    <div className="admin-content">
      <h2 className="admin-title">Dashboard Admin</h2>
      <p className="admin-subtitle">Selamat datang admin 👋</p>

      {/* CARD */}
      <div className="admin-cards">
        <div className="admin-card">
          <p>Total Withdraw Pending</p>
          <h2>{withdraws.length}</h2>
        </div>

        <div className="admin-card green">
          <p>Status</p>
          <h2>Aktif</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="admin-table-box">
        <h3>Withdraw Pending</h3>

        {withdraws.length === 0 ? (
          <p className="empty">Tidak ada withdraw pending</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Nominal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {withdraws.map((w) => (
                <tr key={w.id}>
                  <td>User #{w.user_id}</td>
                  <td>Rp {Number(w.amount).toLocaleString()}</td>
                  <td>
                    <span className="badge pending">Pending</span>
                  </td>
                  <td>
                    <button
                      className="btn approve"
                      onClick={() => approve(w.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn reject"
                      onClick={() => reject(w.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
  );
}

export default AdminDashboard;
