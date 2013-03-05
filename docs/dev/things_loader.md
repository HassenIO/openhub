# Things loader

The things loader represents the part of the script that loads the appropriate thing application.

A thing app is a _Node.js module_ that represents the 'Thing' logic (application) to manage the corresponding physical thing (take decisions, convert values, save values,…) The thing app is identical to a node.js module, except that it is stored in the `apps/` folder:

    ./
      app.js
      node_modules/
      apps/
        thing_app_1/
        thing_app_2/
        ...

The thing app to be loaded is pacified in the URL, like this:

    host:port/app_id

Thing apps are represented by their unique id [to be discussed]. This is to be distinguished with the other hub commands [not yet implemented. Thinking about `status`, `install`, `update`, `things_list`,…]

Where:

- `host` is the IP address of the hub
- `port` is the port of the hub
- `app_id` is the ID of the thing app to load

## How it works

When the hub is queried, the thing app id (which must be a number) is extracted from the URL, and the corresponding app is loaded.

The thing app **MUST** contain the `package.json` file and clearly specify the main script to be loaded, using `"main": "script_name.js"`

The things loader also extracts all the parameters of the URL, including the query parameters and the used method. All the parameters are sent to the app when it is loaded.

In order to grab the parameters, the main app script must be a function that handle the parameters:

    module.exports = function(params){
        // Do things here
    }

The app must returns a JSON, with the following schema:

    {
        success: (bool)		// true if everything is OK, false if any error
    ,	msg: (string)		// An optional message that follows the 'success' value.
    						// Can be useful if success = false
    ,	data: (JSON)		// The returned useful data. Optional if error.
    }

## Sended parameters

The things loader calls the appropriate thing app, with parameters as a JSON list:

    {
        method: (string)	// The query method (GET, POST, PUT, DELETE)
    ,	thing_id: (int)		// The thing app id
    ,	href: (string)		// The full URL sent to the hub
    ,	data: (JSON)		// Data sent by GET and POST/PUT, in JSON format
    }

**Nota.:** The `data` parameter is the merge between GET and POST/PUT parameters. If some parameter keys are found both in GET parameters and POST/PUT parameters, the priority is given to POST/PUT parameters.