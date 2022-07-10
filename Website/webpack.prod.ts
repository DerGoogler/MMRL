import { merge } from "webpack-merge";
import { defConfig, config } from "./webpack.config";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

export default merge(config, {
  mode: "production",
  ...defConfig,
  optimization: {
    //@ts-ignore
    minimizer: [new UglifyJsPlugin()],
  },
  devtool: "source-map",
});
