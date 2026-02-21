import { Search, Bell, Calendar } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-10">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Ask anything about your tasks…"
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-accent text-muted-foreground">
          <Calendar className="w-[18px] h-[18px]" />
        </button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-accent text-muted-foreground relative">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </button>
        <div className="w-9 h-9 rounded-full bg-kally-sage flex items-center justify-center text-primary-foreground text-sm font-medium ml-1">
          JM
        </div>
      </div>
    </header>
  );
}
