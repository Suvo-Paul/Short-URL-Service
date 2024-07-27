const express = require("express")
const urlCollection = require("../models/urlModel")

const router = express.Router()

router.get("/urls", async (req, res) => {

    if (!req.user) {
        return res.redirect("/api/static/logIn")
    }

    const allurls = await urlCollection.find({ createdBy: req.user._id })
    return res.render("home", {
        urls: allurls
    })
})

router.route("/signUp").get((req, res) => {
    return res.render("signUp")
})

router.route("/logIn").get((req, res) => {
    return res.render("logIn")
})

module.exports = router