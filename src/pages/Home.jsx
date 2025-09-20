import "./Home.css";
import { Link } from "../router/Link.jsx";

export default function Home() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden text-slate-900">
      {/* gradient BACKGROUND (behind everything) */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,_#f8fbff_0%,_#eaf3ff_45%,_#e7f0ff_65%,_#e8f0ff_100%)]" />

      {/* STARS (no negative z-index) */}
      <div className="stars absolute inset-0 z-0" />

      {/* soft glow blobs */}
      <div className="pointer-events-none absolute -top-24 -left-28 z-10 h-80 w-80 rounded-full bg-blue-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-28 z-10 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      {/* content on top */}
      <section className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="relative isolate rounded-[28px] border border-white/50 bg-white/35 px-10 py-12 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl ring-1 ring-black/5">
          <h1 className="font-space text-7xl leading-none tracking-tight sm:text-8xl">AURA</h1>
          <p className="mt-4 text-lg text-slate-600">Explore the world—beautifully. Light theme, subtle stars, glass feel.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="#get-started" className="rounded-2xl border border-indigo-200 bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-indigo-300">Get Started</Link>
            <Link href="#learn-more" className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200">Learn More</Link>
          </div>
        </div>
        <p className="mt-10 text-sm text-slate-500">Made for a calm, modern space aesthetic ✨</p>
      </section>
    </main>
  );
}
