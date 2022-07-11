import pkg from "./package.json";
import fs from "fs";
import Bota64 from "bota64";

const dep = Object.keys(pkg.dependencies);
let outputArray: any = [];

function getObject(name?: any, fallback?: any, options?: any) {
  const checkLink = (link?: any) => {
    if (options?.isLink) {
      return Bota64.encode(link.replace("git+", ""));
    } else {
      return Bota64.encode(link);
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
    return Bota64.encode(rightName);
  } else {
    return Bota64.encode(name);
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
    author: typeof author == "undefined" ? Bota64.encode("null") : typeof author == "object" ? Bota64.encode(author.name) : Bota64.encode(author), //getObject(getInnerObject(author, author.name), "Unknown"),
    version: getObject(version, "null"),
    license: getObject(license, "null"),
    repository: getObject(getInnerObject(repository, repository.url), "empty", { isLink: true }),
  });
});

console.log(JSON.stringify(outputArray, null, 4));
