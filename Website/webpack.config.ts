import { Configuration } from "webpack";
import { resolve, join } from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const defConfig = {
  output: {
    filename: "bundle/[name].bundle.js",
    path: resolve(__dirname, "./../Android/app/src/main/assets"),
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
    modules: ["node_modules", join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
    alias: {
      "@Builders": resolve(__dirname, "src/builders"),
      "@Components": resolve(__dirname, "src/components"),
      "@Native": resolve(__dirname, "src/native"),
      "@Types": resolve(__dirname, "src/typings"),
      "@Utils": resolve(__dirname, "src/utils"),
      "@Bootloader": resolve(__dirname, "src/index.tsx"),
      "@Package": resolve(__dirname, "package.json"),
      "@Styles": resolve(__dirname, "src/styles"),
      "@Activitys": resolve(__dirname, "src/activitys"),
      "@Strings": resolve(__dirname, "src/language/core/index.ts"),
    },
  },
  resolveLoader: {
    modules: ["node_modules", join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
  },
};

export { defConfig, config };
