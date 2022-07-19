import { merge } from "webpack-merge";
import { defConfig, Mode } from "./webpack/defConfig";
import { devPlugins } from "./webpack/plugins";
import config from "./webpack.config";

export default merge(config, {
  mode: Mode.Development,
  ...defConfig,
  ...devPlugins,
  devtool: "source-map",
});
