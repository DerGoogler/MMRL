import { merge } from "webpack-merge";
import { defConfig, config } from "./webpack.config";

export default merge(config, {
  mode: "development",
  ...defConfig,
  devtool: "source-map",
});
