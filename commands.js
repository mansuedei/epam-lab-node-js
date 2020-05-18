#!/usr/bin/env node
// подключаем возможность запуска CLI по названию напрямую из консоли

// Подключаем зависимости
const program = require('commander');
const { prompt } = require('inquirer');

// Импортируем описанные нами ранее методы
const { convert } = require('./functionality');

program.version('0.0.1').description("Iana's custom CLI");

const convertQuestions = [
  {
    type: 'input',
    name: 'inputCsvFileName',
    message:
      'Please input the name of the CSV file you wish to convert to JSON, without the file extension:',
  },
  {
    type: 'output',
    name: 'outputJsonFileName',
    message:
      'Please input the name of future JSON converted file, without the file extension:',
  },
];

program
  .command('convert')
  .alias('c')
  .description(
    'Convert the selected CSV file in the "input" folder to JSON in the "output" folder'
  )
  .action(() => {
    prompt(convertQuestions).then(answers => convert(answers));
  });
//   .action(input => {
//     const [inputCsvFileName, outputJsonFileName] = input.args;
//     convert(inputCsvFileName, outputJsonFileName);
//   });

// Передаем аргументы в командную строку
program.parse(process.argv);
