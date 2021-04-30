import mongoose from "mongoose"

require("dotenv").config()
let con: any = undefined;

async function conToDb():Promise<any> {
  if (!process.env.DBCON) {
    console.log("Wrong database");
    con = undefined
    return undefined
  }
  if (!con) {
    con = await mongoose.connect(
      process.env.DBCON,
      {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false},
      (err) => {
        if (err) throw err;
        else console.log("Connected to db");
      }
    );
    return con;
  }
}


export default conToDb();