import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/TopUp.css";

function TopUp() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("1");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/transaksi/topup",
        {
          amount,
          payment_method_id: method
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      // ✅ tampilkan popup
      setShowPopup(true);

      // ⏱ auto close + redirect
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      alert("Top up gagal");
    }
  };

  return (
    <div className="topup-page">
      <h2>Top Up Saldo</h2>

      <form className="topup-card" onSubmit={handleSubmit}>
        <label>Metode Pembayaran</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="1">QRIS</option>
          <option value="2">DANA</option>
          <option value="3">TRANSFER</option>
        </select>

        <label>Nominal</label>
        <input
          type="number"
          placeholder="Masukkan nominal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Top Up</button>
      </form>

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="checkmark">✓</div>
            <h3>Top Up Berhasil</h3>
            <p>Saldo akan diproses</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopUp;
