cordova.define("cordova/plugin_list", function (require, exports, module) {
  module.exports = [
    {
      file: "plugins/com.dergoogler.plugin/www/terminal.js",
      id: "com.dergoogler.plugin.terminal",
      clobbers: ["Terminal"],
    },
  ];
  module.exports.metadata = {
    "cordova-plugin-terminal": "1.0.0",
  };
});
