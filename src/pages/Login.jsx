import { useState } from "react";
import api from "../api/api";
import "../styles/login.css";

function Login() {
  const [form, setForm] = useState({
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
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role_id === 1) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <p className="register-text">
          Belum punya akun?
          <span onClick={() => window.location.href = "/register"}>
            {" "}Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
