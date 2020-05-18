#!/usr/bin/env node
// подключаем возможность запуска CLI по названию напрямую из консоли

// Подключаем зависимости
const program = require('commander');
const { prompt } = require('inquirer');

// Импортируем описанные нами ранее методы
const { convert, reverse } = require('./functionality');

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

const reverseQuestions = [
  {
    type: 'input',
    name: 'inputString',
    message: 'Please input the text to reverse:',
  },
  {
    type: 'output',
    name: 'desiredReversedLength',
    message:
      'Please input the desired length of the reversed text. If left empty, the text will be reversed in full:',
  },
];

program
  .command('reverse')
  .alias('r')
  .description(
    'Reverse the input text. If desired, the reversed text length may be shortened.'
  )
  .action(() => {
    prompt(reverseQuestions).then(answers => reverse(answers));
  });

// Передаем аргументы в командную строку
program.parse(process.argv);
