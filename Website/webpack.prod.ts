import { DefinePlugin } from "webpack";
import { merge } from "webpack-merge";
import { defConfig, config } from "./webpack.config";
import TerserPlugin from "terser-webpack-plugin";

const mode = "production";

export default merge(config, {
  mode: mode,
  ...defConfig,
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    new DefinePlugin({
      __webpack__mode__: JSON.stringify(mode),
    }),
  ],
});
