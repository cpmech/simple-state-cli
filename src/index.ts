import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';

console.log(chalk.yellow(figlet.textSync('STREAMX', { horizontalLayout: 'full' })));

inquirer.prompt([
  {
    name: 'stage',
    type: 'input',
    default: 'dev',
    message: 'What stage (e.g. dev, test, prod)?',
  },
]);
