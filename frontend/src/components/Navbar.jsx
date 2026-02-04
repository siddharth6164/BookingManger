import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Bookings" },
  { to: "/create", label: "Create" },
];

export default function Navbar() {
  return (
    <header className="glass-panel relative flex flex-col gap-6 overflow-hidden px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative">
        <div className="pill">Control center</div>
        <div className="mt-2 text-2xl font-semibold text-white font-display">
          Nimbus Retreats
        </div>
        <p className="text-sm text-slate-300">
          Manage boutique stays with real-time occupancy and effortless bookings.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-medium text-white/80">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 transition ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-white/70 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/create"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-clay-500 px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
        >
          New booking
        </Link>
      </div>
    </header>
  );
}
