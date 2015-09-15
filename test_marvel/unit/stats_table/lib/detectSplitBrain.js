/**
 * ELASTICSEARCH CONFIDENTIAL
 * _____________________________
 *
 *  [2014] Elasticsearch Incorporated All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Elasticsearch Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Elasticsearch Incorporated
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Elasticsearch Incorporated.
 */



define(function (require) {
  'use strict';
  var detectSplitBrain = require('panels/marvel/stats_table/lib/detectSplitBrain');
  var masterSwap = require('/test/fixtures/masterSwap.js');
  var redSplit = require('/test/fixtures/redSplit.js');
  var yellowSplit = require('/test/fixtures/yellowSplit.js');

  describe('stats_table', function () {
    describe('lib/detectSplitBrain.js', function() {

      it('should detect a master swap and set status to green', function () {
        var results = detectSplitBrain(masterSwap);
        expect(results).to.have.property('status', 'green');
        expect(results).to.have.property('master')
          .to.be.instanceOf(Array)
          .to.have.length(1);
        expect(results.master[0]).to.equal('127.0.0.1:9301');
      });
      
      it('should detect split brain and set status to red', function () {
        var results = detectSplitBrain(redSplit);
        expect(results).to.have.property('status', 'red');
        expect(results).to.have.property('master')
          .to.be.instanceOf(Array)
          .to.have.length(2);
        expect(results).to.have.property('red')
          .to.be.instanceOf(Array)
          .to.have.length(1);
        expect(results).to.have.property('yellow')
          .to.be.instanceOf(Array)
          .to.have.length(0);
        expect(results.master[0]).to.equal('127.0.0.1:9300');
        expect(results.master[1]).to.equal('127.0.0.1:9301');
      });

      it('should detect split in the past and set status to yellow', function () {
        var results = detectSplitBrain(yellowSplit);
        expect(results).to.have.property('status', 'yellow');
        expect(results).to.have.property('master')
          .to.be.instanceOf(Array)
          .to.have.length(1);
        expect(results).to.have.property('yellow')
          .to.be.instanceOf(Array)
          .to.have.length(1);
        expect(results).to.have.property('red')
          .to.be.instanceOf(Array)
          .to.have.length(0);
        expect(results.master[0]).to.equal('127.0.0.1:9301');
      });
      
    });
  });
});