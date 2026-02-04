require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const isServerless = Boolean(process.env.VERCEL);

// Ensure DB connection (reuses cached connection in serverless environments)
const ensureDB = async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
};

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(ensureDB);

// Routes
app.use("/api/bookings", bookingRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Serve frontend build only for traditional deployments
if (process.env.NODE_ENV === "production" && !isServerless) {
  const clientPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(clientPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// Error handler (keeps stack traces out of responses in prod)
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Request error", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;

if (!isServerless) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;