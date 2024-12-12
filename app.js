import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { shutdown } from "./db/pool.js";
const port = process.env.EXPRESS_PORT || 8000;

import indexRouter from "./routes/indexRouter.js";
import genreRouter from "./routes/genreRouter.js";

const app = express();

// Shutdown

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "ejs");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);
app.use("/genre", genreRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
