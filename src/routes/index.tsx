import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luminary — Alumni Network Dashboard" },
      {
        name: "description",
        content:
          "Luminary is a minimal, glassmorphic alumni management platform: directory, events, endowments and engagement analytics in one calm console.",
      },
      { property: "og:title", content: "Luminary — Alumni Network Dashboard" },
      {
        property: "og:description",
        content:
          "A minimal, glassmorphic alumni management platform for the global network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ALUMNI = [
  {
    initials: "MA",
    name: "Marcus Aurelius Chen",
    detail: "Class of 2012 • Senior Architect at Foster + Partners",
  },
  {
    initials: "SL",
    name: "Sarah Linden",
    detail: "Class of 2015 • AI Ethics Researcher, DeepMind",
  },
  {
    initials: "DB",
    name: "David Brooks",
    detail: "Class of 1998 • Founder at Brooks Capital Group",
  },
  {
    initials: "ER",
    name: "Elena Rossi",
    detail: "Class of 2024 • Global Economics, McKinsey & Company",
  },
  {
    initials: "LW",
    name: "Lana Wu",
    detail: "Class of 2019 • Associate at Green Ventures",
  },
];

const STATS = [
  { label: "Total Alumni", value: "42,804", foot: "+12% vs last year", tone: "gold" },
  { label: "Active Members", value: "18,291", foot: "4,209 currently online", tone: "ice" },
  { label: "Events Held", value: "892", foot: "24 new this month", tone: "crimson" },
  { label: "Funds Raised", value: "$4.2M", foot: "Target: $5.0M", tone: "gold" },
] as const;

const EVENTS = [
  {
    date: "OCT 12 • LONDON",
    title: "Sustainable Urban Design Mixer",
    body: "Foster + Partners Studio Tour and Networking dinner.",
    tone: "gold",
    last: false,
  },
  {
    date: "OCT 15 • VIRTUAL",
    title: "The Future of Ethics in AI",
    body: "Panel discussion featuring Class of '15 researchers.",
    tone: "crimson",
    last: false,
  },
  {
    date: "NOV 02 • NEW YORK",
    title: "Annual Gala Dinner",
    body: "Celebrating 100 years of the institutional foundation.",
    tone: "ice",
    last: true,
  },
] as const;

const NAV = ["Overview", "Directory", "Events", "Endowments", "Resources"];

function Index() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALUMNI.slice(0, 3);
    return ALUMNI.filter(
      (a) => a.name.toLowerCase().includes(q) || a.detail.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="relative flex min-h-screen bg-background text-foreground">
      {/* Atmospheric background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="nebula-crimson absolute top-[10%] -left-[10%] h-[500px] w-[500px] opacity-40" />
        <div className="nebula-gold absolute right-0 bottom-[5%] h-[600px] w-[600px] opacity-30" />
      </div>

      {/* Navigation shell */}
      <aside className="glass sticky top-0 z-20 flex h-screen w-64 flex-col border-r border-foreground/5">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary ring-4 ring-primary/10" />
            <span className="font-mono text-lg font-bold uppercase tracking-tighter">
              Luminary
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {NAV.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={
                active === item
                  ? "flex w-full items-center rounded-xl bg-foreground/10 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors"
                  : "flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
              }
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="glass rounded-2xl p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              Logged in as
            </p>
            <p className="text-sm font-medium">Julian Vance '08</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="z-10 max-w-7xl flex-1 p-10">
        <header className="animate-entrance mb-12 flex items-end justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-balance">
              Alumni Dashboard
            </h1>
            <p className="max-w-md text-muted">
              Welcome back to the global network. You have 3 new event invites this week.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110">
              Host an Event
            </button>
          </div>
        </header>

        {/* Stats grid */}
        <section className="mb-12 grid grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="glass animate-entrance rounded-3xl p-6"
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                {s.label}
              </p>
              <h2 className="font-mono text-3xl font-bold">{s.value}</h2>
              <div
                className={
                  s.tone === "gold"
                    ? "mt-4 text-[10px] text-secondary"
                    : s.tone === "crimson"
                      ? "mt-4 text-[10px] text-primary"
                      : "mt-4 text-[10px] text-foreground/40"
                }
              >
                {s.foot}
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-3 gap-8">
          {/* Directory preview */}
          <section
            className="glass animate-entrance col-span-2 overflow-hidden rounded-3xl"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between border-b border-foreground/5 p-8">
              <h3 className="text-xl font-bold">Featured Alumni</h3>
              <div className="relative">
                <div className="absolute top-1/2 left-3 size-2 -translate-y-1/2 rounded-full bg-primary" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search network..."
                  className="w-64 rounded-full border border-foreground/10 bg-foreground/5 py-2 pr-4 pl-8 text-xs font-medium transition-all focus:ring-1 focus:ring-secondary/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-foreground/5">
              {filtered.length === 0 && (
                <p className="p-6 text-xs text-muted">No alumni match “{query}”.</p>
              )}
              {filtered.map((a) => (
                <div
                  key={a.initials}
                  className="group flex cursor-pointer items-center gap-6 p-6 transition-all hover:bg-foreground/5"
                >
                  <div className="grid size-12 flex-shrink-0 place-items-center rounded-2xl bg-muted/20 font-mono text-xs ring-1 ring-foreground/10">
                    {a.initials}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{a.name}</h4>
                    <p className="text-xs text-muted">{a.detail}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-md border border-foreground/20 px-2 py-1 text-[10px] text-muted transition-colors group-hover:border-secondary group-hover:text-foreground">
                      View Profile
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full border-t border-foreground/5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground">
              See Full Directory
            </button>
          </section>

          {/* Upcoming events */}
          <section
            className="glass animate-entrance flex flex-col rounded-3xl p-8"
            style={{ animationDelay: "400ms" }}
          >
            <h3 className="mb-8 text-xl font-bold">Upcoming Events</h3>

            <div className="flex-1 space-y-6">
              {EVENTS.map((e) => (
                <div key={e.title} className="relative pl-8">
                  <div
                    className={
                      e.tone === "gold"
                        ? "absolute top-1 left-0 h-2 w-2 rounded-full bg-secondary"
                        : e.tone === "crimson"
                          ? "absolute top-1 left-0 h-2 w-2 rounded-full bg-primary"
                          : "absolute top-1 left-0 h-2 w-2 rounded-full border border-foreground/40"
                    }
                  />
                  {!e.last && (
                    <div className="absolute top-4 left-[3px] h-full w-[2px] bg-foreground/5" />
                  )}
                  <p
                    className={
                      e.tone === "gold"
                        ? "mb-1 font-mono text-[10px] text-secondary"
                        : e.tone === "crimson"
                          ? "mb-1 font-mono text-[10px] text-primary"
                          : "mb-1 font-mono text-[10px] text-muted"
                    }
                  >
                    {e.date}
                  </p>
                  <h5 className="mb-1 text-sm font-bold">{e.title}</h5>
                  <p className="text-xs leading-relaxed text-muted">{e.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="glass rounded-2xl border-secondary/10 bg-secondary/5 p-4">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-secondary">
                  Reminder
                </p>
                <p className="text-[11px] text-foreground/70">
                  You have not RSVP'd for the NYC Alumni Weekend yet.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
