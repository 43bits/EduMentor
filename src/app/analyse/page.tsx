"use client";
import { useState } from "react";

/* ================= TYPES ================= */

type AnswerType = string | string[];

interface Question {
  id: number;
  text: string;
  options?: string[];
  type?: "single" | "multi" | "text";
}

/* ================= QUESTIONS ================= */

const aptitudeQuestions: Question[] = [
  { id: 1, text: "Book is to Reading as Food is to:", options: ["Hunger","Cooking","Eating","Taste"] },
  { id: 2, text: "Diligence means:", options: ["Laziness","Hard work","Intelligence","Speed"] },
  { id: 3, text: "Success comes from ___, not luck.", options: ["Effort","Rest","Delay","Guessing"] },
  { id: 4, text: "2, 6, 12, 20, ?", options: ["24","30","28","32"] },
  { id: 5, text: "Odd one out", options: ["Circle","Triangle","Square","Blue"] },
];

const interestQuestions: Question[] = [
  { id: 6, text: "Which do you enjoy more?", options: ["Solving problems","Explaining ideas"] },
  { id: 7, text: "You prefer working:", options: ["Alone","In a team"] },
  { id: 8, text: "What do you watch or Google the most?", type: "text" },
  { id: 9, text: "Activities you’ve tried", options:["Coding","Design","Teaching","Research"], type:"multi" },
];

const allQuestions = [...aptitudeQuestions, ...interestQuestions];

/* ================= MAIN ================= */

export default function DiagnosticTest() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerType>>({});
  const [showResult, setShowResult] = useState(false);

  const current = allQuestions[index];
  const progress = Math.round(((index + 1) / allQuestions.length) * 100);

  const handleNext = () => {
    if (index === allQuestions.length - 1) {
      setShowResult(true);
    } else {
      setIndex(i => i + 1);
    }
  };

  const handleChange = (value: AnswerType) => {
    setAnswers({ ...answers, [current.id]: value });
  };

  /* ================= REPORT DATA ================= */

  const radarData = [
    { label: "Logic", value: 80 },
    { label: "Verbal", value: 70 },
    { label: "Creativity", value: 65 },
    { label: "Focus", value: 75 },
    { label: "Speed", value: 68 },
  ];

  /* ================= RESULT UI ================= */

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-white shadow-2xl">

          <h1 className="text-3xl font-bold mb-2">🧠 AI Cognitive Insight</h1>
          <p className="text-gray-400 mb-10">
            A multi-dimensional snapshot of how you think, learn, and perform
          </p>

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Radar Chart */}
            <RadarChart data={radarData} />

            {/* Insights */}
            <div className="space-y-4">
              <Insight title="Thinking Pattern">
                Strong analytical reasoning with creative balance
              </Insight>
              <Insight title="Best Career Domains">
                Engineering, Product, Research, Design
              </Insight>
              <Insight title="Growth Opportunity">
                Faster execution under time constraints
              </Insight>
            </div>
          </div>

          <button
            onClick={() => {
              setIndex(0);
              setAnswers({});
              setShowResult(false);
            }}
            className="mt-10 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  /* ================= QUESTION UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 p-6">
      <div
        key={current.id}
        className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 animate-slideIn"
      >

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold mb-6">{current.text}</h2>

        {/* Inputs */}
        {current.type === "text" && (
          <input
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type your answer..."
            onChange={e => handleChange(e.target.value)}
          />
        )}

        {current.type === "multi" && current.options?.map(opt => (
          <Option
            key={opt}
            label={opt}
            checked={(answers[current.id] as string[] || []).includes(opt)}
            onClick={() => {
              const prev = answers[current.id] as string[] || [];
              handleChange(
                prev.includes(opt)
                  ? prev.filter(v => v !== opt)
                  : [...prev, opt]
              );
            }}
          />
        ))}

        {!current.type && current.options?.map(opt => (
          <Option
            key={opt}
            label={opt}
            checked={answers[current.id] === opt}
            onClick={() => handleChange(opt)}
          />
        ))}

        <button
          onClick={handleNext}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          {index === allQuestions.length - 1 ? "View Insight Report" : "Next"}
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Option({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`p-3 border rounded-lg mb-3 cursor-pointer transition
        ${checked ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}
      `}
    >
      {label}
    </div>
  );
}

function Insight({ title, children }: { title: string; children: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-gray-300">{children}</p>
    </div>
  );
}

/* ================= RADAR CHART ================= */

function RadarChart({
  data,
  size = 280,
}: {
  data: { label: string; value: number }[];
  size?: number;
}) {
  const center = size / 2;
  const radius = size / 2 - 30;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (d.value / 100) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  });

  return (
    <svg width={size} height={size} className="mx-auto">
      {[...Array(4)].map((_, i) => {
        const r = ((i + 1) / 4) * radius;
        const grid = data.map((_, j) => {
          const angle = j * angleStep - Math.PI / 2;
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        });
        return (
          <polygon key={i} points={grid.join(" ")} fill="none" stroke="rgba(255,255,255,0.15)" />
        );
      })}

      <polygon
        points={points.join(" ")}
        fill="rgba(59,130,246,0.45)"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {data.map((d, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <text
            key={d.label}
            x={center + (radius + 18) * Math.cos(angle)}
            y={center + (radius + 18) * Math.sin(angle)}
            textAnchor="middle"
            fill="#e5e7eb"
            fontSize="12"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
