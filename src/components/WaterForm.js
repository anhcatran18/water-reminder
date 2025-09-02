import React, { useState } from "react";

export default function WaterForm({ onAdd }) {
  const [custom, setCustom] = useState("");

  const submitCustom = (e) => {
    e.preventDefault();
    const ml = parseInt(custom, 10);
    if (!ml || ml <= 0) return alert("Nhập số ml hợp lệ");
    onAdd(ml);
    setCustom("");
  };

  return (
    <div>
      <div className="btn-group mb-3">
        <button className="btn btn-outline-primary" onClick={() => onAdd(100)}>+100 ml</button>
        <button className="btn btn-outline-primary" onClick={() => onAdd(200)}>+200 ml</button>
        <button className="btn btn-outline-primary" onClick={() => onAdd(500)}>+500 ml</button>
      </div>

      <form onSubmit={submitCustom} className="d-flex gap-2 align-items-center">
        <input
          type="number"
          className="form-control"
          placeholder="Nhập ml (ví dụ 250)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <button className="btn btn-success" type="submit">Thêm</button>
      </form>
    </div>
  );
}
