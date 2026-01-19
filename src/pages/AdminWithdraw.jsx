import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/AdminWithdraw.css";


function AdminWithdraw() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    try {
      const res = await api.get("/withdraw/admin/withdraw-pending", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(res.data);
    } catch (err) {
      console.error("Gagal load withdraw:", err);
      alert("Gagal mengambil data withdraw");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ APPROVE
  const approve = async (id) => {
    try {
      await api.post(
        `/withdraw/admin/approve-withdraw/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Withdraw berhasil di-approve");
      loadData();
    } catch (err) {
      console.log(err);
      alert("Gagal approve withdraw");
    }
  };

  // ✅ REJECT
  const reject = async (id) => {
    try {
      await api.post(
        `/withdraw/admin/reject-withdraw/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Withdraw ditolak");
      loadData();
    } catch (err) {
      console.log(err);
      alert("Gagal reject withdraw");
    }
  };

  return (
    <div className="admin-withdraw">
    <h2 className="title">Withdraw Pending</h2>

    {data.length === 0 && (
      <p className="empty">Tidak ada withdraw pending</p>
    )}

    {data.map((w) => (
      <div key={w.id} className="withdraw-card">
        <div className="info">
          <p>User ID: {w.user_id}</p>
          <p className="amount">
            Rp {Number(w.amount).toLocaleString()}
          </p>
        </div>

        <div className="actions">
          <button
            className="approve-btn"
            onClick={() => approve(w.id)}
          >
            Approve
          </button>

          <button
            className="reject-btn"
            onClick={() => reject(w.id)}
          >
            Reject
          </button>
        </div>
      </div>
    ))}
  </div>
  );
}

export default AdminWithdraw;
