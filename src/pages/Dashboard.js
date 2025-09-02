import React, { useEffect, useState } from "react";
import WaterForm from "../components/WaterForm";

function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0,10); // YYYY-MM-DD
}

export default function Dashboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("waterRecords") || "{}");
    } catch {
      return {};
    }
  });

  const [reminderOn, setReminderOn] = useState(false);
  const [intervalMin, setIntervalMin] = useState(60);

  const goal = 2000; // ml per day
  const today = todayKey();
  const todayList = records[today] || [];
  const totalToday = todayList.reduce((s, r) => s + (r.ml || 0), 0);
  const remaining = Math.max(0, goal - totalToday);

  // add water
  const addWater = (ml) => {
    const newRecords = { ...records };
    const entry = { ml, time: new Date().toISOString() };
    if (!newRecords[today]) newRecords[today] = [];
    newRecords[today].push(entry);
    setRecords(newRecords);
    localStorage.setItem("waterRecords", JSON.stringify(newRecords));
  };

  // Reminder effect
  useEffect(() => {
    let id;
    if (reminderOn) {
      const ms = Math.max(1000, intervalMin * 60 * 1000);
      id = setInterval(() => {
        // use Notification API if permission
        if (window.Notification && Notification.permission === "granted") {
          new Notification("Nhắc uống nước 💧", { body: `Bạn còn thiếu ${remaining} ml để đạt ${goal} ml` });
        } else {
          // fallback
          alert(`Nhắc uống nước! Bạn còn thiếu ${remaining} ml để đạt ${goal} ml`);
        }
      }, ms);
    }
    return () => clearInterval(id);
  }, [reminderOn, intervalMin, remaining]);

  const requestPermission = async () => {
    if (!("Notification" in window)) return alert("Trình duyệt không hỗ trợ Notification API");
    const perm = await Notification.requestPermission();
    alert("Quyền Notification: " + perm);
  };

  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 card-rounded shadow-sm">
            <h5>Xin chào, {userInfo?.email}</h5>
            <p>Chiều cao: {userInfo?.height} cm • Cân nặng: {userInfo?.weight} kg • Nhóm máu: {userInfo?.blood}</p>
            <hr />
            <h6>Mục tiêu ngày: {goal} ml</h6>
            <p>Đã uống hôm nay: <strong>{totalToday} ml</strong></p>
            {remaining > 0 ? (
              <div className="text-danger">Bạn còn thiếu <strong>{remaining} ml</strong> để đạt 2.000 ml</div>
            ) : (
              <div className="text-success">🎉 Bạn đã đạt mục tiêu hôm nay!</div>
            )}
            <div className="progress mt-3" style={{ height: 18 }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${Math.min(100, (totalToday / goal) * 100)}%` }}
                aria-valuenow={totalToday}
                aria-valuemin="0"
                aria-valuemax={goal}
              >
                {Math.min(100, ((totalToday/goal)*100).toFixed(0))}%
              </div>
            </div>

            <div className="mt-4">
              <WaterForm onAdd={addWater} />
            </div>

            <div className="mt-4">
              <label className="form-label">Nhắc uống nước:</label>
              <div className="d-flex gap-2 align-items-center">
                <input type="checkbox" checked={reminderOn} onChange={(e)=>setReminderOn(e.target.checked)} />
                <input
                  type="number"
                  className="form-control w-auto"
                  value={intervalMin}
                  onChange={(e)=>setIntervalMin(Number(e.target.value))}
                />
                <span>phút</span>
                <button className="btn btn-outline-primary btn-sm ms-2" onClick={requestPermission}>Cho phép Notification</button>
              </div>
            </div>

          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 card-rounded shadow-sm">
            <h6>Lịch sử hôm nay</h6>
            {todayList.length === 0 ? (
              <p>Chưa có ghi nhận</p>
            ) : (
              <ul className="list-group">
                {todayList.slice().reverse().map((r, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>{new Date(r.time).toLocaleTimeString()}</div>
                    <div><strong>{r.ml} ml</strong></div>
                  </li>
                ))}
              </ul>
            )}
            <hr />
            <small className="text-muted">Gợi ý lượng nước khuyến nghị: {Math.round((userInfo?.weight || 70) * 30)} ml/ngày (dựa trên cân nặng)</small>
          </div>
        </div>
      </div>
    </div>
  );
}
