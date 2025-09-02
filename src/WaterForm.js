import React, { useState, useEffect } from "react";

const STORAGE_KEY = "water_entries_v1";

export default function WaterForm() {
  const [amount, setAmount] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ml = parseInt(amount, 10);
    if (!ml || ml <= 0) {
      return alert("Hãy nhập số ml hợp lệ (>0).");
    }
    const now = new Date();
    const entry = {
      id: Date.now(),
      ml,
      timeISO: now.toISOString(),
      timeStr: now.toLocaleString(),
    };
    setEntries([entry, ...entries]);
    setAmount("");
  };

  const totalToday = entries
    .filter((en) => en.timeISO.slice(0, 10) === new Date().toISOString().slice(0, 10))
    .reduce((s, en) => s + en.ml, 0);

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 16 }}>
      <form onSubmit={handleSubmit} style={{ background: "#e8f7ff", padding: 14, borderRadius: 8 }}>
        <h2>Nhắc Uống Nước 💧</h2>
        <p>Đã uống hôm nay: <b>{totalToday} ml</b></p>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="number"
            placeholder="Nhập lượng (ml)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ flex: 1, padding: 8 }}
            required
          />
          <button type="submit" style={{ padding: "8px 12px", background: "#1e90ff", color: "white", border: "none", borderRadius: 4 }}>
            Ghi nhận
          </button>
        </div>
      </form>

      <h3 style={{ marginTop: 20 }}>Lịch sử</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {entries.length === 0 && <li style={{ color: "#666" }}>Chưa có ghi nhận</li>}
        {entries.map((it) => (
          <li key={it.id} style={{ padding: 6, borderBottom: "1px solid #ddd" }}>
            {it.ml} ml - <small>{it.timeStr}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
