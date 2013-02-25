/*
 * All the requires.
 */
var http = require('http')
,   fs = require('fs')
,   express = require('express')

/*
 * Group other variable declarations.
 */
var port = process.env.PORT || 3000
,   app = express()
,   things = fs.readdirSync('./things')

/*
 * Configure express for the development mode.
 */
app.configure('development', function(){
    
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

/*
 * Load the appropriate things, depending on the URL.
 */
app.get('/:thing', function(req, res){
    
    /*
     * Check if the thing exists.
     */
    if(things.indexOf(req.params.thing) !== -1){
        var thing = require('./things/' + req.params.thing + '/app.js')
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

