import { resolve, join } from "path";
import { existsSync, mkdirSync, readdirSync, lstatSync } from "fs";
import { Configuration, DefinePlugin, ProvidePlugin } from "webpack";
// Keep that for typings
import webpackDevServer from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import FileManagerPlugin from "filemanager-webpack-plugin";

const listFiles = (path: string, options = { recursive: true }) => {
  return readdirSync(resolve(__dirname, path), { recursive: options.recursive })
    .map((file) => resolve(__dirname, path, file))
    .filter((file) => lstatSync(file).isFile());
};

const outputPath = resolve(__dirname, "app/src/main/assets/www");
if (!existsSync(outputPath)) mkdirSync(outputPath, { recursive: true });

const APP_DIR = resolve(__dirname, "src");
const MONACO_DIR = resolve(__dirname, "node_modules/monaco-editor");

const defConfig: Configuration = {
  output: {
    filename: "bundle/[name].[fullhash].js",
    path: resolve(__dirname, outputPath),
    chunkFilename: "bundle/[name].[fullhash].[ext]",
    assetModuleFilename: "files/[name].[ext]",
    clean: true,
  },
};

const config: Configuration = {
  entry: {
    app: [resolve(__dirname, "src/index.tsx")],
    cordova: [resolve(__dirname, "web/cordova/cordova.js")],
    cordova_plugins: {
      import: [resolve(__dirname, "web/cordova/cordova_plugins.js")],
      dependOn: "cordova",
    },
    "cordova-js-src": {
      import: listFiles("web/cordova/cordova-js-src"),
      dependOn: "cordova",
    },

    "c-plugins": {
      import: listFiles("web/cordova/plugins"),
      dependOn: "cordova",
    },
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
      chunks: 'all',
      minSize: 10000, // Minimum size for a chunk to be generated
      maxSize: 30000, // No limit on chunk size
      minChunks: 1, // Minimum times a module should be shared to split
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
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
    new HtmlWebpackPlugin({
      opt: {
        title: "Magisk Module Repo Loader — MMRL",
        url: "https://mmrl.dergoogler.com",
        description:
          "Introducing Magisk Module Repo Loader (MMRL) - the ultimate module manager for Magisk, KernelSU and APatch on Android. This highly configurable app allows users to manage modules effortlessly, all while being completely free of ads.",
        cover: "assets/MMRL-Cover.png",
      },
      minify: true,
      inject: "body",
      hash: true,
      xhtml: true,
      template: resolve(__dirname, "web/app.html"),
      filename: resolve(__dirname, outputPath, "index.html"),
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: resolve(__dirname, "web/assets", "**/*"),
              destination: resolve(__dirname, outputPath, "assets"),
            },
          ],
          delete: [
            {
              source: resolve(__dirname, outputPath, "bundle", "*.map"),
              options: {
                force: true,
              },
            },
            {
              source: resolve(__dirname, outputPath, "bundle", "*.LICENSE.txt"),
              options: {
                force: true,
              },
            },
          ],
        },
      },
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
      cordova: false,
      buffer: require.resolve("buffer/"),
    },
    modules: ["node_modules", join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".sass", ".css"],
  },

  devServer: {
    static: {
      directory: outputPath,
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
