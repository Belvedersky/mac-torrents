const inquirer = require('inquirer');
const _ = require('lodash');
const config = require('../config');

async function categoryMenu() {

  var action = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select category',
      choices: [..._.keys(config.torrentmac.category)],
    }]);

  return action.category;
}

module.exports = categoryMenu;
