import { BarChart3 } from "lucide-react";

export default function Insights() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Insights</h1>
      <div className="bg-card rounded-2xl shadow-card p-8 text-center">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Analytics coming soon. Emily is learning your patterns.</p>
      </div>
    </div>
  );
}
