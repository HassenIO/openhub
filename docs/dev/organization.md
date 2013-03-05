# Organization

This documentation describes the organization of the source code.

Since the used language is [node.js](http://nodejs.org/), many decisions are based on  this.

## app.js

This is the main smart hub server application, a kind of entry point to the hub.

The script is executed by default when running `npm start` in the root folder.

## package.json

This is the standard [`package.json`](http://package.json.nodejitsu.com/) file that define the application and set dependencies.

For now, the smart hub server needs the following dependencies:

- Express.js

## node_modules/

Since the application is a node.js application, the `node_modules/` folder is automatically created when installing dependencies, using `npm install`.

## apps/

This folder contains all the installed thing apps. The apps are organized with their id (each application is a folder with the application id name.)

Each application folder must contain a `package.json` file (more information in the thing app doc.)

## config/

This folder contains a list of JSON files that define the configuration of the hub.

## routes/

This folder contains the server routes (similar to the controllers in an MVC pattern.) The scripts in routes have the main goal to structure the `app.s` main script.




