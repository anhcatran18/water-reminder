import React from "react";
import StatsChart from "../components/StatsChart";

function last7Days() {
  const arr = [];
  for (let i=6;i>=0;i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    arr.push(d.toISOString().slice(0,10));
  }
  return arr;
}

export default function Statistics() {
  const records = JSON.parse(localStorage.getItem("waterRecords") || "{}");
  const days = last7Days();
  const data = days.map(day => {
    const total = (records[day] || []).reduce((s, r) => s + (r.ml || 0), 0);
    return { day: day.slice(5), ml: total }; // show MM-DD
  });

  return (
    <div className="container">
      <div className="card p-4 card-rounded shadow-sm">
        <h5>Thống kê 7 ngày</h5>
        <StatsChart data={data} />
        <table className="table mt-3">
          <thead><tr><th>Ngày</th><th>ML</th></tr></thead>
          <tbody>
            {data.map((d,i)=>(
              <tr key={i}><td>{d.day}</td><td>{d.ml} ml</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
