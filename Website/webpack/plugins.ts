import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import { Configuration } from "webpack";
import { Config } from "./defConfig";

const ProdPlugins: Configuration = {
  plugins: [
    // @ts-ignore
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: Config.CssOutputFilename as string,
    }),
  ],
};
const devPlugins: Configuration = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: Config.CssOutputFilename as string,
    }),
  ],
};

export { devPlugins, ProdPlugins };
