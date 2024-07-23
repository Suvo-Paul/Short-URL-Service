const express = require("express")
const dotenv = require("dotenv").config()
const app = express()

const port = process.env.PORT || 7002

require("./db")

app.use(express.json())

const urlRoute = require("./routes/urlRoute")

app.use("/api/url", urlRoute)

app.listen(port, () => {
    console.log("Server is running on", port);
})