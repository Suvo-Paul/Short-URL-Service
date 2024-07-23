const express = require("express")

const urlController = require("../controllers/urlControllers")
const urlRoute = express.Router()

urlRoute.post("/createUrl", urlController.generateShortUrl)
urlRoute.get("/redirectUrl/:shortId", urlController.redirectLink)
urlRoute.get("/analytics/:shortId", urlController.analytics)

module.exports = urlRoute