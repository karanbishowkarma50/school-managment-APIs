const express = require("express")
const adminRoutes = require("../src/routes/admin.route")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use("/admin",adminRoutes)

module.exports = app