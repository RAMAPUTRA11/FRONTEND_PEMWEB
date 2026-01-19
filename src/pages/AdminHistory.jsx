import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/AdminHistory.css";

function AdminHistory() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/transaksi/admin/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(res.data);
    } catch (err) {
      alert("Gagal ambil history admin");
    }
  };

  return (
    <div className="admin-history">
      <h2 className="title">History Transaksi Admin</h2>

      <div className="table-box">
        <table className="history-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Jenis</th>
              <th>Nominal</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id}>
                <td>{t.nama}</td>
                <td className="type">{t.type}</td>
                <td>Rp {Number(t.amount).toLocaleString()}</td>
                <td>
                  <span className={`status ${t.status}`}>
                    {t.status}
                  </span>
                </td>
                <td>{t.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="empty">Belum ada transaksi</p>
        )}
      </div>
    </div>
  );
}

export default AdminHistory;
