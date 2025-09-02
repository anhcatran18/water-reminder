import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Statistics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("water_entries_v1");
    if (raw) {
      const entries = JSON.parse(raw);
      const grouped = {};
      entries.forEach(e => {
        const day = e.timeISO.slice(0, 10);
        grouped[day] = (grouped[day] || 0) + e.ml;
      });
      const arr = Object.keys(grouped).map(day => ({ date: day, ml: grouped[day] }));
      setData(arr);
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Thống kê</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ml" fill="#1e90ff" />
      </BarChart>
      <div style={{ marginTop: 20 }}>
        <Link to="/">Quay lại</Link>
      </div>
    </div>
  );
}
