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

const questions: Question[] = [
  { id: 1, text: "Book is to Reading as Food is to:", options: ["Hunger", "Cooking", "Eating", "Taste"] },
  { id: 2, text: "Diligence means:", options: ["Laziness", "Hard work", "Intelligence", "Speed"] },
  { id: 3, text: "Success comes from ___, not luck.", options: ["Effort", "Rest", "Delay", "Guessing"] },
  { id: 4, text: "2, 6, 12, 20, ?", options: ["24", "30", "28", "32"] },
  { id: 5, text: "Odd one out", options: ["Circle", "Triangle", "Square", "Blue"] },
  { id: 6, text: "Which do you enjoy more?", options: ["Solving problems", "Explaining ideas"] },
  { id: 7, text: "You prefer working:", options: ["Alone", "In a team"] },
  { id: 8, text: "What do you usually search or watch online?", type: "text" },
  { id: 9, text: "Activities you’ve tried", options: ["Coding", "Design", "Teaching", "Research"], type: "multi" },
];

/* ================= MAIN ================= */

export default function DiagnosticTest() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerType>>({});
  const [showResult, setShowResult] = useState(false);

  const current = questions[index];
  const progress = Math.round(((index + 1) / questions.length) * 100);

  const handleNext = () => {
    if (index === questions.length - 1) setShowResult(true);
    else setIndex(i => i + 1);
  };

  const handleChange = (value: AnswerType) => {
    setAnswers({ ...answers, [current.id]: value });
  };

  /* ================= RESULT ================= */

  if (showResult) {
    return (
      <div className="flex justify-center py-16 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl border shadow-sm p-8">

          <h1 className="text-2xl font-semibold mb-1"> Ai Cognitive Insight</h1>
          <p className="text-sm text-gray-500 mb-8">
            A multi-dimensional snapshot of how you think, learn, and perform
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <RadarChart />

            <div className="space-y-4">
              <InsightCard
                title="Thinking Pattern"
                text="Strong analytical reasoning with creative balance"
              />
              <InsightCard
                title="Best Career Domains"
                text="Engineering, Product, Research, Design"
              />
              <InsightCard
                title="Growth Opportunity"
                text="Faster execution under time constraints"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setIndex(0);
              setAnswers({});
              setShowResult(false);
            }}
            className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  /* ================= QUESTIONS ================= */

  return (
    <div className="flex justify-center py-16 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl border shadow-sm p-8">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-lg font-medium mb-5">{current.text}</h2>

        {current.type === "text" && (
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Type your answer…"
            onChange={e => handleChange(e.target.value)}
          />
        )}

        {current.type === "multi" &&
          current.options?.map(opt => {
            const selected = (answers[current.id] as string[] || []).includes(opt);
            return (
              <Option
                key={opt}
                label={opt}
                selected={selected}
                onClick={() => {
                  const prev = (answers[current.id] as string[]) || [];
                  handleChange(
                    selected ? prev.filter(v => v !== opt) : [...prev, opt]
                  );
                }}
              />
            );
          })}

        {!current.type &&
          current.options?.map(opt => (
            <Option
              key={opt}
              label={opt}
              selected={answers[current.id] === opt}
              onClick={() => handleChange(opt)}
            />
          ))}

        <button
          onClick={handleNext}
          className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
        >
          {index === questions.length - 1 ? "View Report" : "Next"}
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Option({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg px-3 py-2 mb-3 cursor-pointer text-sm transition
        ${selected ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}
      `}
    >
      {label}
    </div>
  );
}

function InsightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="border rounded-xl p-4">
      <h4 className="text-sm font-medium mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  );
}

/* ================= RADAR CHART ================= */

function RadarChart() {
  const values = [80, 70, 65, 75, 60]; // Logic, Verbal, Creativity, Focus, Speed
  const labels = ["Logic", "Verbal", "Creativity", "Focus", "Speed"];

  const points = values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    const r = (v / 100) * 90;
    return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
  });

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-sm mx-auto">
      {[20, 40, 60, 80].map(r => (
        <polygon
          key={r}
          points={labels.map((_, i) => {
            const a = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
            return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
          }).join(" ")}
          fill="none"
          stroke="#e5e7eb"
        />
      ))}

      <polygon
        points={points.join(" ")}
        fill="rgba(37, 99, 235, 0.2)"
        stroke="#2563eb"
        strokeWidth="2"
      />

      {labels.map((label, i) => {
        const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
        return (
          <text
            key={label}
            x={100 + 110 * Math.cos(angle)}
            y={100 + 110 * Math.sin(angle)}
            textAnchor="middle"
            className="text-[10px] fill-gray-500"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
