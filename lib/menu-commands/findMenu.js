const inquirer = require('inquirer');

async function findMenu() {

  var action = await inquirer.prompt([
    {
      type: 'input',
      name: 'search',
      message: 'Find: ',
    }]);

  return action.search;
}

module.exports = findMenu;