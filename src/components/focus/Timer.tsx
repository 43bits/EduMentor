"use client";
import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => { setSeconds(0); setRunning(false); };

  return (
    <div className="p-4 bg-gray-100 rounded-md flex flex-col items-center space-y-2">
      <div className="text-3xl font-mono">{Math.floor(seconds/60)}:{(seconds%60).toString().padStart(2,'0')}</div>
      <div className="flex gap-2">
        <button onClick={start} className="px-3 py-1 bg-green-500 text-white rounded">Start</button>
        <button onClick={pause} className="px-3 py-1 bg-yellow-500 text-white rounded">Pause</button>
        <button onClick={reset} className="px-3 py-1 bg-red-500 text-white rounded">Reset</button>
      </div>
    </div>
  );
}
