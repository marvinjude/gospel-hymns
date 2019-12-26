const fs = require("fs");
const textract = require("textract");

fs.readdir(`${__dirname}/Lyrics`, (err, allFiles) => {
  //GET DOCS/DOC Files
  const docFiles = allFiles.filter(
    file => file.indexOf(".doc") != -1 || file.indexOf(".docx") != -1
  );

  for (let i = 0; i < docFiles.length; i++) {
    textract.fromFileWithPath(
      `Lyrics/${docFiles[i]}`,
      {
        preserveLineBreaks: true
      },
      function(error, text) {
        //CREATE TEXT FILE WIth content
        const title = text
          .split("\n")[0]
          .trim()
          .toLowerCase();
        const trimmedText = text
          .split("\n")
          .slice(1)
          .join("\n");

        fs.writeFile(
          `${__dirname}/NEW FOLDER/${title}.txt`,
          trimmedText,
          function(err) {
            if (err) console.log("CANNOT CREATE", `${title}.txt`);
            console.log("CREATED", `${title}.txt`);
          }
        );
      }
    );
  }
});

// >>>>>MOVE ALL THE TEXT FILES I CREATED TO TEXTFILESBYME DIRECTORY
fs.readdir(`${__dirname}/Lyrics`, (err, allFiles) => {
  //GET DOCS/DOC Files
  const textFiles = allFiles.filter(file => file.indexOf(".txt") !== -1);

  for (let i = 0; i < textFiles.length; i++) {
    const name = textFiles[i];
    //READ
    fs.readFile(`Lyrics/${textFiles[i]}`, (err, content) => {
      fs.writeFile(`${__dirname}/NEWFOLDER/${name}`, content, function(err) {
        if (err) console.log("CANNOT CREATE", `${name}`);
        console.log("CREATED", `${name}`);
      });
    });
  }
});
