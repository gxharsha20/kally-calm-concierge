import { useState, useEffect } from "react";
import { X, Mic, Volume2, PhoneOff, Maximize2 } from "lucide-react";

interface CallModalProps {
  open: boolean;
  onClose: () => void;
}

export function CallModal({ open, onClose }: CallModalProps) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!open) { setTimer(0); return; }
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-card shadow-elevated flex items-center justify-center hover:bg-muted">
          <X className="w-4 h-4 text-foreground" />
        </button>

        {/* iPhone Frame */}
        <div className="w-[300px] h-[620px] bg-foreground rounded-[44px] p-3 shadow-elevated relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-foreground rounded-b-2xl z-10" />
          
          {/* Screen */}
          <div className="w-full h-full rounded-[36px] overflow-hidden flex flex-col items-center justify-between py-16 px-6"
            style={{ background: "linear-gradient(180deg, hsl(30 10% 15%), hsl(30 8% 22%))" }}>
            
            {/* Top info */}
            <div className="text-center">
              <p className="text-primary-foreground/60 text-xs font-medium mb-1 tracking-wide">calling via Emily</p>
              <h3 className="text-primary-foreground text-xl font-semibold mb-1">Xfinity Customer Care</h3>
              <p className="text-primary-foreground/50 text-sm">1-800-934-6489</p>
            </div>

            {/* Timer & Waveform */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-primary-foreground text-4xl font-light tracking-widest font-mono">
                {formatTime(timer)}
              </span>
              
              {/* Waveform */}
              <div className="flex items-center gap-1 h-8">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-primary"
                    style={{
                      height: `${12 + Math.sin(Date.now() / 300 + i * 0.5) * 10}px`,
                      animation: `waveform ${0.6 + Math.random() * 0.6}s ease-in-out infinite`,
                      animationDelay: `${i * 0.05}s`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </button>
              <button className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20">
                <Volume2 className="w-5 h-5 text-primary-foreground" />
              </button>
              <button onClick={onClose} className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/90 shadow-elevated">
                <PhoneOff className="w-6 h-6 text-destructive-foreground" />
              </button>
              <button className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20">
                <Maximize2 className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
