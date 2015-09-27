var responseHandler = require('../src/response-handler');
var expect = require('chai').expect;

describe('Response handler function', function() {

    it('should throw an error if a 404 (not found) status code is received', function() {
        expect(responseHandler.bind(this, { status: 404, json: function() {} })).to.throw("Bad response from server");
    });

    it('should throw an error if a 500 (internal server error) status code is received', function() {
        expect(responseHandler.bind(this, { status: 500, json: function() {} })).to.throw("Bad response from server");
    });

    it('should not throw an error if a 301 (redirect) status code is received', function() {
        expect(responseHandler.bind(this, { status: 301, json: function() {} })).to.not.throw();
    });

    it('should not throw an error if a 304 (not modified) status code is received', function() {
        expect(responseHandler.bind(this, { status: 304, json: function() {} })).to.not.throw();
    });

    it('should not throw an error if a 200 (ok) status code is received', function() {
        expect(responseHandler.bind(this, { status: 200, json: function() {} })).to.not.throw();
    });
});