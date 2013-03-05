/*
 * All the requires to node.js modules.
 */
var http = require('http')
,   express = require('express')
,   things_loader = require('./routes/things_loader')

/*
 * Group other variable declarations.
 */
var app = express()

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
app.get('/:thing_id(\\d+)', things_loader)  // Load the thing app

/*
 * Create the http server and listen to the approriate port.
 */
http.createServer(app).listen(app.get('port'), function(){
    console.log('On port ' + app.get('port') + ', the force will be with you.')
})

