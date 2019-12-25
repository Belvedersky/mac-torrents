import { prompt, Separator } from 'inquirer';

export default async () => {
  const userChoise = await prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'Get top-list torrents list',
        'Search torrent by name',
        'Search torrent by categories',
        new Separator(),
        'Settings',
      ],
    },
  ]);
  return userChoise.action;
};
