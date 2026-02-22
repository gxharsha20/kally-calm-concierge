import { useState } from "react";
import { ArrowLeft, Play, MessageSquare, Video, Clock, CheckCircle2, Phone, Sparkles, ChevronLeft, ChevronRight, Plus, FileText, AudioLines, Film, X } from "lucide-react";
import { CallModal } from "@/components/CallModal";

const categoryTabs = ["All", "Customer Service", "Bookings", "Social Reminders"] as const;
const statusFilters = ["Resolved", "In Progress", "Pending Follow-up"] as const;

interface Task {
  id: number;
  title: string;
  handler: string;
  time: string;
  status: "Resolved" | "In Progress" | "Pending";
  category: string;
  date: string;
  completed: boolean;
}

const mockTasks: Task[] = [
  { id: 1, title: "Fix Xfinity WiFi outage", handler: "Emily", time: "Yesterday", status: "Resolved", category: "Customer Service", date: "2026-02-23", completed: false },
  { id: 2, title: "Amazon return for headphones", handler: "Emily", time: "Today", status: "In Progress", category: "Customer Service", date: "2026-02-22", completed: false },
  { id: 3, title: "Book dentist appointment", handler: "Emily", time: "2 days ago", status: "Pending", category: "Bookings", date: "2026-02-25", completed: false },
  { id: 4, title: "Reschedule flight to NYC", handler: "Emily", time: "3 days ago", status: "Resolved", category: "Bookings", date: "2026-02-27", completed: true },
  { id: 5, title: "Birthday gift for Mom", handler: "Emily", time: "This week", status: "Pending", category: "Social Reminders", date: "2026-03-01", completed: false },
];

const statusColor: Record<string, string> = {
  Resolved: "bg-kally-success text-primary-foreground",
  "In Progress": "bg-kally-info text-primary-foreground",
  Pending: "bg-kally-pending text-primary-foreground",
};

const detailTabs = ["Summary", "Transcript", "Voice", "Video", "Follow-ups"] as const;
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<typeof categoryTabs[number]>("All");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailTab, setDetailTab] = useState<typeof detailTabs[number]>("Summary");
  const [tasks, setTasks] = useState(mockTasks);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", category: "Customer Service", date: "", notes: "" });
  const [callOpen, setCallOpen] = useState(false);
  const [callTarget, setCallTarget] = useState("");

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const getDateEvents = (dateStr: string) => tasks.filter(t => t.date === dateStr);

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleCall = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setCallTarget(task.title);
    setCallOpen(true);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    const t: Task = {
      id: Date.now(),
      title: newTask.title,
      handler: "Emily",
      time: "Just now",
      status: "Pending",
      category: newTask.category,
      date: newTask.date || new Date().toISOString().slice(0, 10),
      completed: false,
    };
    setTasks(prev => [t, ...prev]);
    setNewTask({ title: "", category: "Customer Service", date: "", notes: "" });
    setShowNewTask(false);
  };

  const filtered = tasks.filter(t => {
    if (activeTab !== "All" && t.category !== activeTab) return false;
    if (activeFilter === "Resolved" && t.status !== "Resolved") return false;
    if (activeFilter === "In Progress" && t.status !== "In Progress") return false;
    if (activeFilter === "Pending Follow-up" && t.status !== "Pending") return false;
    if (selectedDate && t.date !== selectedDate) return false;
    return true;
  });

  // Task Detail View
  if (selectedTask) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <button onClick={() => setSelectedTask(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Tasks
        </button>

        <div className="bg-card rounded-2xl shadow-card p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{selectedTask.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">Handled by {selectedTask.handler} · {selectedTask.time}</p>
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusColor[selectedTask.status]}`}>
              {selectedTask.status}
            </span>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 mb-6">
            {["Created", "Called", selectedTask.status].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-muted text-xs font-medium text-foreground">{step}</span>
                {i < 2 && <div className="w-6 h-px bg-border" />}
              </div>
            ))}
          </div>

          {/* Detail Tabs */}
          <div className="flex gap-1 border-b border-border mb-5">
            {detailTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setDetailTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-xl transition-colors ${
                  detailTab === tab ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {detailTab === "Summary" && (
              <div className="space-y-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Emily contacted Xfinity support regarding the WiFi outage reported at your home. After a 12-minute call, the issue was identified as a regional node problem.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-kally-success mt-0.5 shrink-0" /> Service ticket #XF-29481 created</li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-kally-success mt-0.5 shrink-0" /> Technician scheduled for tomorrow 2-4 PM</li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-kally-success mt-0.5 shrink-0" /> $15 credit applied to account</li>
                </ul>

                {/* Generate Summary Actions */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Generate Summary</p>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-accent">
                      <FileText className="w-4 h-4" /> Text Summary
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-accent">
                      <AudioLines className="w-4 h-4" /> Voice Summary
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-accent">
                      <Film className="w-4 h-4" /> Video Summary
                    </button>
                  </div>
                </div>
              </div>
            )}
            {detailTab === "Transcript" && (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {[
                  { speaker: "Emily", text: "Hi, I'm calling about a WiFi outage at the account for John Martinez." },
                  { speaker: "Support", text: "I can see the account. Let me check the service status in your area." },
                  { speaker: "Support", text: "It looks like there's a known issue affecting your node. We can schedule a technician." },
                  { speaker: "Emily", text: "That would be great. What's the earliest availability?" },
                  { speaker: "Support", text: "Tomorrow between 2 and 4 PM. I'll also apply a $15 courtesy credit." },
                  { speaker: "Emily", text: "Perfect, thank you for the help." },
                ].map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.speaker === "Emily" ? "" : "flex-row-reverse"}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.speaker === "Emily" ? "gradient-emily text-foreground" : "bg-muted text-foreground"
                    }`}>
                      <span className="text-xs font-semibold block mb-1 text-muted-foreground">{msg.speaker}</span>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {detailTab === "Voice" && (
              <div className="flex items-center gap-4 p-5 rounded-xl bg-muted">
                <button className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground hover:scale-105">
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-0.5 h-8">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="w-1 rounded-full bg-primary/40" style={{ height: `${8 + Math.random() * 20}px` }} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Generated by MiniMax</p>
                </div>
                <span className="text-sm text-muted-foreground font-mono">2:34</span>
              </div>
            )}
            {detailTab === "Video" && (
              <div className="rounded-xl bg-foreground/5 aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                <button className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-elevated z-10 hover:scale-105">
                  <Play className="w-6 h-6 text-foreground ml-0.5" />
                </button>
                <p className="absolute bottom-4 left-4 text-xs text-primary-foreground/80 z-10">Visual instructions recap</p>
              </div>
            )}
            {detailTab === "Follow-ups" && (
              <div className="space-y-3">
                {[
                  { text: "Emily scheduled a technician for tomorrow 2-4 PM", time: "Yesterday 3:45 PM", icon: CheckCircle2 },
                  { text: "Waiting for confirmation email from Xfinity", time: "Yesterday 4:00 PM", icon: Clock },
                  { text: "Auto-followup set for tomorrow morning", time: "Scheduled", icon: Sparkles },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50">
                    <f.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-foreground">{f.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2">
          <button
            onClick={() => { setCallTarget(selectedTask.title); setCallOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card shadow-soft text-sm font-medium text-foreground hover:shadow-card"
          >
            <Phone className="w-4 h-4" /> Call again
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card shadow-soft text-sm font-medium text-foreground hover:shadow-card">
            <Sparkles className="w-4 h-4 text-primary" /> Ask Emily
          </button>
        </div>

        <CallModal open={callOpen} onClose={() => setCallOpen(false)} contactName={callTarget} />
      </div>
    );
  }

  // Main Tasks + Calendar View
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Tasks</h1>
        <button
          onClick={() => setShowNewTask(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:shadow-elevated"
        >
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      <div className="flex gap-6">
        {/* Calendar */}
        <div className="w-[340px] shrink-0">
          <div className="bg-card rounded-2xl shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 rounded-xl hover:bg-muted">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-semibold text-foreground">{monthName}</h2>
              <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 rounded-xl hover:bg-muted">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {daysOfWeek.map(d => (
                <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayTasks = getDateEvents(dateStr);
                const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-xs transition-colors ${
                      isSelected ? "bg-primary text-primary-foreground" :
                      isToday ? "bg-accent font-semibold" :
                      "hover:bg-muted"
                    }`}
                  >
                    {day}
                    {dayTasks.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayTasks.slice(0, 3).map((t, j) => (
                          <div key={j} className={`w-1 h-1 rounded-full ${isSelected ? "bg-primary-foreground" : 
                            t.status === "Resolved" ? "bg-kally-success" : t.status === "In Progress" ? "bg-kally-info" : "bg-kally-pending"
                          }`} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {selectedDate
                ? `Tasks for ${new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                : "All Tasks"}
            </h3>
            {selectedDate && (
              <button onClick={() => setSelectedDate(null)} className="text-xs text-muted-foreground hover:text-foreground">
                Show all
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 mb-3">
            {categoryTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  activeTab === tab ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 mb-4">
            {statusFilters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(activeFilter === f ? null : f)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activeFilter === f
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Task Rows */}
          <div className="space-y-2">
            {filtered.map(task => (
              <div
                key={task.id}
                onClick={() => { setSelectedTask(task); setDetailTab("Summary"); }}
                className="group flex items-center gap-3 p-3.5 rounded-xl bg-card shadow-soft hover:shadow-card transition-all cursor-pointer"
              >
                {/* Checkbox */}
                <button
                  onClick={(e) => toggleComplete(task.id, e)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                    task.completed ? "bg-primary border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium text-foreground ${task.completed ? "line-through opacity-50" : ""}`}>{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.handler} · {task.time}</p>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">{task.category.split(" ")[0]}</span>

                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${statusColor[task.status]}`}>
                  {task.status}
                </span>

                <button
                  onClick={(e) => handleCall(task, e)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Call now"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No tasks found.</p>
            )}
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      {showNewTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm animate-fade-in" onClick={() => setShowNewTask(false)}>
          <div className="bg-card rounded-2xl shadow-elevated p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-foreground">New Task</h3>
              <button onClick={() => setShowNewTask(false)} className="p-1.5 rounded-lg hover:bg-muted">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
                  placeholder="What needs to be done?"
                  className="w-full h-10 px-4 rounded-xl bg-muted border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
                <select
                  value={newTask.category}
                  onChange={e => setNewTask(p => ({ ...p, category: e.target.value }))}
                  className="w-full h-10 px-4 rounded-xl bg-muted border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option>Customer Service</option>
                  <option>Bookings</option>
                  <option>Social Reminders</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date (optional)</label>
                <input
                  type="date"
                  value={newTask.date}
                  onChange={e => setNewTask(p => ({ ...p, date: e.target.value }))}
                  className="w-full h-10 px-4 rounded-xl bg-muted border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Notes (optional)</label>
                <textarea
                  value={newTask.notes}
                  onChange={e => setNewTask(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Additional details..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
                />
              </div>
              <button
                onClick={handleAddTask}
                className="w-full h-10 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:shadow-elevated"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      <CallModal open={callOpen} onClose={() => setCallOpen(false)} contactName={callTarget} />
    </div>
  );
}
