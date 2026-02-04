const mongoose = require("mongoose");

let cached = global.__MONGOOSE_CONN__;

if (!cached) {
  cached = global.__MONGOOSE_CONN__ = { conn: null, promise: null };
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb+srv://yoyosid33_db_user:BookingManager123@cluster0.jteo40u.mongodb.net/?appName=Cluster0";

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongooseInstance) => {
        const { host, name } = mongooseInstance.connection;
        console.log(`MongoDB connected: ${host}/${name}`);
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error("MongoDB connection error:", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;