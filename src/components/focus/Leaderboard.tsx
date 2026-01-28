"use client";
import { users } from "@/mock/data";

export default function Leaderboard() {
  return (
    <div className="p-4 bg-gray-200 rounded-md">
      <h2 className="font-bold mb-2">Leaderboard</h2>
      <ul>
        {users.sort((a,b)=>b.todayTime - a.todayTime).map(u => (
          <li key={u.id} className="flex justify-between">
            <span>{u.name}</span>
            <span>{Math.floor(u.todayTime/60)} min</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
