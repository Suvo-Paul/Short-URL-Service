"use strict"

const userCollection = require("../models/userModel")
const { setUser } = require("../service/auth")

const { v4: uuidv4 } = require("uuid")

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const response = await userCollection.create({
            name: name,
            email: email,
            password: password
        })

        return res.redirect("/api/static/logIn")
    } catch (error) {
        return res, (500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userCollection.findOne({ email, password });

        if (!user) {
            return res.render("login", {
                error: "Invalid username or password"
            })
        }
        const sessionId = uuidv4()

        setUser(sessionId, user)

        res.cookie("uid", sessionId)

        return res.redirect("/api/static/urls")
    } catch (error) {
        return res, (500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { signUp, logIn }