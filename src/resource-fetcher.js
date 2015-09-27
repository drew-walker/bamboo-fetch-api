(function(root, factory) {
    module.exports = factory();
}(this, function() {
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

    var querystring = require('querystring');
    var handleRestResponse = require('./response-handler');

    var localConfig;

    function configure(config) {
        localConfig = config;
    }

    function getRootUrl(config) {
        return 'https://' + config.credentials.username + ':' + config.credentials.password + '@' + config.host;
    }

    function getResourcePath(resource, options) {
        switch (resource) {
            case "branches":
            case "repos":
                return "/rest/branchinator/1.0/" + resource + ".json" + (options ? "?" + querystring.stringify(options) : "");
            case "project":
                return "/rest/api/latest/" + resource + "/" + options.id + ".json";
        }
    }

    function getResourceUrl(config, resource, options) {
        return getRootUrl(config) + getResourcePath(resource, options);
    }

    function fetchGenericResource(resource, options, callback) {
        fetch(getRootUrl(localConfig) + '/rest/api/latest/' + resource + '/' + options.id + '.json')
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function fetchRepos(callback) {
        fetch(getResourceUrl(localConfig, "repos"))
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function fetchBranches(repoId, callback) {
        fetch(getResourceUrl(localConfig, "branches", { repoId: repoId }))
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function fetchProject(projectKey, callback) {
        fetch(getRootUrl(localConfig) + '/rest/api/latest/project/' + projectKey + '.json?expand=plans&max-result=100')
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function fetchResource(resource, optionsOrCallback, callback) {
        switch (resource) {
            case "project":
                return fetchProject(optionsOrCallback.id, callback);
            case "branches":
                return fetchBranches(optionsOrCallback.repoId, callback);
            case "repos":
                return fetchRepos(optionsOrCallback);
            default:
                return fetchGenericResource(resource, optionsOrCallback, callback);
        }
    }

    return {
        getResourceUrl: getResourceUrl,
        configure: configure,
        fetch: fetchResource,
        fetchProject: fetchProject,
        fetchBranches: fetchBranches,
        fetchRepos: fetchRepos
    }
}));