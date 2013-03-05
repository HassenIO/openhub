/*
 * All the requires to node.js modules.
 */
var http = require('http')
,   fs = require('fs')
,   express = require('express')
,   JSON = require('./lib/JSON')

/*
 * Group other variable declarations.
 */
var port = process.env.PORT || 1337
,   app = express()
    /*
     * The thing apps are listed in the ./apps folder.
     * Get the folders list to get the installed things modules.
     */
,   apps = fs.readdirSync('./apps')

/*
 * Configure express for the development mode.
 */
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

/*
 * Using express middlewares.
 */
app.use(express.bodyParser())   // Use body parser to get POST data, if any.

/*
 * Load the appropriate things, depending on the URL.
 * This is done by visiting http://ip_of_the_hub:port/thing_id
 */
app.all('/:thing_id', function(req, res){
    
    /*
     * Check if the thing module exists.
     */
    var thing_id = req.params.thing_id
    if(apps.indexOf(thing_id) !== -1){
        

        var getParams = require('url').parse(req.url, true)
        ,   thingParams = {
                method:     req.method
            ,   thing_id:   thing_id
            ,   href:       getParams.href
            ,   data:       JSON.merge(getParams.query, req.body) // Merging GET and POST data (priority to POST data)
        }
        ,   thingApp = require('./apps/' + thing_id)(thingParams)

        res.statusCode = 200
        res.send(thingApp.res)
    } else {
        /*
         * The thing module doesn't exist.
         */
        console.error('Thing app #' + req.params.thing_id + ' not found.')
        res.statusCode = 404
        res.end()
    }

})

/*
 * Create the http server and listen to the approriate port.
 */
http.createServer(app).listen(port, function(){
    console.log('On port ' + port + ', the force will be with you.')
})

