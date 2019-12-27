import { prompt } from 'inquirer';

export default async () => {
  const action = await prompt([
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
