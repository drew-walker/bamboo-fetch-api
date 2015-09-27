# bamboo-fetch-api

[![Coverage Status](https://coveralls.io/repos/drewwalker/bamboo-fetch-api/badge.svg?branch=master&service=bitbucket)](https://coveralls.io/bitbucket/drewwalker/bamboo-fetch-api?branch=master)
[![Build Status](https://travis-ci.org/drew-walker/bamboo-fetch-api.svg?branch=master)](https://travis-ci.org/drew-walker/bamboo-fetch-api)
[![Requirements Status](https://requires.io/bitbucket/drewwalker/bamboo-fetch-api/requirements.svg?branch=master)](https://requires.io/bitbucket/drewwalker/bamboo-fetch-api/requirements/?branch=master)

A server-side node module for requesting data from Bamboo REST APIs.

# Installation

    npm install bamboo-fetch-api

# Usage

    var bambooApi = require('bamboo-fetch-api');

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