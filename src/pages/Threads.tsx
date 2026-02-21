import { MessageCircle } from "lucide-react";

interface Thread {
  id: number;
  contact: string;
  lastUpdate: string;
  status: "Active" | "Resolved" | "Waiting";
  messages: number;
}

const mockThreads: Thread[] = [
  { id: 1, contact: "Xfinity Support", lastUpdate: "Technician confirmed for tomorrow 2-4 PM", status: "Resolved", messages: 4 },
  { id: 2, contact: "Amazon Customer Service", lastUpdate: "Shipping label sent — awaiting drop-off", status: "Active", messages: 3 },
  { id: 3, contact: "Dr. Smith's Office", lastUpdate: "Trying to reach scheduling desk", status: "Waiting", messages: 2 },
  { id: 4, contact: "United Airlines", lastUpdate: "Flight rescheduled to March 5th", status: "Resolved", messages: 5 },
];

const statusBadge: Record<string, string> = {
  Active: "bg-kally-info text-primary-foreground",
  Resolved: "bg-kally-success text-primary-foreground",
  Waiting: "bg-kally-pending text-primary-foreground",
};

export default function Threads() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Threads</h1>

      <div className="space-y-2">
        {mockThreads.map(thread => (
          <div
            key={thread.id}
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
