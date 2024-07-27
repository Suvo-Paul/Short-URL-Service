const sessionId = new Map()

const setUser = (id, user) => {
    sessionId.set(id, user)
}

const getUser = (id) => {
    return sessionId.get(id)
}

module.exports = { setUser, getUser }