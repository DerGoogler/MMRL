const { program } = require("commander");
const { readdirSync, unlinkSync, rmSync } = require("fs");
const { copySync } = require("fs-extra");
const { resolve } = require("path");

program.name("assetfix").description("CLI to manage release or development assets").version("1.0.0");

program
  .command("android")
  .description("Prepares assets for Android")
  .option("-b, --build", "Builds the assets for Android")
  .option("-c, --clean", "Cleans the Android assets directory")
  .action((opt) => {
    // We only want to remove the *.map files
    const wwwPath = resolve(__dirname, "./../www");
    const assetsPath = resolve(__dirname, "./../Android/app/src/main/assets");

    if (opt.build) {
      const regex = /(app|vendor)[.]bundle[.](js|css)[.]map$/;
      // Copy files to android app assets
      copySync(wwwPath, resolve(assetsPath, "www"), { overwrite: true, filter: (src) => !regex.test(src) });
    }

    if (opt.clean) {
      // We want to keep .gitkeep
      const regex = /[.]gitkeep$/;
      readdirSync(resolve(assetsPath, "www"))
        .filter((f) => !regex.test(f))
        .map((f) => unlinkSyncResolve(assetsPath, "www", f));
    }
  });

program
  .command("web")
  .description("Prepares assets for Browsers")
  .option("-b, --build", "Builds the assets for Browser")
  .option("-c, --clean", "Cleans the Browser assets directory")
  .action((opt) => {
    // We only want to remove the *.map files
    const wwwPath = resolve(__dirname, "./../www");
    const browserPath = resolve(__dirname, "./../Browser");

    if (opt.build) {
      const regex = /((app|vendor)[.]bundle[.](js|css)[.]map|(plugins|cordova-js-src))$/;
      // Copy files to browser assets
      copySync(wwwPath, browserPath, { overwrite: true, filter: (src) => !regex.test(src) });
    }

    if (opt.clean) {
      // We want to keep .gitkeep
      const regex = /[.]gitkeep$/;
      readdirSync(resolve(browserPath))
        .filter((f) => !regex.test(f))
        .map((f) => unlinkSyncResolve(browserPath, f));
    }
  });

program.parse();

function unlinkSyncResolve(...pathSegments) {
  const pth = resolve(...pathSegments);
  // Maybe additional check if exists?
  rmSync(pth, { recursive: true, force: true });
  console.log(`Removed \x1b[32m${pth}\x1b[39m`);
}
