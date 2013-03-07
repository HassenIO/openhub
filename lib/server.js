var http = require('http')
,   express = require('express')
,   app = express()
,   app_manager = require('../routes/app_manager')


/*
 * General express configuration.
 */
app.configure(function(){
    this.use(express.bodyParser())              // Use body parser to get POST data, if any.
    this.use(app.router)
})

/*
 * Configure express for the development mode.
 */
app.configure('development', function(){
    this.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

/*
 * Define routes.
 */
app.get('/:app_id(\\d+)', app_manager.load)     // Load the thing app
app.get('/apps/list', app_manager.list)         // List installed apps

/*
 * Export server.
 */
module.exports = http.createServer(app)
module.exports.port = port = process.env.PORT || 1337
module.exports.root = 'http://localhost:' + port
