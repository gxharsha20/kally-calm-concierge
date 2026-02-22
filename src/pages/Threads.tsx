import { useState } from "react";
import { MessageCircle, ArrowLeft, Phone, CheckCircle2, Clock, Sparkles, FileText } from "lucide-react";

interface Thread {
  id: number;
  contact: string;
  lastUpdate: string;
  status: "Active" | "Resolved" | "Waiting";
  messages: number;
  timeline: { action: string; time: string; icon: "check" | "clock" | "sparkles" | "phone" | "file" }[];
}

const mockThreads: Thread[] = [
  {
    id: 1,
    contact: "Amazon Support",
    lastUpdate: "Refund processed — $49.99 returned to card",
    status: "Resolved",
    messages: 4,
    timeline: [
      { action: "Call placed to Amazon returns", time: "Feb 20, 10:30 AM", icon: "phone" },
      { action: "Return label sent via email", time: "Feb 20, 10:45 AM", icon: "file" },
      { action: "Package dropped off at UPS", time: "Feb 21, 2:00 PM", icon: "check" },
      { action: "Refund of $49.99 processed", time: "Feb 22, 9:15 AM", icon: "check" },
    ],
  },
  {
    id: 2,
    contact: "Xfinity Support",
    lastUpdate: "Technician scheduled for tomorrow 2-4 PM",
    status: "Active",
    messages: 3,
    timeline: [
      { action: "Called Xfinity about WiFi outage", time: "Feb 21, 3:00 PM", icon: "phone" },
      { action: "Service ticket #XF-29481 created", time: "Feb 21, 3:12 PM", icon: "file" },
      { action: "Technician confirmed for Feb 23, 2-4 PM", time: "Feb 21, 3:15 PM", icon: "check" },
    ],
  },
  {
    id: 3,
    contact: "Dr. Smith's Office",
    lastUpdate: "Rescheduled to Friday 11 AM",
    status: "Resolved",
    messages: 2,
    timeline: [
      { action: "Called to reschedule appointment", time: "Feb 20, 1:00 PM", icon: "phone" },
      { action: "New appointment: Friday Feb 27, 11 AM", time: "Feb 20, 1:08 PM", icon: "check" },
    ],
  },
  {
    id: 4,
    contact: "United Airlines",
    lastUpdate: "Flight rescheduled to March 5th",
    status: "Resolved",
    messages: 5,
    timeline: [
      { action: "Called United about flight change", time: "Feb 19, 9:00 AM", icon: "phone" },
      { action: "Flight UA-2847 rebooked to March 5", time: "Feb 19, 9:22 AM", icon: "check" },
      { action: "Confirmation email received", time: "Feb 19, 9:30 AM", icon: "file" },
      { action: "Seat assignment updated to 12A", time: "Feb 19, 9:35 AM", icon: "sparkles" },
      { action: "Auto-followup: check-in reminder set", time: "Scheduled: Mar 4", icon: "clock" },
    ],
  },
];

const statusBadge: Record<string, string> = {
  Active: "bg-kally-info text-primary-foreground",
  Resolved: "bg-kally-success text-primary-foreground",
  Waiting: "bg-kally-pending text-primary-foreground",
};

const iconMap = {
  check: CheckCircle2,
  clock: Clock,
  sparkles: Sparkles,
  phone: Phone,
  file: FileText,
};

export default function Threads() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  if (selectedThread) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <button onClick={() => setSelectedThread(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Threads
        </button>

        <div className="bg-card rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{selectedThread.contact}</h2>
              <p className="text-xs text-muted-foreground">{selectedThread.messages} messages</p>
            </div>
            <span className={`ml-auto px-2.5 py-1 rounded-lg text-xs font-semibold ${statusBadge[selectedThread.status]}`}>
              {selectedThread.status}
            </span>
          </div>

          {/* Timeline */}
          <div className="relative pl-6 space-y-0">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
            {selectedThread.timeline.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={i} className="relative flex items-start gap-3 pb-5 last:pb-0">
                  <div className="absolute left-[-16px] w-6 h-6 rounded-full bg-card border-2 border-border flex items-center justify-center">
                    <Icon className="w-3 h-3 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Threads</h1>

      <div className="space-y-2">
        {mockThreads.map(thread => (
          <div
            key={thread.id}
            onClick={() => setSelectedThread(thread)}
            className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-sm font-semibold text-foreground">{thread.contact}</h3>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${statusBadge[thread.status]}`}>
                  {thread.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{thread.lastUpdate}</p>
            </div>
            <span className="text-xs text-muted-foreground">{thread.messages} msgs</span>
          </div>
        ))}
      </div>
    </div>
  );
}
