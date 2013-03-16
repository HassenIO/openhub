/**
 * Define the all the responses format template and functions.
 */

module.exports = function(res, status, data){

    /*
     * Define the JSON response template.
     */
    var response = {
        status: false,
        time: new Date(),
    }

    /*
     * Add the status code in the JSON response.
     */
    response.status = status;
    
    /*
     * Add JSON fields depending on the status code.
     */
    if (status == 200) response.data = data;
    if (status == 404) response.error = data;

    /*
     * Respond the JSON.
     */
    res.json(status, response);

}
