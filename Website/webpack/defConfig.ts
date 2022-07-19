import { resolve } from "path";
import { Configuration } from "webpack";

export enum Config {
  Blue,
  AndroidOutputPath = "./../../Android/app/src/main/assets",
  OutputFilename = "bundle/[name].bundle.js",
  AssetModuleFilename = "files/[name].[ext]",
  CssOutputFilename = "bundle/[name].bundle.css",
}

export enum Mode {
  Production = "production",
  Development = "development",
}

const defConfig: Configuration = {
  output: {
    filename: Config.OutputFilename as string,
    path: resolve(__dirname, Config.AndroidOutputPath),
    assetModuleFilename: Config.AssetModuleFilename as string,
  },
};

export { defConfig };
