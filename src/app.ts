import cors from "cors";
import express from "express";
import orgRoutes from "./routes/organisers.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(orgRoutes, adminRoutes);

app.get("/", (req, res) => {
  res.send("API's Running");
});

export { app };
