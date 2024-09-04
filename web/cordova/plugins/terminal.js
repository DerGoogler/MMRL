cordova.define(
  "com.dergoogler.plugin.terminal",
  function (require, exports, module) {
    const exec = require("cordova/exec");

    module.exports = {
      exec: function (opt) {
        exec(opt.onLine, opt.onExit, "Terminal", "exec", [
          opt.command,
          opt.env || { HOME: "/" },
          opt.cwd || "/",
        ]);
      },
      test: function (msg, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "Terminal", "test", [msg]);
      },
    };
  }
);
