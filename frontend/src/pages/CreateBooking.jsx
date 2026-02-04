import { useState } from "react";
import { createBooking } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateBooking() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    guests: 1,
  });
  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const res = await createBooking(form);
    if (res.ok) {
      setStatus("success");
      setTimeout(() => navigate("/"), 600);
    } else {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-brand-500/60";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel relative overflow-hidden px-8 py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-clay-500/15 via-transparent to-brand-500/25" aria-hidden />
        <div className="relative space-y-6">
          <span className="pill">New reservation</span>
          <div>
            <h1 className="text-3xl font-semibold text-white font-display">Craft a bespoke stay</h1>
            <p className="mt-2 max-w-lg text-white/70">
              Capture guest details, plan arrivals, and lock in party size with a luminous composition panel optimized for concierge teams.
            </p>
          </div>
          <ul className="space-y-3 text-white/75">
            <li className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-white/15 text-center text-sm font-semibold text-white">1</span>
              Assign guest identity and arrival date.
            </li>
            <li className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-white/15 text-center text-sm font-semibold text-white">2</span>
              Confirm party size to sync service prep.
            </li>
            <li className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-white/15 text-center text-sm font-semibold text-white">3</span>
              Launch booking and notify the lounge.
            </li>
          </ul>
        </div>
      </section>

      <section className="glass-panel px-8 py-10">
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Booking form</p>
            <h2 className="text-2xl font-semibold font-display">Guest capsule</h2>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
            {status === "success" ? "Saved" : "Draft"}
          </span>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-5 text-white">
          <label className="block space-y-2">
            <span className="text-sm text-white/70">Guest name</span>
            <input
              className={fieldClass}
              placeholder="Nora Callahan"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/70">Arrival date</span>
            <input
              type="date"
              className={fieldClass}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/70">Guests</span>
            <input
              type="number"
              min="1"
              className={fieldClass}
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              required
            />
          </label>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-clay-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-glow transition hover:scale-[1.01]"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Processing" : "Lock booking"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/70 hover:text-white"
            >
              Cancel
            </button>
          </div>

          {status === "error" && (
            <p className="text-sm text-rose-300">Unable to save booking. Please try again.</p>
          )}
          {status === "success" && (
            <p className="text-sm text-emerald-200">Booking captured. Redirecting…</p>
          )}
        </form>
      </section>
    </div>
  );
}
