import pkg from "./package.json";
import fs from "fs";
import Bota64 from "bota64";

const dep = Object.keys(pkg.dependencies);
let outputArray: any = [];

const b = new Bota64();

function getObject(name?: any, fallback?: any, options?: any) {
  const checkLink = (link?: any) => {
    if (options?.isLink) {
      return b.encode(link.replace("git+", ""));
    } else {
      return b.encode(link);
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
    return b.encode(rightName);
  } else {
    return b.encode(name);
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
    author: typeof author == "undefined" ? "null" : typeof author == "object" ? b.encode(author.name) : b.encode(author), //getObject(getInnerObject(author, author.name), "Unknown"),
    version: getObject(version, "null"),
    license: getObject(license, "null"),
    repository: getObject(getInnerObject(repository, repository.url), "empty", { isLink: true }),
  });
});

console.log(JSON.stringify(outputArray, null, 4));
