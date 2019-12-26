const fs = require("fs");
const appRootPath = require("app-root-path");
const textDirectory = `${appRootPath}/Hymns`;
const HIGHEST_LINE_LENGTH = 70;

describe("File Emptiness", () => {
  filesEmptyTest();
});

describe("File Name validity", () => {
  fileNameTest();
});

describe("Chrous should be well formatted", () => {
  chorusIsFormattedWell();
});

function testHof(handler) {
  const files = fs.readdirSync(textDirectory);
  for (file of files) {
    if (file.indexOf(".DS") == -1) {
      const content = fs.readFileSync(`${textDirectory}/${file}`, "utf8");
      const [validity, message] = handler(content, file);
      test(message, () => {
        expect(validity).toBe(true);
      });
    }
  }
}

function filesEmptyTest() {
  testHof((fileContent, file) => [
    fileContent.trim().length > 0,
    `${file}'s content shouldn't be empty`
  ]);
}

function fileNameTest() {
  testHof((fileContent, file) => {
    const hymnNumber = file.split(" ")[0];
    return [
      Number.isInteger(Number(hymnNumber)),
      `${file} should be like 10 Jesus only.txt`
    ];
  });
}

function chorusIsFormattedWell() {
  testHof((fileContent, file) => {
    if (fileContent.trim()) {
      const lines = fileContent
        .split("\n\n")
        .flatMap(section => section.split("\n"))
        .flatMap(line => line.trim());

      for (const line of lines) {
        if (line.length > HIGHEST_LINE_LENGTH) {
          return [
            false,
            `length of each line in ${file} should not be greater than ${HIGHEST_LINE_LENGTH}`
          ];
        }

        return [
          true,
          `length of each line in ${file} should not be greater than ${HIGHEST_LINE_LENGTH}`
        ];
      }
    }
  });
}
