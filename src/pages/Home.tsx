import { useState } from "react";
import { Plus, Sparkles, Calendar, ArrowRight, Phone, CheckCircle, Clock, BookOpen } from "lucide-react";
import { CallModal } from "@/components/CallModal";
import { useNavigate } from "react-router-dom";

const updates = [
  { text: "1 issue resolved", icon: CheckCircle },
  { text: "1 booking confirmed", icon: BookOpen },
  { text: "1 follow-up pending", icon: Clock },
];

const recentTasks = [
  { title: "Fix Xfinity WiFi outage", status: "Resolved", statusColor: "bg-kally-success", callTarget: "Xfinity Customer Care" },
  { title: "Amazon return request", status: "In Progress", statusColor: "bg-kally-info", callTarget: "Amazon Support" },
  { title: "Schedule dentist appointment", status: "Pending", statusColor: "bg-kally-pending", callTarget: "Dr. Smith's Office" },
];

export default function Home() {
  const [callOpen, setCallOpen] = useState(false);
  const [callTarget, setCallTarget] = useState("Xfinity Customer Care");
  const navigate = useNavigate();

  const handleCall = (target: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCallTarget(target);
    setCallOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Card */}
      <div className="rounded-2xl gradient-hero p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          background: "radial-gradient(circle at 80% 20%, hsl(36 82% 56% / 0.2), transparent 50%)"
        }} />
        <div className="relative">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Good afternoon.
          </h1>
          <p className="text-lg text-foreground/80 mb-5">
            Emily handled <span className="font-semibold text-foreground">3 things</span> for you today.
          </p>
          <div className="flex flex-wrap gap-3">
            {updates.map((u, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-soft text-sm font-medium text-foreground">
                <u.icon className="w-4 h-4 text-muted-foreground" /> {u.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Time Saved Card */}
      <div className="rounded-2xl gradient-emily p-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Emily saved you</p>
            <p className="text-4xl font-semibold text-foreground tracking-tight">2h 40m</p>
            <p className="text-sm text-muted-foreground mt-2">4 tasks handled · 2 calls avoided</p>
          </div>
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center opacity-80">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Quick Actions (no Call Now) */}
      <div className="grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-card text-foreground shadow-card hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="w-6 h-6 text-muted-foreground" />
          <span className="text-sm font-medium">New Task</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-card text-foreground shadow-card hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-sm font-medium">Ask Emily</span>
        </button>
        <button
          onClick={() => navigate("/tasks")}
          className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-card text-foreground shadow-card hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]"
        >
          <Calendar className="w-6 h-6 text-muted-foreground" />
          <span className="text-sm font-medium">Calendar</span>
        </button>
      </div>

      {/* Recent Tasks with call icons */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <button onClick={() => navigate("/tasks")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-2">
          {recentTasks.map((task, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${task.statusColor}`} />
                <span className="text-sm font-medium text-foreground">{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground px-3 py-1 rounded-lg bg-muted">
                  {task.status}
                </span>
                <button
                  onClick={(e) => handleCall(task.callTarget, e)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground"
                  title="Call now"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CallModal open={callOpen} onClose={() => setCallOpen(false)} contactName={callTarget} />
    </div>
  );
}
