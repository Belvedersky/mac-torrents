const inquirer = require('inquirer');

module.exports = async () => {
  const action = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Save ?',
      choices: [
        'Only save torrent file',
        'Save and open on torrent app',
        'Back to list',
      ],
    }]);
  return action.action;
};
