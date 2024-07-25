const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const path = require("path")

const port = process.env.PORT || 7002

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

require("./db")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const urlRoute = require("./routes/urlRoute")
const staticRoute = require("./routes/staticRoute")

app.use("/api/url", urlRoute)
app.use("/api/static", staticRoute)

app.listen(port, () => {
    console.log("Server is running on", port);
})