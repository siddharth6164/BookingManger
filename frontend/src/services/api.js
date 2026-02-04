const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
const BOOKINGS_ENDPOINT = `${API_BASE_URL}/bookings`;

export const getBookings = async () => {
  const res = await fetch(BOOKINGS_ENDPOINT);
  return res.json();
};

export const createBooking = async (data) => {
  const res = await fetch(BOOKINGS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};
