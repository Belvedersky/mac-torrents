const inquirer = require('inquirer');
const _ = require('lodash');

async function selectTorrents(data) {
  
  var action = await inquirer.prompt([
  {
    type: 'list',
    name: 'torrents',
    message: 'What do you want to get?',
    choices: [..._.keys(data)],
  }]);

  return action.torrents;
}

module.exports = selectTorrents;