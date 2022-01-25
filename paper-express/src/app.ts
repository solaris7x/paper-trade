import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import relianceRouter from "./routes/relianceRouter"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set")
}

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Database"))

const app = express()

app.use(cors())

// define a route handler for the default home page
app.get("/", (req, res) => {
  return res.send("Hello world from Solaris!")
})

app.use("/reliance", relianceRouter)

// start the Express server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on ${process.env.PORT || 3000} 🚀🚀🚀`)
})
