import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { store } from './store';
import { generate } from './generate';

async function main() {
  console.log(
    chalk.yellow(figlet.textSync('SIMPLE-STATE', { horizontalLayout: 'controlled smushing' })),
  );

  /*
  const answers = await inquirer.prompt([
    {
      name: 'moduleNames',
      type: 'input',
      default: 'auth user',
      message: 'Which modules will the store have?',
    },
  ]);

  const moduleNames = (answers as any).moduleNames;

  store.data.setStringField('moduleNames', moduleNames);
  */

  try {
    generate();
  } catch (error) {
    console.warn('EROR', error.message || JSON.stringify(error));
  }
}

main();
