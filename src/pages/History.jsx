import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/History.css";

function History() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 5; // jumlah data per halaman
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/transaksi/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(res.data || []);
    } catch (err) {
      alert("Gagal ambil history");
    }
  };

  const start = (page - 1) * limit;
  const end = start + limit;
  const pagedData = data.slice(start, end);
  const totalPage = Math.ceil(data.length / limit);

  return (
    <div className="history-container">
      <h2>📜 Riwayat Transaksi</h2>

      {pagedData.length === 0 && (
        <p className="empty">Belum ada transaksi</p>
      )}

      {pagedData.map((t) => (
        <div key={t.id} className="history-card">
          <div className="left">
            <p className="type">
              {t.type === "topup" ? "Top Up" : "Withdraw"}
            </p>
            <span className="date">
              {new Date(t.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="right">
            {t.status === "pending" && (
              <span className="pending">⏳ Pending</span>
            )}

            {t.status === "success" && (
              <span className="success">
                {t.type === "topup" ? "+" : "-"} Rp{" "}
                {Number(t.amount).toLocaleString()}
              </span>
            )}

            {t.status === "rejected" && (
              <span className="rejected">❌ Ditolak</span>
            )}
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      {totalPage > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ⬅ Prev
          </button>

          <span>
            Page {page} / {totalPage}
          </span>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default History;