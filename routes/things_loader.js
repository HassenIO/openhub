/**
 * The things loader.
 * Please, see the docs/things_loader.md documentation for more information.
 */
module.exports = function(req, res){
    
    var fs = require('fs')
    ,   JSON = require('../lib/JSON')
    ,   thing_id = req.params.thing_id
    ,   apps = fs.readdirSync('./apps')

    /*
     * Check if the thing module exists.
     */
    if(apps.indexOf(thing_id) !== -1){
        

        var getParams = require('url').parse(req.url, true)
        ,   thingParams = {
                method:     req.method
            ,   thing_id:   thing_id
            ,   href:       getParams.href
            ,   data:       JSON.merge(getParams.query, req.body) // Merging GET and POST data (priority to POST data)
        }
        ,   thingApp = require('../apps/' + thing_id)(thingParams)

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

}
