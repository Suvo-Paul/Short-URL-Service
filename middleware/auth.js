const { getUser } = require("../service/auth")

const auth = async (req, res, next) => {
    try {
        const cookie = req.cookies.uid;

        if (!cookie) {
            return res.redirect("/api/static/logIn")
        }

        const user = getUser(cookie)

        if (!user) {
            return res.redirect("/api/static/logIn")
        }

        req.user = user;
        next()
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

const checkAuth = async (req, res, next) => {
    const cookie = req.cookies.uid;

    const user = getUser(cookie)

    req.user = user;
    next()
}

module.exports = { auth, checkAuth }