import express from "express";
import auth from "./routers/auth";

const app = express();

app.use("/home", auth)
app.listen(3001, async () => {
    console.log("Listening on port 3001")
})