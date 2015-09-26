# bamboo-api

[![Coverage Status](https://coveralls.io/repos/drewwalker/bamboo-api/badge.svg?branch=master&service=bitbucket)](https://coveralls.io/bitbucket/drewwalker/bamboo-api?branch=master)
[![Build Status](https://travis-ci.org/drew-walker/bamboo-api.svg?branch=master)](https://travis-ci.org/drew-walker/bamboo-api)
[![Requirements Status](https://requires.io/bitbucket/drewwalker/bamboo-api/requirements.svg?branch=master)](https://requires.io/bitbucket/drewwalker/bamboo-api/requirements/?branch=master)

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