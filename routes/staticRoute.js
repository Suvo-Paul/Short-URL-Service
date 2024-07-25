const express = require("express")
const urlCollection = require("../models/urlModel")

const router = express.Router()

router.get("/urls", async (req, res) => {

    const allurls = await urlCollection.find({})
    return res.render("home", {
        urls: allurls
    })
})

module.exports = router