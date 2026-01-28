import Timer from "@/components/focus/Timer";
import SubjectCard from "@/components/focus/SubjectCard";
import AnalyticsChart from "@/components/focus/AnalyticsChart";
import Leaderboard from "@/components/focus/Leaderboard";
import { subjects } from "@/mock/data";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">focus Dashboard</h1>

      <Timer />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map(s => <SubjectCard key={s.id} subject={s} />)}
      </div>

      <AnalyticsChart />

      <Leaderboard />
    </div>
  );
}
