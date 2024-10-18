import express from "express";
import cors from "cors";
import {sequelize} from "./config/config";
import { initModels } from './models/index';

import User from './models/User';
import Album from './models/Album';
import Photo from './models/Photo';

import userRoutes from "./routes/users";
import albumRoutes from "./routes/albums";
import photoRoutes from "./routes/photos";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(express.json());

sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connection has been established successfully.");

    initModels();

    await sequelize.sync();
  })

  
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

app.use("/api/users", userRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/photos", photoRoutes);

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

