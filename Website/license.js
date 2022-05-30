const pkg = require("./package.json");
const fs = require("fs");
const visit = require("visit-values");

const dep = Object.keys(pkg.dependencies);
let outputArray = [];

function getLicenses(json) {
  if (typeof json.license === "string") {
    return json.license;
  }

  if (typeof json.license === "object") {
    return json.license.type;
  }

  if (Array.isArray(json.licenses)) {
    let result = "";
    for (let i = 0; i < json.licenses.length; i++) {
      if (i > 0) result += ", ";

      if (typeof json.licenses[i] === "string") {
        result += json.licenses[i];
      } else {
        result += json.licenses[i].type;
      }
    }

    return result;
  }
}

function getLink(json) {
  if (json.repository && json.repository.url) {
    return json.repository.url;
  }

  let otherUrls = [];

  visit(json, function (value) {
    if (typeof value !== "string") return;
    if (value.substr(0, "http".length) === "http") {
      return otherUrls.push(value);
    }

    if (value.substr(0, "git".length) === "git") {
      return otherUrls.push(value);
    }
  });

  if (otherUrls.length > 0) {
    return otherUrls[0];
  }
}

dep.forEach((element) => {
  const packagePath = `./node_modules/${element}/package.json`;
  const package = JSON.parse(fs.readFileSync(packagePath));

  const { author, name, version, description } = package;

  outputArray.push({
    name: typeof name == "undefined" ? "null" : name,
    description: typeof description == "undefined" ? "null" : description,
    author: typeof author == "undefined" ? "null" : typeof author == "object" ? author.name : author,
    version: typeof version == "undefined" ? "null" : version,
    license: getLicenses(package),
    repository: getLink(package),
  });
});

console.log(JSON.stringify(outputArray));
