/*
 * All the requires to node.js modules.
 */
var http = require('http')
,   express = require('express')
,   app_manager = require('./routes/app_manager')

/*
 * Group other variable declarations.
 */
var app = express()

/*
 * General express configuration.
 */
app.configure(function(){
    this.set('port', process.env.PORT || 1337)    // Set default port to 1337
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
 * Create the http server and listen to the approriate port.
 */
http.createServer(app).listen(app.get('port'), function(){
    console.log('On port ' + app.get('port') + ', the force will be with you.')
})

