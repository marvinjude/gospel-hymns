const hymns = require("./completeHymns");
const fs = require("fs");

fs.readdir(`${__dirname}/AllCapitalize`, (err, files) => {
  let matches = 0;
  let didntmatch = 0;

  for ([key, value] of Object.entries(hymns)) {
    console.log(key);
    includes(value, files, (error, fileName) => {
      if (!error) {
        matches = matches + 1;
      } else {
        didntmatch = didntmatch + 1;
      }
    });
  }

  console.log("didnt", didntmatch);
  console.log("match", matches);
});

function includes(value, array, cb) {
  for (let i = 0; i < array.length; i++) {
    if (
      value.indexOf(array[i].split(".")[0].toLowerCase()) !== -1 ||
      array[i].split(".")[0].indexOf(value.toLowerCase()) !== -1
    ) {
      cb(false, array[i]);
      break;
    }
  }
  cb(true, false);
}
