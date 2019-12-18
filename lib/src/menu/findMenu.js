const inquirer = require('inquirer');

module.exports = async () => {
  const action = await inquirer.prompt([
    {
      type: 'input',
      name: 'search',
      message: 'Find: ',
    }]);
  return action.search;
};

