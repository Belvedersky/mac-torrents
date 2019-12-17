const inquirer = require('inquirer');

async function userAction() {
  var userChoise = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'Get top-list torrents list',
        'Search torrent by name',
        'Search torrent by categories',
        new inquirer.Separator(),
        'Settings',
      ],
    },
  ]);
  return userChoise.action;
}

module.exports = userAction;

