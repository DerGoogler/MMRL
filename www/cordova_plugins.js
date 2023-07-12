cordova.define("cordova/plugin_list", function (require, exports, module) {
  module.exports = [
    {
      file: "plugins/com.dergoogler.plugin/www/terminal.js",
      id: "com.dergoogler.plugin.terminal",
      clobbers: ["Terminal"],
    },
    {
      file: "plugins/com.dergoogler.plugin/www/chooser.js",
      id: "com.dergoogler.plugin.chooser",
      clobbers: ["Chooser"],
    },
  ];
});
