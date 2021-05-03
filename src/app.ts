import express from "express";
// routes
import authRoute from "./routers/auth";
import postsRoute from "./routers/posts";
// database
import mongoose from "mongoose"
import bodyParser from "body-parser"
import {generateKey} from "./routers/secretKey";

require("dotenv").config()

// instance for the app
const app: express.Application = express();

// connecting to database
async function conToDb(): Promise<void> {
  if (!process.env.DBCON) {
    console.log("Wrong database");
  } else {
    await mongoose.connect(
      process.env.DBCON,
      {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}
    );
    console.log("connected to database");
  }
}

// connecting bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes
app.use("/home", authRoute);
app.use("/posts", postsRoute)
app.use("/generate_secret_key", generateKey)

app.listen(3001, async () => {
  await conToDb();
  console.log("Listening on port 3001");
})