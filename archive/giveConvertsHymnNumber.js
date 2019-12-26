const hymns = require("./completeHymns");
const fs = require("fs");

fs.readdir(`${__dirname}/Converts`, (err, files) => {
  let matches = [];
  let didntmatch = 0;

  for ([key, value] of Object.entries(hymns)) {
    includes(value, files, (error, fileName) => {
      if (!error) {
        console.log(fileName);
        matches = [...matches, value];
        fs.copyFile(
          `${__dirname}/Converts/${fileName}`,
          `${__dirname}/ConvertsMatch/${key} ${value.toLowerCase()}.txt`,
          err => {
            if (err) console.log("failed");
          }
        );
      } else {
        didntmatch = didntmatch + 1;
      }
    });
  }

  console.log(matches.length, didntmatch);
});

function includes(value, array, cb) {
  for (let i = 0; i < array.length; i++) {
    if (
      value.indexOf(array[i].toLowerCase()) !== -1 ||
      array[i].indexOf(value.toLowerCase()) !== -1
    ) {
      cb(false, array[i]);
    }
  }
  cb(true, false);
}
