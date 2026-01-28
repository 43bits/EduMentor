"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { day: "Mon", time: 120 },
  { day: "Tue", time: 180 },
  { day: "Wed", time: 90 },
  { day: "Thu", time: 240 },
  { day: "Fri", time: 60 },
];

export default function AnalyticsChart() {
  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="font-bold mb-2">Weekly Study</h2>
      <LineChart width={400} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="time" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
