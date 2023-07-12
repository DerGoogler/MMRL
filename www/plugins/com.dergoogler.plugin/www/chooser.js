cordova.define("com.dergoogler.plugin.chooser", function (require, exports, module) {
  module.exports = {
    getFile: function (accept, successCallback, failureCallback) {
      cordova.exec(successCallback, failureCallback, "Chooser", "getFile", [(typeof accept === "string" ? accept.toLowerCase().replace(/\s/g, "") : undefined) || "*/*", true]);
    },
    getFileMetadata: function (accept, successCallback, failureCallback) {
      cordova.exec(successCallback, failureCallback, "Chooser", "getFile", [(typeof accept === "string" ? accept.toLowerCase().replace(/\s/g, "") : undefined) || "*/*", false]);
    },
  };
});
