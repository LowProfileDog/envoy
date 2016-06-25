'use strict';
/* globals testUtils */

var PouchDB = require('pouchdb'),
  assert = require('assert'),
  auth = require('../lib/auth');

// These tests depend on publically replicable databases at
// https://willholley-pouchdb.cloudant.com/
describe('performance', function() {
  this.timeout(120000);

  describe('test single user sync', function () {
    var dbs = {};
    beforeEach(function (done) {
      dbs = {local: 'testdb'};
      testUtils.cleanup([dbs.local], done);
    });

    afterEach(function (done) {
      testUtils.cleanup([dbs.local], done);
    });

    it('pull replication', function () {
      var remoteURL = testUtils.url('test', 'password');
      var local = new PouchDB(dbs.local);
      var remote = new PouchDB(remoteURL);

      return local.replicate.from(remote)
        .then(function (info) {
          assert.equal(info.docs_written, 100);
        });
    });
  });
});