import { Home, CheckSquare, MessageCircle, BarChart3, Settings, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Threads", url: "/threads", icon: MessageCircle },
  { title: "Insights", url: "/insights", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-card border-r border-border p-4 gap-1">
      <div className="flex items-center gap-3 px-3 py-4 mb-4">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground tracking-tight">Kally</span>
      </div>

      <nav className="flex-1 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            activeClassName="bg-accent text-foreground"
          >
            <item.icon className="w-[18px] h-[18px]" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 py-3 rounded-xl gradient-emily">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-kally-success animate-pulse" />
          <span className="text-xs font-medium text-foreground">Emily is active</span>
        </div>
      </div>
    </aside>
  );
}
