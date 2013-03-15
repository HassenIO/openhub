/**
 * The apps manager.
 * Please, see the docs/app_manager.md documentation for more information.
 */

var fs = require('fs') ;

module.exports = {

    /*
     * Check if an app exists.
     */
    exist:  function(app_id){
                return fs.existsSync('./apps/' + app_id);
            },

    /*
     * Get the list of available apps.
     */
    list:   function(){
                return fs.readdirSync('./apps');
            },

    /*
     * Load an app for use.
     */
    load:   function(app_id, app_params){
                return require('../../apps/' + app_id)(app_params);
            }

}

