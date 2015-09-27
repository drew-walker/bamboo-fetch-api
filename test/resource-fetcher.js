var resourceFetcher = require('../src/resource-fetcher.js');
var expect = require('chai').expect;
var sinon = require('sinon');

var mocks = {
    fetch: function() {
        return {
            then: function() {
                return {
                    then : function() {

                    }
                }
            }
        }
    }
};

var config = {
    credentials: {
        username: "abcuser",
        password: "1234567890"
    },
    host: "bamboo.atlassian.com/builds"
};

resourceFetcher.configure(config);

describe('Resource fetcher module', function() {

    it('should return an object', function() {
        expect(resourceFetcher).to.be.an("object");
    });

    it('should expose a getResourceUrl function', function() {
        expect(resourceFetcher.getResourceUrl).to.be.a("function");
    });

    it('should expose a configure function', function() {
        expect(resourceFetcher.configure).to.be.a("function");
    });

    it('should expose a fetch function', function() {
        expect(resourceFetcher.fetch).to.be.a("function");
    });

    describe('getResourceUrl', function() {
        it('should return the correct URL for a project resource', function() {
            expect(resourceFetcher.getResourceUrl(config, "project", { id: "MYPROJ1" })).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/api/latest/project/MYPROJ1.json")
        });

        it('should return the correct URL for a repos resource', function() {
            expect(resourceFetcher.getResourceUrl(config, "repos")).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/branchinator/1.0/repos.json")
        });

        it('should return the correct URL for a repos resource', function() {
            expect(resourceFetcher.getResourceUrl(config, "branches", { repoId: "CONF" })).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/branchinator/1.0/branches.json?repoId=CONF")
        });
    });

    describe('fetchProject', function() {
        it('should request the correct URL', function() {
            sinon.spy(mocks, "fetch");

            fetch = mocks.fetch;

            resourceFetcher.fetchProject("MYPROJ1");
            expect(mocks.fetch.calledOnce).to.equal(true);
            expect(mocks.fetch.firstCall.args[0]).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/api/latest/project/MYPROJ1.json?expand=plans&max-result=100");

            mocks.fetch.restore();
        });
    });

    describe('fetchBranches', function() {
        it('should request the correct URL', function() {
            sinon.spy(mocks, "fetch");

            fetch = mocks.fetch;

            resourceFetcher.fetchBranches("MY-REPO");
            expect(mocks.fetch.calledOnce).to.equal(true);
            expect(mocks.fetch.firstCall.args[0]).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/branchinator/1.0/branches.json?repoId=MY-REPO");

            mocks.fetch.restore();
        });
    });

    describe('fetchRepos', function() {
        it('should request the correct URL', function() {
            sinon.spy(mocks, "fetch");

            fetch = mocks.fetch;

            resourceFetcher.fetchRepos();
            expect(mocks.fetch.calledOnce).to.equal(true);
            expect(mocks.fetch.firstCall.args[0]).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/branchinator/1.0/repos.json");

            mocks.fetch.restore();
        });
    });

    describe('fetch', function() {
        it('should request the correct URL for the project resource', function() {
            sinon.spy(mocks, "fetch");

            fetch = mocks.fetch;

            resourceFetcher.fetch("project", { id: "MYPROJ1" });
            expect(mocks.fetch.calledOnce).to.equal(true);
            expect(mocks.fetch.firstCall.args[0]).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/api/latest/project/MYPROJ1.json?expand=plans&max-result=100");

            mocks.fetch.restore();
        });

        it('should request the correct URL for the branches resource', function() {
            sinon.spy(mocks, "fetch");

            fetch = mocks.fetch;

            resourceFetcher.fetch("branches", { repoId: "MY-REPO" });
            expect(mocks.fetch.calledOnce).to.equal(true);
            expect(mocks.fetch.firstCall.args[0]).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/branchinator/1.0/branches.json?repoId=MY-REPO");

            mocks.fetch.restore();
        });

        it('should request the correct URL for the repos resource', function() {
            sinon.spy(mocks, "fetch");

            fetch = mocks.fetch;

            resourceFetcher.fetch("repos");
            expect(mocks.fetch.calledOnce).to.equal(true);
            expect(mocks.fetch.firstCall.args[0]).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/branchinator/1.0/repos.json");

            mocks.fetch.restore();
        });

        it('should request the correct URL for a generic resource', function() {
            sinon.spy(mocks, "fetch");

            fetch = mocks.fetch;

            resourceFetcher.fetch("result", { id: "MYPROJ1-MYPLAN1-2" });
            expect(mocks.fetch.calledOnce).to.equal(true);
            expect(mocks.fetch.firstCall.args[0]).to.equal("https://abcuser:1234567890@bamboo.atlassian.com/builds/rest/api/latest/result/MYPROJ1-MYPLAN1-2.json");

            mocks.fetch.restore();
        });
    });
});