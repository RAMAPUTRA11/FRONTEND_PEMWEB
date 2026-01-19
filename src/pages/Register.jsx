import { useState } from "react";
import api from "../api/api";
import "../styles/register.css";

function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      alert("Register berhasil, silakan login");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="title">Create Account</h2>
        <p className="subtitle">Daftar untuk melanjutkan</p>

        <form onSubmit={handleSubmit}>
          <input
            name="nama"
            placeholder="Nama Lengkap"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit" className="btn-register">
            Register
          </button>
        </form>

        <p className="login-text">
          Sudah punya akun?
          <span onClick={() => window.location.href = "/"}>
            {" "}Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;
