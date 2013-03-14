/*
 * Require modules.
 */
var http = require('http') ,
    express = require('express') ;

/*
 * Load routes.
 */
var routes = './application/routes/' ,
    app_manager = require(routes + 'app_manager') ;

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
    this.set('views', __dirname + '/application/responses');    // Set the views root folder
    this.set('view engine', 'json');                            // Views are JSON
    this.use(express.bodyParser());                             // Use body parser to get POST data, if any.
    this.use(app.router);
});

/*
 * Configure express for the development mode.
 */
app.configure('development', function(){
    this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/*
 * Define routes.
 */
app.get('/:app_id(\\d+)', app_manager.load);     // Load the thing app
app.get('/apps', app_manager.list);              // List installed apps

/*
 * Create the server and listen to the correct port.
 */
http.createServer(app).listen(port, function(){
    console.log('On port ' + port + ', the force will be with you.');
});
