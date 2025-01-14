import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./db.js"
import { authRoutes } from "./routes/auth.js"

const app = express()

const PORT = process.env.PORT
app.use(cors("*"))
app.use(express.json())
app.use("/auth", authRoutes)
connectDb()


app.listen(PORT, () => {
    console.log(`PORT is Listinig at http://locahost:${PORT}`)
})