"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-8 sm:px-10 sm:py-10">
      <header className="mb-6 sm:mb-8 text-center">
        <h1 className="heading-xl text-3xl sm:text-4xl tracking-tight">Your Dashboard</h1>
        <p className="subtle mt-2 text-sm sm:text-base">Welcome to your Amoura Works project overview.</p>
      </header>

      <main className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 lg:grid-cols-3 auto-rows-[minmax(140px,auto)]">
        {/* Project Overview */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card hover-lift p-5 lg:col-span-1 xl:col-span-1"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white font-semibold">Project Overview</h2>
              <p className="subtle text-sm mt-1">Project Name • Start Date • Deadline</p>
            </div>
            <span className="badge badge-blue">In Progress</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="subtle text-xs">Current Phase</p>
              <div className="mt-1 text-white font-medium">Draft</div>
            </div>
            <div>
              <p className="subtle text-xs">Days Left</p>
              <div className="mt-1 text-white font-medium">12 days</div>
            </div>
          </div>
          <div className="mt-5 h-28 w-28 rounded-full border border-[rgba(255,255,255,0.1)] relative">
            {/* Placeholder ring; replaced later with Chart.js */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "conic-gradient(#00B4FF 0% 64%, rgba(255,255,255,0.08) 64% 100%)",
              mask: "radial-gradient(closest-side, transparent 72%, black 73%)",
              WebkitMask: "radial-gradient(closest-side, transparent 72%, black 73%)"
            }} />
            <div className="absolute inset-2 rounded-full bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
              <div className="text-white font-bold">64%</div>
            </div>
          </div>
        </motion.section>

        {/* Timeline / Milestones */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card hover-lift p-5 lg:col-span-2"
        >
          <h2 className="text-white font-semibold">Timeline</h2>
          <div className="mt-6 flex items-center justify-between">
            {[
              { label: "Draft", active: true },
              { label: "Review", active: false },
              { label: "Edits", active: false },
              { label: "Final", active: false },
            ].map((step, idx) => (
              <div key={idx} className="flex-1 flex items-center">
                <div className={`h-2 rounded-full w-full ${idx < 3 ? "bg-[linear-gradient(90deg,rgba(0,180,255,0.5),rgba(255,255,255,0.08))]" : "bg-white/10"}`}></div>
                <div className={`ml-3 text-xs subtle ${step.active ? "text-white" : ""}`}>{step.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Assigned Editor */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card hover-lift p-5 lg:col-span-1"
        >
          <h2 className="text-white font-semibold">Assigned Editor</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/10 border border-white/15" />
            <div>
              <div className="text-white font-medium">Alex Rivera</div>
              <div className="subtle text-sm">Alex is polishing your video frame by frame 🎥</div>
            </div>
          </div>
          <button className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-full border border-[rgba(0,180,255,0.35)] bg-[rgba(0,180,255,0.08)] text-[rgba(180,235,255,1)] text-sm font-medium shadow-[0_0_20px_rgba(0,180,255,0.15)]">
            Contact via Email / WhatsApp
          </button>
        </motion.section>

        {/* Latest Update */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card hover-lift p-5 lg:col-span-1"
        >
          <h2 className="text-white font-semibold">Latest Update</h2>
          <div className="mt-3 subtle text-sm">Draft sent on Sept 24, awaiting feedback.</div>
        </motion.section>

        {/* Deliverables */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="glass-card hover-lift p-5 lg:col-span-2"
        >
          <h2 className="text-white font-semibold">Deliverables</h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Teaser v1", href: "#" },
              { title: "Full Cut v1", href: "#" },
              { title: "Color Pass", href: "#" },
            ].map((d, i) => (
              <a key={i} className="group p-3 hover-lift border border-white/10 rounded-xl bg-white/5" href={d.href}>
                <div className="h-28 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors" />
                <div className="mt-3 text-white text-sm font-medium">{d.title}</div>
                <div className="subtle text-xs">YouTube / Drive</div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Feedback */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card hover-lift p-5 lg:col-span-1"
        >
          <h2 className="text-white font-semibold">Feedback</h2>
          <div className="mt-3 subtle text-sm">Embed your Google Form here.</div>
          <div className="mt-3 aspect-video w-full rounded-md overflow-hidden border border-white/10 bg-white/5">
            {/* Placeholder iframe (replace src with actual Form link) */}
            <iframe
              className="w-full h-full"
              src="about:blank"
              title="Feedback Form"
              allow="clipboard-write;"
            />
          </div>
        </motion.section>
      </main>
    </div>
  );
}
