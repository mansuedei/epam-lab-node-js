// Подключаем зависимости
const csvToJson = require('csvtojson');
const path = require('path');
const fs = require('fs');

// Описываем методы

const convert = convertQuestions => {
  console.log(convertQuestions);
  const { inputCsvFileName, outputJsonFileName } = convertQuestions;
  const inputCsvFilePath = path.join(
    __dirname,
    'input',
    `${inputCsvFileName}.csv`
  );
  //   console.log(inputCsvFilePath);

  const outputJsonFilePath = path.join(
    __dirname,
    'output',
    `${outputJsonFileName}.json`
  );
  //   console.log(outputJsonFilePath);

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
  //   console.log(
  //     `Test! Here's your inputCsvFileName: "${inputCsvFileName},"outputJsonFileName "${outputJsonFileName}" and current directory" "${__dirname}" printed!`
  //   );
};

// Export All Methods
module.exports = {
  convert,
};
