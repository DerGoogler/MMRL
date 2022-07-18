import { merge } from "webpack-merge";
import { defConfig, Mode } from "./webpack/defConfig";
import config from "./webpack.config";
import { ProdPlugins } from "./webpack/plugins";

export default merge(config, {
  mode: Mode.Production,
  ...defConfig,
  ...ProdPlugins,
  optimization: {
    //@ts-ignore
    minimizer: [new UglifyJsPlugin()],
  },
  devtool: "source-map",
});
