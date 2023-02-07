import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import houseRoutes from "./routes/house.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);

// Routes
app.use('/api', houseRoutes);

export { app };