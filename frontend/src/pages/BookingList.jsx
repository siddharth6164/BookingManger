import { useEffect, useMemo, useState } from "react";
import { getBookings } from "../services/api";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then(setBookings);
  }, []);

  const metrics = useMemo(() => {
    const totalGuests = bookings.reduce((sum, booking) => sum + Number(booking.guests || 0), 0);
    const upcoming = bookings.filter((booking) => new Date(booking.date) >= new Date()).length;

    return [
      {
        label: "Total bookings",
        value: bookings.length.toString().padStart(2, "0"),
        accent: "from-brand-500/60 to-brand-500/10",
      },
      {
        label: "Guests hosted",
        value: totalGuests.toString().padStart(2, "0"),
        accent: "from-clay-500/60 to-clay-500/10",
      },
      {
        label: "Upcoming stays",
        value: upcoming.toString().padStart(2, "0"),
        accent: "from-white/70 to-white/5",
      },
    ];
  }, [bookings]);

  return (
    <div className="space-y-10">
      <section className="glass-panel relative overflow-hidden px-8 py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-transparent to-clay-500/20" aria-hidden />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="pill">Live occupancy</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white font-display sm:text-4xl">
              Boutique booking board
            </h1>
            <p className="mt-2 max-w-xl text-base text-slate-200">
              Track every stay, guest count, and arrival with a luminous control surface designed for nightly operations.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-6 py-5 text-right text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Bookings today</p>
            <p className="mt-2 text-5xl font-semibold font-display">{bookings.length.toString().padStart(2, "0")}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`glass-panel relative overflow-hidden px-6 py-6 text-white`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.accent}`} aria-hidden />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">{metric.label}</p>
              <p className="mt-4 text-4xl font-semibold font-display">{metric.value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white font-display">Latest reservations</h2>
          <span className="text-sm text-white/60">{bookings.length} entries</span>
        </div>

        {bookings.length === 0 ? (
          <div className="glass-panel flex flex-col items-center gap-3 px-8 py-12 text-center text-white/70">
            <span className="pill">No bookings yet</span>
            <p>New reservations will appear here the moment they are confirmed.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => {
              const isUpcoming = new Date(booking.date) >= new Date();
              return (
                <article
                  key={booking._id}
                  className="glass-panel flex flex-col gap-4 px-6 py-5 text-white transition hover:border-white/30 hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">Guest</p>
                    <h3 className="text-2xl font-semibold font-display">{booking.name}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                    <div>
                      <p className="text-white/50">Arrival</p>
                      <p className="text-lg font-medium text-white">{formatDate(booking.date)}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Guests</p>
                      <p className="text-lg font-medium text-white">{booking.guests}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        isUpcoming
                          ? "bg-emerald-400/15 text-emerald-200"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {isUpcoming ? "Upcoming" : "Completed"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
