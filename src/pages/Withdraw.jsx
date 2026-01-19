import { useState } from "react";
import api from "../api/api";
import "../styles/wd.css";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await api.post(
        "/transaksi/withdraw",
        { amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(true);

      // auto close + redirect
      setTimeout(() => {
        setSuccess(false);
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      alert(err.response?.data?.message || "Gagal withdraw");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Withdraw Saldo</h2>
        <p className="subtitle">Masukkan jumlah yang ingin ditarik</p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Jumlah withdraw"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button type="submit">Withdraw</button>
        </form>
      </div>

      {/* POPUP SUCCESS */}
      {success && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="checkmark">✓</div>
            <h3>Withdraw Berhasil</h3>
            <p>Menunggu persetujuan admin</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Withdraw;