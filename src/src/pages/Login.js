import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />
      <button type="submit">Đăng nhập</button>
      <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </form>
  );
}
