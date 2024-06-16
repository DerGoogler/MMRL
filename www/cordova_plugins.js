cordova.define("cordova/plugin_list", function (require, exports, module) {
  module.exports = [
    {
      file: "plugins/com.dergoogler.plugin/www/chooser.js",
      id: "com.dergoogler.plugin.chooser",
      clobbers: ["__chooser__"],
    },
    {
      file: "plugins/com.dergoogler.plugin/www/fetch.js",
      id: "com.dergoogler.plugin.fetch",
      clobbers: ["fetch"],
    },
    {
      file: "plugins/com.dergoogler.plugin/www/terminal.js",
      id: "com.dergoogler.plugin.terminal",
      clobbers: ["__terminal__"],
    },
  ];
});
