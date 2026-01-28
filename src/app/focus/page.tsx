import Timer from "@/components/focus/Timer";
import SubjectCard from "@/components/focus/SubjectCard";
import AnalyticsChart from "@/components/focus/AnalyticsChart";
import Leaderboard from "@/components/focus/Leaderboard";
import { subjects } from "@/mock/data";


const focusGroups = [
  {
    id: 1,
    name: " JEE Aspirants",
    members: 128,
    active: true,
  },
  {
    id: 2,
    name: " NEET Study Room",
    members: 94,
    active: true,
  },
  {
    id: 3,
    name: " Coding Marathon",
    members: 76,
    active: false,
  },
];


export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Focus Dashboard</h1>
        <p className="text-sm text-gray-500">
          Track your deep work, stay consistent, and compete with others
        </p>
      </div>

      {/* Timer Section */}
      <Card>
        <Timer />
      </Card>

      {/* Subjects */}
      <section className="space-y-3">
        <SectionTitle title="Your Focus Subjects" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}
        </div>
      </section>

      {/* Group Focus (YPT-like) */}
      <section className="space-y-3">
        <SectionTitle title="Group Focus Rooms" subtitle="Study together, stay accountable" />

        <div className="grid md:grid-cols-3 gap-4">
          {focusGroups.map(group => (
            <div
              key={group.id}
              className="border rounded-xl p-4 hover:shadow-sm transition bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{group.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    group.active
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {group.active ? "Live" : "Offline"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-3">
                👥 {group.members} members focusing
              </p>

              <button className="w-full text-sm py-2 rounded-lg border hover:bg-gray-50 transition">
                Join Room
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics */}
      <section className="space-y-3">
        <SectionTitle title="Weekly Analytics" />
        <Card>
          <AnalyticsChart />
        </Card>
      </section>

      {/* Leaderboard */}
      <section className="space-y-3">
        <SectionTitle title="Leaderboard" subtitle="Top focused users this week" />
        <Card>
          <Leaderboard />
        </Card>
      </section>

    </div>
  );
}

/* ================= UI HELPERS ================= */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border rounded-2xl p-4 md:p-6 shadow-sm">
      {children}
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-medium">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
