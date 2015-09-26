var BambooAPI = require('../index.js');
var expect = require('chai').expect;

describe('Bamboo API node module', function() {
    it('should return an object', function() {
        expect(BambooAPI).to.be.an("object");
    });
});