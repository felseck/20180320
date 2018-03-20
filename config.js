module.exports = {
    db:process.env.MONGODB_URI || 'mongodb://localhost/changuito',//'mongodb://sandbox:sandbox@ds149874.mlab.com:49874/heroku_6hdzl258', //|| 'mongodb://localhost/changuito',
    port:process.env.PORT || 8080,
    statusqueued: process.env.MONGODB_STATUSQUEUSED || '599f0e8fc5843337b85f2e4c',
    statusdelivered:process.env.MONGODB_STATUSDELIVERED || '599f0ea5c5843337b85f2e4d'
}