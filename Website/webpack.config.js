const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  entry: {
    app: ["./src/index.tsx"],
  },
  output: {
    filename: "bundle/[name].bundle.js",
    path: path.resolve(__dirname, "./../Android/app/src/main/assets"),
    assetModuleFilename: "files/[name].[ext]",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /(d)?\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        type: "asset/resource",
      },
      {
        test: /\.yaml$/,
        use: "js-yaml-loader",
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
    new MiniCssExtractPlugin({
      filename: "bundle/[name].bundle.css",
    }),
  ],
  resolve: {
    fallback: {
      path: false,
      fs: false,
      util: false,
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
    alias: {
      "@Builders": path.resolve(__dirname, "src/builders"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Native": path.resolve(__dirname, "src/native"),
      "@Types": path.resolve(__dirname, "src/typings"),
      "@Utils": path.resolve(__dirname, "src/utils"),
      "@Bootloader": path.resolve(__dirname, "src/index.tsx"),
      "@Package": path.resolve(__dirname, "package.json"),
      "@Styles": path.resolve(__dirname, "src/styles"),
      "@Activitys": path.resolve(__dirname, "src/activitys"),
    },
  },
  resolveLoader: {
    modules: ["node_modules", path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
  },
};

module.exports = config;
