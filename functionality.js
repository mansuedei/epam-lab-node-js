// Подключаем зависимости
const csvToJson = require('csvtojson');
const path = require('path');
const fs = require('fs');

// Описываем методы

const convert = convertQuestions => {
  const { inputCsvFileName, outputJsonFileName } = convertQuestions;
  const inputCsvFilePath = path.join(
    __dirname,
    'input',
    `${inputCsvFileName}.csv`
  );

  const outputJsonFilePath = path.join(
    __dirname,
    'output',
    `${outputJsonFileName}.json`
  );

  csvToJson()
    .fromFile(inputCsvFilePath)
    .then(createdJsonObj => {
      fs.writeFileSync(
        outputJsonFilePath,
        JSON.stringify(createdJsonObj),
        'utf8'
      );
      console.log(
        `The input file "${inputCsvFileName}.csv" has been successfully converted to "${outputJsonFileName}.json". Please check the "output" folder. `
      );
    });
};

// Export All Methods
module.exports = {
  convert,
};
