import pkg from "./package.json";
import fs from "fs";
import Bota64 from "bota64";

const dep = Object.keys(pkg.dependencies);
let outputArray: any = [];

function getObject(name?: any, fallback?: any, options?: any) {
  const checkLink = (link?: any) => {
    if (options?.isLink) {
      return link.replace("git+", "");
    } else {
      return link;
    }
  };

  if (typeof name == "undefined") {
    return checkLink(fallback);
  } else {
    return checkLink(name);
  }
}

function getInnerObject(name?: any, rightName?: any) {
  if (typeof name == "object") {
    return rightName;
  } else {
    return name;
  }
}

dep.forEach((element?: any) => {
  const packagePath = `./node_modules/${element}/package.json`;
  const getPackage = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

  const { author, name, version, description, repository, license } = getPackage;

  outputArray.push({
    name: getObject(name, "Unknown Module"),
    description: getObject(description, "There is no description"),
    // Fallback doesn't work here.
    author: typeof author == "undefined" ? "null" : typeof author == "object" ? author.name : author, //getObject(getInnerObject(author, author.name), "Unknown"),
    version: getObject(version, "null"),
    license: getObject(license, "null"),
    repository: `https://www.npmjs.com/package/${getObject(name, "Unknown Module")}`,
  });
});

console.log(JSON.stringify(outputArray, null, 4));
