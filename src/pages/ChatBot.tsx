import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";
type ToolCallStatus = "running" | "done" | "error";

interface ToolCall {
  id: string;
  label: string;
  status: ToolCallStatus;
}

interface Message {
  id: string;
  role: Role;
  content: string;
  isStreaming?: boolean;
  toolCalls?: ToolCall[];
}

type Mode = "Canvas" | "Data" | "Code" | "Research" | "Write";

// ─── Inline Styles ────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #e8453c;
    --red-light: #fff0ef;
    --red-mid: #fddbd9;
    --red-hover: #fdecea;
    --red-border: #f5b8b5;
    --gray-50: #fafafa;
    --gray-100: #f4f4f5;
    --gray-200: #e4e4e7;
    --gray-300: #d1d1d6;
    --gray-400: #a1a1aa;
    --gray-500: #71717a;
    --gray-700: #3f3f46;
    --gray-900: #18181b;
    --white: #ffffff;
    --font: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
    --radius: 14px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
    --shadow: 0 4px 16px rgba(0,0,0,.07), 0 1px 4px rgba(0,0,0,.04);
    --shadow-lg: 0 12px 40px rgba(0,0,0,.10), 0 4px 12px rgba(0,0,0,.06);
  }

  html, body, #root { height: 100%; }

  body {
    font-family: var(--font);
    background: var(--white);
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--gray-200); border-radius: 99px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: .7; }
    50%       { transform: scale(1.4); opacity: 1; }
  }
  @keyframes shimmer {
    from { background-position: -200% 0; }
    to   { background-position: 200% 0; }
  }

  .fade-up { animation: fadeUp .35s cubic-bezier(.22,.68,0,1.2) both; }

  /* Blinking cursor */
  .cursor::after {
    content: '▋';
    font-size: .85em;
    color: var(--red);
    animation: blink .8s step-end infinite;
  }

  /* Code block */
  .code-block {
    position: relative;
    background: #16161a;
    border-radius: 10px;
    margin: 10px 0;
    overflow: hidden;
  }
  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 14px;
    background: #1e1e24;
    border-bottom: 1px solid #2a2a35;
    font-family: var(--mono);
    font-size: 11px;
    color: #888;
    letter-spacing: .04em;
  }
  .code-block pre {
    padding: 14px 16px;
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.7;
    color: #e2e2e8;
  }
  .copy-btn {
    display: flex; align-items: center; gap: 4px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.1);
    color: #aaa;
    font-size: 11px;
    font-family: var(--font);
    padding: 3px 9px;
    border-radius: 6px;
    cursor: pointer;
    transition: all .15s;
  }
  .copy-btn:hover { background: rgba(255,255,255,.13); color: #fff; }

  /* Tool call pill */
  .tool-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: 99px;
    padding: 4px 12px 4px 8px;
    font-size: 12px;
    color: var(--gray-500);
    margin: 3px 0;
    transition: all .2s;
    width: fit-content;
  }
  .tool-pill.running { border-color: var(--red-border); color: var(--red); background: var(--red-light); }
  .tool-pill.done { border-color: #b9f0c7; color: #1a7a3a; background: #f0fdf4; }
  .tool-pill .spinner {
    width: 11px; height: 11px;
    border: 1.5px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    flex-shrink: 0;
  }
  .tool-pill .check { font-size: 11px; }

  /* Markdown styles inside AI bubble */
  .md-content h1, .md-content h2, .md-content h3 {
    font-weight: 600; margin: 12px 0 4px; line-height: 1.3;
  }
  .md-content h1 { font-size: 18px; }
  .md-content h2 { font-size: 16px; }
  .md-content h3 { font-size: 14px; }
  .md-content p { margin: 6px 0; }
  .md-content ul, .md-content ol { padding-left: 18px; margin: 6px 0; }
  .md-content li { margin: 3px 0; }
  .md-content strong { font-weight: 600; }
  .md-content em { font-style: italic; }
  .md-content code:not(.code-block code) {
    background: var(--gray-100);
    border-radius: 4px;
    padding: 1px 5px;
    font-family: var(--mono);
    font-size: .88em;
    color: var(--red);
  }
  .md-content blockquote {
    border-left: 3px solid var(--red-border);
    padding-left: 12px;
    color: var(--gray-500);
    margin: 8px 0;
    font-style: italic;
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// Simple markdown renderer
function renderMarkdown(text: string): string {
  let html = text
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_: string, lang: string, code: string) => {
      const escaped = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<div class="code-block" data-lang="${lang || "code"}"><div class="code-block-header"><span>${lang || "code"}</span><button class="copy-btn" onclick="navigator.clipboard.writeText(this.closest('.code-block').querySelector('pre').textContent)">⎘ Copy</button></div><pre><code>${escaped.trim()}</code></pre></div>`;
    })
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^\* (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  if (!html.startsWith("<")) html = `<p>${html}</p>`;
  return html;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ role }: { role: Role }) {
  if (role === "user") return null;
  return (
    <div style={{
      width: 30, height: 30, borderRadius: "50%",
      background: "linear-gradient(135deg, #e8453c 0%, #ff7b6e 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontSize: 13, color: "#fff", fontWeight: 600,
      boxShadow: "0 2px 8px rgba(232,69,60,.35)"
    }}>A</div>
  );
}

function ToolCallPill({ tool }: { tool: ToolCall }) {
  return (
    <div className={`tool-pill ${tool.status}`}>
      {tool.status === "running" ? <span className="spinner" /> : <span className="check">{tool.status === "done" ? "✓" : "✗"}</span>}
      {tool.label}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <div className="fade-up" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <div style={{
          maxWidth: "72%",
          background: "var(--red-light)",
          border: "1px solid var(--red-mid)",
          borderRadius: "18px 18px 4px 18px",
          padding: "10px 15px",
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--gray-900)",
        }}>{msg.content}</div>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "flex-start" }}>
      <Avatar role="assistant" />
      <div style={{ flex: 1, minWidth: 0 }}>
        {msg.toolCalls && msg.toolCalls.length > 0 && (
          <div style={{ marginBottom: 8, display: "flex", flexDirection: "column", gap: 2 }}>
            {msg.toolCalls.map(tc => <ToolCallPill key={tc.id} tool={tc} />)}
          </div>
        )}
        <div
          className={`md-content${msg.isStreaming ? " cursor" : ""}`}
          style={{ fontSize: 14, lineHeight: 1.7, color: "var(--gray-900)" }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
        />
      </div>
    </div>
  );
}

function ModePills({ active, onSelect }: { active: Mode; onSelect: (m: Mode) => void }) {
  const modes: Mode[] = ["Canvas", "Data", "Code", "Research", "Write"];
  const icons: Record<Mode, string> = { Canvas: "◻", Data: "⊟", Code: "</>" , Research: "⊕", Write: "✎" };

  return (
    <div style={{
      display: "flex", gap: 8, overflowX: "auto", padding: "2px 0 6px",
      scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
    }}>
      {modes.map(m => (
        <button
          key={m}
          onClick={() => onSelect(m)}
          style={{
            flexShrink: 0,
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 16px",
            border: `1.5px solid ${active === m ? "var(--red-border)" : "var(--gray-200)"}`,
            borderRadius: 99,
            background: active === m ? "var(--red-light)" : "var(--white)",
            color: active === m ? "var(--red)" : "var(--gray-500)",
            fontSize: 13, fontFamily: "var(--font)", fontWeight: active === m ? 500 : 400,
            cursor: "pointer",
            transition: "all .18s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => {
            if (active !== m) {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--red-hover)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--red-border)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
            }
          }}
          onMouseLeave={e => {
            if (active !== m) {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--white)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-200)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--gray-500)";
            }
          }}
        >
          <span style={{ fontSize: 12, opacity: .8 }}>{icons[m]}</span>
          {m}
        </button>
      ))}
    </div>
  );
}

function InputBox({
  value, onChange, onSubmit, onAttach, disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onAttach: () => void;
  disabled: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 220) + "px";
    }
  }, [value]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSubmit();
    }
  };

  const canSubmit = value.trim().length > 0 && !disabled;

  return (
    <div style={{
      background: "var(--white)",
      border: "1.5px solid var(--gray-200)",
      borderRadius: 18,
      boxShadow: "0 4px 24px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.04)",
      padding: "12px 12px 10px",
      transition: "border-color .2s, box-shadow .2s",
    }}
      onFocus={() => {}}
      onMouseEnter={() => {}}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Ask anything..."
        disabled={disabled}
        rows={1}
        style={{
          width: "100%",
          resize: "none",
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--font)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--gray-900)",
          minHeight: 28,
          maxHeight: 220,
          overflowY: "auto",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => fileRef.current?.click()}
            title="Attach file"
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: "1px solid var(--gray-200)",
              background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--gray-400)", fontSize: 14,
              transition: "all .15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--red-hover)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--red-border)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--gray-400)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-200)";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
          <input ref={fileRef} type="file" style={{ display: "none" }} onChange={onAttach} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--gray-300)", fontFamily: "var(--mono)" }}>
            {value.length > 0 ? `${value.length}` : ""}
          </span>
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            style={{
              width: 34, height: 34, borderRadius: 10,
              border: "none",
              background: canSubmit ? "var(--red)" : "var(--gray-200)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: canSubmit ? "pointer" : "default",
              color: canSubmit ? "#fff" : "var(--gray-400)",
              transition: "all .2s",
              boxShadow: canSubmit ? "0 2px 10px rgba(232,69,60,.35)" : "none",
              transform: canSubmit ? "scale(1)" : "scale(.95)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Mock AI response with streaming + tool calls ─────────────────────────────

const DEMO_RESPONSE = `Here's a quick example using **React hooks** to fetch data:

\`\`\`typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return { users, loading };
}
\`\`\`

This pattern keeps your data-fetching logic **separate from UI**, making it easy to test and reuse across components.

> **Tip:** For production, consider libraries like TanStack Query for caching and refetching.`;

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeMode, setActiveMode] = useState<Mode>("Code");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = useCallback(() => {
    setIsLoading(true);
    const aiId = uid();

    // Add message with tool calls first
    const toolCalls: ToolCall[] = [
      { id: uid(), label: "Analyzing context...", status: "running" },
    ];

    setMessages(prev => [...prev, {
      id: aiId, role: "assistant", content: "", isStreaming: true, toolCalls,
    }]);

    // Simulate tool call resolving
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === aiId ? {
        ...m,
        toolCalls: [
          { ...toolCalls[0], status: "done", label: "Context analyzed" },
          { id: uid(), label: "Generating response...", status: "running" },
        ],
      } : m));
    }, 800);

    // Stream text
    const chars = DEMO_RESPONSE.split("");
    let i = 0;
    const interval = setInterval(() => {
      if (i >= chars.length) {
        clearInterval(interval);
        setMessages(prev => prev.map(m => m.id === aiId ? {
          ...m, isStreaming: false,
          toolCalls: m.toolCalls?.map(tc => ({ ...tc, status: "done" as ToolCallStatus })),
        } : m));
        setIsLoading(false);
        return;
      }
      const chunk = chars.slice(i, i + 4).join("");
      i += 4;
      setMessages(prev => prev.map(m => m.id === aiId ? { ...m, content: m.content + chunk } : m));
    }, 20);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!input.trim() || isLoading) return;
    const content = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: uid(), role: "user", content }]);
    simulateResponse();
  }, [input, isLoading, simulateResponse]);

  return (
    <>
      <style>{css}</style>
      <div style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--white)",
        fontFamily: "var(--font)",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Top Nav */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px",
          height: 58,
          borderBottom: "1px solid var(--gray-100)",
          background: "rgba(255,255,255,.85)",
          backdropFilter: "blur(12px)",
          flexShrink: 0,
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, #e8453c, #ff7b6e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(232,69,60,.3)",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" opacity=".3"/>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-.01em", color: "var(--gray-900)" }}>
              Aurora
            </span>
            <span style={{
              fontSize: 10, fontWeight: 500, letterSpacing: ".06em",
              textTransform: "uppercase", color: "var(--red)",
              background: "var(--red-light)", border: "1px solid var(--red-mid)",
              padding: "1px 7px", borderRadius: 99,
            }}>Beta</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {hasMessages && (
              <button
                onClick={() => setMessages([])}
                style={{
                  padding: "5px 12px", borderRadius: 99,
                  border: "1px solid var(--gray-200)",
                  background: "transparent", cursor: "pointer",
                  fontSize: 12, color: "var(--gray-500)",
                  fontFamily: "var(--font)",
                  transition: "all .15s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--red-border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-200)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--gray-500)";
                }}
              >New chat</button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                border: "1.5px solid var(--gray-200)",
                background: "var(--gray-50)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--gray-500)",
                transition: "all .15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--red-border)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--red-light)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-200)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--gray-50)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--gray-500)";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </nav>

        {/* Main area */}
        <div style={{
          flex: 1, overflow: "hidden", display: "flex", flexDirection: "column",
          position: "relative",
        }}>
          {!hasMessages ? (
            /* Landing State */
            <div style={{
              flex: 1,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "40px 24px 0",
              gap: 0,
            }}>
              {/* Subtle background decoration */}
              <div style={{
                position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
                width: 600, height: 600,
                background: "radial-gradient(ellipse at center, rgba(232,69,60,.04) 0%, transparent 70%)",
                pointerEvents: "none", borderRadius: "50%",
              }} />

              <div className="fade-up" style={{ textAlign: "center", maxWidth: 580, position: "relative" }}>
                <div style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: ".1em",
                  textTransform: "uppercase", color: "var(--gray-400)",
                  marginBottom: 18,
                }}>Good afternoon</div>
                <h1 style={{
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 300,
                  letterSpacing: "-.03em",
                  lineHeight: 1.15,
                  color: "var(--gray-900)",
                  marginBottom: 12,
                }}>
                  What can I help you<br />
                  <span style={{ fontWeight: 600 }}>build today?</span>
                </h1>
                <p style={{
                  color: "var(--gray-400)", fontSize: 15, fontWeight: 300,
                  marginBottom: 32, lineHeight: 1.6,
                }}>
                  Your AI workspace for code, research, and creative work.
                </p>

                <ModePills active={activeMode} onSelect={setActiveMode} />
              </div>

              {/* Suggestion cards */}
              <div className="fade-up" style={{
                display: "flex", gap: 10, marginTop: 40, flexWrap: "wrap", justifyContent: "center",
                maxWidth: 620, position: "relative",
                animationDelay: ".1s",
              }}>
                {[
                  { icon: "⟨/⟩", text: "Build a React dashboard component" },
                  { icon: "◻", text: "Design a landing page wireframe" },
                  { icon: "⊕", text: "Summarize the latest AI research" },
                  { icon: "⊟", text: "Analyze this dataset for trends" },
                ].map(s => (
                  <button
                    key={s.text}
                    onClick={() => setInput(s.text)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "10px 16px",
                      border: "1px solid var(--gray-200)",
                      borderRadius: 12, background: "var(--white)",
                      fontSize: 13, color: "var(--gray-600)",
                      cursor: "pointer", fontFamily: "var(--font)",
                      transition: "all .2s",
                      textAlign: "left",
                      boxShadow: "var(--shadow-sm)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--red-border)";
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--red-light)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(232,69,60,.12)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-200)";
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--white)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--gray-600)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-sm)";
                    }}
                  >
                    <span style={{ fontSize: 14, opacity: .7 }}>{s.icon}</span>
                    {s.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Conversation State */
            <div style={{
              flex: 1, overflowY: "auto",
              padding: "24px 0 16px",
            }}>
              <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
                {messages.map(msg => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
                    <Avatar role="assistant" />
                    <div style={{ display: "flex", gap: 5 }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: "var(--gray-300)",
                          animation: "pulse-dot .9s ease-in-out infinite",
                          animationDelay: `${i * .15}s`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input area */}
          <div style={{
            padding: hasMessages ? "12px 20px 20px" : "24px 20px 28px",
            background: "var(--white)",
            borderTop: hasMessages ? "1px solid var(--gray-100)" : "none",
          }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              {hasMessages && (
                <div style={{ marginBottom: 10 }}>
                  <ModePills active={activeMode} onSelect={setActiveMode} />
                </div>
              )}
              <InputBox
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                onAttach={() => {}}
                disabled={isLoading}
              />
              <div style={{
                marginTop: 10, textAlign: "center",
                fontSize: 11, color: "var(--gray-300)", letterSpacing: ".01em",
              }}>
                Aurora may make mistakes. Press <kbd style={{
                  background: "var(--gray-100)", border: "1px solid var(--gray-200)",
                  borderRadius: 4, padding: "0 4px", fontSize: 10,
                  fontFamily: "var(--mono)",
                }}>⏎</kbd> to send, <kbd style={{
                  background: "var(--gray-100)", border: "1px solid var(--gray-200)",
                  borderRadius: 4, padding: "0 4px", fontSize: 10,
                  fontFamily: "var(--mono)",
                }}>Shift+⏎</kbd> for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}