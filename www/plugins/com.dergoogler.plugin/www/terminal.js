cordova.define("com.dergoogler.plugin.terminal", function (require, exports, module) {
  const exec = require("cordova/exec");

  module.exports = {
    exec: function (cmd, successCallback, errorCallback) {
      exec(successCallback, errorCallback, "Terminal", "exec", [cmd]);
    },
    test: function (msg, successCallback, errorCallback) {
      exec(successCallback, errorCallback, "Terminal", "test", [msg]);
    },
  };
});
