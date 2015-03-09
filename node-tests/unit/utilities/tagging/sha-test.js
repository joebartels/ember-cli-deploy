var expect            = require('chai').expect;
var sinon             = require('sinon');
var ShaTaggingAdapter = require('../../../../lib/utilities/tagging/sha');

var getShortShaVersion = function(sha) {
  return sha.slice(0,7);
};

var GIT_SHA           = '04b724a6c656a21795067f9c344d22532cf593ae';
var GIT_SHA_SHORTENED = getShortShaVersion(GIT_SHA);

describe('ShaTaggingAdapter', function() {
  var sandbox;
  var syncExec = {
    exec: require('sync-exec')
  };

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    sandbox
      .stub(syncExec, 'exec')
      .returns({stdout: GIT_SHA});
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#createTag', function() {
    it('returns a tag based on current git-sha and manifestName', function() {
      var manifestName   = 'ember-cli-deploy';
      var expectedTag    = manifestName+':'+GIT_SHA_SHORTENED;
      var revisionTagger = new ShaTaggingAdapter({
        manifest: manifestName
      });

      expect(revisionTagger.createTag(syncExec.exec)).to.eq(expectedTag);
    });
  });
});
