import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,
  // Connection pool settings
  max: 5,
  idleTimeoutMillis: 60000, // 60s
  connectionTimeoutMillis: 5000,
  allowExitOnIdle: true,
});

// Handle pool errors

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client: ", err);
});

// Graceful shutdown

export const shutdown = async () => {
  try {
    console.log("Closing pool connections...");
    await pool.end();
    console.log("Pool has ended");
  } catch (err) {
    console.error("Error during pool shutdown: ", err);
    process.exit(1);
  }
};
