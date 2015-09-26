(function(root, factory) {
    module.exports = factory();
}(this, function() {
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

    var localConfig;

    function configure(config) {
        localConfig = config;
    }

    function handleRestResponse(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }

    function getRestUrl(config) {
        return 'https://' + config.credentials.username + ':' + config.credentials.password + '@' + config.host + '/rest';
    }

    function fetchGenericResource(resource, options, callback) {
        fetch(getRestUrl(localConfig) + '/api/latest/' + resource + '/' + options.id + '.json')
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function fetchRepos(callback) {
        fetch(getRestUrl(localConfig) + '/branchinator/1.0/repos.json')
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function fetchBranches(repoId, callback) {
        fetch(getRestUrl(localConfig) + '/branchinator/1.0/branches.json?repoId=' + repoId)
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function fetchProject(projectKey, callback) {
        fetch(getRestUrl(localConfig) + '/api/latest/project/' + projectKey + '.json?expand=plans&max-result=100')
            .then(handleRestResponse)
            .then(function(resourceObject) {
                callback(null, resourceObject);
            });
    }

    function get(resource, optionsOrCallback, callback) {
        switch (resource) {
            case "project":
                return fetchProject(optionsOrCallback.id, callback);
                break;
            case "branches":
                return fetchBranches(optionsOrCallback.id, callback);
                break;
            case "repos":
                return fetchRepos(optionsOrCallback);
                break;
            default:
                return fetchGenericResource(resource, optionsOrCallback, callback);
                break;
        }
    }

    return {
        configure: configure,
        get: get
    }
}));