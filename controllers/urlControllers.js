"use strict"
const urlCollection = require("../models/urlModel")
const shortid = require("shortid")

const generateShortUrl = async (req, res) => {
    try {
        const body = req.body

        if (!body.url) {
            return res.status(400).send({
                success: false,
                message: "Please enter URL"
            })
        }

        const shortId = shortid(8)

        const response = await urlCollection.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: []
        })

        return res.status(201).send({
            success: true,
            message: "Short url created",
            data: response
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal serever error",
            error: error.message
        })
    }
}

const redirectLink = async (req, res) => {
    try {
        const shortId = req.params.shortId

        const response = await urlCollection.findOneAndUpdate({
            shortId
        }, {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        }
        )
        res.redirect(response.redirectURL)
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal serever error",
            error: error.message
        })
    }
}

const analytics = async (req, res) => {
    try {
        const shortId = req.params.shortId

        const response = await urlCollection.findOne({ shortId })

        return res.send({
            totalClicks: response.visitHistory.length,
            analytics: response.visitHistory
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal serever error",
            error: error.message
        })
    }
}

module.exports = { generateShortUrl, redirectLink, analytics }