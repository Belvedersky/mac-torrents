import { prompt, Separator } from 'inquirer';
import { keys } from 'lodash';
import torrentmac from '../../config';

export default async () => {
  const action = await prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select category',
      choices: [...keys(torrentmac.category),
        new Separator(),
        'Main menu',
        new Separator()],
    }]);
  return action.category;
};
