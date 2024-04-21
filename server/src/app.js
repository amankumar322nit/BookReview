import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/msg', (req, res) => {
  res.send('Hello World!')
})

//routes import
import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.routes.js";

//routes declaration

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/reviews",reviewRoutes);

export default app;
