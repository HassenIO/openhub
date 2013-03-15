/**
 * Define the server routes.
 * This script will be called by ./server.js main hub script.
 */

/*
 * Require routes.
 */
var apps_routes = require('../routes/apps_routes') ;


/*
 * Load routes.
 * The app parameter is the app express() varable, sent by ./server.js
 */
module.exports = function(app){

    /*
     * App manager routes.
     */
    app.get('/:app_id(\\d+)', apps_routes.load);     // Shortage the loads the thing app
    app.get('/apps', apps_routes.list);              // List installed apps
    app.get('/apps/:app_id(\\d+)', apps_routes.load);     // Load the thing app
    
}
