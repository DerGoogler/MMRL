const fs = require("fs");
const path = require("path");
const package = require(path.resolve(__dirname, "package.json"));

const NODE_MODULES_PATH = path.resolve(__dirname, "node_modules");
const OUTPUT = path.resolve(__dirname, "src", "util", "licenses.json");
const allDependencies = [];

Object.keys(package.dependencies).forEach((dependency) => {
  const depPackage = require(path.resolve(__dirname, NODE_MODULES_PATH, dependency, "package.json"));

  if (depPackage) {
    function getSource() {
      if (depPackage.repository) {
        return depPackage.repository.url ? depPackage.repository.url : null;
      } else {
        return null;
      }
    }

    function getAuthor() {
      if (depPackage.author) {
        return depPackage.author.name ? depPackage.author.name : null;
      } else {
        return null;
      }
    }

    allDependencies.push({
      name: depPackage.name,
      author: getAuthor(),
      license: depPackage.license,
      description: depPackage.description,
      version: depPackage.version,
      source: `https://www.npmjs.com/package/${depPackage.name}`,
    });
  }
});

fs.writeFileSync(OUTPUT, JSON.stringify(allDependencies, null, 2));
