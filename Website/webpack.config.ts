import { resolve, join } from "path";
import { Configuration, DefinePlugin, ProvidePlugin } from "webpack";
// Keep that for typings
import webpackDevServer from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const outputPath = "./../www";

const APP_DIR = resolve(__dirname, "src");
const MONACO_DIR = resolve(__dirname, "node_modules/monaco-editor");

const defConfig: Configuration = {
  output: {
    filename: "bundle/[name].bundle.js",
    path: resolve(__dirname, outputPath),
    assetModuleFilename: "files/[name].[ext]",
  },
};

const config: Configuration = {
  entry: {
    app: ["./src/index.tsx"],
  },
  ...defConfig,
  module: {
    rules: [
      {
        test: /(d)?\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.d.ts$/i,
        use: "raw-loader",
      },
      {
        test: /\.yaml$/,
        use: "js-yaml-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new DefinePlugin({
      Toast: {
        LENGTH_LONG: JSON.stringify("long"),
        LENGTH_SHORT: JSON.stringify("short"),
      },
      WEB_BUILD_DATE: JSON.stringify(Date.now()),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: "bundle/[name].bundle.css",
    }),
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  resolveLoader: {
    modules: ["node_modules", join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
  },
  resolve: {
    alias: {
      "@Builders": resolve(__dirname, "src/builders"),
      "@Components": resolve(__dirname, "src/components"),
      "@Native": resolve(__dirname, "src/native"),
      "@Hooks": resolve(__dirname, "src/hooks"),
      "@Types": resolve(__dirname, "src/typings"),
      "@Util": resolve(__dirname, "src/util"),
      "@Bootloader": resolve(__dirname, "src/index.tsx"),
      "@Package": resolve(__dirname, "package.json"),
      "@Styles": resolve(__dirname, "src/styles"),
      "@Activitys": resolve(__dirname, "src/activitys"),
      "@Strings": resolve(__dirname, "src/language/core/index.ts"),
      "@Annotation": resolve(__dirname, "src/annotation"),
      "@Locales": resolve(__dirname, "src/locales"),
    },
    fallback: {
      buffer: require.resolve("buffer/"),
    },
    modules: ["node_modules", join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".sass", ".css"],
  },

  devServer: {
    static: {
      directory: join(__dirname, outputPath),
    },
    open: false,
    compress: true,
    historyApiFallback: true,
    port: 9000,
    client: {
      overlay: false,
    },
  },
};

export { config, defConfig };
