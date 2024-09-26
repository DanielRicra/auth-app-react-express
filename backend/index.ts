import express from "express"

import authRoutes from "./routes/auth.route"

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running in port http://localhost:${PORT}`)
})