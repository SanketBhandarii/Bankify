import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
    app.get("/", (req, res) =>{
      res.send("<h1>Hi! Welcome to my backend</h1>")
    })
  })
  .catch((err) => {
    console.log("MONGODB connection failed");
  });
