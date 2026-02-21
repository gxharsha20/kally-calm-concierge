import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const events: Record<string, { title: string; color: string }[]> = {
  "2026-02-23": [{ title: "Xfinity technician 2-4 PM", color: "bg-kally-success" }],
  "2026-02-25": [{ title: "Dentist — TBD", color: "bg-kally-pending" }],
  "2026-02-27": [{ title: "Amazon return deadline", color: "bg-kally-info" }],
  "2026-03-01": [{ title: "Mom's birthday", color: "bg-primary" }],
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // Feb 2026

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Calendar</h1>

      <div className="flex gap-6">
        {/* Calendar Grid */}
        <div className="flex-1 bg-card rounded-2xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
            <h2 className="text-lg font-semibold text-foreground">{monthName}</h2>
            <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const dayEvents = events[dateStr];
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground" :
                    isToday ? "bg-accent font-semibold" :
                    "hover:bg-muted"
                  }`}
                >
                  {day}
                  {dayEvents && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayEvents.map((e, j) => (
                        <div key={j} className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-primary-foreground" : e.color}`} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-72">
          <div className="bg-card rounded-2xl shadow-card p-5">
            <h3 className="font-semibold text-foreground mb-3">
              {selectedDate ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) : "Select a date"}
            </h3>
            {selectedDate && events[selectedDate] ? (
              <div className="space-y-2">
                {events[selectedDate].map((e, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-muted">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${e.color}`} />
                    <p className="text-sm text-foreground">{e.title}</p>
                  </div>
                ))}
              </div>
            ) : selectedDate ? (
              <p className="text-sm text-muted-foreground">No events scheduled.</p>
            ) : (
              <p className="text-sm text-muted-foreground">Click a date to see scheduled tasks and follow-ups.</p>
            )}
            {selectedDate && (
              <p className="text-xs text-muted-foreground mt-4 italic">Emily will act on your behalf</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
