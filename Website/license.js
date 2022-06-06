const g2js = require("gradle-to-js/lib/parser");
const pkg = require("./package.json");
const fs = require("fs");

g2js.parseFile("./../Android/app/build.gradle").then((representation) => {
  const dep = Object.keys(pkg.dependencies);
  let outputArray = [];

  function getObject(name, fallback, options) {
    const checkLink = (link) => {
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

  function getInnerObject(name, rightName) {
    if (typeof name == "object") {
      return rightName;
    } else {
      return name;
    }
  }

  dep.forEach((element) => {
    const packagePath = `./node_modules/${element}/package.json`;
    const package = JSON.parse(fs.readFileSync(packagePath));

    const { author, name, version, description, repository, license } = package;

    outputArray.push({
      name: getObject(name, "Unknown Module"),
      description: getObject(description, "There is no description"),
      // Fallback doesn't work here.
      author: typeof author == "undefined" ? "null" : typeof author == "object" ? author.name : author, //getObject(getInnerObject(author, author.name), "Unknown"),
      version: getObject(version, "null"),
      license: getObject(license, "null"),
      repository: getObject(getInnerObject(repository, repository.url), "empty", { isLink: true }),
    });
  });

  const rep = representation;
  rep.dependencies.forEach((element) => {
    if (element.name == ("" || undefined || null)) {
      return false;
    } else {
      outputArray.push({
        name: getObject(element.group, "Unknown Module"),
        description: "null",
        author: "null",
        version: getObject(element.version, "null"),
        license: "null",
        repository: "null",
      });
    }
  });

  console.log(JSON.stringify(outputArray, null, 4));
});
