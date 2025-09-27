"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ProgressRing";

type ProjectRecord = {
  projectName: string;
  phase: string;
  progressPercent: number;
  assignedEditor: string;
  deadline: string; // ISO
  latestUpdate: string;
  deliverables: Array<{ title: string; href: string }>
};

function formatDaysLeft(iso: string): string {
  const deadline = new Date(iso).getTime();
  const now = Date.now();
  const days = Math.max(0, Math.ceil((deadline - now) / 86400000));
  return `${days} days`;
}

export default function ClientDashboard({ params }: { params: Promise<{ id: string }> }) {
  const [data, setData] = useState<ProjectRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const { id } = await params;
        const res = await fetch(`/api/projects/${id}`, { cache: "no-store" });
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        // ignore; page shows skeleton
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [params]);

  const statusBadgeClass = useMemo(() => {
    const phase = (data?.phase || "").toLowerCase();
    if (phase.includes("final")) return "badge badge-green";
    if (phase.includes("review") || phase.includes("await")) return "badge badge-amber";
    return "badge badge-blue";
  }, [data?.phase]);

  return (
    <div className="min-h-screen px-6 py-8 sm:px-10 sm:py-10">
      <header className="mb-6 sm:mb-8 text-center">
        <h1 className="heading-xl text-3xl sm:text-4xl tracking-tight">Your Dashboard</h1>
        <p className="subtle mt-2 text-sm sm:text-base">Welcome to your Amoura Works project overview.</p>
      </header>

      <main className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 lg:grid-cols-3 auto-rows-[minmax(140px,auto)]">
        {/* Project Overview */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card hover-lift p-5 lg:col-span-1 xl:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white font-semibold">Project Overview</h2>
              <p className="subtle text-sm mt-1">{data?.projectName || "—"}</p>
            </div>
            <span className={statusBadgeClass}>{data ? (data.phase === "Final Delivery" ? "Final Delivery" : data.phase || "In Progress") : "—"}</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="subtle text-xs">Current Phase</p>
              <div className="mt-1 text-white font-medium">{data?.phase || "—"}</div>
            </div>
            <div>
              <p className="subtle text-xs">Days Left</p>
              <div className="mt-1 text-white font-medium">{data ? formatDaysLeft(data.deadline) : "—"}</div>
            </div>
          </div>
          <div className="mt-5">
            {data ? <ProgressRing value={data.progressPercent} size={112} /> : <div className="h-28 w-28 rounded-full border border-white/10" />}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="glass-card hover-lift p-5 lg:col-span-2">
          <h2 className="text-white font-semibold">Timeline</h2>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {[
              { label: "Draft" },
              { label: "Review" },
              { label: "Edits" },
              { label: "Final Delivery" },
            ].map((step, idx) => {
              const isActive = data ? step.label.toLowerCase() === data.phase.toLowerCase() : idx === 0;
              const isPast = data ? idx < ["draft","review","edits","final delivery"].indexOf(data.phase.toLowerCase()) : false;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`h-2 flex-1 rounded-full ${isPast || isActive ? "bg-[linear-gradient(90deg,rgba(0,180,255,0.5),rgba(255,255,255,0.08))]" : "bg-white/10"}`}></div>
                  <div className={`text-xs ${isActive ? "text-white" : "subtle"}`}>{step.label}</div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Assigned Editor */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="glass-card hover-lift p-5 lg:col-span-1">
          <h2 className="text-white font-semibold">Assigned Editor</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
            <div>
              <div className="text-white font-medium">{data?.assignedEditor || "—"}</div>
              <div className="subtle text-sm">{data ? `${data.assignedEditor.split(" ")[0]} is polishing your video frame by frame 🎥` : "—"}</div>
            </div>
          </div>
          <a href={`mailto:hello@amouraworks.com?subject=${encodeURIComponent("Regarding " + (data?.projectName || "my project"))}`} className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-full border border-[rgba(0,180,255,0.35)] bg-[rgba(0,180,255,0.08)] text-[rgba(180,235,255,1)] text-sm font-medium shadow-[0_0_20px_rgba(0,180,255,0.15)]">
            Contact via Email / WhatsApp
          </a>
        </motion.section>

        {/* Latest Update */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card hover-lift p-5 lg:col-span-1">
          <h2 className="text-white font-semibold">Latest Update</h2>
          <div className="mt-3 subtle text-sm">{data?.latestUpdate || "—"}</div>
        </motion.section>

        {/* Deliverables */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="glass-card hover-lift p-5 lg:col-span-2">
          <h2 className="text-white font-semibold">Deliverables</h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {(data?.deliverables || []).map((d, i) => (
              <a key={i} className="group p-3 hover-lift border border-white/10 rounded-xl bg-white/5" href={d.href} target="_blank" rel="noreferrer">
                <div className="h-28 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors" />
                <div className="mt-3 text-white text-sm font-medium">{d.title}</div>
                <div className="subtle text-xs">YouTube / Drive</div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Feedback */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="glass-card hover-lift p-5 lg:col-span-1">
          <h2 className="text-white font-semibold">Feedback</h2>
          <div className="mt-3 subtle text-sm">Submit notes or approvals via the form.</div>
          <div className="mt-3 aspect-video w-full rounded-md overflow-hidden border border-white/10 bg-white/5">
            <iframe className="w-full h-full" src="about:blank" title="Feedback Form" />
          </div>
        </motion.section>
      </main>
    </div>
  );
}

