import express from "express";
import cors from "cors";
import negotiationRoutes from "./routes/negotiationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/negotiation", negotiationRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
