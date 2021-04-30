import mongoose from "mongoose"

require("dotenv").config()
let con: any = undefined;

export async function conToDb():Promise<any> {
  if (!process.env.DBCON) {
    console.log("Wrong database");
    return undefined
  }
  if (!con) {
    con = await mongoose.connect(
      process.env.DBCON,
      {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}
    );
    console.log("Connected to db")
    return Promise.resolve(con)
  }
}
