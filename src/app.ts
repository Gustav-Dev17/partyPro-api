import cors from "cors";
import express from "express";
import publicRoutes from "./routes/organisers.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(publicRoutes);

app.get("/", (req, res) => {
  res.send("API's Running");
});

export { app };
