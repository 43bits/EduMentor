"use client";
export default function SubjectCard({ subject }: { subject: any }) {
  const { name, color, totalTime } = subject;
  return (
    <div className={`p-4 rounded-md text-white bg-${color}-500 flex flex-col items-center`}>
      <h3 className="font-bold">{name}</h3>
      <p>{Math.floor(totalTime/60)} min</p>
    </div>
  );
}
