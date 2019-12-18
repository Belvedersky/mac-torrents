const inquirer = require('inquirer');
const _ = require('lodash');

module.exports = async (data) => {
  const action = await inquirer.prompt([
    {
      type: 'list',
      name: 'torrents',
      message: 'What do you want to get?',
      choices: [
        ..._.keys(data),
        new inquirer.Separator(),
        'Main menu',
        new inquirer.Separator(),
      ],
    },
  ]);
  return action.torrents;
};
