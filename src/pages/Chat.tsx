import { useState } from "react";
import { Send, Sparkles, ExternalLink, Play, Phone } from "lucide-react";

interface Message {
  role: "user" | "emily";
  text: string;
  actions?: { label: string; icon: typeof ExternalLink }[];
}

const initialMessages: Message[] = [
  {
    role: "emily",
    text: "Hi! I'm Emily, your AI agent. I can help you with tasks, calls, and follow-ups. What would you like to know?",
  },
];

const suggestedQueries = [
  "Did Xfinity confirm the technician?",
  "What do I need to do next?",
  "Summarize everything from this week",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock Emily response
    setTimeout(() => {
      const emilyMsg: Message = {
        role: "emily",
        text: input.toLowerCase().includes("xfinity")
          ? "Yes! Xfinity confirmed the technician visit for tomorrow between 2-4 PM. A confirmation email was sent to your inbox. The service ticket number is #XF-29481."
          : input.toLowerCase().includes("next")
          ? "Here's what's pending:\n\n• Amazon return — awaiting shipping label\n• Dentist appointment — needs to be confirmed\n• Mom's birthday gift — Emily found 3 options for you"
          : "I've reviewed your recent activity. This week, I handled 5 tasks: 3 resolved, 1 in progress, and 1 pending. Would you like me to go into detail on any of these?",
        actions: [
          { label: "Open task", icon: ExternalLink },
          { label: "Play summary", icon: Play },
        ],
      };
      setMessages(prev => [...prev, emilyMsg]);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-7rem)] flex flex-col animate-fade-in">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Ask Emily</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "gradient-emily text-foreground rounded-bl-md"
            }`}>
              {msg.role === "emily" && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">Emily</span>
                </div>
              )}
              <p className="whitespace-pre-line">{msg.text}</p>
              {msg.actions && (
                <div className="flex gap-2 mt-3">
                  {msg.actions.map((a, j) => (
                    <button key={j} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/80 text-xs font-medium text-foreground hover:bg-card shadow-soft">
                      <a.icon className="w-3 h-3" /> {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested queries */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => { setInput(q); }}
              className="px-3 py-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask what happened, what's pending, or what to do next…"
          className="w-full h-12 pl-4 pr-12 rounded-2xl bg-card shadow-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
        <button
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground hover:scale-105"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
