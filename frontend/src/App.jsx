import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingList from "./pages/BookingList";
import CreateBooking from "./pages/CreateBooking";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-slate-900 to-slate-950"
          aria-hidden
        />
        <div className="absolute inset-0 bg-mesh opacity-70 blur-3xl" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
          <Navbar />
          <main className="flex-1 space-y-10 pb-12">
            <Routes>
              <Route path="/" element={<BookingList />} />
              <Route path="/create" element={<CreateBooking />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
