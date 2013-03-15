/*
 * Require modules.
 */
var http = require('http') ,
    express = require('express') ;

/*
 * Load routes.
 */
var routes = require('./application/lib/routes') ;

/*
 * Set variables.
 */
var app = express() ,
    port = process.env.PORT || 1337 ;


/*
 * General express configuration.
 */
app.configure(function(){
    this.set('port', process.env.PORT || 1337);                 // Set the correct port number.
    this.disable('x-powered-by');                               // Disable X-POWERED-BY header
    this.use(express.bodyParser());                             // Use body parser to get POST data, if any.
    this.use(app.router);
});


/*
 * Define routes.
 */
routes(app);

/*
 * Create the server and listen to the correct port.
 */
http.createServer(app).listen(port, function(){
    console.log('On port ' + port + ', the force will be with you.');
});
