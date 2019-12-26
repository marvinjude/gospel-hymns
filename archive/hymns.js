import textract from "textract";
import hymns from "./completeHymns";
const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "Lyrics");
//passsing directoryPath and callback function
fs.readdir(directoryPath, function(err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  const h = Object.values(hymns).map(name => name.toLowerCase());

  let newList = [];
  for (let i = 0; i < files.length; i++) {
    const normalizedFileName = files[i]
      .split(".")[0]
      .trim()
      .toLowerCase();
    const isNamePresent = includes(normalizedFileName, h);
    if (isNamePresent) {
      newList = [...newList, normalizedFileName];

      textract.fromFileWithPath(
        `Lyrics/${files[i]}`,
        {
          preserveLineBreaks: true
        },
        function(error, text) {
          console.log(text);
        }
      );
    }
  }

  console.log("COUNT", newList.length);
});

function includes(value, array) {
  for (let i = 0; i < array.length; i++) {
    if (value.indexOf(array[i]) !== -1 || array[i].indexOf(value) !== -1) {
      console.log(value, "===", array[i]);
      return true;
    }
  }
  return false;
}
