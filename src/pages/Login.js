import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return alert("Không có tài khoản. Vui lòng đăng ký.");
    if (user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card p-4 card-rounded shadow-sm" style={{ width: 420 }}>
        <h4 className="mb-3">Đăng nhập</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <input className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Mật khẩu" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Đăng nhập</button>
            <button type="button" className="btn btn-outline-secondary" onClick={()=>navigate("/register")}>Đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  );
}
