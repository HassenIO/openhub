/**
 * Extending the standard JSON object.
 */

/*
 * Saving native JSON methods.
 * More about JSON: https://developer.mozilla.org/en-US/docs/Using_native_JSON?redirectlocale=en-US&redirectslug=Using_JSON_in_Firefox
 */
exports.parse = JSON.parse
exports.stringify = JSON.stringify


/*
 * Check if the parameter is a valid JSON.
 */
exports.validate = function(data) {
    try {
        this.parse(data)
        return true
    } catch(e) {
        return false
    }
}


/*
 * Allowing a JSON object to be extended with another JSON object.
 * If the two JSON objects have the same keys, the second key value will erase the first key value.
 * Source: http://stackoverflow.com/questions/14974864/combine-or-merge-json-on-node-js-without-jquery
 */
exports.merge = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

