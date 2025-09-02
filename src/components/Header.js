import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">WaterReminder</Link>
        <div>
          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              <span className="me-3">Xin chào, <strong>{userInfo?.email || "User"}</strong></span>
              <Link className="btn btn-outline-primary me-2" to="/dashboard">Dashboard</Link>
              <Link className="btn btn-outline-secondary me-2" to="/statistics">Statistics</Link>
              <button onClick={handleLogout} className="btn btn-danger">Đăng xuất</button>
            </div>
          ) : (
            <div>
              <Link className="btn btn-outline-primary me-2" to="/login">Đăng nhập</Link>
              <Link className="btn btn-primary" to="/register">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
