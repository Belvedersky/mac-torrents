const inquirer = require('inquirer');
const _ = require('lodash');
const config = require('../../config');

module.exports = async () => {
  const action = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select category',
      choices: [..._.keys(config.torrentmac.category),
        new inquirer.Separator(),
        'Main menu',
        new inquirer.Separator()],
    }]);
  return action.category;
};
