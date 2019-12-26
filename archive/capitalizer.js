const fs = require("fs");
var { capitalCase } = require("capital-case");

fs.readdir(`${__dirname}/All`, (err, files) => {
  files.forEach(fileName => {
    const captitalized = capitalCase(fileName.split(".")[0]);
    fs.copyFile(
      `${__dirname}/All/${fileName}`,
      `${__dirname}/AllCapitalize/${captitalized}.txt`,
      err => {
        if (err) console.log("failed");
      }
    );
  });
});
