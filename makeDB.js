const fs = require("fs");
const categories = require("./categories");
const sounds = require("./sounds");
let DB = {};

fs.readdir(`${__dirname}/Hymns`, (err, files) => {
  for (file of files) {
    if (file.indexOf(".DS") == -1) {
      const content = fs.readFileSync(`Hymns/${file}`, "utf8");
      const chorus = getChorus(content);
      const verses = getVerses(content);
      const number = getHymnNumber(file);
      const title = getHymnTitle(file);
      const titleWithHymnNumber = getTitleWithHymnNumber(file);
      const category = getCategory(Number(number));
      const sound = getSound(Number(number));

      //  ADD HYMNS
      DB = {
        ...DB,
        hymns: {
          ...DB.hymns,
          [number]: {
            number,
            title,
            titleWithHymnNumber,
            chorus,
            verses,
            sound,
            category
          }
        }
      };
    }
  }
  // MAKE CATEGORIES
  DB = {
    ...DB,
    categories: categories
  };

  fs.writeFile(`${__dirname}/content/db.json`, JSON.stringify(DB), error => {
    if (!error) console.log("CREATED DATABASE");
  });
});

function getChorus(hymnText) {
  const matches = [...hymnText.matchAll(/(?:    )(?:.*)(?:\r\n|\r|\n)/gm)];

  return matches.length == 0
    ? false
    : matches
        .join("")
        .split("    ")
        .join("")
        .trim();
}

function getVerses(content) {
  const x = content.split("\n\n");
  return x.filter((x, i) => i !== 1);
}

function getHymnNumber(fileName) {
  return fileName.split(" ")[0].trim();
}

function getTitleWithHymnNumber(fileName) {
  return fileName
    .split(".")
    .slice(0, 1)
    .join(" ")
    .trim();
}

function getCategory(hymnNumber) {
  for ([name, hymns] of Object.entries(categories)) {
    if (hymns.includes(hymnNumber)) {
      return name;
    }
  }
  return "NOT FOUND";
}

function getHymnTitle(fileName) {
  return fileName
    .split(".")
    .slice(0, 1)
    .join(" ")
    .split(" ")
    .slice(1)
    .join(" ")
    .trim();
}

function getSound(hymnNumber) {
  return sounds[hymnNumber] ? sounds[hymnNumber] : "";
}
