import { DefinePlugin } from "webpack";
import { merge } from "webpack-merge";
import { defConfig, config } from "./webpack.config";

const mode = "development";

export default merge(config, {
  mode: mode,
  ...defConfig,
  devtool: "source-map",

  plugins: [
    new DefinePlugin({
      __webpack__mode__: JSON.stringify(mode),
    }),
  ],
});
