cordova.define("com.dergoogler.plugin.download", function (require, exports, module) {
  const exec = require("cordova/exec");

  module.exports = {
    start: function (opt) {
      exec(opt.onChange, opt.onError, "Download", "start", [opt.url, opt.dest]);
    },
  };
});
