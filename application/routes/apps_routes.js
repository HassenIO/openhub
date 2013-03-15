/**
 * Set apps routes.
 */

var JSON = require('../../lib/JSON') ;
var response = require('../lib/response') ;
var apps_manager = require('../managers/apps_manager') ;


module.exports = {

    /*
     * Send the list af available apps to the server .
     */
    list: function(req, res){

              var   apps_list = apps_manager.list();
              response(res, 200, apps_list);

          },

    /*
     * Load an app for use, and respond to the server.
     * The app id should be specified in the URL (see doc.)
     */
    load:   function(req, res){

                /*
                 * Get the app id specified in the URL.
                 */
                var app_id = req.params.app_id;

                /*
                 * Check if the app app exists.
                 */
                if(apps_manager.exist(app_id)){
                    var get_params = require('url').parse(req.url, true) ,
                        app_params = {
                            method:     req.method ,
                            app_id:     app_id ,
                            href:       get_params.href ,
                            data:       JSON.merge(get_params.query, req.body) // Merging GET and POST data (priority to POST data)
                        } ,
                        app_response = apps_manager.load(app_id, app_params);

                    response(res, 200, { params: app_params, app_res: app_response.res });
                } else {
                    /*
                     * The app doesn't exist.
                     */
                    console.warn('App #' + req.params.app_id + ' not found.');
                    response(res, 404, { message: 'App #' + req.params.app_id + ' not found.' });
                }

            }

}
