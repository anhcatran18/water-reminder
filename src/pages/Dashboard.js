import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WaterForm from "../components/WaterForm";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Trang chính</h2>
        <button onClick={handleLogout}>Đăng xuất</button>
      </header>
      <WaterForm />
      <div style={{ marginTop: 20 }}>
        <Link to="/statistics">Xem thống kê</Link>
      </div>
    </div>
  );
}