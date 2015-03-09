var CoreObject = require('core-object');

module.exports = CoreObject.extend({
  createTag: function(syncExec) {
    syncExec = syncExec || require('sync-exec');

    var commandResult = syncExec("git rev-parse HEAD").stdout;

    this._generateKey(commandResult);

    return this.revisionKey;
  },

  _generateKey: function(sha) {
    this.revisionKey = this.manifest+':'+sha.slice(0,7);
  }
});
