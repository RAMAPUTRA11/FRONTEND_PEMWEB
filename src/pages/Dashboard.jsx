import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/Dashboard.css";
import "../styles/AdminDashboard.css";
import Sidebar from "../components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const token = localStorage.getItem("token");

  const [latest, setLatest] = useState([]);
  const [chart, setChart] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
    fetchChart();
    fetchLatest();
  }, []);

const fetchDashboard = async () => {
  try {
    const res = await api.get("/transaksi/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setData(res.data);
  } catch (err) {
    console.error("Dashboard error:", err);
    alert("Gagal ambil data dashboard");
  }
};

  const fetchLatest = async () => {
    const res = await api.get("/transaksi/latest", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLatest(res.data || []);
  };

  const fetchChart = async () => {
    const res = await api.get("/transaksi/chart-weekly", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setChart(res.data || []);
  };

 if (!data) {
  return (
    <div style={{ padding: 40 }}>
      <h3>Loading dashboard...</h3>
    </div>
  );
}

  const safe = (v) => Number(v) || 0;

  const chartData = {
    labels: chart.map(i =>
      new Date(i.tanggal).toLocaleDateString("id-ID", {
        weekday: "short"
      })
    ),
    datasets: [
      {
        label: "Pemasukan",
        data: chart.map(i => safe(i.pemasukan)),
        backgroundColor: "#4ade80"
      },
      {
        label: "Pengeluaran",
        data: chart.map(i => safe(i.pengeluaran)),
        backgroundColor: "#f87171"
      }
    ]
  };
  const renderAmount = (t) => {
  if (t.type === "topup" && t.status === "success") {
    return <span className="plus">+ Rp {Number(t.amount).toLocaleString()}</span>;
  }

  if (t.type === "withdraw" && t.status === "success") {
    return <span className="minus">- Rp {Number(t.amount).toLocaleString()}</span>;
  }

  if (t.status === "rejected") {
    return <span className="rejected">❌ Withdraw ditolak</span>;
  }

  if (t.status === "pending") {
    return <span className="pending">⏳ Menunggu admin</span>;
  }
};

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      {/* ===== CONTENT ===== */}
      <div style={{ marginLeft: 260, padding: 30, width: "100%" }}>
        <h2>Dashboard</h2>

        {/* ===== CARD SUMMARY ===== */}
        <div className="card-grid">
          <div className="card">
            <p>Saldo</p>
            <h2>Rp {safe(data.saldo).toLocaleString()}</h2>
          </div>

          <div className="card">
            <p>Total Top Up</p>
            <h2 className="green">
              Rp {safe(data.total_topup).toLocaleString()}
            </h2>
          </div>

          <div className="card">
            <p>Total Withdraw</p>
            <h2 className="red">
              Rp {safe(data.total_withdraw).toLocaleString()}
            </h2>
          </div>

          <div className="card">
            <p>Transaksi</p>
            <h2>{data.history?.length || 0}</h2>
          </div>
        </div>

        {/* ===== CHART ===== */}
        <div className="chart-box">
          <h3>Aktivitas Mingguan</h3>
          <p className="chart-desc">
            Pemasukan & pengeluaran 7 hari terakhir
          </p>

          <Bar data={chartData} />
        </div>

        {/* ===== TRANSAKSI TERAKHIR ===== */}
        <div className="card-bottom-grid">
<div className="card">
  <h3 className="card-title">Transaksi Terakhir</h3>

  {latest.length === 0 ? (
    <p className="empty-text">Belum ada transaksi</p>
  ) : (
    latest.map((t, i) => (
      <div key={i} className="trx-row">

        {/* KIRI */}
        <div className="trx-left">
          <div>
            <p className="trx-type">
              {t.type === "topup" ? "Top Up" : "Withdraw"}
            </p>

            <span className="trx-date">
              {new Date(t.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

<div className="trx-right">
  {t.status === "pending" && (
    <span className="pending">⏳ Menunggu admin</span>
  )}

  {t.status === "rejected" && (
    <span className="rejected">❌ Withdraw ditolak</span>
  )}

  {t.status === "success" && (
    <span className={t.type === "topup" ? "plus" : "minus"}>
      {t.type === "topup" ? "+" : "-"} Rp{" "}
      {Number(t.amount).toLocaleString()}
    </span>
  )}
</div>
      </div>
    ))
  )}
</div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
