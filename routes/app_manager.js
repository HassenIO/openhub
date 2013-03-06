/**
 * The app manager.
 * Please, see the docs/app_manager.md documentation for more information.
 */

var fs = require('fs')
,   JSON = require('../lib/JSON')

module.exports = {

    /*
     * Get the list of available apps.
     */
    list: function(req, res){

        fs.readdir('./apps', function(err, folders){
            if(err) throw err

            res.statusCode = 200
            res.send(folders)
        })

    },  // End of list func.

    /*
     * Load an app for use.
     * The app id should be specified in the URL (see doc.)
     */
    load: function(req, res){
        
        /*
         * Get the app id specified in the URL.
         */
        var app_id = req.params.app_id

        /*
         * Check if the thing app exists.
         */
        if(fs.existsSync('./apps/' + app_id)){
            

            var getParams = require('url').parse(req.url, true)
            ,   thingParams = {
                    method:     req.method
                ,   app_id:     app_id
                ,   href:       getParams.href
                ,   data:       JSON.merge(getParams.query, req.body) // Merging GET and POST data (priority to POST data)
            }
            ,   thingApp = require('../apps/' + app_id)(thingParams)

            res.statusCode = 200
            res.send(thingApp.res)
        } else {
            /*
             * The thing app doesn't exist.
             */
            console.error('App #' + req.params.app_id + ' not found.')
            res.statusCode = 404
            res.end()
        }

    }   // End of load func.

}

