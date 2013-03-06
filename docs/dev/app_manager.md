# App Manager

The app manager is a script that manage the thing app.

A thing app is a _Node.js module_ that represents the 'Thing' logic (application) to manage the corresponding physical thing (take decisions, convert values, save values,…) The thing app is identical to a node.js module, except that it is stored in the `apps/` folder:

    ./
      app.js
      node_modules/
      apps/
        app_1/
        app_2/
        ...

Thing apps are represented by their unique id. This is to be distinguished with the other app manager commands [`install`, `update`, `list`,…]

## List applications

This is done by visiting:

	host:port/apps/list

Where:

- `host` is the IP address of the hub
- `port` is the port of the hub

This query returns the list of available apps in the hub.

## Load a thing application

A thing app is loaded when the server is queried with the following URL format:

    host:port/app_id

Where:

- `app_id` is the ID of the thing app to load (must be an integer)

### How it works

In this case, the thing app id (which must be a number) is extracted from the URL, and the corresponding app is loaded (located in the `./apps/app_id` folder.)

The thing app **MUST** contain the `package.json` file and clearly specify the main script to be loaded, using `"main": "script_name.js"`

The app manager also extracts all the parameters from the URL, including the query parameters and the used method. All the parameters are sent to the app when it is loaded.

In order to grab the parameters, the main app script must be a function that handle the parameters:

    module.exports = function(params){
        // Do things here
    }

The app must return data in the following JSON format:

    {
        success: (bool)		// true if everything is OK, false if any error
    ,	msg: (string)		// An optional message that follows the 'success' value.
    						// Can be useful if success = false
    ,	data: (JSON)		// The returned useful data. Optional if error.
    }    

### Sended parameters

The app manager loads the appropriate thing app, with the following JSON parameters:

    {
        method: (string)	// The query method (GET, POST, PUT, DELETE)
    ,	app_id: (int)		// The thing app id
    ,	href: (string)		// The full URL sent to the hub
    ,	data: (JSON)		// Data sent by GET and POST/PUT, in JSON format
    }

**Nota.:** The `data` parameter is the merge between GET and POST/PUT parameters. If some parameter keys are found both in GET parameters and POST/PUT parameters, the priority is given to POST/PUT parameters.