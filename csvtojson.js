const csvToJson = require('csvtojson');
const path = require('path');
const fs = require('fs');

function convertCsvToJson(outputJsonFileName, inputCsvFileName) {
  const pathToInputCsvFile = path.join(
    __dirname,
    'input',
    `${inputCsvFileName}.csv`
  );

  try {
    fs.existsSync(pathToInputCsvFile);
  } catch {
    console.error('There is no CSV file with such name');
  }

  csvToJson()
    .fromFile(pathToInputCsvFile)
    .then(outputJsonObject => {
      const pathToOutputJsonFile = path.join(
        __dirname,
        'output',
        `${outputJsonFileName}.json`
      );
      try {
        fs.writeFileSync(
          pathToOutputJsonFile,
          JSON.stringify(outputJsonObject),
          'utf8'
        );
      } catch (error) {
        console.error(error);
      }
    });
}
// const meow = require('meow');
