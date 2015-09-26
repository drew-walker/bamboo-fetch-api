# bamboo-api

A node module for requesting data from Bamboo REST APIs.

# Installation

    npm install bamboo-api

# Usage (Node)

    var bambooApi = require('bamboo-api');

    bambooApi.configure({
        credentials: {
            username: "<YOUR-BAMBOO-USERNAME>",
            password: "<YOUR-BAMBOO-PASSWORD>"
        },
        host: "<YOUR-BAMBOO-HOST>"
    });

    bambooApi.get("project", { id : "MYPROJ" }, function(err, result) {
        console.log(result);
    });