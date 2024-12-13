// app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { pool, shutdown } from "./db/pool.js";
const port = process.env.PORT || 8000;
import indexRouter from "./routes/indexRouter.js";
import genreRouter from "./routes/genreRouter.js";
import bookRouter from "./routes/bookRouter.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Health check endpoint for Railway
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "healthy" });
  } catch (err) {
    res.status(503).json({ status: "unhealthy" });
  }
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);
app.use("/genre", genreRouter);
app.use("/book", bookRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const gracefulShutdown = async () => {
  console.log("Starting graceful shutdown...");

  server.close(() => {
    console.log("Express server closed");
  });

  try {
    await shutdown();
    process.exit(0); // Add explicit exit
  } catch (err) {
    console.error("Error during graceful shutdown:", err);
    process.exit(1);
  }
};

// Shutdown handlers
process.once("SIGTERM", gracefulShutdown);
process.once("SIGINT", gracefulShutdown);
