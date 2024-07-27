const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
const middleware = require("./middleware/auth")

const port = process.env.PORT || 7002

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

require("./db")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const urlRoute = require("./routes/urlRoute")
const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/userRoute")


app.use("/api/url", middleware.auth, urlRoute)
app.use("/api/static", middleware.checkAuth, staticRoute)
app.use("/api/user", userRoute)

app.listen(port, () => {
    console.log("Server is running on", port);
})