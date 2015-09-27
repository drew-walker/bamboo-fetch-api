(function(root, factory) {
    module.exports = factory();
}(this, function() {
    return function responseHandler(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }
}));
