/*
 * All the requires to node.js modules.
 */
var http = require('http')
,   fs = require('fs')
,   express = require('express')

/*
 * Group other variable declarations.
 */
var port = process.env.PORT || 1337
,   app = express()
    /*
     * The things are listed as folders in the ./things folder.
     * Get the folders list to get the installed things modules.
     */
,   things = fs.readdirSync('./things')

/*
 * Configure express for the development mode.
 */
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

/*
 * Load the appropriate things, depending on the URL.
 * This is by visiting http://ip_of_the_hub:port/thing_id
 */
app.get('/:thing', function(req, res){
    
    /*
     * Check if the thing exists.
     */
    if(things.indexOf(req.params.thing) !== -1){
        var thing = require('./things/' + req.params.thing)
        res.send(thing.text)
    } else {
        /*
         * The thing module doesn't exist.
         * TODO: We shouldn't quit like this. Instead, respond with an error.
         */
        console.error('Thing not found.')
        res.end()
    }
})

/*
 * Create the http server and listen to the approriate port.
 */
http.createServer(app).listen(port, function(){
    console.log('On port ' + port + ', the force will be with you.')
})

