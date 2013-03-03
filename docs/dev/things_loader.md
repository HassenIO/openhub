# Things loader

The things loader represents the part of the script that loads the appropriate thing module.

A thing module is a _Node.js module_ that represents the 'Thing' logic (software). The thing modules are identical to node.js modules, except that they are stored in the `things/` folder:

    ./
      app.js
      node_modules/
      things/
        thing_1/
        thing_2/
        ...

The thing module to be loaded is pacified in the URL, like this:

    host:port/thing_id

Things are represented by their unique id [to be discussed]. This is to be distinguished with the other hub commands [not yet implemented. Thinking about `status`, `things_list`,…]

Where:

- `host` is the IP address of the hub
- `port` is the port of the hub
- `thing_id` is the ID of the thing module to load

## How it works

When the hub is queried, the thing id is extracted from the URL, and the corresponding module is loaded.

This module **MUST** contain the `package.json` file and clearly specify the main script to be loaded, using `"main": "script_name.js"`

The things loader also extracts all the parameters of the URL, including the query parameters and the used method. All the parameters are sent to the module when it is loaded.

In order to grab the parameters, the module script must be a function that handle the parameters:

    module.exports = function(params){
        // Do things here
    }

The things loader 

## Sended parameters

The things loader calls the appropriate thing module, with parameters as a JSON list:

    {
        method: (string) // The query method (GET, POST)
    ,	thing_id: (int) // The thing id
    ,	href: (string) // The full URL sent to the hub
    ,	data: (JSON) // Data sent by GET and POST, in JSON format
    }

**Nota.:** The `data` parameter is the merge between GET and POST parameters. If some parameter keys are found both in GET parameters and POST parameters, the priority is given to POST parameters.