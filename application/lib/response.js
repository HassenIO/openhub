/**
 * Define the all the responses format template and functions.
 */

var JSON = require('../../lib/JSON');

var responseTemplate = {
    status: '{{status}}',
    time: new Date(),
}

module.exports = function(res, status, data){

    response = responseTemplate;
    if (status == 200) response.data = data;
    if (status == 404) response.error = data;

    response = JSON.stringify(responseTemplate).replace('{{status}}', status);
    
    res.json(status, JSON.parse(response));
}
