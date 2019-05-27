module.exports = {
    mongodb_url : process.env.MONGODB_URL,
    secret: process.env.SECRET,
    port : process.env.PORT || 4000,
    client_origin: process.env.CLIENT_ORIGIN
}