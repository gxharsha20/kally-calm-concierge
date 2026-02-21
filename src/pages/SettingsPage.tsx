import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Settings</h1>
      <div className="bg-card rounded-2xl shadow-card p-8 text-center">
        <SettingsIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Settings will be available soon.</p>
      </div>
    </div>
  );
}
