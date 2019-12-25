import { prompt, Separator } from 'inquirer';
import { keys } from 'lodash';

export default async (data) => {
  const action = await prompt([
    {
      type: 'list',
      name: 'torrents',
      message: 'What do you want to get?',
      choices: [
        ...keys(data),
        new Separator(),
        'Main menu',
        new Separator(),
      ],
    },
  ]);
  return action.torrents;
};
