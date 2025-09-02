import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [blood, setBlood] = useState("A");
  const navigate = useNavigate();

  const handleAccountNext = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Điền email và mật khẩu");
    setStep(2);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (!height || !weight) return alert("Nhập chiều cao và cân nặng");
    // lưu user và info
    const user = { email, password };
    const userInfo = { email, height: Number(height), weight: Number(weight), blood };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    // khởi tạo water records nếu chưa có
    if (!localStorage.getItem("waterRecords")) localStorage.setItem("waterRecords", JSON.stringify({}));
    // auto login và chuyển tới dashboard
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card p-4 card-rounded shadow-sm" style={{ width: 420 }}>
        {step === 1 ? (
          <>
            <h4 className="mb-3">Tạo tài khoản</h4>
            <form onSubmit={handleAccountNext}>
              <div className="mb-2">
                <input className="form-control" placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <input className="form-control" placeholder="Mật khẩu" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Tiếp</button>
                <button type="button" className="btn btn-outline-secondary" onClick={()=>navigate("/login")}>Đã có tài khoản</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h4 className="mb-3">Thông tin cá nhân</h4>
            <form onSubmit={handleFinish}>
              <div className="mb-2">
                <input className="form-control" placeholder="Chiều cao (cm)" type="number" value={height} onChange={(e)=>setHeight(e.target.value)} required />
              </div>
              <div className="mb-2">
                <input className="form-control" placeholder="Cân nặng (kg)" type="number" value={weight} onChange={(e)=>setWeight(e.target.value)} required />
              </div>
              <div className="mb-3">
                <select className="form-select" value={blood} onChange={(e)=>setBlood(e.target.value)}>
                  <option value="A">Nhóm máu A</option>
                  <option value="B">Nhóm máu B</option>
                  <option value="AB">Nhóm máu AB</option>
                  <option value="O">Nhóm máu O</option>
                </select>
              </div>
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-outline-secondary" onClick={()=>setStep(1)}>Quay lại</button>
                <button type="submit" className="btn btn-success">Hoàn tất & vào Dashboard</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
