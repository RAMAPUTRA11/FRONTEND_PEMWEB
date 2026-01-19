import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/AdminTopUp.css";

function AdminTopUp() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const loadData = async () => {
    const res = await api.get("/transaksi/pending", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const approve = async (id) => {
    await api.post(
      "/transaksi/approve-topup/" + id,
      {},
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    alert("Top up di-approve");
    loadData();
  };

  return (
  <div className="admin-topup">
    <h2 className="title">Top Up Pending</h2>

    {data.length === 0 && (
      <p className="empty">Tidak ada top up pending</p>
    )}

    {data.map((t) => (
      <div key={t.id} className="topup-card">
        <div className="info">
          <p>User ID: {t.user_id}</p>
          <p>Rp {Number(t.amount).toLocaleString()}</p>
        </div>

        <button
          className="approve-btn"
          onClick={() => approve(t.id)}
        >
          Approve
        </button>
      </div>
    ))}
  </div>
  );
}

export default AdminTopUp;
