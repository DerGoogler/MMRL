cordova.define("cordova/plugin_list", function (require, exports, module) {
  const plugins = [
    {
      id: "com.dergoogler.plugin.chooser",
      clobbers: ["__chooser__"],
    },
    {
      id: "com.dergoogler.plugin.fetch",
      clobbers: ["fetch"],
    },
    {
      id: "com.dergoogler.plugin.terminal",
      clobbers: ["__terminal__"],
    },
  ];

  module.exports = plugins.map((plugin) => ({ file: "bundle/c-plugins.js", ...plugin }));
});
