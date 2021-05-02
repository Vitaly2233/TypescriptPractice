import express from "express";
import auth from "./routers/auth";
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

//routes
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/home", auth)
app.get("/generate_secret_key", generateKey)

app.listen(3001, async () => {
  await conToDb();
  console.log("Listening on port 3001");
})